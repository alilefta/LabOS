"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format, startOfDay } from "date-fns";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// import { updateCaseDeadlineAction } from "@/actions/cases/update-case";

interface EditDeadlinePopoverProps {
	caseId: string;
	currentDeadline: Date | null;
	children: React.ReactNode;
}

export function EditDeadlinePopover({ caseId, currentDeadline, children }: EditDeadlinePopoverProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Mock action for now
	const isExecuting = false;
	const executeAsync = async ({ caseId, deadline }: any) => {
		console.log("Saving deadline", deadline);
		toast.success("Deadline updated successfully");
	};

	/*
	const { executeAsync, isExecuting } = useAction(updateCaseDeadlineAction, {
		onSuccess: () => {
			toast.success("Deadline updated successfully");
			setIsOpen(false);
		},
		onError: (error) => {
			toast.error("Failed to update deadline");
		}
	});
	*/

	const handleDateSelect = async (newDate: Date | undefined) => {
		if (!newDate) return;
		await executeAsync({ caseId, deadline: newDate });
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div className="cursor-pointer group relative rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/5 -m-2 p-2">
					{children}

					{/* Hover Indicator */}
					<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
						<div className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded">Edit</div>
					</div>

					{/* Loading Overlay */}
					{isExecuting && (
						<div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
							<Loader2 className="w-4 h-4 animate-spin text-primary" />
						</div>
					)}
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0 rounded-2xl border-border shadow-premium overflow-hidden" align="start">
				<div className="p-3 border-b border-border bg-slate-50 dark:bg-white/[0.02]">
					<h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
						<CalendarIcon className="w-3.5 h-3.5" /> Shift Production Deadline
					</h4>
				</div>
				<Calendar
					mode="single"
					selected={currentDeadline || undefined}
					onSelect={handleDateSelect}
					disabled={(date) => date < startOfDay(new Date())} // Cannot set deadlines in the past
					initialFocus
					classNames={{
						day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
						day_today: "bg-accent text-accent-foreground rounded-lg",
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
