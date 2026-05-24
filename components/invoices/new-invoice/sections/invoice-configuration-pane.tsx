"use client";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Building2, Lock, Landmark, Percent, FileText, X, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { EligibleClinicDTO } from "@/schema/composed/invoices/new.invoice.dtos";
import { ClinicFilterSelector } from "@/components/shared/filters/clinic-filter-selector";
import { InvoiceMetadataInput } from "@/schema/composed/invoices/new-invoice.schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

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
	{ id: "CUSTOM", label: "Custom" }, // Added Custom
];

export function InvoiceConfigurationPane({ clinics, selectedId, selectedClinicName, onSelectClinic }: Props) {
	const { control } = useFormContext<InvoiceMetadataInput>();

	// Watch values to handle conditional label updates or dynamic math
	const discountPct = useWatch({ control, name: "discountPercentage" }) || 0;
	const selectedTerms = useWatch({ control, name: "billingTerms" });

	return (
		<div className="w-full shrink-0 rounded-[24px] xl:rounded-[32px] border border-border bg-card p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 shadow-sm transition-all animate-in fade-in slide-in-from-left-4 duration-500">
			{/* --- 1. CLINIC SELECTION (LOCKED OR SEARCHABLE) --- */}
			<div className="space-y-2">
				<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
					Billed Clinic <span className="text-destructive">*</span>
				</label>

				{selectedId && selectedClinicName ? (
					<div className="w-full min-h-12 p-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between animate-in fade-in zoom-in-95 group">
						<div className="flex items-center gap-3 pl-3">
							<Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
							<span className="text-sm font-bold text-foreground line-clamp-1">{selectedClinicName}</span>
						</div>

						<button
							type="button"
							onClick={() => onSelectClinic(null)}
							className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-white dark:bg-[#121214] border border-emerald-500/10 px-2 py-1.5 rounded shadow-sm hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all cursor-pointer"
						>
							<Lock className="w-3 h-3 group-hover:hidden" />
							<X className="w-3 h-3 hidden group-hover:block" />
							<span className="hidden sm:inline group-hover:hidden">Locked</span>
							<span className="hidden sm:inline group-hover:block">Clear</span>
						</button>
					</div>
				) : (
					/* --- THE ACTIVE SEARCHABLE SELECTOR --- */
					<ClinicFilterSelector
						value={selectedId || null}
						onSelect={onSelectClinic}
						label="" // Pass empty string since we provided the label above
					/>
				)}
			</div>

			{/* --- 2. BILLING TERMS (Segmented Toggle + Dynamic Calendar) --- */}
			<div className="space-y-3">
				<div className="flex items-center gap-2 mb-1 px-1">
					<Landmark className="w-4 h-4 text-emerald-500" />
					<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Payment Terms</h3>
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

				{/* THE CUSTOM DATE SLIDE-DOWN */}
				<div className={cn("grid transition-all duration-300 ease-in-out", selectedTerms === "CUSTOM" ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0")}>
					<div className="overflow-hidden min-h-0 pt-1">
						<Controller
							control={control}
							name="customDueDate"
							render={({ field, fieldState }) => {
								// Safe Date Parsing
								const selectedDate = field.value ? new Date(field.value) : undefined;

								return (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="customDueDate" fieldTitle="Specific Due Date">
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full h-11 justify-start text-left font-normal rounded-xl border-border bg-white dark:bg-[#121214] hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm",
														!selectedDate && "text-muted-foreground",
														fieldState.invalid && "border-destructive focus:ring-destructive/20 focus:border-destructive",
													)}
												>
													<CalendarIcon className={cn("w-4 h-4 mr-3", selectedDate ? "text-emerald-500" : "text-slate-400")} />
													<span className="text-sm font-semibold text-foreground">{selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select strict deadline..."}</span>
												</Button>
											</PopoverTrigger>

											<PopoverContent className="w-auto p-0 rounded-2xl border-border shadow-premium overflow-hidden" align="start">
												<Calendar
													mode="single"
													selected={selectedDate} // Use the safely parsed date
													onSelect={field.onChange}
													// Prevent setting a due date in the past
													disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
													initialFocus
													className="p-3 pointer-events-auto"
													classNames={{
														day_selected: "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white rounded-lg",
														day_today: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-lg",
													}}
												/>
											</PopoverContent>
										</Popover>
									</CustomFieldWithLabel>
								);
							}}
						/>
					</div>
				</div>
			</div>

			{/* --- 3. GLOBAL ADJUSTMENTS (Emerald Tinted Card) --- */}
			<div className="p-5 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 space-y-5">
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

				{/* 
                    UX FIX: Only show the Reason box if a discount is actually applied.
                    Uses CSS Grid trick for buttery smooth slide-down animation. 
                */}
				<div className={cn("grid transition-all duration-300 ease-in-out", discountPct > 0 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
					<div className="overflow-hidden min-h-0 pt-1 space-y-4">
						<Controller
							control={control}
							name="discountReason"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="Discount Reason"
									nameInSchema="discountReason"
									placeholder="e.g. VIP Partnership Deal"
									inputClassName="focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
								/>
							)}
						/>

						{/* Instant visual confirmation of the math rule */}
						<div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
							<p className="text-[10px] text-emerald-700 dark:text-emerald-500 font-medium">
								A <strong className="font-bold">{discountPct}%</strong> reduction will be applied to the final calculated subtotal of all selected cases.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* --- 4. ACCOUNTANT NOTES (Global Invoice Notes) --- */}
			<div className="space-y-3 pt-4 border-t border-border mt-auto">
				<Controller
					control={control}
					name="notes"
					render={({ field, fieldState }) => (
						<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="notes" fieldTitle="Accountant Memo" isOptional>
							<div className="relative group">
								<div className="absolute -inset-0.5 bg-emerald-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
								<textarea
									{...field}
									value={field.value ?? ""}
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
