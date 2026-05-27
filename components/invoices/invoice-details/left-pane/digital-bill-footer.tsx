"use client";

import { BadgePercent, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface Props {
	subtotal: number;
	discountAmount: number;
	total: number;
	amountPaid: number;
	amountDue: number;
	appliedDiscountPercentage: number | null;
	discountReason: string | null;
}

export const DigitalBillFooter = memo(function DigitalBillFooter({ subtotal, discountAmount, total, amountPaid, amountDue, appliedDiscountPercentage, discountReason }: Props) {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPaidInFull = amountDue <= 0;
	const hasDiscount = appliedDiscountPercentage && appliedDiscountPercentage > 0;

	return (
		<div className="pt-8 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 animate-in fade-in duration-500 delay-300">
			{/* --- LEFT COLUMN: AUDIT & COMPLIANCE --- */}
			<div className="flex-1 max-w-sm space-y-4">
				{/* 1. Discount Voucher Flag */}
				{hasDiscount && (
					<div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
						<BadgePercent className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
						<div className="flex flex-col gap-0.5">
							<span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Authorized Discount ({appliedDiscountPercentage}%)</span>
							<p className="text-xs text-muted-foreground font-medium leading-normal italic">&quot;{discountReason || "Standard contract pricing override applied."}&quot;</p>
						</div>
					</div>
				)}

				{/* 2. Reconciled Certificate Seal */}
				{isPaidInFull ? (
					<div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex gap-3 items-start animate-in zoom-in-95 duration-500">
						<ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
						<div className="flex flex-col gap-0.5">
							<span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Ledger Reconciled</span>
							<p className="text-xs text-muted-foreground font-medium leading-normal">This invoice has been fully settled. No further outstanding balances exist on this statement.</p>
						</div>
					</div>
				) : (
					<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/1 border border-border flex gap-3 items-start">
						<HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
						<div className="flex flex-col gap-0.5">
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Payment Instructions</span>
							<p className="text-xs text-muted-foreground font-medium leading-normal">Please quote invoice number on bank transfer memos to ensure prompt automated posting.</p>
						</div>
					</div>
				)}
			</div>

			{/* --- RIGHT COLUMN: THE ACCOUNTING STACK --- */}
			<div className="w-full md:max-w-xs space-y-3 font-mono shrink-0">
				{/* Subtotal */}
				<div className="flex justify-between text-xs items-center">
					<span className="font-sans font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Subtotal</span>
					<span className="font-bold text-foreground">{formatMoney(subtotal)}</span>
				</div>

				{/* Discount (Conditional) */}
				{discountAmount > 0 && (
					<div className="flex justify-between text-xs items-center text-emerald-600 dark:text-emerald-500">
						<span className="font-sans font-bold uppercase text-[10px] tracking-wider">Discount</span>
						<span className="font-bold">-{formatMoney(discountAmount)}</span>
					</div>
				)}

				<div className="h-px bg-border/50 border-dashed" />

				{/* Grand Total */}
				<div className="flex justify-between text-xs items-center">
					<span className="font-sans font-bold text-muted-foreground uppercase text-[10px] tracking-wider">Statement Total</span>
					<span className="font-bold text-foreground">{formatMoney(total)}</span>
				</div>

				{/* Amount Paid */}
				{amountPaid > 0 && (
					<div className="flex justify-between text-xs items-center text-emerald-600 dark:text-emerald-500">
						<span className="font-sans font-bold uppercase text-[10px] tracking-wider">Amount Paid</span>
						<span className="font-bold">-{formatMoney(amountPaid)}</span>
					</div>
				)}

				<div className="h-px bg-border my-2" />

				{/* Balance Due (Remaining Balance) */}
				<div className="flex justify-between items-end">
					<span className="font-sans font-black text-foreground uppercase text-xs tracking-widest pb-1">Balance Due</span>
					<span className={cn("text-3xl font-black leading-none tracking-tighter", isPaidInFull ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500")}>
						{formatMoney(amountDue)}
					</span>
				</div>
			</div>
		</div>
	);
});
