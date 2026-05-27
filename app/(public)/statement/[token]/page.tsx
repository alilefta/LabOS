import { notFound } from "next/navigation";
import { format, isAfter } from "date-fns";

import { CheckCircle2, AlertTriangle, Phone, Mail, Stethoscope, FileText } from "lucide-react";
import { getPublicInvoiceByToken } from "@/data/invoices/get-public-invoice";
import { PrintInvoiceButton } from "@/components/statement/public-invoice/print-invoice-button";

interface Props {
	params: Promise<{ token: string }>;
}

export default async function PublicStatementPage({ params }: Props) {
	const { token } = await params;
	const results = await getPublicInvoiceByToken(token);

	if (!results.success) {
		notFound();
	}

	const invoice = results.data;

	// If token is invalid or expired, show the custom 404
	if (!invoice) {
		return <PublicLinkExpiredView />;
	}

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPaid = invoice.status === "PAID";
	const isOverdue = invoice.status === "OVERDUE" || (invoice.dueDate && isAfter(new Date(), invoice.dueDate) && !isPaid);

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-[#09090B] py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0 flex flex-col items-center">
			{/* Ambient Glowing Background (Hidden on Print) */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none print:hidden" />

			<div className="w-full max-w-4xl space-y-6 relative z-10">
				{/* --- STICKY FLOAT HEADER (Hidden on Print) --- */}
				<div className="flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-[#121214]/80 border border-border/60 shadow-md backdrop-blur-md sticky top-4 z-30 print:hidden">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shadow-sm">
							<CheckCircle2 className="w-5 h-5" />
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-bold text-foreground">Verified Statement</span>
							<span className="text-[10px] text-muted-foreground font-mono uppercase">#{invoice.invoiceNumber}</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<PrintInvoiceButton />
					</div>
				</div>

				{/* --- THE DIGITAL WORK TICKET / STATEMENT SHEET --- */}
				<div className="bg-white dark:bg-[#121214] border border-border rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden transition-all print:border-none print:shadow-none print:p-0">
					{/* Perforated Edge Accent (Hidden on Print) */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500/30 to-transparent print:hidden" />

					{/* 1. STATEMENT HEADER */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-12 pb-8 border-b border-border/50">
						<div className="space-y-1">
							<div className="flex items-center gap-2 mb-2">
								<div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-[10px]">L</div>
								<span className="text-sm font-bold uppercase tracking-widest text-foreground">{invoice.lab.title} Statement</span>
							</div>
							<h2 className="text-3xl font-mono font-black tracking-tighter text-foreground">#{invoice.invoiceNumber}</h2>
							<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
								Issued: {invoice.issuedAt ? format(new Date(invoice.issuedAt), "MMM dd, yyyy") : "Draft Mode"}
							</p>
						</div>

						<div className="text-left sm:text-right flex flex-col gap-2 items-start sm:items-end">
							{isPaid ? (
								<div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
									ACCOUNT PAID
								</div>
							) : isOverdue ? (
								<div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-[10px] font-bold text-rose-600 dark:text-rose-500 uppercase tracking-widest animate-pulse">
									PAST DUE / OVERDUE
								</div>
							) : (
								<div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
									BALANCE OUTSTANDING
								</div>
							)}
							{invoice.dueDate && (
								<p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest mt-1">Payment Terms: Due {format(new Date(invoice.dueDate), "MMM dd, yyyy")}</p>
							)}
						</div>
					</div>

					{/* 2. PARTY METADATA (Lab vs Clinic) */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-8 border-b border-border/50">
						<div className="space-y-6">
							<div>
								<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Billed To</span>
								<p className="text-base font-bold text-foreground">{invoice.clinic.name}</p>
								<p className="text-xs text-muted-foreground mt-1">
									{invoice.clinic.address1}, {invoice.clinic.city}
								</p>
							</div>
							<div className="flex gap-4 text-xs font-medium text-muted-foreground">
								<span className="flex items-center gap-1.5">
									<Phone className="w-3.5 h-3.5 opacity-60" /> {invoice.clinic.phoneNumber}
								</span>
								<span className="flex items-center gap-1.5">
									<Mail className="w-3.5 h-3.5 opacity-60" /> {invoice.clinic.email}
								</span>
							</div>
						</div>

						{/* Memo Area */}
						<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border">
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
								<FileText className="w-3.5 h-3.5 text-emerald-500" /> Statement Memo
							</span>
							<p className="text-xs text-foreground leading-relaxed italic">
								{invoice.notes || "Thank you for your business. Please coordinate settlement using the standard payment instructions below."}
							</p>
						</div>
					</div>

					{/* 3. CASE LINE ITEMS */}
					<div className="space-y-6">
						<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
							<Stethoscope className="w-4 h-4 text-emerald-500" /> Billed Case Line Items ({invoice.cases.length})
						</h3>

						<div className="divide-y divide-border/50 border-t border-border">
							{invoice.cases.map((c, idx) => {
								const firstItem = c.workItems[0];
								const totalTeeth = firstItem?.teethCount ?? 0;

								return (
									<div key={c.id} className="py-5 flex items-center justify-between gap-4">
										<div>
											<div className="flex items-center gap-2 mb-1.5">
												<span className="text-[10px] font-mono font-bold text-muted-foreground bg-slate-100 dark:bg-white/5 border border-border px-1.5 py-0.5 rounded">
													#{c.caseNumber}
												</span>
												<span className="text-sm font-bold text-foreground">{c.patientName}</span>
											</div>
											<p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
												Prosthetic: <span className="text-foreground mr-3">{firstItem?.productName || "Analog/Custom Restoration"}</span>
												{totalTeeth > 0 && (
													<>
														Units: <span className="text-foreground">{totalTeeth}</span>
													</>
												)}
											</p>
										</div>
										<div className="text-right">
											<span className="font-mono font-bold text-foreground text-sm">{formatMoney(Number(c.caseTotal))}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* 4. TOTALS LEDGER */}
					<div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-end justify-between gap-8 bg-slate-50 dark:bg-white/[0.01] -mx-6 sm:-mx-12 p-6 sm:px-12 pb-6">
						<div className="space-y-2 font-mono text-xs max-w-sm w-full">
							<div className="flex justify-between">
								<span className="text-muted-foreground font-sans font-bold uppercase tracking-widest text-[9px]">Invoice Subtotal</span>
								<span className="font-bold text-foreground">{formatMoney(Number(invoice.subtotal))}</span>
							</div>
							{Number(invoice.discountAmount) > 0 && (
								<div className="flex justify-between text-emerald-600">
									<span className="text-emerald-500 font-sans font-bold uppercase tracking-widest text-[9px]">Global Discount ({Number(invoice.discountAmount)}%)</span>
									<span className="font-bold">-{formatMoney(Number(invoice.discountAmount))}</span>
								</div>
							)}
							<div className="h-px bg-border border-dashed my-3" />
							<div className="flex justify-between items-end">
								<span className="text-xs font-black text-foreground uppercase tracking-widest font-sans">Statement Total</span>
								<span className="text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400 leading-none">{formatMoney(Number(invoice.total))}</span>
							</div>
						</div>

						{/* Public Settlement Alert */}
						{!isPaid && (
							<div className="max-w-xs text-left sm:text-right">
								<p className="text-[10px] text-muted-foreground/80 leading-relaxed font-medium">
									Please settle using Bank Transfer or Zain Cash. Note the invoice number <strong className="font-mono text-foreground">#{invoice.invoiceNumber}</strong> in the
									transaction memo.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

// ── EXPIRATION / INVALID VIEW ───────────────────────────────────────────────
function PublicLinkExpiredView() {
	return (
		<div className="min-h-screen bg-slate-50 dark:bg-[#09090B] flex flex-col items-center justify-center p-8 text-center">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
			<div className="relative z-10 max-w-md animate-in fade-in zoom-in-95 duration-500">
				<div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
					<AlertTriangle className="w-8 h-8 animate-pulse" />
				</div>
				<h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">Statement Expired or Invalid</h3>
				<p className="text-sm text-muted-foreground leading-relaxed font-medium">
					This public billing link has either surpassed its 90-day security lifetime, been cancelled, or never existed. Please contact your dental laboratory manager to request a fresh
					statement.
				</p>
			</div>
		</div>
	);
}
