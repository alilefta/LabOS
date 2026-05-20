"use client";

import { memo, useEffect, useState } from "react";
import { useForm, Controller, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wallet, DollarSign, Calculator, Info, PencilLine, Plus, Check, Package } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { cn } from "@/lib/utils";

import { CreateCaseItemPricingPlanInput, CreateCaseItemPricingPlanInputSchema, UpdateCaseItemPricingPlanInput } from "@/schema/composed/case-pricing-plan.details";
import { PricingStrategy } from "@/schema/base/enums.base";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// Assume these actions exist:
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { createPricingPlanAction } from "@/actions/case-item-pricing-plans/create-plan";
import { updatePricingPlanAction } from "@/actions/case-item-pricing-plans/update-plan";
import { getPricingPlanByIdAction } from "@/actions/case-item-pricing-plans/get-plans";
import { ProductSelector } from "@/components/work-categories/products/product-selector";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	clinicId: string;
	clinicName: string;
	planIdToEdit: string | null;
	isEdit: boolean;
}

export const PricingPlanEditorSheet = memo(function PricingPlanEditorSheet({ isOpen, onClose, clinicId, clinicName, planIdToEdit, isEdit = false }: Props) {
	const queryClient = useQueryClient();
	const [showCustomBulkCap, setShowCustomBulkCap] = useState(false);

	// ── 1. FORM SETUP ─────────────────────────────────────────────────────────
	const form = useForm<CreateCaseItemPricingPlanInput>({
		resolver: zodResolver(CreateCaseItemPricingPlanInputSchema),
		defaultValues: {
			name: "",
			pricingStrategy: "PERTOOTH",
			productId: "",
			clinicId, // Locked to this clinic
			isDefault: false, // Clinic deals are never default
		},
		mode: "onBlur",
	});

	const selectedStrategy = useWatch({ control: form.control, name: "pricingStrategy" });

	// ── 2. HYDRATION (EDIT MODE) ──────────────────────────────────────────────
	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ["pricing-plan-details", planIdToEdit],
		queryFn: async () => {
			if (!planIdToEdit) return null;
			const res = await getPricingPlanByIdAction({ planId: planIdToEdit });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return null;
			}
			return res.data?.plan ?? null;
		},
		enabled: isOpen && isEdit,
		staleTime: 0,
	});

	useEffect(() => {
		if (isOpen && isEdit && initialData) {
			form.reset({
				name: initialData.name || "",
				pricingStrategy: initialData.pricingStrategy as PricingStrategy,
				productId: initialData.productId || "",
				clinicId: initialData.clinicId || clinicId,
				isDefault: initialData.isDefault || false,
				// Ensure nulls become undefined so Inputs don't turn into uncontrolled components
				firstToothPrice: initialData.firstToothPrice ? Number(initialData.firstToothPrice) : undefined,
				additionalToothPrice: initialData.additionalToothPrice ? Number(initialData.additionalToothPrice) : undefined,
				bulkPrice: initialData.bulkPrice ? Number(initialData.bulkPrice) : undefined,
				teethCountToApplyBulkPrice: initialData.teethCountToApplyBulkPrice ? Number(initialData.teethCountToApplyBulkPrice) : undefined,
				toothPrice: initialData.toothPrice ? Number(initialData.toothPrice) : undefined,
			});
			// Sync the toggle state for hybrid custom logic
			if (initialData.pricingStrategy === "CUSTOM" && initialData.bulkPrice) {
				setShowCustomBulkCap(true);
			}
		} else if (isOpen && !isEdit) {
			form.reset({ clinicId, isDefault: false, pricingStrategy: "PERTOOTH", name: "", productId: "" });
			setShowCustomBulkCap(false);
		}
	}, [isOpen, isEdit, initialData, form, clinicId]);

	// ── 3. HANDLERS & ACTIONS ──────────────────────────────────────────────────
	const handleStrategyChange = (strategy: PricingStrategy) => {
		form.setValue("pricingStrategy", strategy, { shouldValidate: true, shouldDirty: true });
		// Wipe old pricing data so we don't submit ghost values triggering Zod issues
		form.setValue("firstToothPrice", undefined);
		form.setValue("additionalToothPrice", undefined);
		form.setValue("bulkPrice", undefined);
		form.setValue("teethCountToApplyBulkPrice", undefined);
		form.setValue("toothPrice", undefined);
		setShowCustomBulkCap(false);
		form.clearErrors();
	};

	const handleCheckedChange = (checked: boolean) => {
		setTimeout(() => {
			setShowCustomBulkCap(checked);
		}, 0);
	};

	const { executeAsync: createPlan, isExecuting: isCreating } = useAction(createPricingPlanAction, {
		onSuccess: () => {
			toast.success("Custom rate established.");
			queryClient.invalidateQueries({ queryKey: ["clinic-pricing", clinicId] });
			onClose();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const { executeAsync: updatePlan, isExecuting: isUpdating } = useAction(updatePricingPlanAction, {
		onSuccess: () => {
			toast.success("Pricing logic updated.");
			queryClient.invalidateQueries({ queryKey: ["clinic-pricing", clinicId] });
			onClose();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: CreateCaseItemPricingPlanInput) => {
		if (isEdit && planIdToEdit) {
			await updatePlan({ ...data, planId: planIdToEdit } as UpdateCaseItemPricingPlanInput);
		} else {
			await createPlan(data);
		}
	};

	const isProcessing = isCreating || isUpdating;

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-emerald-500/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Calculator className="w-24 h-24 text-emerald-500" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
						{isEdit ? <PencilLine className="w-6 h-6" /> : <Wallet className="w-6 h-6" />}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">{isEdit ? "Edit Custom Rate" : "Negotiate Custom Rate"}</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						Override standard catalog pricing specifically for <span className="font-bold text-foreground">{clinicName}</span>.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* Skeleton Overlay for Edit Mode Hydration */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 space-y-8 animate-pulse">
							<div className="h-20 w-full rounded-2xl bg-emerald-500/5" />
							<div className="space-y-4">
								<div className="h-10 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
								<div className="h-32 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
							</div>
						</div>
					)}

					<div className={cn("transition-opacity duration-500 space-y-8", isFetchingDetails ? "opacity-0" : "opacity-100")}>
						<FormProvider {...form}>
							<form id="pricing-editor-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
								{/* SECTION 1: Product Selection & Identity */}
								<div className="space-y-6">
									<div className="flex items-center gap-2 mb-2">
										<Package className="w-4 h-4 text-emerald-500" />
										<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Target Product</h4>
									</div>

									{/* Reusing your standard combobox approach here */}
									<Controller
										control={form.control}
										name="productId"
										render={({ field, fieldState }) => (
											<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="productId" fieldTitle="Catalog Item">
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
											<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Internal Plan Name" nameInSchema="name" placeholder="e.g. Apex Special Zirconia Rate" />
										)}
									/>
								</div>

								{/* SECTION 2: Billing Strategy Toggle */}
								<div className="space-y-4 pt-6 border-t border-border">
									<div className="flex items-center gap-2 mb-2">
										<Calculator className="w-4 h-4 text-emerald-500" />
										<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Billing Strategy</h4>
									</div>

									<Controller
										control={form.control}
										name="pricingStrategy"
										render={({ field }) => (
											<div className="grid grid-cols-1 gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border">
												{[
													{ id: "PERTOOTH", label: "Strict Per-Unit", sub: "Standard multiplication by tooth count." },
													{ id: "BULK", label: "Flat Rate / Arch", sub: "Single fee regardless of unit count." },
													{ id: "CUSTOM", label: "Tiered & Hybrid", sub: "Scaled pricing with optional volume caps." },
												].map((strategy) => (
													<button
														key={strategy.id}
														type="button"
														onClick={() => handleStrategyChange(strategy.id as PricingStrategy)}
														className={cn(
															"flex flex-col p-3 rounded-lg text-left transition-all",
															field.value === strategy.id
																? "bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-border"
																: "text-muted-foreground hover:bg-white/50 dark:hover:bg-white/2",
														)}
													>
														<span className="text-sm font-bold">{strategy.label}</span>
														<span className="text-[10px] opacity-80 leading-snug">{strategy.sub}</span>
													</button>
												))}
											</div>
										)}
									/>
								</div>

								{/* SECTION 3: Financial Parameters (The exact same logic you built before!) */}
								<div className="p-6 rounded-2xl bg-emerald-500/3 border border-emerald-500/10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
									<div className="flex items-center gap-2 pb-3 border-b border-border/50">
										<DollarSign className="w-4 h-4 text-emerald-500" />
										<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Financial Parameters</h4>
									</div>

									{/* SCENARIO 1: STRICT PER TOOTH */}
									{selectedStrategy === "PERTOOTH" && (
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
									{selectedStrategy === "BULK" && (
										<div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
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
												This single price will be billed regardless of how many teeth the clinician maps.
											</p>
										</div>
									)}

									{/* SCENARIO 3: CUSTOM / HYBRID (The Math Intervals) */}
									{selectedStrategy === "CUSTOM" && (
										<div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
												<Controller
													control={form.control}
													name="firstToothPrice"
													render={({ field, fieldState }) => (
														<InputWithLabel
															type="number"
															field={field}
															fieldState={fieldState}
															fieldTitle="1st Unit Price ($)"
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
														<span className="text-[13px] font-bold text-foreground">Enable Volume Cap</span>
														<span className="text-[10px] text-muted-foreground leading-snug">
															If the case exceeds a certain number of units, cap the price at a flat fee.
														</span>
													</div>
													<Switch checked={showCustomBulkCap} onCheckedChange={handleCheckedChange} className="data-[state=checked]:bg-emerald-500 shrink-0" />
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
																fieldTitle="Trigger Cap After (Units)"
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
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isProcessing || isFetchingDetails || !form.formState.isDirty}
						form="pricing-editor-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-emerald-600 shadow-premium font-bold hover:bg-emerald-700 transition-all  text-white"
					>
						{isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : isEdit ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
						{isEdit ? "Update Rates" : "Establish Rate"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});
