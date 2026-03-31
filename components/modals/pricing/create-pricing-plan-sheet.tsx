"use client";

import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wallet, DollarSign, Calculator } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";

import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";

// --- MOCK SCHEMA (Replace with your actual Zod import) ---
import { z } from "zod";
import { WorkTypeBlueprintHierarchy } from "../work-type/worktype-blueprint-hierarchy";
import { CreateCaseItemPricingPlanInput, CreateCaseItemPricingPlanInputSchema } from "@/schema/composed/case-pricing-plan.details";
const CreatePricingSchema = z.object({
	name: z.string().trim().min(1, "Pricing plan name is required"),
	pricingStrategy: z.enum(["BULK", "PERTOOTH", "CUSTOM"]),
	firstToothPrice: z.coerce.number().min(0).optional(),
	bulkPrice: z.coerce.number().min(0).optional(),
	additionalToothPrice: z.coerce.number().min(0).optional(),
	teethCountToApplyBulkPrice: z.coerce.number().int().min(1).optional(),
	toothPrice: z.coerce.number().optional(),
	productId: z.string(),
});

// ---------------------------------------------------------

export function CreatePricingPlanSheet() {
	// Atomic Zustand Subscriptions
	const isPricingSheetOpen = useClinicalCreationStore((state) => state.isPricingSheetOpen);
	const closeAllSheets = useClinicalCreationStore((state) => state.closeAllSheets);
	const activeProductId = useClinicalCreationStore((state) => state.activeProductId);
	const setNewlyCreated = useClinicalCreationStore((state) => state.setNewlyCreated);

	const form = useForm<CreateCaseItemPricingPlanInput>({
		resolver: zodResolver(CreateCaseItemPricingPlanInputSchema),
		defaultValues: {
			name: "",
			pricingStrategy: "BULK",
			productId: "",
		},
		mode: "onBlur",
	});

	const selectedStrategy = form.watch("pricingStrategy");

	// Hydrate the Product ID when the sheet opens
	useEffect(() => {
		if (activeProductId) {
			form.setValue("productId", activeProductId);
		}
	}, [activeProductId, form]);

	const isExecuting = false;

	const onSubmit = async (data: CreateCaseItemPricingPlanInput) => {
		console.log("Submitting Pricing Plan:", data);
		toast.success("Pricing logic saved successfully");
		setNewlyCreated("pricing", "mock-new-pricing-id");
		closeAllSheets();
		form.reset();
	};

	return (
		<Sheet open={isPricingSheetOpen} onOpenChange={(open) => !open && closeAllSheets()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER (Emerald Financial Branding) --- */}
				<SheetHeader className="p-8 border-b border-border bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden">
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
					{/* UX FEATURE: HIERARCHY EDUCATION */}
					<WorkTypeBlueprintHierarchy categoryName="Selected Category" isCreatingPriceOnly={true} />

					<FormProvider {...form}>
						<form id="create-pricing-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Plan Name" nameInSchema="name" placeholder="e.g. Standard Studio Rate" />
								)}
							/>

							{/* Dynamic Strategy Selector */}
							<div className="space-y-3">
								<label className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">Billing Strategy</label>
								<div className="grid grid-cols-1 gap-2">
									{(["BULK", "PERTOOTH", "CUSTOM"] as const).map((strategy) => (
										<button
											key={strategy}
											type="button"
											onClick={() => {
												form.setValue("pricingStrategy", strategy);
												// Clear irrelevant fields when switching to avoid Zod superRefine errors
												form.clearErrors();
											}}
											className={cn(
												"flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200",
												selectedStrategy === strategy
													? "border-emerald-500 bg-emerald-500/5 ring-1 ring-emerald-500/20"
													: "border-border bg-slate-50 dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10",
											)}
										>
											<div className="flex flex-col gap-0.5">
												<span className={cn("text-sm font-bold", selectedStrategy === strategy ? "text-emerald-600 dark:text-emerald-500" : "text-foreground")}>
													{strategy === "BULK" ? "Volume / Bulk Pricing" : strategy === "PERTOOTH" ? "Strict Per-Tooth" : "Custom Scaling"}
												</span>
												<span className="text-[11px] text-muted-foreground">
													{strategy === "BULK"
														? "Discount applied after X units."
														: strategy === "PERTOOTH"
															? "Fixed price multiplied by units."
															: "Complex unit pricing rules."}
												</span>
											</div>
											<div
												className={cn(
													"w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
													selectedStrategy === strategy ? "border-emerald-500" : "border-slate-300 dark:border-zinc-600",
												)}
											>
												{selectedStrategy === strategy && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
											</div>
										</button>
									))}
								</div>
							</div>

							{/* --- DYNAMIC RENDER BASED ON STRATEGY --- */}
							<div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#121214] border border-border space-y-5 animate-in fade-in zoom-in-95">
								<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
									<DollarSign className="w-4 h-4 text-emerald-500" />
									<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Financial Parameters</h4>
								</div>

								{/* PERTOOTH & CUSTOM require First Tooth Price */}
								{(selectedStrategy === "PERTOOTH" || selectedStrategy === "CUSTOM") && (
									<Controller
										control={form.control}
										name="firstToothPrice"
										render={({ field, fieldState }) => (
											<InputWithLabel
												type="number"
												field={field}
												fieldState={fieldState}
												fieldTitle={selectedStrategy === "CUSTOM" ? "First Unit Price ($)" : "Price Per Unit ($)"}
												nameInSchema="firstToothPrice"
												placeholder="0.00"
											/>
										)}
									/>
								)}

								{/* CUSTOM requires Additional Tooth Price */}
								{selectedStrategy === "CUSTOM" && (
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
												placeholder="0.00"
											/>
										)}
									/>
								)}

								{/* BULK requires Bulk Price and Threshold */}
								{selectedStrategy === "BULK" && (
									<div className="grid grid-cols-2 gap-4">
										<Controller
											control={form.control}
											name="bulkPrice"
											render={({ field, fieldState }) => (
												<InputWithLabel type="number" field={field} fieldState={fieldState} fieldTitle="Flat Bulk Price ($)" nameInSchema="bulkPrice" placeholder="0.00" />
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
													fieldTitle="Apply After (Units)"
													nameInSchema="teethCountToApplyBulkPrice"
													placeholder="e.g. 4"
												/>
											)}
										/>
									</div>
								)}
							</div>
						</form>
					</FormProvider>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/[0.01]">
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
