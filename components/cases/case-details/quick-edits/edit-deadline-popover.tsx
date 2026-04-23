"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Loader2, Lock } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Replace with your actual action import
import { updateCaseDeadlineAction } from "@/actions/cases/update-case";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { CaseStatus } from "@/schema/base/enums.base";

interface EditDeadlinePopoverProps {
	caseId: string;
	currentDeadline: Date | null;
	status: CaseStatus;
	children: React.ReactNode;
}

export function EditDeadlinePopover({ caseId, currentDeadline, status, children }: EditDeadlinePopoverProps) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();

	// Business Logic Check: Is it historically locked?
	const isLocked = status === "COMPLETED" || status === "DELIVERED";

	const { executeAsync, isExecuting } = useAction(updateCaseDeadlineAction, {
		onSuccess: () => {
			toast.success("Production deadline updated successfully");
			// Instantly refresh the Case Dossier data so the UI reflects the new date
			queryClient.invalidateQueries({ queryKey: ["case", caseId] });
			// Also invalidate the pulse stats and list views so the dashboard updates
			queryClient.invalidateQueries({ queryKey: ["cases-list"] });
			queryClient.invalidateQueries({ queryKey: ["cases-pulse"] });
			setIsOpen(false);
		},
		onError: ({ error }) => {
			handleSafeActionError(error);
			// if (error.serverError?.code === "CASE_ALREADY_COMPLETED") {
			// 	toast.error("This case has already completed and delivered.");
			// } else {
			// 	toast.error("Failed to update deadline");
			// }
		},
	});

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (!newDate) return;
		// Don't close immediately so the user can see the loading spinner
		await executeAsync({ caseId, deadline: newDate });
		setIsOpen(false);
	};

	// If the case is locked, return the children without the Popover wrapper
	if (isLocked) {
		return (
			<div className="relative group p-2 -m-2 rounded-lg">
				{children}
				{/* Hover Indicator Overlay (Locked State) */}
				<div className="absolute top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
					<div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground bg-slate-100 dark:bg-white/5 border border-border px-1.5 py-0.5 rounded">
						<Lock className="w-3 h-3" /> Locked
					</div>
				</div>
			</div>
		);
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				{/* 
					The wrapper card. Notice `cursor-pointer` and the `outline-none`.
					We also use `group` so the child content can react to hover.
				*/}
				<div className="cursor-pointer group relative rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5 -m-2 p-2">
					{children}

					{/* Hover Indicator Overlay (Editable State) */}
					<div className="absolute top-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
						<div className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded">Edit</div>
					</div>

					{/* Active Loading Overlay */}
					{isExecuting && (
						<div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col gap-2 items-center justify-center rounded-lg z-20">
							<Loader2 className="w-5 h-5 animate-spin text-primary" />
							<span className="text-[10px] font-bold uppercase tracking-widest text-primary">Saving</span>
						</div>
					)}
				</div>
			</PopoverTrigger>

			{/* 
				w-auto ensures it wraps the Calendar perfectly. 
				z-[60] ensures it sits above any other sticky headers or floating AI bars.
			*/}
			<PopoverContent
				className=" p-0 rounded-2xl border-border shadow-2xl overflow-hidden z-60! animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
				align="center"
			>
				<div className="p-4 border-b border-border bg-slate-50/80 dark:bg-white/2 flex items-center justify-between">
					<h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
						<CalendarIcon className="w-3.5 h-3.5 text-primary" /> Shift Deadline
					</h4>
					<div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
						Current: <span className="text-foreground bg-background border border-border px-1.5 py-0.5 rounded">{currentDeadline ? format(currentDeadline, "MMM dd") : "None"}</span>
					</div>
				</div>

				<div className="p-2 relative">
					<Calendar
						mode="single"
						selected={currentDeadline || undefined}
						onSelect={handleDateSelect}
						// Disable past dates and today (assuming you can't deliver a newly shifted case today)
						disabled={(date) => date < startOfDay(new Date())}
						autoFocus
						className="pointer-events-auto"
						classNames={{
							day_selected:
								"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg shadow-sm scale-110 transition-transform",
							day_today: "bg-accent text-accent-foreground rounded-lg",
							day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors",
							head_cell: "text-muted-foreground font-bold text-[10px] uppercase tracking-widest w-9",
						}}
					/>

					{/* Soft loading overlay directly on calendar if they clicked a date */}
					{isExecuting && <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 rounded-xl" />}
				</div>

				{/* Helper Footer */}
				<div className="p-3 border-t border-border bg-slate-50/50 dark:bg-white/1 flex items-start gap-2">
					<div className="w-1 h-4 bg-amber-500 rounded-full shrink-0 mt-0.5"></div>
					<p className="text-[10px] text-muted-foreground leading-snug">
						Note: Shifting this deadline will automatically notify the assigned <strong className="text-foreground">Route Courier</strong> of the schedule change.
					</p>
				</div>
			</PopoverContent>
		</Popover>
	);
}
