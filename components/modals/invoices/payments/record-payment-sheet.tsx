"use client";

import { memo, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Banknote, CreditCard, Smartphone, Building, CheckCircle2, Loader2, Receipt, CalendarIcon, ArrowRight, LucideIcon } from "lucide-react";
import { format } from "date-fns";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { RecordPaymentInput, RecordPaymentInputSchema } from "@/schema/composed/invoices/invoices.dtos";
import { PaymentMethod } from "@/schema/base/enums.base";

// ── REGIONAL PAYMENT METHODS CONFIG ─────────────────────────────────────────
const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: LucideIcon; colorClass: string }[] = [
	{ id: "CASH", label: "Cash", icon: Banknote, colorClass: "text-emerald-500" },
	{ id: "ZAIN_CASH", label: "Zain Cash", icon: Smartphone, colorClass: "text-rose-500" },
	{ id: "ASIA_HAWALA", label: "Asia Hawala", icon: Smartphone, colorClass: "text-amber-500" },
	{ id: "SUPER_QI", label: "Super QI", icon: CreditCard, colorClass: "text-blue-500" },
	{ id: "BANK_TRANSFER", label: "Bank Transfer", icon: Building, colorClass: "text-slate-500 dark:text-zinc-400" },
	{ id: "OTHER", label: "Other", icon: Receipt, colorClass: "text-muted-foreground" },
];

interface Props {
	isOpen: boolean;
	onClose: () => void;
	invoice: {
		id: string;
		invoiceNumber: string;
		clinicName: string;
		amountDue: number;
		total: number;
	} | null;
}

export const RecordPaymentSheet = memo(function RecordPaymentSheet({ isOpen, onClose, invoice }: Props) {
	// --- FORM INIT ---
	const form = useForm<RecordPaymentInput>({
		resolver: zodResolver(RecordPaymentInputSchema),
		defaultValues: {
			invoiceId: "",
			amount: 0,
			method: "CASH",
			reference: "",
			notes: "",
			paidAt: new Date(),
		},
		mode: "onBlur",
	});

	// Reset form when opened with a new invoice
	useEffect(() => {
		if (isOpen && invoice) {
			form.reset({
				invoiceId: invoice.id,
				amount: invoice.amountDue, // UX Default: Assume they are paying exactly what is owed
				method: "CASH",
				reference: "",
				notes: "",
				paidAt: new Date(),
			});
		}
	}, [isOpen, invoice, form]);

	// --- UX RECONCILIATION ENGINE ---
	const inputAmount = useWatch({ control: form.control, name: "amount" }) || 0;

	// Real-time Math
	const remainingBalance = Math.max(0, (invoice?.amountDue || 0) - inputAmount);
	const isFullPayment = remainingBalance === 0;
	const isOverPayment = inputAmount > (invoice?.amountDue || 0);

	// --- SERVER ACTION (Placeholder) ---
	const isExecuting = false; // Replace with your useAction isExecuting later

	const onSubmit = async (data: RecordPaymentInput) => {
		if (isOverPayment) {
			toast.error("Overpayment detected. You cannot log more than the Amount Due.");
			return;
		}
		console.log("Recording Payment:", data);
		// await recordPayment(data);
		toast.success(`Payment of $${data.amount} recorded successfully.`);
		onClose();
	};

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	if (!invoice) return null;

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-emerald-500/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Banknote className="w-24 h-24 text-emerald-500" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
						<Receipt className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Record Payment</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">
						Log a received payment against <span className="font-mono font-bold text-foreground">{invoice.invoiceNumber}</span>.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-8 custom-scrollbar">
					{/* CLINIC CONTEXT BANNER */}
					<div className="flex items-center justify-between p-4 rounded-xl border border-border bg-slate-50 dark:bg-white/2">
						<div className="flex flex-col">
							<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Paying Entity</span>
							<span className="text-sm font-bold text-foreground">{invoice.clinicName}</span>
						</div>
						<div className="flex flex-col items-end">
							<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Amount Due</span>
							<span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(invoice.amountDue)}</span>
						</div>
					</div>

					<form id="record-payment-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
						{/* 1. AMOUNT INPUT (Massive Monospace) */}
						<Controller
							control={form.control}
							name="amount"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="amount" fieldTitle="Payment Amount">
									<div className="relative group">
										<div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500 opacity-50 font-bold text-xl flex items-center justify-center">$</div>
										<input
											{...field}
											type="number"
											step="0.01"
											value={field.value || ""}
											// FIX: Prevent accidental mouse-wheel scrolling from changing the payment amount!
											onWheel={(e) => e.currentTarget.blur()}
											className={cn(
												"w-full h-16 pl-12 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-3xl font-mono font-bold text-foreground focus:outline-none transition-all shadow-sm",
												// Removed browser spinner arrows
												"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
												fieldState.invalid
													? "border-destructive focus:ring-[3px] focus:ring-destructive/20"
													: "focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20",
											)}
										/>
									</div>
								</CustomFieldWithLabel>
							)}
						/>

						{/* 2. RECONCILIATION PREVIEW */}
						<div
							className={cn(
								"p-4 rounded-2xl border transition-colors duration-500 flex flex-col gap-3",
								isOverPayment ? "bg-destructive/10 border-destructive/30" : "bg-emerald-500/5 border-emerald-500/20",
							)}
						>
							<div className="flex items-center justify-between">
								<span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">New Balance</span>
								<span className={cn("text-lg font-mono font-bold", isOverPayment ? "text-destructive" : "text-foreground")}>
									{isOverPayment ? "OVERPAYMENT" : formatMoney(remainingBalance)}
								</span>
							</div>

							<div className="h-px bg-border/50" />

							<div className="flex items-center justify-between">
								<span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Resulting Status</span>
								<span
									className={cn(
										"px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border transition-colors duration-500",
										isFullPayment
											? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
											: isOverPayment
												? "bg-destructive/10 text-destructive border-destructive/20"
												: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20",
									)}
								>
									{isFullPayment ? "Paid in Full" : isOverPayment ? "Invalid State" : "Partial Payment"}
								</span>
							</div>
						</div>

						{/* 3. PAYMENT METHOD (Visual Grid) */}
						<div className="flex flex-col gap-3">
							<label className="text-[13px] font-bold text-slate-700 dark:text-zinc-300">Payment Method</label>
							<div className="grid grid-cols-2 gap-3">
								<Controller
									control={form.control}
									name="method"
									render={({ field }) => (
										<>
											{PAYMENT_METHODS.map((method) => {
												const isSelected = field.value === method.id;
												return (
													<button
														key={method.id}
														type="button"
														onClick={() => field.onChange(method.id)}
														className={cn(
															"flex flex-col p-4 rounded-xl border text-left transition-all duration-300 group",
															// FIX: Changed from Primary (Blue) to Emerald (Green) to match financial theme
															isSelected
																? "bg-emerald-500/5 border-emerald-500 ring-1 ring-emerald-500/20 shadow-sm"
																: "bg-card border-border hover:bg-slate-50 dark:hover:bg-white/2",
														)}
													>
														<div className="flex items-center justify-between w-full mb-3">
															<method.icon
																className={cn("w-5 h-5 transition-colors", isSelected ? method.colorClass : "text-muted-foreground group-hover:text-foreground")}
															/>
															<div
																className={cn(
																	"w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center",
																	// FIX: Changed selection dot to Emerald
																	isSelected ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-zinc-700",
																)}
															>
																{isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
															</div>
														</div>
														<span className={cn("text-xs font-bold", isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
															{method.label}
														</span>
													</button>
												);
											})}
										</>
									)}
								/>
							</div>
						</div>

						{/* 4. DATE AND REFERENCE */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
							<Controller
								control={form.control}
								name="paidAt"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} fieldTitle="Payment Date" nameInSchema="paidAt" containerClassName="justify-between">
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full h-11 justify-start text-left font-normal rounded-xl border-border bg-card hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm",
														fieldState.invalid && "border-destructive focus:ring-destructive/20",
													)}
												>
													<CalendarIcon className="mr-3 h-4 w-4 text-emerald-500" />
													<span className="text-sm font-semibold text-foreground">{field.value ? format(field.value, "MMM dd, yyyy") : "Select date"}</span>
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0 rounded-2xl border-border shadow-premium" align="start">
												<Calendar mode="single" selected={field.value} onSelect={field.onChange} autoFocus className="p-3" />
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
										containerClassName="justify-between"
										fieldTitle="Txn / Ref Number"
										nameInSchema="reference"
										placeholder="e.g. ZC-123456"
										isOptional
									/>
								)}
							/>
						</div>

						<Controller
							control={form.control}
							name="notes"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="notes" fieldTitle="Internal Notes" isOptional>
									<textarea
										{...field}
										value={field.value ?? ""}
										placeholder="e.g. Paid in cash directly to delivery driver."
										className="w-full min-h-20 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/20 custom-scrollbar"
									/>
								</CustomFieldWithLabel>
							)}
						/>
					</form>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-6 sm:p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || isOverPayment}
						form="record-payment-form"
						className={cn(
							"rounded-xl flex items-center justify-center gap-2 h-11 shadow-premium font-bold transition-all text-white shrink-0",
							isOverPayment
								? "bg-slate-300 dark:bg-white/10 text-muted-foreground cursor-not-allowed" // UX: Physically grey out the button on overpayment
								: "bg-emerald-600 hover:bg-emerald-700",
						)}
					>
						{isExecuting ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : isOverPayment ? (
							<>Invalid Amount</>
						) : (
							<>
								Log Payment <ArrowRight className="w-4 h-4" />
							</>
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});
