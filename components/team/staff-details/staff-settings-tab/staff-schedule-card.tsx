"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Save, Loader2, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import z from "zod";

// Custom UI Components
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Button } from "@/components/ui/button";

// ── 1. LOCAL SCHEMA VALIDATION ──────────────────────────────────────────────
const UpdateStaffScheduleSchema = z.object({
	staffId: z.string().uuid(),
	workingDays: z.array(z.string()).min(1, "At least one working day must be selected."),
});

type UpdateStaffScheduleInput = z.infer<typeof UpdateStaffScheduleSchema>;

interface Props {
	staffId: string;
	initialWorkingDays: string[]; // e.g. ["MONDAY", "TUESDAY", ...]
}

const WEEKDAYS = [
	{ id: "MONDAY", label: "M", fullName: "Monday" },
	{ id: "TUESDAY", label: "T", fullName: "Tuesday" },
	{ id: "WEDNESDAY", label: "W", fullName: "Wednesday" },
	{ id: "THURSDAY", label: "T", fullName: "Thursday" },
	{ id: "FRIDAY", label: "F", fullName: "Friday" },
	{ id: "SATURDAY", label: "S", fullName: "Saturday" },
	{ id: "SUNDAY", label: "S", fullName: "Sunday" },
];

export function StaffScheduleCard({ staffId, initialWorkingDays }: Props) {
	// Initialize local isolated form context [3]
	const form = useForm<UpdateStaffScheduleInput>({
		resolver: zodResolver(UpdateStaffScheduleSchema),
		defaultValues: {
			staffId,
			workingDays: initialWorkingDays,
		},
		mode: "onBlur",
	});

	// --- SERVER ACTION ---
	// const { executeAsync: updateSchedule, isExecuting } = useAction(updateStaffScheduleAction, {
	// 	onSuccess: () => {
	// 		toast.success("Operating schedule updated.");
	// 		form.reset(form.getValues()); // Reset isDirty state
	// 	}
	// });
	const isExecuting = false;

	const onSubmit = async (data: UpdateStaffScheduleInput) => {
		console.log("Saving schedule to DB:", data);
		// await updateSchedule(data);
	};

	const isDirty = form.formState.isDirty;

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300">
			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3 relative z-10">
				<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
					<Calendar className="w-4 h-4" />
				</div>
				<div>
					<h3 className="text-sm font-bold text-foreground">Operating Schedule</h3>
					<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Weekly Availability Roster</p>
				</div>
			</div>

			{/* --- CARD BODY --- */}
			<div className="p-6 sm:p-8 space-y-6 relative z-10">
				<form id={`schedule-form-${staffId}`} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<Controller
						control={form.control}
						name="workingDays"
						render={({ field, fieldState }) => (
							<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="workingDays" fieldTitle="Active Workdays">
								<div className="flex flex-col gap-4">
									{/* --- THE TACTILE CALENDAR STRIP --- */}
									<div className="flex justify-between gap-1.5 sm:gap-2 max-w-lg w-full">
										{WEEKDAYS.map((day) => {
											const isSelected = field.value?.includes(day.id);
											return (
												<button
													key={day.id}
													type="button"
													title={day.fullName}
													onClick={() => {
														const current = field.value || [];
														const next = current.includes(day.id) ? current.filter((d) => d !== day.id) : [...current, day.id];
														field.onChange(next);
													}}
													className={cn(
														"flex-1 aspect-square max-w-12 rounded-xl border flex items-center justify-center font-bold text-sm transition-all duration-300 transform-gpu hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
														isSelected
															? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20"
															: "bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5",
													)}
												>
													{day.label}
												</button>
											);
										})}
									</div>
								</div>
							</CustomFieldWithLabel>
						)}
					/>

					{/* AI Automation Notice */}
					<div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-3 items-start animate-in fade-in duration-500">
						<Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
						<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
							<span className="text-primary font-bold uppercase">Auto-routing Integration:</span>
							The LabOS case dispatcher uses this schedule to prevent assigning urgent restorations to technicians who are currently off-duty, protecting your turnaround targets.
						</p>
					</div>
				</form>
			</div>

			{/* --- CARD FOOTER: LOCAL SAVE ACTION --- */}
			<div className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 mt-auto flex justify-end shrink-0 relative z-10">
				<Button
					type="submit"
					form={`schedule-form-${staffId}`}
					disabled={!isDirty || isExecuting}
					className={cn(
						"rounded-xl h-11 px-6 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2",
						isDirty ? "bg-primary text-primary-foreground shadow-premium hover:bg-primary/90" : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed",
					)}
				>
					{isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 shrink-0" />}
					Save Schedule Changes
				</Button>
			</div>
		</div>
	);
}
