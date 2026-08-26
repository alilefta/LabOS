'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Loader2, Save, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'

// Custom UI Components
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { Button } from '@/components/ui/button'

// Schemas & Actions
import { updateStaffIdentityAction } from '@/actions/team/staff-settings/update-staff-identity'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	UpdateStaffIdentityInput,
	UpdateStaffIdentityInputSchema,
} from '@/schema/composed/team/staff-settings.schema'

interface Props {
	initialData: UpdateStaffIdentityInput
	isReadOnly: boolean
}

const ROLE_OPTIONS = [
	{ id: 'TECHNICIAN', label: 'Technician' },
	{ id: 'SENIOR_TECHNICIAN', label: 'Senior Tech' },
	{ id: 'QC_INSPECTOR', label: 'QC Inspector' },
	{ id: 'COURIER', label: 'Courier' },
	{ id: 'MANAGER', label: 'Manager' },
]

export function StaffIdentityCard({ initialData, isReadOnly }: Props) {
	// Initialize the localized form strictly for this card's scope [3]
	const form = useForm<UpdateStaffIdentityInput>({
		resolver: zodResolver(UpdateStaffIdentityInputSchema),
		defaultValues: initialData,
		mode: 'onBlur',
	})

	const isActionDisabled = isReadOnly || form.formState.disabled

	// --- SERVER ACTION ---
	const { executeAsync: updateIdentity, isExecuting } = useAction(
		updateStaffIdentityAction,
		{
			onSuccess: ({ data }) => {
				toast.success('Identity profile updated successfully.')

				// FIX: Re-hydrate defaultValues with the precise DB object returned by the server [3]
				if (data?.staff) {
					form.reset(data.staff)
				}
			},
			onError: ({ error }) => {
				// If the deactivation burnout guard throws, catch and print it here
				if (error.serverError) {
					toast.error('Operation Denied', {
						description: error.serverError.message,
					})
				} else {
					handleSafeActionError(error)
				}
			},
		},
	)

	const onSubmit = async (data: UpdateStaffIdentityInput) => {
		await updateIdentity(data)
	}

	// Save button remains disabled until a change actually occurs in this card [3]
	const isDirty = form.formState.isDirty

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300">
			{/* Ambient status indicator */}
			<div
				className={cn(
					'absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 transition-colors duration-1000',
					'bg-primary',
				)}
			/>

			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center justify-between relative z-10">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
						<User className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">
							Identity & Roster Position
						</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
							Core Employment Details
						</p>
					</div>
				</div>
				{isReadOnly && (
					<span className="px-2 py-0.5 rounded border border-border bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 shadow-sm">
						<Lock className="w-2.5 h-2.5" /> Read Only
					</span>
				)}
			</div>

			{/* --- CARD BODY --- */}
			<div className="p-6 sm:p-8 flex flex-col gap-6 relative z-10">
				<form
					id={`identity-form-${initialData.staffId}`}
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					{/* Name Row */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Controller
							control={form.control}
							name="firstName"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="First Name"
									nameInSchema="firstName"
									placeholder="Elena"
									disabled={isActionDisabled || isExecuting} // FIX: Bound to isReadOnly [1]
								/>
							)}
						/>
						<Controller
							control={form.control}
							name="lastName"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="Last Name"
									nameInSchema="lastName"
									placeholder="Vance"
									disabled={isActionDisabled || isExecuting} // FIX [1]
								/>
							)}
						/>
					</div>

					{/* Phone & Job Title */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Controller
							control={form.control}
							name="phoneNumber"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="Phone Number"
									nameInSchema="phoneNumber"
									placeholder="+1 (555) 000-0000"
									disabled={isActionDisabled || isExecuting} // FIX [1]
								/>
							)}
						/>
						<Controller
							control={form.control}
							name="jobTitle"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="Internal Job Title"
									nameInSchema="jobTitle"
									placeholder="Senior Ceramist"
									isOptional
									disabled={isActionDisabled || isExecuting} // FIX [1]
								/>
							)}
						/>
					</div>

					{/* Specialization & Role Category */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Controller
							control={form.control}
							name="specialization"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="Technical Specialization"
									nameInSchema="specialization"
									placeholder="e.g., Full Arch Zirconia"
									isOptional
									disabled={isActionDisabled || isExecuting} // FIX [1]
								/>
							)}
						/>

						{/* Role Category Selector */}
						<Controller
							control={form.control}
							name="roleCategory"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel
									field={field}
									fieldState={fieldState}
									nameInSchema="roleCategory"
									fieldTitle="Roster Role Category"
								>
									<div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border w-full min-h-11">
										{ROLE_OPTIONS.map((opt) => {
											const isSelected = field.value === opt.id
											return (
												<button
													key={opt.id}
													type="button"
													id="roleCategory"
													disabled={isActionDisabled || isExecuting} // FIX [1]
													onClick={() => field.onChange(opt.id)}
													className={cn(
														'flex-1 px-3 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-tighter shrink-0',
														isSelected
															? 'bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border'
															: 'text-muted-foreground hover:text-foreground',
														(isActionDisabled || isExecuting) &&
															'opacity-50 cursor-not-allowed',
													)}
												>
													{opt.label}
												</button>
											)
										})}
									</div>
								</CustomFieldWithLabel>
							)}
						/>
					</div>

				</form>
			</div>

			{/* Save Button explicitly disabled or locked if read-only */}
			<div className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 mt-auto flex justify-end shrink-0 relative z-10">
				<Button
					type="submit"
					form={`identity-form-${initialData.staffId}`}
					disabled={!isDirty || isExecuting || isReadOnly} // FIX [1]
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
					{isReadOnly ? 'Profile Locked' : 'Save Profile Changes'}
				</Button>
			</div>
		</div>
	)
}
