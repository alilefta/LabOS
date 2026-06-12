'use client'

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, Controller, FormProvider, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Loader2,
	Wallet,
	DollarSign,
	Calculator,
	Info,
	PencilLine,
	Plus,
	Check,
	Package,
	Globe,
	Building2,
	Lock,
} from 'lucide-react'
import { toast } from 'sonner'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { cn } from '@/lib/utils'

import {
	CreateCaseItemPricingPlanInput,
	CreateCaseItemPricingPlanInputSchema,
	UpdateCaseItemPricingPlanInput,
} from '@/schema/composed/case-pricing-plan.details'
import { PricingStrategy } from '@/schema/base/enums.base'
import { handleSafeActionError } from '@/lib/safe-action-helpers'

// Assume these actions exist:
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { createPricingPlanAction } from '@/actions/case-item-pricing-plans/create-plan'
import { updatePricingPlanAction } from '@/actions/case-item-pricing-plans/update-plan'
import { getPricingPlanByIdAction } from '@/actions/case-item-pricing-plans/get-plans'
import { ProductSelector } from '@/components/work-categories/products/product-selector'
import { ClinicSelector } from '@/components/cases/case/case-inputs/clinic-selector'

interface Props {
	isOpen: boolean
	onClose: () => void
	clinicId?: string
	clinicName?: string
	planIdToEdit: string | null
	isEdit: boolean
	activeProductId?: string
	onSuccess?: () => void
}

export const PricingPlanEditorSheet = memo(function PricingPlanEditorSheet({
	isOpen,
	onClose,
	clinicId,
	clinicName,
	planIdToEdit,
	isEdit = false,
	activeProductId,
	onSuccess,
}: Props) {
	const queryClient = useQueryClient()
	const [showCustomBulkCap, setShowCustomBulkCap] = useState(false)

	// Contextual Scope initialization [1]
	const [pricingScope, setPricingScope] = useState<'GENERAL' | 'CUSTOM_CLINIC'>(
		clinicId ? 'CUSTOM_CLINIC' : 'GENERAL',
	)

	// ── 1. FORM SETUP ─────────────────────────────────────────────────────────
	const form = useForm<CreateCaseItemPricingPlanInput>({
		resolver: zodResolver(CreateCaseItemPricingPlanInputSchema),
		defaultValues: {
			name: '',
			pricingStrategy: 'PERTOOTH',
			productId: activeProductId || '',
			clinicId: clinicId ?? undefined, // If null, it's a general plan! [1]
			isDefault: !clinicId, // General plans can be default, clinic deals cannot [10]
		},
		mode: 'onBlur',
	})

	const selectedStrategy = useWatch({
		control: form.control,
		name: 'pricingStrategy',
	})
	const selectedClinicId = useWatch({ control: form.control, name: 'clinicId' })

	// ── 2. HYDRATION (EDIT MODE) ──────────────────────────────────────────────
	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ['pricing-plan-details', planIdToEdit],
		queryFn: async () => {
			if (!planIdToEdit) return null
			const res = await getPricingPlanByIdAction({ planId: planIdToEdit })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return null
			}
			return res.data?.plan ?? null
		},
		enabled: isOpen && isEdit,
		staleTime: 0,
	})

	// Sync local states when opened/hydrated
	useEffect(() => {
		if (isOpen) {
			if (isEdit && initialData) {
				setPricingScope(initialData.clinicId ? 'CUSTOM_CLINIC' : 'GENERAL')
				form.reset({
					name: initialData.name || '',
					pricingStrategy: initialData.pricingStrategy as PricingStrategy,
					productId: activeProductId,
					clinicId: initialData.clinicId ?? undefined,
					isDefault: initialData.isDefault || false,
					firstToothPrice: initialData.firstToothPrice
						? Number(initialData.firstToothPrice)
						: undefined,
					additionalToothPrice: initialData.additionalToothPrice
						? Number(initialData.additionalToothPrice)
						: undefined,
					bulkPrice: initialData.bulkPrice
						? Number(initialData.bulkPrice)
						: undefined,
					teethCountToApplyBulkPrice: initialData.teethCountToApplyBulkPrice
						? Number(initialData.teethCountToApplyBulkPrice)
						: undefined,
					toothPrice: initialData.toothPrice
						? Number(initialData.toothPrice)
						: undefined,
				})
				if (initialData.pricingStrategy === 'CUSTOM' && initialData.bulkPrice) {
					setShowCustomBulkCap(true)
				}
			} else if (!isEdit) {
				// Create Mode: Reset to incoming context
				setPricingScope(clinicId ? 'CUSTOM_CLINIC' : 'GENERAL')
				form.reset({
					clinicId: clinicId ?? undefined,
					isDefault: !clinicId,
					pricingStrategy: 'PERTOOTH',
					name: '',
					productId: activeProductId,
				})
				setShowCustomBulkCap(false)
			}
		}
	}, [isOpen, isEdit, initialData, form, clinicId, activeProductId])

	// ── 3. HANDLERS & ACTIONS (MEMOIZED FOR 120 FPS) ──────────────────────────
	const handleStrategyChange = useCallback(
		(strategy: PricingStrategy) => {
			if (isEdit) return // 🔥 SECURITY SHIELD: Prevent changing the strategy of an active plan

			form.setValue('pricingStrategy', strategy, {
				shouldValidate: true,
				shouldDirty: true,
			})
			// Wipe old pricing data so we don't submit ghost values triggering Zod issues
			form.setValue('firstToothPrice', undefined)
			form.setValue('additionalToothPrice', undefined)
			form.setValue('bulkPrice', undefined)
			form.setValue('teethCountToApplyBulkPrice', undefined)
			form.setValue('toothPrice', undefined)
			setShowCustomBulkCap(false)
			form.clearErrors()
		},
		[form, isEdit],
	)

	const handleCheckedChange = useCallback((checked: boolean) => {
		setTimeout(() => {
			setShowCustomBulkCap(checked)
		}, 0)
	}, [])

	const { executeAsync: createPlan, isExecuting: isCreating } = useAction(
		createPricingPlanAction,
		{
			onSuccess: () => {
				toast.success('Custom rate established.')
				queryClient.invalidateQueries({
					queryKey: ['catalog-pricing-plans', activeProductId],
				})
				if (onSuccess) {
					onSuccess()
				}

				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const { executeAsync: updatePlan, isExecuting: isUpdating } = useAction(
		updatePricingPlanAction,
		{
			onSuccess: () => {
				toast.success('Pricing plan updated successfully.')

				// Invalidate the active product's plans list (triggers the ledger grid to refetch)
				queryClient.invalidateQueries({
					queryKey: ['catalog-pricing-plans', activeProductId],
				})

				// If it was a clinic deal, also invalidate the clinic-specific ledger query
				if (clinicId) {
					queryClient.invalidateQueries({
						queryKey: ['clinic-pricing', clinicId],
					})
				}
				if (onSuccess) {
					onSuccess()
				}
				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = useCallback(
		async (data: CreateCaseItemPricingPlanInput) => {
			const sanitizedData = {
				...data,
				clinicId: pricingScope === 'GENERAL' ? undefined : data.clinicId,
				isDefault: pricingScope === 'GENERAL' ? data.isDefault : false,
			}

			if (isEdit && planIdToEdit) {
				await updatePlan({
					...sanitizedData,
					planId: planIdToEdit,
				} as UpdateCaseItemPricingPlanInput)
			} else {
				await createPlan(sanitizedData)
			}
		},
		[isEdit, planIdToEdit, pricingScope, createPlan, updatePlan],
	)

	const isProcessing = isCreating || isUpdating

	// Is the clinical scope configured?
	// If custom clinic scope is active, they MUST have a clinicId selected to proceed
	const isScopeConfigured = useMemo(() => {
		return (
			pricingScope === 'GENERAL' ||
			(pricingScope === 'CUSTOM_CLINIC' && !!selectedClinicId)
		)
	}, [pricingScope, selectedClinicId])

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-emerald-500/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Calculator className="w-24 h-24 text-emerald-500" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
						{isEdit ? (
							<PencilLine className="w-6 h-6" />
						) : (
							<Wallet className="w-6 h-6" />
						)}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
						{isEdit ? 'Edit Custom Rate' : 'Negotiate Custom Rate'}
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						{isEdit ? (
							<>Edit the pricing parameters for this plan.</>
						) : clinicId && clinicName ? (
							<>
								Negotiate a custom pricing override locked specifically to{' '}
								<span className="font-bold text-foreground">{clinicName}</span>.
							</>
						) : (
							<>
								Establish a general catalog rate available to any clinic in your
								network.
							</>
						)}
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* SKELETON OVERLAY (Pulsing while Hydrating in Edit Mode) */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 flex flex-col gap-8 animate-pulse">
							<div className="h-24 w-full rounded-2xl bg-emerald-500/5" />
							<div className="flex flex-col gap-4">
								<div className="h-10 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
								<div className="h-28 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
							</div>
						</div>
					)}

					<div
						className={cn(
							'transition-opacity duration-500 flex flex-col gap-8',
							isFetchingDetails ? 'opacity-0' : 'opacity-100',
						)}
					>
						<FormProvider {...form}>
							<form
								id="pricing-editor-form"
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col gap-8"
							>
								{/* SECTION 1: Product Selection & Identity */}
								<div className="flex flex-col gap-6">
									<div className="flex items-center gap-2 mb-2">
										<Package className="w-4 h-4 text-emerald-500" />
										<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
											Target Product
										</h4>
									</div>

									{/* Reusing your standard combobox approach here */}
									<Controller
										control={form.control}
										name="productId"
										render={({ field, fieldState }) => (
											<CustomFieldWithLabel
												field={field}
												fieldState={fieldState}
												nameInSchema="productId"
												fieldTitle="Catalog Item"
											>
												{/* Assuming you have a basic product dropdown built */}
												<ProductSelector
													value={field.value}
													onSelect={field.onChange}
													disabled={isEdit} // Prevent changing the product on an existing plan
												/>
											</CustomFieldWithLabel>
										)}
									/>

									<Controller
										control={form.control}
										name="name"
										render={({ field, fieldState }) => (
											<InputWithLabel
												field={field}
												fieldState={fieldState}
												fieldTitle="Internal Plan Name"
												nameInSchema="name"
												placeholder="e.g. Apex Special Zirconia Rate"
											/>
										)}
									/>
								</div>

								{/* SECTION 2: Pricing Scope Selector */}
								<div className="flex flex-col gap-3 pt-6 border-t border-border">
									<label className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">
										Pricing Scope
									</label>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{/* Standard Rate Button */}
										<button
											type="button"
											disabled={isEdit}
											onClick={() => {
												setPricingScope('GENERAL')
												form.setValue('clinicId', undefined)
												form.setValue('isDefault', true)
											}}
											className={cn(
												'flex flex-col p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden',
												pricingScope === 'GENERAL'
													? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm'
													: 'border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10',
												isEdit && 'opacity-50 cursor-not-allowed',
											)}
										>
											<Globe
												className={cn(
													'w-5 h-5 mb-2',
													pricingScope === 'GENERAL'
														? 'text-emerald-500'
														: 'text-muted-foreground',
												)}
											/>
											<span
												className={cn(
													'text-sm font-bold mb-1',
													pricingScope === 'GENERAL'
														? 'text-emerald-600 dark:text-emerald-500'
														: 'text-foreground',
												)}
											>
												Standard Rate
											</span>
											<span className="text-[10px] text-muted-foreground leading-snug">
												Available to all clinics in your lab.
											</span>
										</button>

										{/* Custom Deal Button */}
										<button
											type="button"
											disabled={isEdit}
											onClick={() => {
												setPricingScope('CUSTOM_CLINIC')
												form.setValue('isDefault', false)
											}}
											className={cn(
												'flex flex-col p-4 rounded-xl border text-left transition-all duration-200 relative overflow-hidden',
												pricingScope === 'CUSTOM_CLINIC'
													? 'border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm'
													: 'border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10',
												isEdit && 'opacity-50 cursor-not-allowed',
											)}
										>
											<Building2
												className={cn(
													'w-5 h-5 mb-2',
													pricingScope === 'CUSTOM_CLINIC'
														? 'text-emerald-500'
														: 'text-muted-foreground',
												)}
											/>
											<span
												className={cn(
													'text-sm font-bold mb-1',
													pricingScope === 'CUSTOM_CLINIC'
														? 'text-emerald-600 dark:text-emerald-500'
														: 'text-foreground',
												)}
											>
												Custom Deal
											</span>
											<span className="text-[10px] text-muted-foreground leading-snug">
												Locked exclusively to a single clinic partner.
											</span>
										</button>
									</div>
								</div>

								{/* SECTION 3: Integrated Clinic Selector (Progressive Disclosure) */}
								{pricingScope === 'CUSTOM_CLINIC' && (
									<div className="flex flex-col gap-4 pt-6 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
										<div className="flex items-center gap-2 mb-2">
											<Building2 className="w-4 h-4 text-emerald-500" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
												Target Clinic
											</h4>
										</div>

										{clinicId && clinicName ? (
											/* --- THE LOCKED GLASS CARD (If pre-filled) --- */
											<div className="w-full h-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 flex items-center justify-between shadow-sm">
												<div className="flex items-center gap-3">
													<Building2 className="w-4 h-4 text-emerald-500" />
													<span className="text-sm font-bold text-foreground">
														Clinic: {clinicName}
													</span>
												</div>
												<div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-white dark:bg-[#121214] border border-emerald-500/10 px-2 py-0.5 rounded shadow-sm">
													<Lock className="w-3.5 h-3.5 mr-1" /> Locked Context
												</div>
											</div>
										) : (
											/* --- THE ACTIVE COMBOBOX (If global add) --- */
											<Controller
												control={form.control}
												name="clinicId"
												render={({ field, fieldState }) => (
													<CustomFieldWithLabel
														field={field}
														fieldState={fieldState}
														nameInSchema="clinicId"
														fieldTitle="Clinic Partner"
													>
														<ClinicSelector
															value={field.value}
															onSelect={field.onChange}
															onCreateNew={() =>
																console.log('Open Clinic Sheet')
															}
															newCreatedClinic={null}
															fieldError={fieldState.error}
															mode={isEdit ? 'edit' : 'create'}
														/>
													</CustomFieldWithLabel>
												)}
											/>
										)}
									</div>
								)}

								{/* --- 4. THE GENERAL DEFAULT TOGGLE (Only if General Scope) --- */}
								{pricingScope === 'GENERAL' && (
									<div className="pt-2 animate-in fade-in duration-300">
										<div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border shadow-sm">
											<div className="flex flex-col gap-0.5 pr-4">
												<span className="text-[13px] font-bold text-foreground">
													Set as Catalog Default
												</span>
												<span className="text-[10px] text-muted-foreground leading-snug">
													If enabled, this rate applies automatically to all
													clinics without custom contracts.
												</span>
											</div>
											<Controller
												control={form.control}
												name="isDefault"
												render={({ field }) => (
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
														className="data-[state=checked]:bg-emerald-500 shrink-0"
													/>
												)}
											/>
										</div>
									</div>
								)}

								{/* --- 5. FINANCIAL PARAMETERS (PROGRESSIVE REVEAL) --- */}
								{/* FIX: Removed duplicate pt-6 border-t classes here to resolve the double-border visual bug */}
								{isScopeConfigured && (
									<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
										{/* Strategy Selector */}
										<div className="flex flex-col gap-4">
											<div className="flex items-center gap-2 mb-2">
												<Calculator className="w-4 h-4 text-emerald-500" />
												<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
													Billing Strategy
												</h4>
											</div>

											<Controller
												control={form.control}
												name="pricingStrategy"
												render={({ field }) => (
													<div className="grid grid-cols-1 gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border">
														{[
															{
																id: 'PERTOOTH',
																label: 'Strict Per-Unit',
																sub: 'Standard multiplication by tooth count.',
															},
															{
																id: 'BULK',
																label: 'Flat Rate / Arch',
																sub: 'Single fee regardless of unit count.',
															},
															{
																id: 'CUSTOM',
																label: 'Tiered & Hybrid',
																sub: 'Scaled pricing with optional volume caps.',
															},
														].map((strategy) => (
															<button
																key={strategy.id}
																type="button"
																disabled={isEdit} // 🔥 FINANCIAL SAFETY: Disable strategy swaps in edit mode
																onClick={() =>
																	handleStrategyChange(
																		strategy.id as PricingStrategy,
																	)
																}
																className={cn(
																	'flex flex-col p-3 rounded-lg text-left transition-all',
																	field.value === strategy.id
																		? 'bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-border'
																		: 'text-muted-foreground hover:bg-white/50 dark:hover:bg-white/2',
																	isEdit && 'opacity-50 cursor-not-allowed',
																)}
															>
																<span className="text-sm font-bold">
																	{strategy.label}
																</span>
																<span className="text-[10px] opacity-80 leading-snug">
																	{strategy.sub}
																</span>
															</button>
														))}
													</div>
												)}
											/>
										</div>

										{/* Inputs Area */}
										<div className="p-6 rounded-2xl bg-emerald-500/3 border border-emerald-500/10 flex flex-col gap-6">
											<div className="flex items-center gap-2 pb-3 border-b border-border/50">
												<DollarSign className="w-4 h-4 text-emerald-500" />
												<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
													Financial Parameters
												</h4>
											</div>

											{/* SCENARIO 1: STRICT PER TOOTH */}
											{selectedStrategy === 'PERTOOTH' && (
												<Controller
													control={form.control}
													name="toothPrice"
													render={({ field, fieldState }) => (
														<InputWithLabel
															type="number"
															field={field}
															fieldState={fieldState}
															fieldTitle="Price Per Unit ($)"
															nameInSchema="toothPrice"
															placeholder="e.g. 140.00"
														/>
													)}
												/>
											)}

											{/* SCENARIO 2: PURE BULK / FLAT RATE */}
											{selectedStrategy === 'BULK' && (
												<div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
													<Controller
														control={form.control}
														name="bulkPrice"
														render={({ field, fieldState }) => (
															<InputWithLabel
																type="number"
																field={field}
																fieldState={fieldState}
																fieldTitle="Flat Arch/Case Price ($)"
																nameInSchema="bulkPrice"
																placeholder="e.g. 500.00"
															/>
														)}
													/>
													<p className="text-[10px] font-medium text-muted-foreground flex items-start gap-1.5 ml-1 mt-1.5">
														<Info className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
														This single price will be billed regardless of how
														many teeth the clinician maps.
													</p>
												</div>
											)}

											{/* SCENARIO 3: CUSTOM / HYBRID */}
											{selectedStrategy === 'CUSTOM' && (
												<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
													<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
														<Controller
															control={form.control}
															name="firstToothPrice"
															render={({ field, fieldState }) => (
																<InputWithLabel
																	type="number"
																	field={field}
																	fieldState={fieldState}
																	fieldTitle="First Unit Price ($)"
																	nameInSchema="firstToothPrice"
																	placeholder="e.g. 185.00"
																/>
															)}
														/>
														<Controller
															control={form.control}
															name="additionalToothPrice"
															render={({ field, fieldState }) => (
																<InputWithLabel
																	type="number"
																	field={field}
																	fieldState={fieldState}
																	// 🔥 UX COPYWRITING FIX: Replaced cryptic "Additional" with clear text
																	fieldTitle="Additional Unit Price ($)"
																	nameInSchema="additionalToothPrice"
																	placeholder="e.g. 140.00"
																/>
															)}
														/>
													</div>

													{/* The Hybrid Bulk Cap Toggle */}
													<div className="pt-2">
														<div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-white/2 border border-border shadow-sm">
															<div className="flex flex-col gap-0.5 pr-4">
																<span className="text-[13px] font-bold text-foreground">
																	Enable Volume Cap
																</span>
																<span className="text-[10px] text-muted-foreground leading-snug">
																	If the case exceeds a certain number of units,
																	cap the price at a flat fee.
																</span>
															</div>
															<Switch
																checked={showCustomBulkCap}
																onCheckedChange={handleCheckedChange}
																className="data-[state=checked]:bg-emerald-500 shrink-0"
																disabled={isEdit} // Locked in Edit mode for financial safety
															/>
														</div>
													</div>

													{/* Revealed Bulk Fields for Custom */}
													{showCustomBulkCap && (
														<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
															<Controller
																control={form.control}
																name="bulkPrice"
																render={({ field, fieldState }) => (
																	<InputWithLabel
																		type="number"
																		field={field}
																		fieldState={fieldState}
																		fieldTitle="Flat Cap Price ($)"
																		nameInSchema="bulkPrice"
																		placeholder="e.g. 900.00"
																		containerClassName="justify-between"
																	/>
																)}
															/>
															<Controller
																control={form.control}
																name="teethCountToApplyBulkPrice"
																render={({ field, fieldState }) => (
																	<InputWithLabel
																		type="number"
																		field={field}
																		fieldState={fieldState}
																		// 🔥 UX COPYWRITING FIX: Replaced cryptic "Trigger Cap After (Units)" with clear instructions
																		fieldTitle="Trigger Cap After (Teeth)"
																		nameInSchema="teethCountToApplyBulkPrice"
																		placeholder="e.g. 5"
																		containerClassName="justify-between"
																	/>
																)}
															/>
														</div>
													)}
												</div>
											)}
										</div>
									</div>
								)}

								{/* Root Error Display */}
								{form.formState.errors.root && (
									<div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm flex items-center gap-2">
										<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
										{form.formState.errors.root.message}
									</div>
								)}
							</form>
						</FormProvider>
					</div>
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
						disabled={
							// 🔥 THE FIX: Explicitly include `!isScopeConfigured` to block saves on incomplete data
							isProcessing ||
							isFetchingDetails ||
							!isScopeConfigured ||
							!form.formState.isDirty
						}
						form="pricing-editor-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-emerald-600 shadow-premium font-bold hover:bg-emerald-700 transition-all text-white"
					>
						{isProcessing ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : isEdit ? (
							<Check className="w-4 h-4" />
						) : (
							<Plus className="w-4 h-4" />
						)}
						{isEdit ? 'Update Rates' : 'Establish Rate'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
})

PricingPlanEditorSheet.displayName = 'PricingPlanEditorSheet'
