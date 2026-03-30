"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Package, Wallet, Info, Sparkles, ReceiptText } from "lucide-react";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { cn } from "@/lib/utils";
import { CatalogImageUpload } from "@/components/cases/shared/catalog-image-upload";

export function WorkTypeCatalogSections() {
	const { control, watch } = useFormContext();
	const pricingStrategy = watch("product.casePricingPlan.pricingStrategy");

	return (
		<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* --- SECTION 2: INITIAL PRODUCT DETAILS --- */}
			<section className="space-y-6">
				<div className="flex items-center gap-3">
					<div className="w-1 h-4 bg-ai rounded-full" />
					<h3 className="text-sm font-bold text-foreground">2. Initial product details</h3>
				</div>

				<div className="flex flex-col sm:flex-row gap-8 items-start">
					<CatalogImageUpload nameInSchema="product.imageUrl" label="Product" />

					<div className="flex-1 w-full space-y-5">
						<Controller
							control={control}
							name="product.name"
							render={({ field, fieldState }) => (
								<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Product name" nameInSchema="product.name" placeholder="e.g. Monolithic Zirconia Crown" />
							)}
						/>
						<Controller
							control={control}
							name="product.description"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="product.description" fieldTitle="Technical description" isOptional>
									<textarea
										{...field}
										placeholder="Material specs, translucency, etc..."
										className="w-full min-h-20 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-1 focus:ring-ai outline-none resize-none shadow-sm"
									/>
								</CustomFieldWithLabel>
							)}
						/>
					</div>
				</div>
			</section>

			{/* --- SECTION 3: PRICING STRATEGY --- */}
			<section className="space-y-6 pt-6 border-t border-border border-dashed">
				<div className="flex items-center gap-3">
					<div className="w-1 h-4 bg-emerald-500 rounded-full" />
					<h3 className="text-sm font-bold text-foreground">3. Default pricing logic</h3>
				</div>

				<div className="space-y-6">
					{/* Strategy Toggle */}
					<div className="space-y-3">
						<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">Pricing strategy</label>
						<Controller
							control={control}
							name="product.casePricingPlan.pricingStrategy"
							render={({ field }) => (
								<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-12">
									{["PERTOOTH", "BULK", "CUSTOM"].map((strat) => (
										<button
											key={strat}
											type="button"
											onClick={() => field.onChange(strat)}
											className={cn(
												"flex-1 text-[10px] font-bold rounded-lg transition-all tracking-tight",
												field.value === strat
													? "bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-border"
													: "text-muted-foreground hover:text-foreground",
											)}
										>
											{strat === "PERTOOTH" ? "Flat Per Tooth" : strat === "BULK" ? "Bulk Threshold" : "Tiered Custom"}
										</button>
									))}
								</div>
							)}
						/>
					</div>

					{/* Conditional Pricing Inputs */}
					<div className="p-6 rounded-3xl bg-emerald-500/[0.03] border border-emerald-500/10 space-y-5 animate-in zoom-in-95 duration-300">
						{pricingStrategy === "PERTOOTH" && (
							<Controller
								control={control}
								name="product.casePricingPlan.toothPrice"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="Price per unit (Tooth)"
										nameInSchema="product.casePricingPlan.toothPrice"
										type="number"
										placeholder="0.00"
										inputClassName="font-mono text-emerald-600 dark:text-emerald-400 font-bold"
									/>
								)}
							/>
						)}

						{pricingStrategy === "BULK" && (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Controller
									control={control}
									name="product.casePricingPlan.bulkPrice"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											fieldTitle="Total bulk price"
											nameInSchema="product.casePricingPlan.bulkPrice"
											type="number"
											placeholder="0.00"
										/>
									)}
								/>
								<Controller
									control={control}
									name="product.casePricingPlan.teethCountToApplyBulkPrice"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											fieldTitle="Minimum teeth for bulk"
											nameInSchema="product.casePricingPlan.teethCountToApplyBulkPrice"
											type="number"
											placeholder="e.g. 3"
										/>
									)}
								/>
							</div>
						)}

						{pricingStrategy === "CUSTOM" && (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<Controller
									control={control}
									name="product.casePricingPlan.firstToothPrice"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="First tooth price" nameInSchema="product.casePricingPlan.firstToothPrice" type="number" />
									)}
								/>
								<Controller
									control={control}
									name="product.casePricingPlan.additionalToothPrice"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											fieldTitle="Additional tooth price"
											nameInSchema="product.casePricingPlan.additionalToothPrice"
											type="number"
										/>
									)}
								/>
							</div>
						)}

						{/* Live Explanation Badge */}
						<div className="flex gap-3 p-3 rounded-xl bg-white dark:bg-black/20 border border-emerald-500/20 shadow-sm">
							<ReceiptText className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
							<p className="text-[11px] text-muted-foreground leading-relaxed">
								{pricingStrategy === "PERTOOTH" && "Simple math: [Number of Teeth] × [Price]. Best for standard crowns."}
								{pricingStrategy === "BULK" && "Fixed fee: Charge a flat rate once the unit threshold is met. Best for dentures."}
								{pricingStrategy === "CUSTOM" && "Tiered math: Charge a premium for the first unit and a lower rate for others."}
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
