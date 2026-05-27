"use client";

import { memo, useMemo, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CalendarIcon, FileText, Loader2, Lock, Percent, Save } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { cn } from "@/lib/utils";

import { AdjustInvoiceInput, AdjustInvoiceInputSchema } from "@/schema/composed/invoices/adjust-invoice.schema";
import { adjustLiveInvoiceAction } from "@/actions/invoices/adjust-live-invoice-action";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	invoice: {
		id: string;
		invoiceNumber: string;
		status: string;
		subtotal: number;
		dueDate: Date | null;
		appliedDiscountPercentage: number | null;
		discountReason: string | null;
		notes: string | null;
	} | null;
}

export const InvoiceAdjustmentSheet = memo(function InvoiceAdjustmentSheet({ isOpen, onClose, invoice }: Props) {
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

	// ── 1. FORM INITIALIZATION ───────────────────────────────────────────
	const form = useForm<AdjustInvoiceInput>({
		resolver: zodResolver(AdjustInvoiceInputSchema),
		defaultValues: {
			invoiceId: "",
			dueDate: null,
			discountPercentage: 0,
			discountReason: "",
			notes: "",
		},
		mode: "onBlur",
	});

	// Render-Phase Sync (Reset form when opened)
	if (isOpen !== prevIsOpen) {
		setPrevIsOpen(isOpen);
		if (isOpen && invoice) {
			form.reset({
				invoiceId: invoice.id,
				dueDate: invoice.dueDate,
				discountPercentage: invoice.appliedDiscountPercentage ?? 0,
				discountReason: invoice.discountReason ?? "",
				notes: invoice.notes ?? "",
			});
		}
	}

	// ── 2. THE LOCKOUT MATRIX (UI Level) ─────────────────────────────────
	const isFinancialsLocked = invoice?.status === "PAID" || invoice?.status === "PARTIAL" || invoice?.status === "CANCELLED";

	// ── 3. UX MATH ENGINE ────────────────────────────────────────────────
	const discountVal = useWatch({ control: form.control, name: "discountPercentage" }) || 0;

	const calculatedPreview = useMemo(() => {
		if (!invoice) return { discount: 0, newTotal: 0 };
		const safeDiscount = Math.min(Math.max(discountVal, 0), 100);
		const discountAmount = (invoice.subtotal * safeDiscount) / 100;
		return {
			discount: discountAmount,
			newTotal: Math.max(0, invoice.subtotal - discountAmount),
		};
	}, [discountVal, invoice]);

	// ── 4. SERVER ACTION ─────────────────────────────────────────────────
	const { executeAsync: adjustInvoice, isExecuting } = useAction(adjustLiveInvoiceAction, {
		onSuccess: () => {
			toast.success(`Modifications applied to ${invoice?.invoiceNumber}`);
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: AdjustInvoiceInput) => {
		console.log("Submitting Adjustment:", data);
		await adjustInvoice(data);
		onClose();
	};

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	if (!invoice) return null;

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER (Amber Themed) --- */}
				<SheetHeader className="p-6 sm:p-8 border-b border-border bg-linear-to-br from-amber-500/10 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<AlertTriangle className="w-24 h-24 text-amber-500" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
						<AlertTriangle className="w-6 h-6" />
					</div>
					<SheetTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Adjust Statement</SheetTitle>
					<SheetDescription className="text-xs sm:text-sm text-muted-foreground font-medium max-w-[90%]">
						Modifying live invoice <strong className="font-mono text-foreground">{invoice.invoiceNumber}</strong>. Changes will immediately reflect on the clinic&apos;s public link.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8  custom-scrollbar">
					<form id="adjust-invoice-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
						{isFinancialsLocked && (
							<div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-border flex items-start gap-3">
								<Lock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
								<p className="text-[11px] text-muted-foreground leading-relaxed">
									Because this invoice is <strong className="text-foreground">{invoice.status}</strong>, financial terms and due dates are locked. You may only append internal notes.
								</p>
							</div>
						)}

						{/* 1. LOGISTICS (DUE DATE) */}
						<div className={cn("flex flex-col gap-4", isFinancialsLocked && "opacity-50 pointer-events-none")}>
							<div className="flex items-center gap-2 mb-2 px-1">
								<CalendarIcon className="w-4 h-4 text-amber-500" />
								<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Term Extension</h3>
							</div>

							<Controller
								control={form.control}
								name="dueDate"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="dueDate" fieldTitle="Revised Due Date" isOptional>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													disabled={isFinancialsLocked}
													className={cn(
														"w-full h-11 justify-start text-left font-normal rounded-xl border-border bg-white dark:bg-[#121214] hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm",
														!field.value && "text-muted-foreground",
														fieldState.invalid && "border-destructive focus:ring-destructive/20 focus:border-destructive",
													)}
												>
													<CalendarIcon className={cn("w-4 h-4 mr-3", field.value ? "text-amber-500" : "text-slate-400")} />
													<span className="text-sm font-semibold text-foreground">{field.value ? format(field.value, "MMM dd, yyyy") : "Select extended deadline..."}</span>
												</Button>
											</PopoverTrigger>

											<PopoverContent className="w-auto p-0 rounded-2xl border-border shadow-premium overflow-hidden" align="start">
												<Calendar
													mode="single"
													selected={field.value ?? undefined}
													onSelect={field.onChange}
													initialFocus
													className="p-3 pointer-events-auto"
													classNames={{
														day_selected: "bg-amber-600 text-white hover:bg-amber-600 focus:bg-amber-600 rounded-lg",
														day_today: "bg-amber-500/10 text-amber-600 rounded-lg",
													}}
												/>
											</PopoverContent>
										</Popover>
									</CustomFieldWithLabel>
								)}
							/>
						</div>

						{/* 2. FINANCIAL OVERRIDES */}
						<div className={cn("flex flex-col gap-4", isFinancialsLocked && "opacity-50 pointer-events-none")}>
							<div className="flex items-center gap-2 mb-2 px-1">
								<Percent className="w-4 h-4 text-amber-500" />
								<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Post-Issuance Discount</h3>
							</div>

							<div className="lab-card p-5 flex flex-col gap-5 bg-amber-500/2 border-amber-500/20">
								<Controller
									control={form.control}
									name="discountPercentage"
									render={({ field, fieldState }) => (
										<InputWithLabel
											type="number"
											field={field}
											fieldState={fieldState}
											fieldTitle="Revised Discount (%)"
											nameInSchema="discountPercentage"
											placeholder="0.0"
											max={100}
											min={0}
											isOptional
											inputClassName="font-mono text-amber-600 dark:text-amber-500 font-bold focus-visible:border-amber-500 focus-visible:ring-amber-500/20"
										/>
									)}
								/>

								<div className={cn("grid transition-all duration-300 ease-in-out", discountVal > 0 ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
									<div className="overflow-hidden min-h-0 pt-1 flex flex-col gap-4">
										<Controller
											control={form.control}
											name="discountReason"
											render={({ field, fieldState }) => (
												<InputWithLabel
													field={field}
													fieldState={fieldState}
													fieldTitle="Adjustment Reason (Required)"
													nameInSchema="discountReason"
													placeholder="e.g. Apology for late delivery..."
													inputClassName="focus-visible:border-amber-500 focus-visible:ring-amber-500/20"
												/>
											)}
										/>

										{/* Instant visual confirmation of the math rule */}
										<div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-1.5">
											<div className="flex justify-between text-[10px] font-bold text-amber-700 dark:text-amber-500 uppercase tracking-widest">
												<span>Adjustment Preview</span>
												<span>-{formatMoney(calculatedPreview.discount)}</span>
											</div>
											<div className="flex justify-between text-xs font-bold text-foreground">
												<span>New Statement Total</span>
												<span className="font-mono">{formatMoney(calculatedPreview.newTotal)}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* 3. METADATA (Always Editable) */}
						<div className="flex flex-col gap-4 pt-4 border-t border-border">
							<div className="flex items-center gap-2 mb-2 px-1">
								<FileText className="w-4 h-4 text-primary" />
								<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Statement Memo</h3>
							</div>

							<Controller
								control={form.control}
								name="notes"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="notes" fieldTitle="Accountant Notes (Public)" isOptional>
										<div className="relative group">
											<div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
											<textarea
												{...field}
												value={field.value ?? ""}
												placeholder="These notes will be printed on the final PDF statement..."
												className={cn(
													"relative w-full min-h-25 p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm custom-scrollbar",
													"focus:border-primary focus:ring-[3px] focus:ring-primary/20",
													fieldState.invalid && "border-destructive focus:border-destructive focus:ring-destructive/20",
												)}
											/>
										</div>
									</CustomFieldWithLabel>
								)}
							/>
						</div>
					</form>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-6 sm:p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !form.formState.isDirty}
						form="adjust-invoice-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-amber-600 hover:bg-amber-700 shadow-premium font-bold transition-all text-white shrink-0"
					>
						{isExecuting ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : (
							<>
								Save Adjustments <Save className="w-4 h-4" />
							</>
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});
