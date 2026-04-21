"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2, Activity, PackageCheck, Truck, AlertCircle, User, LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

import { CaseStatus } from "@/schema/base/enums.base";
import { updateCaseStatusAction } from "@/actions/cases/update-case";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

interface Props {
	caseId: string;
	currentStatus: CaseStatus;
}

// 1. Replicate the valid transitions on the client for UI rendering
const VALID_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
	DRAFT: ["NEW"],
	NEW: ["ASSIGNED", "PROCESSING", "FAILED"],
	ASSIGNED: ["PROCESSING", "FAILED"],
	PROCESSING: ["COMPLETED", "FAILED"],
	COMPLETED: ["DELIVERED"],
	DELIVERED: [],
	FAILED: [],
};

// 2. Map Statuses to beautiful human-readable actions and icons
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

export function AdvanceStatusButton({ caseId, currentStatus }: Props) {
	const router = useRouter();
	const allowedNext = VALID_TRANSITIONS[currentStatus] || [];

	// State to intercept Destructive "FAILED" transitions
	const [pendingFailure, setPendingFailure] = useState(false);

	// Uncomment once your action is imported
	const { executeAsync: updateStatus, isExecuting } = useAction(updateCaseStatusAction, {
		onSuccess: () => {
			toast.success("Case status updated.");
			router.refresh(); // Tells Next.js to re-fetch the Server Component!
		},
		onError: ({ error }) => {
			handleSafeActionError(error);
			// toast.error(error.serverError || "Failed to update case status.");
		},
	});

	const handleStatusChange = async (newStatus: CaseStatus) => {
		if (newStatus === "FAILED") {
			setPendingFailure(true);
			return;
		}

		await executeStatusChange(newStatus);
	};

	const executeStatusChange = async (newStatus: CaseStatus) => {
		try {
			await updateStatus({ caseId, newStatus });

			// --- MOCK EXECUTION FOR NOW ---
			toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
				loading: "Updating status...",
				success: "Case status updated.",
				error: "Failed to update status.",
			});
			router.refresh();
		} finally {
			setPendingFailure(false);
		}
	};

	// If the case is at the end of its lifecycle, hide the button
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
								onClick={() => handleStatusChange(status)}
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

			{/* Destructive Action Guard */}
			<AlertDialog open={pendingFailure} onOpenChange={setPendingFailure}>
				<AlertDialogContent className="rounded-2xl border-border shadow-premium dark:bg-[#121214]">
					<AlertDialogHeader>
						<div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 border border-destructive/20">
							<AlertCircle className="w-6 h-6 text-destructive" />
						</div>
						<AlertDialogTitle className="text-xl font-bold tracking-tight">Fail this case?</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
							Marking this case as <strong className="text-destructive font-mono">FAILED</strong> will halt all production workflows. This action is recorded in the Audit Trail and
							cannot be easily undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6 gap-3 sm:gap-0">
						<AlertDialogCancel className="rounded-xl h-10 font-semibold border-border hover:bg-secondary">Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => executeStatusChange("FAILED")}
							className="rounded-xl h-10 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold shadow-sm"
						>
							Yes, Fail Case
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
