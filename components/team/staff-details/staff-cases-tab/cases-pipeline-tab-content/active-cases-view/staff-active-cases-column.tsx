"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, differenceInDays, startOfDay } from "date-fns";
import { Clock, AlertCircle, ChevronRight, Wrench, ArrowRightLeft, CheckCircle2, MoreHorizontal, AlertTriangle, Play, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StaffActiveCaseDTO } from "@/schema/composed/team/staff-active-cases.dtos"; // Adjust path
import { CaseStatus, StaffRoleCategory } from "@/schema/base/enums.base";
import { memo, useCallback, useMemo, useState } from "react";
import { useReassignUiStore } from "@/store/team/use-reassign-ui-store";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { updateCaseStatusAction } from "@/actions/cases/update-case";
import { useQueryClient } from "@tanstack/react-query";

// Format role strings (e.g., "SENIOR_TECHNICIAN" -> "Senior Technician")
const formatRole = (role: StaffRoleCategory) => {
	return role
		.split("_")
		.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
		.join(" ");
};

export const staffActiveCasesColumns: ColumnDef<StaffActiveCaseDTO>[] = [
	{
		accessorKey: "caseNumber",
		header: "Case ID",
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<span className="font-mono font-bold text-sm text-foreground hover:text-primary transition-colors cursor-pointer w-24 truncate">{row.original.caseNumber}</span>
				{row.original.isRemake && (
					<span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-black text-amber-600 uppercase tracking-tighter">Remake</span>
				)}
			</div>
		),
	},
	{
		id: "patientClinic",
		header: "Patient & Clinic",
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5 max-w-50">
				<span className="font-bold text-sm text-foreground truncate">{row.original.patientName}</span>
				<span className="text-[10px] text-muted-foreground uppercase tracking-widest truncate font-medium">{row.original.clinicName}</span>
			</div>
		),
	},
	{
		accessorKey: "assignedRole",
		header: "Assigned Task",
		cell: ({ row }) => {
			const role = row.original.assignedRole;
			// Visual hierarchy for different types of work
			const isQC = role === "QC_INSPECTOR";
			const isLogistics = role === "COURIER";

			return (
				<div
					className={cn(
						"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest",
						isQC
							? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
							: isLogistics
								? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20"
								: "bg-primary/10 text-primary border-primary/20",
					)}
				>
					<Wrench className="w-3 h-3" />
					{formatRole(role)}
				</div>
			);
		},
	},
	{
		accessorKey: "primaryProduct",
		header: "Clinical Prescription",
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5 max-w-45">
				<span className="text-xs font-bold text-foreground truncate">{row.original.primaryProduct || "No product mapped"}</span>
				<span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest truncate">{row.original.caseCategory || "Uncategorized"}</span>
			</div>
		),
	},
	{
		accessorKey: "deadline",
		header: "Production Deadline",
		cell: ({ row }) => {
			const deadline = row.original.deadline;
			if (!deadline) return <div className="text-xs font-bold text-muted-foreground italic">Unscheduled</div>;

			const today = startOfDay(new Date());
			const deadlineDate = startOfDay(deadline);
			const daysUntil = differenceInDays(deadlineDate, today);

			const isOverdue = daysUntil < 0;
			const isDueToday = daysUntil === 0;
			const isRush = daysUntil > 0 && daysUntil <= 2;

			return (
				<div className="flex flex-col gap-1">
					<span className={cn("text-xs font-bold transition-colors", isOverdue ? "text-rose-500" : isDueToday || isRush ? "text-amber-600 dark:text-amber-500" : "text-foreground")}>
						{format(new Date(deadline), "MMM dd, yyyy")}
					</span>

					{/* Smart Contextual Badges */}
					{isOverdue ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-rose-500 animate-pulse">
							<AlertCircle className="w-3 h-3" /> {Math.abs(daysUntil)} Days Overdue
						</span>
					) : isDueToday ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 animate-pulse">
							<Clock className="w-3 h-3" /> Due Today
						</span>
					) : isRush ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
							<Clock className="w-3 h-3" /> Due in {daysUntil} Days
						</span>
					) : null}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			// In a real scenario, you might pass a specific callback down via table meta,
			// or use a Zustand store to pop a "ReassignModal" sheet.

			return <ActionCell rowData={row.original} />;
		},
	},
];

// ── 3. MEMOIZED CLIENT ACTION CELL [1] ───────────────────────────────────────
const ActionCell = memo(function ActionCell({ rowData }: { rowData: StaffActiveCaseDTO }) {
	const queryClient = useQueryClient();

	const openReassignSheet = useReassignUiStore((s) => s.openReassignSheet);

	// Intercept states for warnings/failures [2]
	const [pendingTarget, setPendingTarget] = useState<CaseStatus | null>(null);
	const [warningMessage, setWarningMessage] = useState<string | null>(null);

	// --- 1. STATUS MUTATION HOOK ---
	const { executeAsync: updateStatus, isExecuting } = useAction(updateCaseStatusAction, {
		onSuccess: () => {
			toast.success(`Case status advanced.`);

			// Instantly refresh the active queue so the card disappears/moves [3]
			queryClient.invalidateQueries({ queryKey: ["staff-active-cases"] });
			queryClient.invalidateQueries({ queryKey: ["staff-roster"] });
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// --- 2. DETERMINISTIC NEXT HAPPY-PATH STATUS [1] ---
	const nextStatus = useMemo((): CaseStatus | null => {
		if (rowData.status === "ASSIGNED") return "PROCESSING";
		if (rowData.status === "PROCESSING") return "COMPLETED";
		return null;
	}, [rowData.status]);

	const getNextStatusLabel = (status: CaseStatus) => {
		if (status === "PROCESSING") return "Start Production";
		if (status === "COMPLETED") return "Complete Case";
		return "Advance Status";
	};

	const executeStatusChange = async (target: CaseStatus) => {
		setPendingTarget(null);
		setWarningMessage(null);

		const promise = updateStatus({ caseId: rowData.id, newStatus: target });
		toast.promise(promise, {
			loading: "Updating production stage...",
			success: "Status successfully advanced.",
			error: "Failed to update status.",
		});
	};

	const handleTransitionClick = (target: CaseStatus) => {
		if (target === "FAILED") {
			setWarningMessage(null);
			setPendingTarget("FAILED"); // Triggers red failure modal
			return;
		}

		// Skip complex staff warnings here to keep the table row action frictionless,
		// or insert your getStatusTransitionWarning logic here if strictly required [2]
		executeStatusChange(target);
	};

	const handleReassign = useCallback(() => {
		// Pass the single case ID and its current role to the global store [3]
		openReassignSheet([rowData.id], rowData.assignedRole);
	}, [rowData, openReassignSheet]);

	return (
		<div className="text-right" onClick={(e) => e.stopPropagation()}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button disabled={isExecuting} variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg">
						{isExecuting ? <Loader2 className="h-4 w-4 text-primary animate-spin" /> : <MoreHorizontal className="h-4 w-4 text-muted-foreground" />}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]">
					<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-widest">Manage Assignment</DropdownMenuLabel>
					<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5">
						<Link href={`/cases/${rowData.id}`} className="flex items-center gap-1.5 group w-full">
							<ChevronRight className="w-4 h-4 mr-2 text-muted-foreground" /> View Full Case
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator className="bg-border" />
					{/* TRIGGER REASSIGNMENT */}
					<DropdownMenuItem
						onClick={handleReassign}
						className="cursor-pointer font-medium py-2 hover:bg-primary/5 text-amber-600 dark:text-amber-500 focus:text-amber-500 focus:bg-amber-500/10"
					>
						<ArrowRightLeft className="w-4 h-4 mr-2" /> Reassign to Colleague
					</DropdownMenuItem>
					{/* DYNAMIC NEXT HAPPY PATH ACTION [1] */}
					{nextStatus && (
						<DropdownMenuItem
							onClick={() => handleTransitionClick(nextStatus)}
							className="cursor-pointer font-bold py-2 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-500/10"
						>
							{nextStatus === "PROCESSING" ? <Play className="w-4 h-4 mr-2 text-emerald-500" /> : <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />}
							{getNextStatusLabel(nextStatus)}
						</DropdownMenuItem>
					)}

					<DropdownMenuItem
						onClick={() => handleTransitionClick("FAILED")}
						className="cursor-pointer font-medium py-2 hover:bg-destructive/10 text-destructive focus:text-destructive focus:bg-destructive/10"
					>
						<AlertCircle className="w-4 h-4 mr-2" /> Fail Case
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* --- THE INTERCEPT WARNING/FAIL ALERTS [2] --- */}
			<AlertDialog open={pendingTarget !== null} onOpenChange={(open) => !open && setPendingTarget(null)}>
				<AlertDialogContent className="rounded-2xl border-border bg-card dark:bg-[#121214] shadow-premium">
					<AlertDialogHeader>
						<div
							className={cn(
								"w-12 h-12 rounded-xl flex items-center justify-center mb-4 border",
								pendingTarget === "FAILED" ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-amber-500/10 border-amber-500/20 text-amber-500",
							)}
						>
							{pendingTarget === "FAILED" ? <AlertCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
						</div>

						<AlertDialogTitle className="text-xl font-bold tracking-tight">{pendingTarget === "FAILED" ? "Fail this case?" : "Verify Transition"}</AlertDialogTitle>

						<AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
							{pendingTarget === "FAILED"
								? "Marking this case as FAILED will halt all production workflows. This action is recorded in the Audit Trail and cannot be easily undone."
								: warningMessage}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6 gap-3! sm:gap-2!">
						<AlertDialogCancel className="rounded-xl h-10! font-semibold border-border hover:bg-secondary">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => pendingTarget && executeStatusChange(pendingTarget)}
							className={cn(
								"rounded-xl h-10 font-bold shadow-sm",
								pendingTarget === "FAILED" ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" : "bg-amber-500 hover:bg-amber-600 text-white",
							)}
						>
							{pendingTarget === "FAILED" ? "Yes, Fail Case" : "Continue Anyway"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
});
