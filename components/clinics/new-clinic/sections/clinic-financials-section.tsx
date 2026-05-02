"use client";

import { useState } from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { ReceiptText, DollarSign, Percent, ShieldCheck } from "lucide-react";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Switch } from "@/components/ui/switch";
import { CreateClinicInput } from "@/schema/composed/clinic.details";
import { cn } from "@/lib/utils";

export function ClinicFinancialsSection() {
	const { control, setValue } = useFormContext<CreateClinicInput>();

	// Local UI state for the billing toggle
	const [isBillingSame, setIsBillingSame] = useState(true);

	// Watch the discount to drive the "UX Magic" math preview
	const discountVal = useWatch({ control, name: "discount" }) || 0;
	const calculatedExample = (100 - (100 * discountVal) / 100).toFixed(2);

	const handleBillingToggle = (checked: boolean) => {
		setIsBillingSame(checked);
		if (checked) {
			// Clear the billing fields if they toggle it back to "Same as Primary"
			setValue("billingEmail", undefined, { shouldDirty: true });
			setValue("billingPhoneNumber", undefined, { shouldDirty: true });
		}
	};

	return (
		<section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Financial & Billing Agreement</h2>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* --- PART A: TAX & COMPLIANCE --- */}
				<div className="lab-card p-6 sm:p-8 space-y-8 h-full">
					<div className="flex items-center gap-2 mb-2">
						<ReceiptText className="w-4 h-4 text-emerald-500" />
						<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Billing Details</h4>
					</div>

					<Controller
						control={control}
						name="taxNumber"
						render={({ field, fieldState }) => (
							<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Tax ID / Registration Number" nameInSchema="taxNumber" placeholder="e.g. XX-XXXXXXX" isOptional />
						)}
					/>

					<div className="space-y-4 pt-4 border-t border-border">
						<div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-border shadow-sm">
							<div className="flex flex-col gap-0.5 pr-4">
								<span className="text-[13px] font-bold text-foreground">Same as Primary Contact</span>
								<span className="text-[10px] text-muted-foreground leading-snug">Send invoices to the main clinic email.</span>
							</div>
							<Switch checked={isBillingSame} onCheckedChange={handleBillingToggle} className="data-[state=checked]:bg-emerald-500 shrink-0" />
						</div>

						{/* 
                            THE CSS GRID ANIMATION
                            Uses grid-rows-[0fr] to smoothly slide open the secondary billing fields 
                        */}
						<div className={cn("grid transition-all duration-500 ease-in-out", isBillingSame ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100")}>
							<div className="overflow-hidden min-h-0 space-y-5">
								<div className="pt-2 pb-1">
									<Controller
										control={control}
										name="billingEmail"
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Accounts Payable Email" nameInSchema="billingEmail" placeholder="billing@clinic.com" />
										)}
									/>
								</div>
								<Controller
									control={control}
									name="billingPhoneNumber"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Billing Phone" nameInSchema="billingPhoneNumber" placeholder="+1 (555) 000-0000" isOptional />
									)}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* --- PART B: THE CREDIT ENGINE --- */}
				<div className="lab-card p-6 sm:p-8 space-y-8 h-full bg-emerald-500/[0.02] border-emerald-500/10">
					<div className="flex items-center gap-2 mb-2">
						<ShieldCheck className="w-4 h-4 text-emerald-500" />
						<h4 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">Credit Terms</h4>
					</div>

					<Controller
						control={control}
						name="creditLimit"
						render={({ field, fieldState }) => (
							<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="creditLimit" fieldTitle="Maximum Credit Limit ($)">
								<div className="relative">
									<DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500 opacity-50" />
									<input
										{...field}
										type="number"
										value={field.value ?? ""}
										placeholder="10000"
										className={cn(
											"w-full h-16 pl-12 pr-4 bg-white dark:bg-[#121214] border border-emerald-500/30 rounded-xl text-3xl font-mono font-bold text-foreground focus:outline-none transition-all shadow-sm placeholder:text-muted-foreground/30",
											"focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20",
											fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
										)}
									/>
								</div>
							</CustomFieldWithLabel>
						)}
					/>

					<div className="pt-4 border-t border-border/50">
						<Controller
							control={control}
							name="discount"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="discount" fieldTitle="Global Discount (%)" isOptional>
									<div className="relative">
										<Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
										<input
											{...field}
											type="number"
											min="0"
											max="100"
											value={field.value ?? ""}
											placeholder="0.0"
											className={cn(
												"w-full h-11 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm font-mono font-bold text-foreground focus:outline-none transition-all shadow-sm",
												"focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20",
												fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
											)}
										/>
									</div>
								</CustomFieldWithLabel>
							)}
						/>

						{/* THE UX MAGIC: Real-time calculation */}
						<div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between animate-in fade-in duration-300">
							<span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Discount Logic Preview</span>
							<span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
								A $100.00 standard crown will bill at <strong className="font-mono font-bold text-sm ml-0.5">${calculatedExample}</strong>.
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
