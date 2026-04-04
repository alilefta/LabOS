"use client";

import { memo, useMemo, useState } from "react";
import { format, differenceInDays, startOfDay, addDays } from "date-fns";
import { CalendarIcon, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ControllerFieldState } from "react-hook-form";

interface DeadlineSelectorProps {
	value: Date;
	onChange: (date: Date | undefined) => void;
	fieldState: ControllerFieldState;
}

export const DeadlineSelector = memo(({ value, onChange, fieldState }: DeadlineSelectorProps) => {
	const [open, setOpen] = useState(false);

	// UX Intelligence: Calculate if this is a "Rush" job based on the selected date
	const isRushJob = useMemo(() => {
		if (!value) return false;
		const daysUntil = differenceInDays(startOfDay(value), startOfDay(new Date()));
		return daysUntil <= 3 && daysUntil >= 0;
	}, [value]);

	// Quick Action Handlers
	const handleQuickSelect = (daysToAdd: number) => {
		const newDate = addDays(new Date(), daysToAdd);
		onChange(newDate);
		setOpen(false);
	};

	return (
		<div className="flex flex-col gap-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Production Deadline <span className="text-destructive">*</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full h-12 justify-start text-left font-normal rounded-xl border-border bg-card px-4 transition-all shadow-sm",
							!value && "text-muted-foreground",
							open ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:bg-slate-50 dark:hover:bg-white/5",
							fieldState.invalid && "border-destructive focus:ring-destructive/20 focus:border-destructive",
						)}
					>
						<div className="flex items-center gap-3">
							<CalendarIcon className={cn("w-4 h-4", value ? "text-primary" : "text-slate-400")} />
							<span className="text-sm font-semibold">{value ? format(value, "EEEE, MMMM do, yyyy") : "Select target date..."}</span>
						</div>
					</Button>
				</PopoverTrigger>

				<PopoverContent className="w-auto p-0 rounded-2xl border-border shadow-premium overflow-hidden" align="start">
					<Calendar
						mode="single"
						selected={value}
						onSelect={(date) => {
							onChange(date);
							setOpen(false);
						}}
						disabled={(date) => date < startOfDay(new Date())} // Disable past dates
						autoFocus
						classNames={{
							day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
							day_today: "bg-accent text-accent-foreground rounded-lg",
						}}
					/>

					{/* Quick Actions Footer inside the Calendar */}
					<div className="p-3 border-t border-border bg-slate-50/80 dark:bg-white/2 flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleQuickSelect(3)}
							className="flex-1 text-[11px] font-bold h-9 rounded-lg text-amber-600 border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
						>
							<Clock className="w-3.5 h-3.5 mr-1.5" /> Rush (3 Days)
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleQuickSelect(7)}
							className="flex-1 text-[11px] font-bold h-9 rounded-lg text-primary border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors"
						>
							Standard (7 Days)
						</Button>
					</div>
				</PopoverContent>
			</Popover>

			{/* Conditional UX Feedback */}
			{fieldState.error && <span className="text-[11px] font-medium text-destructive ml-1">{fieldState.error.message}</span>}

			{isRushJob && !fieldState.error && (
				<div className="flex items-start gap-2 mt-1 px-1 animate-in fade-in slide-in-from-top-1">
					<Truck className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
					<p className="text-[10px] text-amber-600 dark:text-amber-500 font-medium leading-snug">
						<strong className="uppercase tracking-wider">Rush Priority:</strong> This deadline is within 72 hours.
					</p>
				</div>
			)}
		</div>
	);
});

DeadlineSelector.displayName = "DeadlineSelector";
