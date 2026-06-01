'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Save, Loader2, Info, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { memo } from 'react'
import z from 'zod'

// Custom UI Components
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { Button } from '@/components/ui/button'

// Actions & Helpers
import { updateStaffScheduleAction } from '@/actions/team/staff-settings/update-staff-schedule' // Assuming your action path
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { Weekday, WeekdaySchema } from '@/schema/base/enums.base'

const UpdateStaffScheduleSchema = z.object({
	staffId: z.string().uuid(),
	workingDays: z
		.array(WeekdaySchema)
		.min(1, 'At least one working day must be selected.'),
})

type UpdateStaffScheduleInput = z.infer<typeof UpdateStaffScheduleSchema>

interface Props {
	staffId: string
	initialWorkingDays: Weekday[] // Typed strictly to the database enum
	isReadOnly: boolean
}

// UX FIX: Using 3-letter codes to eliminate Tuesday/Thursday and Sat/Sun duplicate confusion [2]
const WEEKDAYS = [
	{ id: 'MONDAY', label: 'Mon', fullName: 'Monday' },
	{ id: 'TUESDAY', label: 'Tue', fullName: 'Tuesday' },
	{ id: 'WEDNESDAY', label: 'Wed', fullName: 'Wednesday' },
	{ id: 'THURSDAY', label: 'Thu', fullName: 'Thursday' },
	{ id: 'FRIDAY', label: 'Fri', fullName: 'Friday' },
	{ id: 'SATURDAY', label: 'Sat', fullName: 'Saturday' },
	{ id: 'SUNDAY', label: 'Sun', fullName: 'Sunday' },
] as const

export const StaffScheduleCard = memo(function StaffScheduleCard({
	staffId,
	initialWorkingDays,
	isReadOnly,
}: Props) {
	// Initialize local isolated form context [3]
	const form = useForm<UpdateStaffScheduleInput>({
		resolver: zodResolver(UpdateStaffScheduleSchema),
		defaultValues: {
			staffId,
			workingDays: initialWorkingDays,
		},
		mode: 'onBlur',
	})

	const isActionDisabled = isReadOnly || form.formState.disabled

	// --- SERVER ACTION ---
	const { executeAsync: updateSchedule, isExecuting } = useAction(
		updateStaffScheduleAction,
		{
			onSuccess: ({ data }) => {
				toast.success('Operating schedule updated.')

				// FIX: Reset the form with the pristine array returned by the database [5]
				if (data?.workingDays) {
					form.reset({
						staffId,
						workingDays: data.workingDays as Weekday[],
					})
				}
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: UpdateStaffScheduleInput) => {
		await updateSchedule(data)
	}

	const isDirty = form.formState.isDirty

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300">
			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center justify-between relative z-10">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
						<Calendar className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">
							Operating Schedule
						</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
							Weekly Availability Roster
						</p>
					</div>
				</div>
				{isReadOnly && (
					<span className="px-2 py-0.5 rounded border border-border bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 shadow-sm">
						<Lock className="w-2.5 h-2.5" /> Locked
					</span>
				)}
			</div>

			{/* --- CARD BODY --- */}
			<div className="p-6 sm:p-8 flex flex-col gap-6 relative z-10">
				<form
					id={`schedule-form-${staffId}`}
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					<Controller
						control={form.control}
						name="workingDays"
						render={({ field, fieldState }) => (
							<CustomFieldWithLabel
								field={field}
								fieldState={fieldState}
								nameInSchema="workingDays"
								fieldTitle="Active Workdays"
							>
								<div className="flex flex-col gap-4">
									{/* --- THE TACTILE CALENDAR STRIP --- */}
									{/* 
                                        UX FIX: Responsive dimensions (w-10 sm:w-12) 
                                        and font sizes ensure the entire row fits beautifully on mobile 
                                    */}
									<div className="flex justify-between gap-1.5 sm:gap-2 max-w-lg w-full">
										{WEEKDAYS.map((day) => {
											const isSelected = field.value?.includes(day.id)
											return (
												<button
													key={day.id}
													type="button"
													disabled={isActionDisabled || isExecuting}
													// ACCESSIBILITY FIX: Screen Readers can now describe the button [3]
													aria-label={`${day.fullName} schedule`}
													aria-checked={isSelected}
													title={day.fullName}
													onClick={() => {
														const current = field.value || []
														const next = current.includes(day.id)
															? current.filter((d) => d !== day.id)
															: [...current, day.id]
														field.onChange(next)
													}}
													className={cn(
														'flex-1 aspect-square w-10 sm:w-12 rounded-xl border flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 transform-gpu hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
														isSelected
															? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20'
															: 'bg-card border-border text-slate-500 dark:text-zinc-400 hover:border-primary/50 hover:bg-primary/5',
														(isActionDisabled || isExecuting) &&
															'opacity-50 cursor-not-allowed',
													)}
												>
													{day.label}
												</button>
											)
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
							<span className="text-primary font-bold uppercase">
								Auto-routing Integration:
							</span>
							The LabOS case dispatcher uses this schedule to prevent assigning
							urgent restorations to technicians who are currently off-duty,
							protecting your turnaround targets.
						</p>
					</div>
				</form>
			</div>

			{/* --- CARD FOOTER: LOCAL SAVE ACTION --- */}
			<div className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 mt-auto flex justify-end shrink-0 relative z-10">
				<Button
					type="submit"
					form={`schedule-form-${staffId}`}
					disabled={!isDirty || isExecuting || isReadOnly}
					className={cn(
						'rounded-xl h-11 px-6 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2',
						isDirty && !isReadOnly
							? 'bg-primary text-primary-foreground shadow-premium hover:bg-primary/90'
							: 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed',
					)}
				>
					{isExecuting ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : isReadOnly ? (
						<Lock className="w-4 h-4 shrink-0" />
					) : (
						<Save className="w-4 h-4 shrink-0" />
					)}
					{isReadOnly ? 'Schedule Locked' : 'Save Schedule Changes'}
				</Button>
			</div>
		</div>
	)
})

StaffScheduleCard.displayName = 'StaffScheduleCard'
