"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Building2, Lock, Landmark, Percent, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { EligibleClinicDTO } from "@/schema/composed/invoices/new.invoice.dtos";
import { ClinicFilterSelector } from "@/components/shared/filters/clinic-filter-selector";

interface Props {
	clinics: EligibleClinicDTO[];
	selectedId?: string;
	selectedClinicName: string | null;
	onSelectClinic: (id: string | null) => void;
}

const BILLING_TERMS = [
	{ id: "RECEIPT", label: "On Receipt" },
	{ id: "NET15", label: "Net 15" },
	{ id: "NET30", label: "Net 30" },
];

export function InvoiceConfigurationPane({ clinics, selectedId, selectedClinicName, onSelectClinic }: Props) {
	const { control, setValue } = useFormContext();

	// Watch values to handle conditional label updates or dynamic math
	const discountPct = useWatch({ control, name: "discountPercentage" }) || 0;
	const selectedTerms = useWatch({ control, name: "billingTerms" });

	return (
		<div className="flex-1 rounded-[32px] border border-border bg-card p-6 sm:p-8 flex flex-col gap-8 shadow-sm transition-all">
			{/* --- 1. CLINIC SELECTION (LOCKED OR SEARCHABLE) --- */}
			<div className="space-y-2">
				<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
					Billed Clinic <span className="text-destructive">*</span>
				</label>

				{selectedId && selectedClinicName ? (
					/* --- THE LOCKED GLASS CARD (High UX) --- */
					<div className="w-full h-12 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 flex items-center justify-between animate-in fade-in zoom-in-95">
						<div className="flex items-center gap-3">
							<Building2 className="w-4 h-4 text-emerald-500" />
							<span className="text-sm font-bold text-foreground">{selectedClinicName}</span>
						</div>
						<div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-white dark:bg-[#121214] border border-emerald-500/10 px-2 py-0.5 rounded shadow-sm">
							<Lock className="w-3 h-3 mr-1 inline" /> Locked
						</div>
					</div>
				) : (
					/* --- THE ACTIVE SEARCHABLE SELECTOR --- */
					<ClinicFilterSelector value={selectedId || null} onSelect={onSelectClinic} label="" />
				)}
			</div>

			{/* --- 2. BILLING TERMS (Segmented Toggle) --- */}
			<div className="space-y-3">
				<div className="flex items-center gap-2 mb-1 px-1">
					<Landmark className="w-4 h-4 text-emerald-500" />
					<span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Payment Terms</span>
				</div>
				<Controller
					control={control}
					name="billingTerms"
					render={({ field }) => (
						<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-11 w-full">
							{BILLING_TERMS.map((term) => (
								<button
									key={term.id}
									type="button"
									onClick={() => field.onChange(term.id)}
									className={cn(
										"flex-1 text-[10px] font-bold rounded-lg transition-all uppercase tracking-tighter",
										field.value === term.id
											? "bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-400 shadow-sm ring-1 ring-border"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{term.label}
								</button>
							))}
						</div>
					)}
				/>
			</div>

			{/* --- 3. GLOBAL ADJUSTMENTS (Emerald Tinted Card) --- */}
			<div className="p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 space-y-6">
				<div className="flex items-center gap-2 pb-3 border-b border-border/50">
					<Percent className="w-4 h-4 text-emerald-500" />
					<h4 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Ledger Discount</h4>
				</div>

				<Controller
					control={control}
					name="discountPercentage"
					render={({ field, fieldState }) => (
						<InputWithLabel
							type="number"
							field={field}
							fieldState={fieldState}
							fieldTitle="Discount (%)"
							nameInSchema="discountPercentage"
							placeholder="0.0"
							max={100}
							min={0}
							isOptional
							inputClassName="font-mono text-emerald-600 dark:text-emerald-400 font-bold focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
						/>
					)}
				/>

				{/* Only show the Reason box if a discount is actually applied */}
				{discountPct > 0 && (
					<Controller
						control={control}
						name="discountReason"
						render={({ field, fieldState }) => (
							<InputWithLabel
								field={field}
								fieldState={fieldState}
								fieldTitle="Discount Reason"
								nameInSchema="discountReason"
								placeholder="e.g., VIP Clinic Tier, apology..."
								inputClassName="focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 animate-in fade-in slide-in-from-top-2 duration-300"
							/>
						)}
					/>
				)}
			</div>

			{/* --- 4. ACCOUNTANT NOTES (Global Invoice Notes) --- */}
			<div className="space-y-3 pt-4 border-t border-border">
				<Controller
					control={control}
					name="notes"
					render={({ field, fieldState }) => (
						<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="notes" fieldTitle="Accountant Notes" isOptional>
							<div className="relative group">
								<div className="absolute -inset-0.5 bg-emerald-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
								<textarea
									{...field}
									placeholder="These notes will be printed on the final PDF statement..."
									className={cn(
										"relative w-full min-h-[100px] p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm custom-scrollbar",
										"focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20",
										fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
									)}
								/>
								<FileText className="absolute top-4 right-4 w-4 h-4 text-emerald-500/30 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
							</div>
						</CustomFieldWithLabel>
					)}
				/>
			</div>
		</div>
	);
}
