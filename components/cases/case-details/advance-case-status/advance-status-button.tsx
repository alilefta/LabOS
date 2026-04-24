"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Activity, PackageCheck, Truck, AlertCircle, User, LucideIcon, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

import { CaseStatus } from "@/schema/base/enums.base";
import { updateCaseStatusAction } from "@/actions/cases/update-case";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { getStatusTransitionWarning, VALID_TRANSITIONS } from "@/lib/permissions/cases/clinical-status-rules";

interface Props {
	caseId: string;
	currentStatus: CaseStatus;
	staffAssignments: CaseStaffAssignmentDetailsUI[];
}

// Status UI Mappings
const STATUS_UI_CONFIG: Record<CaseStatus, { label: string; icon: LucideIcon; colorClass: string }> = {
	NEW: { label: "Submit to Floor", icon: Activity, colorClass: "text-blue-500" },
	ASSIGNED: { label: "Mark as Assigned", icon: User, colorClass: "text-slate-500" },
	PROCESSING: { label: "Start Milling / Prod", icon: Activity, colorClass: "text-amber-500" },
	COMPLETED: { label: "Mark Completed", icon: PackageCheck, colorClass: "text-emerald-500" },
	DELIVERED: { label: "Mark Delivered", icon: Truck, colorClass: "text-emerald-600" },
	FAILED: { label: "Fail / Cancel Case", icon: AlertCircle, colorClass: "text-destructive" },
	DRAFT: { label: "Draft", icon: Activity, colorClass: "text-muted-foreground" },
};

// 3. Determine the "Primary" happy path label for the main button
const getPrimaryLabel = (currentStatus: CaseStatus) => {
	switch (currentStatus) {
		case "NEW":
			return "Start Processing";
		case "ASSIGNED":
			return "Start Processing";
		case "PROCESSING":
			return "Complete Case";
		case "COMPLETED":
			return "Mark Delivered";
		default:
			return "Advance Status";
	}
};

export function AdvanceStatusButton({ caseId, currentStatus, staffAssignments }: Props) {
	const router = useRouter();
	const allowedNext = VALID_TRANSITIONS[currentStatus] || [];

	// --- INTERCEPT STATES ---
	const [pendingTarget, setPendingTarget] = useState<CaseStatus | null>(null);
	const [warningMessage, setWarningMessage] = useState<string | null>(null);

	const { executeAsync: updateStatus, isExecuting } = useAction(updateCaseStatusAction, {
		onSuccess: () => {
			toast.success("Case status updated.");
			router.refresh();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});
	// // --- WARNING LOGIC ("Warn, Don't Block") ---
	// const getAdvanceWarning = useCallback((toStatus: CaseStatus, assignments: CaseStaffAssignmentDetailsUI[]): string | null => {
	// 	const hasTech = assignments.some((s) => s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN");
	// 	const hasCourier = assignments.some((s) => s.roleCategory === "COURIER");
	// 	const hasQC = assignments.some((s) => s.roleCategory === "QC_INSPECTOR");

	// 	// If moving to PROCESSING without a tech assigned yet
	// 	if (toStatus === "PROCESSING" && !hasTech) return "No technician assigned. This case will move to active production without a lead technician tracked in the system.";

	// 	// If completing a case but nobody checked QC (Optional strict rule you can disable)
	// 	if (toStatus === "COMPLETED" && !hasQC) return "No QC Inspector assigned. Ensure quality checks have been verified before packaging.";

	// 	// If trying to deliver without a courier
	// 	if (toStatus === "DELIVERED" && !hasCourier) return "No courier assigned. The case is ready for delivery, but the system doesn't know who is taking it.";

	// 	return null;
	// }, []);

	// Handles the click from the dropdown menu
	const handleTransitionClick = (newStatus: CaseStatus) => {
		if (newStatus === "FAILED") {
			setWarningMessage(null);
			setPendingTarget("FAILED"); // Triggers the RED failure modal
			return;
		}

		// Calculate if we need to warn them about missing staff
		const warning = getStatusTransitionWarning(newStatus, staffAssignments || []);

		if (warning) {
			setWarningMessage(warning);
			setPendingTarget(newStatus); // Triggers the AMBER warning modal
			return;
		}

		// If no warnings and no failure, just execute immediately!
		executeStatusChange(newStatus);
	};

	const executeStatusChange = async (newStatus: CaseStatus) => {
		setPendingTarget(null);
		setWarningMessage(null);
		await updateStatus({ caseId, newStatus });
	};

	if (allowedNext.length === 0) return null;
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						disabled={isExecuting}
						className="flex-2 md:flex-none rounded-xl bg-primary text-primary-foreground h-10 px-4 sm:px-6 font-bold shadow-premium hover:bg-primary/90 transition-all focus-visible:ring-[3px] focus-visible:ring-primary/20"
					>
						{isExecuting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
						{getPrimaryLabel(currentStatus)}
						<ChevronDown className="w-4 h-4 ml-1.5 sm:ml-2 shrink-0 opacity-80" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56 rounded-xl border-border shadow-premium dark:bg-[#121214] p-1.5">
					<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1.5">Valid Transitions</DropdownMenuLabel>

					{allowedNext.map((status) => {
						const config = STATUS_UI_CONFIG[status];
						const isDestructive = status === "FAILED";

						return (
							<DropdownMenuItem
								key={status}
								onClick={() => handleTransitionClick(status)}
								className={cn(
									"flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer font-semibold transition-colors group",
									isDestructive ? "text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive" : "hover:bg-primary/5 focus:bg-primary/5",
								)}
							>
								<config.icon className={cn("w-4 h-4", config.colorClass)} />
								<span className="flex-1">{config.label}</span>
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>

			{/* --- THE INTERCEPT MODAL (Handles both FAILED and WARNING states) --- */}
			<AlertDialog open={pendingTarget !== null} onOpenChange={(open) => !open && setPendingTarget(null)}>
				<AlertDialogContent className="rounded-2xl border-border shadow-premium dark:bg-[#121214]">
					<AlertDialogHeader>
						{/* Dynamic Icon based on whether it's a warning or a destructive action */}
						<div
							className={cn(
								"w-12 h-12 rounded-xl flex items-center justify-center mb-4 border",
								pendingTarget === "FAILED" ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-amber-500/10 border-amber-500/20 text-amber-500",
							)}
						>
							{pendingTarget === "FAILED" ? <AlertCircle className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
						</div>

						<AlertDialogTitle className="text-xl font-bold tracking-tight">{pendingTarget === "FAILED" ? "Fail this case?" : "Missing Staff Assignments"}</AlertDialogTitle>

						<AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
							{pendingTarget === "FAILED"
								? "Marking this case as FAILED will halt all production workflows. This action is recorded in the Audit Trail and cannot be easily undone."
								: warningMessage}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6 gap-3! sm:gap-0!">
						<AlertDialogCancel className="rounded-xl h-10 font-semibold border-border hover:bg-secondary">Cancel</AlertDialogCancel>
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
		</>
	);
}
