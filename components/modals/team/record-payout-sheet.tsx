'use client'

import { useEffect, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
	Banknote,
	Smartphone,
	CreditCard,
	Building,
	Loader2,
	CalendarIcon,
	Coins,
	CheckCircle2,
	LucideIcon,
	AlertCircle,
	ArrowRight,
} from 'lucide-react'
import { format } from 'date-fns'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

// Schemas & Actions
import {
	RecordPayoutInput,
	RecordPayoutInputSchema,
} from '@/schema/composed/team/record-payout.schema'
import { PaymentMethod } from '@/schema/base/enums.base'
import { PendingCommissionItemDTO } from '@/schema/composed/team/payroll-ledger.dtos'
import { issueStaffPayoutAction } from '@/actions/team/finanical-ledger/issue-payout'
import { handleSafeActionError } from '@/lib/safe-action-helpers'

// --- REGIONAL PAYMENT METHODS CONFIG ---
const PAYMENT_METHODS: {
	id: PaymentMethod
	label: string
	icon: LucideIcon
	colorClass: string
}[] = [
	{
		id: 'CASH',
		label: 'Cash Payout',
		icon: Banknote,
		colorClass: 'text-emerald-500 group-hover:text-emerald-500',
	},
	{
		id: 'ZAIN_CASH',
		label: 'Zain Cash',
		icon: Smartphone,
		colorClass: 'text-rose-500 group-hover:text-rose-500',
	},
	{
		id: 'ASIA_HAWALA',
		label: 'Asia Hawala',
		icon: Smartphone,
		colorClass: 'text-amber-500 group-hover:text-amber-500',
	},
	{
		id: 'SUPER_QI',
		label: 'Super QI',
		icon: CreditCard,
		colorClass: 'text-blue-500 group-hover:text-blue-500',
	},
	{
		id: 'BANK_TRANSFER',
		label: 'Bank Transfer',
		icon: Building,
		colorClass: 'text-slate-500 dark:text-zinc-400 group-hover:text-foreground',
	},
	{
		id: 'OTHER',
		label: 'Other',
		icon: Coins,
		colorClass: 'text-muted-foreground group-hover:text-foreground',
	},
]

interface Props {
	isOpen: boolean
	onClose: () => void
	staffId: string
	staffName: string
	pendingCases: PendingCommissionItemDTO[]
}

export function RecordPayoutSheet({
	isOpen,
	onClose,
	staffId,
	staffName,
	pendingCases,
}: Props) {
	const queryClient = useQueryClient()

	// Calculate total amount in-memory based on our stable DTO
	const totalAmountDue = useMemo(() => {
		return pendingCases.reduce((sum, item) => sum + item.commissionTotal, 0)
	}, [pendingCases])

	// 1. FORM INITIALIZATION
	const form = useForm<RecordPayoutInput>({
		resolver: zodResolver(RecordPayoutInputSchema),
		defaultValues: {
			staffId: '',
			assignmentIds: [],
			method: 'CASH',
			reference: '',
			notes: '',
			paidAt: new Date(),
		},
		mode: 'onBlur',
	})

	// Reset form when opened with a new staff dataset
	useEffect(() => {
		if (isOpen && staffId) {
			form.reset({
				staffId,
				assignmentIds: pendingCases.map((c) => c.assignmentId),
				method: 'CASH',
				reference: '',
				notes: '',
				paidAt: new Date(),
			})
		}
	}, [isOpen, staffId, pendingCases, form])

	// 2. SERVER ACTION: ISSUE PAYOUT
	const { executeAsync: issuePayout, isExecuting } = useAction(
		issueStaffPayoutAction,
		{
			onSuccess: () => {
				toast.success(`Commissions paid to ${staffName.split(' ')[0]}!`)

				// INSTANT CACHE SYNC: Invalidate the payroll queries [3]
				queryClient.invalidateQueries({
					queryKey: ['staff-payroll-vitals', staffId],
				})
				queryClient.invalidateQueries({
					queryKey: ['pending-commissions', staffId],
				})
				queryClient.invalidateQueries({
					queryKey: ['staff-payout-history', staffId],
				}) // Now syncs the historical table too!

				onClose()
				form.reset()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: RecordPayoutInput) => {
		// 🔥 FIX 1: Explicitly pass the full sanitized data payload to the server action!
		await issuePayout(data)
	}

	const formatMoney = (val: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(val)

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-emerald-500/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Banknote className="w-24 h-24 text-emerald-500" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
						<Coins className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight">
						Issue commission payout
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">
						Generate payout receipt and clear the unbilled queue for{' '}
						<strong className="text-foreground">{staffName}</strong>.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					{/* RECONCILIATION SUMMARY BOX */}
					<div className="flex items-center justify-between p-4 rounded-xl border border-border bg-slate-50 dark:bg-white/2">
						<div className="flex flex-col">
							<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
								Recipient
							</span>
							<span className="text-sm font-bold text-foreground">
								{staffName}
							</span>
						</div>
						<div className="flex flex-col items-end">
							<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
								Payout Value ({pendingCases.length} Cases)
							</span>
							<span className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">
								{formatMoney(totalAmountDue)}
							</span>
						</div>
					</div>

					<form
						id="record-payout-form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						{/* 1. PAYMENT METHOD (Visual Grid) */}
						<div className="space-y-3">
							<label className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">
								Payout Method
							</label>
							<div className="grid grid-cols-2 gap-3">
								<Controller
									control={form.control}
									name="method"
									render={({ field }) => (
										<>
											{PAYMENT_METHODS.map((method) => {
												const isSelected = field.value === method.id
												return (
													<button
														key={method.id}
														type="button"
														onClick={() => field.onChange(method.id)}
														className={cn(
															'flex flex-col p-4 rounded-xl border text-left transition-all duration-300 group',
															// 🔥 FIX 2: Swapped out 'primary' (blue) for 'emerald' (green) for financial theme integration
															isSelected
																? 'bg-emerald-500/5 border-emerald-500 ring-1 ring-emerald-500/20 shadow-sm'
																: 'bg-card border-border hover:bg-slate-50 dark:hover:bg-white/2',
														)}
													>
														<div className="flex items-center justify-between w-full mb-3">
															<method.icon
																className={cn(
																	'w-5 h-5 transition-colors',
																	isSelected
																		? method.colorClass
																		: 'text-muted-foreground',
																)}
															/>
															<div
																className={cn(
																	'w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center',
																	// 🔥 FIX 2: Emerald ring
																	isSelected
																		? 'border-emerald-500 bg-emerald-500'
																		: 'border-slate-300 dark:border-zinc-700',
																)}
															>
																{isSelected && (
																	<CheckCircle2 className="w-3 h-3 text-white" />
																)}
															</div>
														</div>
														<span
															className={cn(
																'text-xs font-bold',
																isSelected
																	? 'text-foreground'
																	: 'text-muted-foreground group-hover:text-foreground',
															)}
														>
															{method.label}
														</span>
													</button>
												)
											})}
										</>
									)}
								/>
							</div>
						</div>

						{/* 2. DATE AND REFERENCE */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
							<Controller
								control={form.control}
								name="paidAt"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="Payout Date"
										nameInSchema="paidAt"
									>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														'w-full h-11 justify-start text-left font-normal rounded-xl border-border bg-card hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm',
														fieldState.invalid &&
															'border-destructive focus:ring-destructive/20',
													)}
												>
													<CalendarIcon className="mr-3 h-4 w-4 text-emerald-500" />
													<span className="text-sm font-semibold text-foreground">
														{field.value
															? format(field.value, 'MMM dd, yyyy')
															: 'Select date'}
													</span>
												</Button>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0 rounded-2xl border-border shadow-premium"
												align="start"
											>
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													autoFocus
													className="p-3"
													classNames={{
														day_selected:
															'bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white rounded-lg',
														day_today:
															'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-lg',
													}}
												/>
											</PopoverContent>
										</Popover>
									</CustomFieldWithLabel>
								)}
							/>

							<Controller
								control={form.control}
								name="reference"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="Txn / Ref Number"
										nameInSchema="reference"
										placeholder="e.g. TXN-99841"
										isOptional
									/>
								)}
							/>
						</div>

						{/* 3. NOTES */}
						<Controller
							control={form.control}
							name="notes"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel
									field={field}
									fieldState={fieldState}
									nameInSchema="notes"
									fieldTitle="Internal Notes"
									isOptional
								>
									<textarea
										{...field}
										value={field.value ?? ''}
										placeholder="e.g. Paid in cash directly at the central office."
										className="w-full min-h-20 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20 custom-scrollbar"
									/>
								</CustomFieldWithLabel>
							)}
						/>

						{/* --- 🔥 FIX 3: THE PERMANENT ACTION WARNING BADGE [3, 4] --- */}
						<div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
							<AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
							<p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
								<span className="text-rose-500 font-bold uppercase">
									Permanent Ledger Action:
								</span>
								Issuing this payout will lock these {pendingCases.length} cases
								[3], snapshot the commissions, and generate an immutable
								paycheck receipt. You cannot undo this disbursement.
							</p>
						</div>
					</form>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button
						variant="ghost"
						onClick={onClose}
						className="rounded-xl h-11! px-6 font-semibold"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting}
						form="record-payout-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-emerald-600 hover:bg-emerald-700 shadow-premium font-bold transition-all text-white shrink-0"
					>
						{isExecuting ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : (
							<>
								Disburse Payout <ArrowRight className="w-4 h-4" />
							</>
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
