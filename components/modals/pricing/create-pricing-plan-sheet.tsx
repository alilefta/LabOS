"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wallet, DollarSign, Calculator, Info } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";

import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";

import { CreateCaseItemPricingPlanInput, CreateCaseItemPricingPlanInputSchema } from "@/schema/composed/case-pricing-plan.details";
import { createPricingPlanAction } from "@/actions/pricing-plan";
import { useAction } from "next-safe-action/hooks";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { WorkTypeBlueprintHierarchy } from "../work-type/worktype-blueprint-hierarchy";

export function CreatePricingPlanSheet() {
	const isPricingSheetOpen = useClinicalCreationStore((state) => state.isPricingSheetOpen);
	const closeAllSheets = useClinicalCreationStore((state) => state.closeAllSheets);
	const activeProductId = useClinicalCreationStore((state) => state.activeProductId);
	const setNewlyCreated = useClinicalCreationStore((state) => state.setNewlyCreated);

	// Local state to toggle the hybrid "Bulk Cap" inside the CUSTOM strategy
	const [showCustomBulkCap, setShowCustomBulkCap] = useState(false);

	const form = useForm<CreateCaseItemPricingPlanInput>({
		resolver: zodResolver(CreateCaseItemPricingPlanInputSchema),
		defaultValues: {
			name: "",
			pricingStrategy: "PERTOOTH", // Default to the most common
			productId: "",
			isDefault: true,
		},
		mode: "onBlur",
	});

	const selectedStrategy = useWatch({
		control: form.control,
		name: "pricingStrategy",
	});

	const { executeAsync: createPlan, isExecuting } = useAction(createPricingPlanAction, {
		onSuccess: ({ data }) => {
			toast.success("Pricing plan created successfully");
			if (data?.pricingPlan?.id) {
				setNewlyCreated("pricing", data.pricingPlan.id);
			}
			closeAllSheets();
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	useEffect(() => {
		if (activeProductId) {
			form.setValue("productId", activeProductId);
		}
	}, [activeProductId, form]);

	const handleCheckedChange = (checked: boolean) => {
		setTimeout(() => {
			setShowCustomBulkCap(checked);
		}, 0);
	};

	// Clean up fields when switching strategies so we don't send dirty schema data
	const handleStrategyChange = (strategy: "BULK" | "PERTOOTH" | "CUSTOM") => {
		form.setValue("pricingStrategy", strategy);
		form.setValue("firstToothPrice", undefined);
		form.setValue("additionalToothPrice", undefined);
		form.setValue("bulkPrice", undefined);
		form.setValue("teethCountToApplyBulkPrice", undefined);
		form.setValue("toothPrice", undefined);
		setShowCustomBulkCap(false);
		form.clearErrors();
	};

	const onSubmit = async (data: CreateCaseItemPricingPlanInput) => {
		await createPlan(data);
	};

	return (
		<Sheet open={isPricingSheetOpen} onOpenChange={(open) => !open && closeAllSheets()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-emerald-500/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Calculator className="w-24 h-24 text-emerald-500" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
						<Wallet className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Define Pricing Logic</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">Set the financial baseline and scaling rules for this product.</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<WorkTypeBlueprintHierarchy categoryName="Selected Category" isCreatingPriceOnly={true} />

					<FormProvider {...form}>
						<form id="create-pricing-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Plan Name" nameInSchema="name" placeholder="e.g. Standard Zirconia Rate" />
								)}
							/>

							{/* --- DYNAMIC STRATEGY SELECTOR --- */}
							<div className="flex flex-col gap-3">
								<label className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">Billing Strategy</label>
								<div className="grid grid-cols-1 gap-3">
									{/* 1. PER TOOTH */}
									<button
										type="button"
										onClick={() => handleStrategyChange("PERTOOTH")}
										className={cn(
											"flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200",
											selectedStrategy === "PERTOOTH"
												? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm"
												: "border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex flex-col gap-1 pr-4">
											<span className={cn("text-sm font-bold", selectedStrategy === "PERTOOTH" ? "text-emerald-600 dark:text-emerald-500" : "text-foreground")}>
												Strict Per-Unit
											</span>
											<span className="text-[11px] text-muted-foreground leading-snug">Every selected tooth costs exactly the same amount.</span>
										</div>
										<div
											className={cn(
												"w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
												selectedStrategy === "PERTOOTH" ? "border-emerald-500" : "border-slate-300 dark:border-zinc-600",
											)}
										>
											{selectedStrategy === "PERTOOTH" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
										</div>
									</button>

									{/* 2. PURE BULK / FLAT */}
									<button
										type="button"
										onClick={() => handleStrategyChange("BULK")}
										className={cn(
											"flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200",
											selectedStrategy === "BULK"
												? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm"
												: "border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex flex-col gap-1 pr-4">
											<span className={cn("text-sm font-bold", selectedStrategy === "BULK" ? "text-emerald-600 dark:text-emerald-500" : "text-foreground")}>
												Flat Rate / Arch
											</span>
											<span className="text-[11px] text-muted-foreground leading-snug">A single flat fee regardless of the number of teeth mapped.</span>
										</div>
										<div
											className={cn(
												"w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
												selectedStrategy === "BULK" ? "border-emerald-500" : "border-slate-300 dark:border-zinc-600",
											)}
										>
											{selectedStrategy === "BULK" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
										</div>
									</button>

									{/* 3. CUSTOM / HYBRID */}
									<button
										type="button"
										onClick={() => handleStrategyChange("CUSTOM")}
										className={cn(
											"flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200",
											selectedStrategy === "CUSTOM"
												? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm"
												: "border-border bg-slate-50 dark:bg-white/2 hover:border-slate-300 dark:hover:border-white/10",
										)}
									>
										<div className="flex flex-col gap-1 pr-4">
											<span className={cn("text-sm font-bold", selectedStrategy === "CUSTOM" ? "text-emerald-600 dark:text-emerald-500" : "text-foreground")}>
												Tiered & Hybrid
											</span>
											<span className="text-[11px] text-muted-foreground leading-snug">Different price for the first unit, with optional bulk capping.</span>
										</div>
										<div
											className={cn(
												"w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
												selectedStrategy === "CUSTOM" ? "border-emerald-500" : "border-slate-300 dark:border-zinc-600",
											)}
										>
											{selectedStrategy === "CUSTOM" && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
										</div>
									</button>
								</div>
							</div>

							{/* --- FINANCIAL PARAMETERS (DYNAMIC RENDER) --- */}
							<div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-[#121214] border border-border space-y-6 animate-in fade-in zoom-in-95 duration-300">
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
											<InputWithLabel type="number" field={field} fieldState={fieldState} fieldTitle="Price Per Unit ($)" nameInSchema="toothPrice" placeholder="e.g. 140.00" />
										)}
									/>
								)}

								{/* SCENARIO 2: FLAT / BULK */}
								{selectedStrategy === "BULK" && (
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
										<Controller
											control={form.control}
											name="bulkPrice"
											render={({ field, fieldState }) => (
												<InputWithLabel
													type="number"
													field={field}
													fieldState={fieldState}
													fieldTitle="Flat Arch Price ($)"
													nameInSchema="bulkPrice"
													placeholder="e.g. 500.00"
												/>
											)}
										/>
										<div className="flex flex-col gap-1.5">
											<Controller
												control={form.control}
												name="teethCountToApplyBulkPrice"
												render={({ field, fieldState }) => (
													<InputWithLabel
														type="number"
														field={field}
														fieldState={fieldState}
														fieldTitle="Apply After (Units)"
														nameInSchema="teethCountToApplyBulkPrice"
														placeholder="e.g. 1"
													/>
												)}
											/>
											<div className="flex items-start gap-1.5 mt-1 text-muted-foreground">
												<Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
												<p className="text-[10px] font-medium leading-snug">
													Set units to <strong className="text-foreground">1</strong> to apply a flat fee immediately (e.g. Bite Rims).
												</p>
											</div>
										</div>
									</div>
								)}

								{/* SCENARIO 3: CUSTOM / HYBRID */}
								{selectedStrategy === "CUSTOM" && (
									<div className="flex flex-col gap-6">
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
													<span className="text-[13px] font-bold text-foreground">Enable Bulk Cap</span>
													<span className="text-[10px] text-muted-foreground leading-snug">
														If the case exceeds a certain number of teeth, override unit pricing and apply a flat fee.
													</span>
												</div>
												<Switch
													checked={showCustomBulkCap}
													onCheckedChange={(checked) => handleCheckedChange(checked)}
													className="data-[state=checked]:bg-emerald-500 shrink-0"
												/>
											</div>
										</div>

										{/* Revealed Bulk Fields */}
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

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button variant="ghost" onClick={closeAllSheets} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !form.formState.isDirty}
						form="create-pricing-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground"
					>
						{isExecuting ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Pricing Plan"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
