"use client";

import { memo } from "react";
import { format } from "date-fns";
import { Banknote, Smartphone, CreditCard, Building, Receipt, History, HelpCircle, LucideIcon, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { InvoicePaymentDTO } from "@/schema/composed/invoices/invoice-details.dtos";
import { PaymentMethod } from "@/schema/base/enums.base";

// --- PAYMENT METHODS CONFIG ---
const METHOD_CONFIG: Record<PaymentMethod, { label: string; icon: LucideIcon; colorClass: string; borderAccent: string }> = {
	CASH: { label: "Cash", icon: Banknote, colorClass: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20", borderAccent: "border-l-emerald-500" },
	ZAIN_CASH: { label: "Zain Cash", icon: Smartphone, colorClass: "text-rose-500 bg-rose-500/10 border-rose-500/20", borderAccent: "border-l-rose-500" },
	ASIA_HAWALA: { label: "Asia Hawala", icon: Smartphone, colorClass: "text-amber-500 bg-amber-500/10 border-amber-500/20", borderAccent: "border-l-amber-500" },
	SUPER_QI: { label: "Super QI", icon: CreditCard, colorClass: "text-blue-500 bg-blue-500/10 border-blue-500/20", borderAccent: "border-l-blue-500" },
	BANK_TRANSFER: { label: "Bank Transfer", icon: Building, colorClass: "text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-white/5 border-border", borderAccent: "border-l-slate-400" },
	PADDLE: { label: "Paddle", icon: Receipt, colorClass: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20", borderAccent: "border-l-indigo-500" },
	STRIPE: { label: "Stripe", icon: CreditCard, colorClass: "text-purple-500 bg-purple-500/10 border-purple-500/20", borderAccent: "border-l-purple-500" },
	OTHER: { label: "Other", icon: HelpCircle, colorClass: "text-muted-foreground bg-slate-100 border-border", borderAccent: "border-l-border" },
};

interface Props {
	payments: InvoicePaymentDTO[];
}

export const PaymentHistoryTimeline = memo(function PaymentHistoryTimeline({ payments }: Props) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isEmpty = payments.length === 0;

	// UX: Instant clipboard copy for transaction references
	const copyReference = (ref: string) => {
		navigator.clipboard.writeText(ref);
		toast.success(`Reference ${ref} copied to clipboard.`);
	};

	return (
		<div className="lab-card flex-1 flex flex-col p-6 overflow-hidden min-h-75">
			{/* --- HEADER --- */}
			<div className="flex items-center gap-3 mb-6 shrink-0 relative z-10">
				<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm">
					<History className="w-4 h-4" />
				</div>
				<div>
					<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Receipt Timeline</h3>
					<p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">
						{payments.length} Transaction{payments.length === 1 ? "" : "s"} Logged
					</p>
				</div>
			</div>

			{/* --- TIMELINE CONTAINER --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar relative pr-1 min-h-0">
				{isEmpty ? (
					// EMPTY STATE: Polished to match the emerald financial theme
					<div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-60 animate-in fade-in duration-500">
						<div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-3 shadow-sm">
							<Receipt className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
						</div>
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">No Payments Recorded</p>
						<p className="text-[10px] text-muted-foreground mt-1 max-w-45 leading-relaxed">Outstanding balance remains uncollected. Log a payment below.</p>
					</div>
				) : (
					<div className="relative pl-6 py-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
						{/* Vertical Tracking Line */}
						<div className="absolute top-4 bottom-4 left-3 w-px bg-border/80 border-dashed" />

						{/* Timeline List */}
						<div className="space-y-6">
							{payments.map((p, index) => {
								const config = METHOD_CONFIG[p.method] || METHOD_CONFIG["OTHER"];
								const Icon = config.icon;
								const isFirst = index === 0;

								return (
									<div key={p.id} className="relative flex gap-4 items-start group">
										{/* Timeline Node */}
										<div className="relative shrink-0 mt-0.5">
											{isFirst && <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-[3px] animate-pulse" />}
											<div
												className={cn(
													"w-6 h-6 rounded-full border flex items-center justify-center relative z-10 bg-background transition-transform duration-300 group-hover:scale-110 shadow-sm",
													config.colorClass,
												)}
											>
												<Icon className="w-3 h-3" />
											</div>
										</div>

										{/* Receipt Details */}
										<div className="flex-1 min-w-0 flex flex-col pb-1">
											<div className="flex items-baseline justify-between mb-1">
												<span className="text-xs font-bold text-foreground">{config.label}</span>
												<span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-500">+{formatMoney(p.amount)}</span>
											</div>

											{/* Transaction Meta */}
											<div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground font-mono">
												<span>{format(new Date(p.paidAt), "MMM dd, yyyy • HH:mm")}</span>

												{p.reference && (
													<>
														<span className="opacity-30 hidden sm:inline">•</span>
														<button
															type="button"
															onClick={() => copyReference(p.reference!)}
															className="flex items-center gap-1 hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/10 px-1.5 py-0.5 rounded transition-colors group/ref"
															title="Copy Reference ID"
														>
															Ref: <span className="truncate max-w-25">{p.reference}</span>
															<Copy className="w-2.5 h-2.5 opacity-0 group-hover/ref:opacity-100 transition-opacity" />
														</button>
													</>
												)}
											</div>

											{/* Accountant Notes */}
											{p.notes && (
												<div
													className={cn(
														"mt-2 p-2.5 rounded-r-lg rounded-bl-lg bg-slate-50 dark:bg-white/2 border border-border border-l-2 text-[10px] text-muted-foreground italic leading-relaxed shadow-sm",
														config.borderAccent,
													)}
												>
													&quot;{p.notes}&quot;
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
});

PaymentHistoryTimeline.displayName = "PaymentHistoryTimeline";
