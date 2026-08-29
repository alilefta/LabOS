'use client'

import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Coins,
	Loader2,
	Save,
	Percent,
	DollarSign,
	Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { memo, useMemo } from 'react'

// Custom UI Components
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { Button } from '@/components/ui/button'

// Schemas & Actions
import { updateStaffCompensationAction } from '@/actions/team/staff-settings/update-staff-compensation'
import { CommissionType } from '@/schema/base/enums.base'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	UpdateStaffCompensationInput,
	UpdateStaffCompensationInputSchema,
} from '@/schema/composed/team/staff-settings.schema'

interface Props {
	initialData: UpdateStaffCompensationInput
	isReadOnly?: boolean
}

const COMMISSION_OPTIONS = [
	{
		id: 'PERCENTAGE' as const,
		label: 'Percentage Share',
		icon: Percent,
		desc: 'Earn a cut of case revenue',
	},
	{
		id: 'FIXED' as const,
		label: 'Fixed Fee',
		icon: DollarSign,
		desc: 'Earn a flat rate per case',
	},
]

export const StaffCompensationCard = memo(function StaffCompensationCard({
	initialData,
	isReadOnly = false,
}: Props) {
	// Initialize the localized form strictly for this card's financial scope [3]
	const form = useForm<UpdateStaffCompensationInput>({
		resolver: zodResolver(UpdateStaffCompensationInputSchema),
		defaultValues: initialData,
		mode: 'onBlur',
	})

	// Watch the selected commission type to dynamically drive the UX math
	const selectedType = useWatch({
		control: form.control,
		name: 'commissionType',
	})
	const commissionVal = useWatch({
		control: form.control,
		name: 'commissionValue',
	})

	// --- FIX 1: RUNTIME CRASH PROTECTION (NaN Guard) ---
	// Safely parse and format the numeric preview to prevent page crashes when input is cleared
	const formattedCommission = useMemo(() => {
		const numVal = Number(commissionVal)
		if (isNaN(numVal) || !commissionVal) return '0.00'
		return numVal.toFixed(2)
	}, [commissionVal])

	// --- SERVER ACTION ---
	const { executeAsync: updateCompensation, isExecuting } = useAction(
		updateStaffCompensationAction,
		{
			onSuccess: ({ data }) => {
				toast.success('Compensation parameters updated in ledger.')

				// Re-hydrate the form defaults from the server's clean returned DTO
				if (data?.payoutBasis) {
					form.reset({
						staffId: initialData.staffId,
						commissionType: data.payoutBasis.commissionType as CommissionType,
						commissionValue: data.payoutBasis.commissionValue,
					})
				}
			},
			onError: ({ error }) => {
				if (error.serverError) {
					toast.error('Access Denied', {
						description: error.serverError.message,
					})
				} else {
					handleSafeActionError(error)
				}
			},
		},
	)

	const onSubmit = async (data: UpdateStaffCompensationInput) => {
		if (!isReadOnly) await updateCompensation(data)
	}

	const isDirty = form.formState.isDirty

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300 border-emerald-500/10 bg-emerald-500/1">
			{/* Ambient Emerald Glow (Financial Context) */}
			<div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-1000" />

			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center gap-3 relative z-10">
				<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-500/20">
					<Coins className="w-4 h-4" />
				</div>
				<div>
					<h3 className="text-sm font-bold text-foreground">
						Compensation & Commissions
					</h3>
					<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
						Default Payroll Settings
					</p>
				</div>
			</div>

			{/* --- CARD BODY --- */}
			<div className="p-6 sm:p-8 flex flex-col gap-6 relative z-10">
				<form
					id={`compensation-form-${initialData.staffId}`}
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6"
				>
					{/* Commission Type Segmented Toggle */}
					<div className="flex flex-col gap-3">
						<label
							htmlFor="commissionType"
							className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300"
						>
							Commission model
						</label>
						<Controller
							control={form.control}
							name="commissionType"
							render={({ field }) => (
								/* ACCESSIBILITY FIX: Wrapped in semantic role="radiogroup" */
								<div
									role="radiogroup"
									aria-label="Staff compensation models"
									className="grid grid-cols-1 sm:grid-cols-2 gap-3"
								>
									{COMMISSION_OPTIONS.map((opt) => {
										const isSelected = field.value === opt.id
										return (
											<button
												key={opt.id}
												type="button"
												id="commissionType"
												role="radio" // ACCESSIBILITY FIX
												aria-checked={isSelected} // ACCESSIBILITY FIX
									disabled={isExecuting || isReadOnly}
												onClick={() => {
													field.onChange(opt.id)
													form.setValue('commissionValue', 0, {
														shouldDirty: true,
													}) // Reset value safely
												}}
												className={cn(
													'flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
													isSelected
														? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm'
														: 'border-border bg-card hover:border-slate-300 dark:hover:border-white/10',
									(isExecuting || isReadOnly) && 'opacity-50 cursor-not-allowed',
												)}
											>
												<div
													className={cn(
														'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
														isSelected
															? 'bg-white dark:bg-[#121214] text-emerald-500 border border-emerald-500/20 shadow-sm'
															: 'bg-slate-100 dark:bg-white/5 text-muted-foreground',
													)}
												>
													<opt.icon className="w-4 h-4" />
												</div>
												<div className="flex flex-col">
													<span
														className={cn(
															'text-xs font-bold leading-tight mb-0.5',
															isSelected
																? 'text-foreground'
																: 'text-muted-foreground',
														)}
													>
														{opt.label}
													</span>
													<span className="text-[10px] text-muted-foreground font-medium">
														{opt.desc}
													</span>
												</div>
											</button>
										)
									})}
								</div>
							)}
						/>
					</div>

					{/* Commission Value Input */}
					<Controller
						control={form.control}
						name="commissionValue"
						render={({ field, fieldState }) => (
							<InputWithLabel
								type="number"
								field={field}
								fieldState={fieldState}
								disabled={isExecuting || isReadOnly}
								fieldTitle={
									selectedType === 'PERCENTAGE'
										? 'Commission Percentage (%)'
										: 'Flat Fee Per Unit ($)'
								}
								nameInSchema="commissionValue"
								placeholder="0.00"
								inputClassName="font-mono text-emerald-600 dark:text-emerald-400 font-bold focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
							/>
						)}
					/>

					{/* --- THE UX MAGIC: Real-time math calculation --- */}
					<div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
						<Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
						<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
							<span className="text-emerald-500 font-bold uppercase">
								Payroll Preview:
							</span>{' '}
							{selectedType === 'PERCENTAGE' ? (
								<>
									This employee will earn{' '}
									<strong className="text-foreground">
										{commissionVal || '0'}%
									</strong>{' '}
									of the grand total of any cases completed on their bench.
								</>
							) : (
								<>
									This employee will earn a flat fee of{' '}
									<strong className="text-foreground font-mono">
										${formattedCommission}
									</strong>{' '}
									for every case completed on their bench.
								</>
							)}
						</p>
					</div>
				</form>
			</div>

			{/* --- CARD FOOTER: LOCAL SAVE ACTION --- */}
			<div className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 mt-auto flex justify-end shrink-0 relative z-10">
				<Button
					type="submit"
					form={`compensation-form-${initialData.staffId}`}
					disabled={!isDirty || isExecuting || isReadOnly}
					className={cn(
						'rounded-xl h-11 px-6 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2',
						isDirty
							? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-premium shadow-emerald-500/20'
							: 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed',
					)}
				>
					{isExecuting ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Save className="w-4 h-4 shrink-0" />
					)}
					{isReadOnly ? 'Read-only compensation' : 'Save Ledger Changes'}
				</Button>
			</div>
		</div>
	)
})

StaffCompensationCard.displayName = 'StaffCompensationCard'
