"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Printer, CreditCard, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Schemas & State
import { InvoiceDetailsDTO } from "@/schema/composed/invoices/invoice-details.dtos";

// Billed Elements (Left Pane)
import { DigitalBillHeader } from "./digital-bill-header";
import { DigitalBillLineItems } from "./digital-bill-line-items";
import { DigitalBillFooter } from "./digital-bill-footer";

// Financial Elements (Right Pane)
import { ClinicStatusGauge } from "../right-pane/clinic-status-gauge";
import { PaymentHistoryTimeline } from "../right-pane/payment-history-timeline";
import { StatementSharingBox } from "../right-pane/statement-sharing-box";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { RecordPaymentSheet } from "@/components/modals/invoices/payments/record-payment-sheet";
import { useInvoiceUiStore } from "@/store/invoices/use-invoice-ui-store";

interface Props {
	initialData: InvoiceDetailsDTO;
	labId: string;
}

export function InvoiceDossierClient({ initialData, labId }: Props) {
	// ── 1. LIVE DATA DESK (TanStack Query) ───────────────────────────
	// Hydrates instantly with Server DTO. Automatically updates when payments are logged.
	const { data: invoice } = useQuery({
		queryKey: ["invoice-details", initialData.id],
		queryFn: async () => {
			// In production, fetch fresh data:
			// const res = await getInvoiceDossierData(initialData.id);
			// return res.data;
			return initialData;
		},
		initialData,
		staleTime: 1000 * 60 * 5, // 5 min
	});

	// ── 2. GLOBAL MODAL STORE CONNECTORS ─────────────────────────────
	const paymentInvoice = useInvoiceUiStore((s) => s.paymentInvoice);
	const openPaymentSheet = useInvoiceUiStore((s) => s.openPaymentSheet);
	const closePaymentSheet = useInvoiceUiStore((s) => s.closePaymentSheet);

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPaid = invoice.status === "PAID";
	const isOverdue = invoice.isOverdue && !isPaid;

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative overflow-hidden">
			{/* ── ZONE A: STICKY DOSSIER COMMAND HEADER ────────────────────── */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto w-full">
					{/* Left: Wayfinding */}
					<div className="flex items-start sm:items-center gap-3 sm:gap-4">
						<Link href="/invoices" className="shrink-0">
							<Button
								variant="outline"
								size="icon"
								className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:border-emerald-500/30 hover:text-emerald-600 transition-all h-9 w-9 sm:h-10 sm:w-10"
							>
								<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
							</Button>
						</Link>
						<div className="flex flex-col min-w-0">
							<div className="flex items-center gap-3">
								<h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tighter text-foreground line-clamp-1">#{invoice.invoiceNumber}</h1>

								<span
									className={cn(
										"hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-widest shadow-sm",
										isPaid
											? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
											: isOverdue
												? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 animate-pulse"
												: "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border",
									)}
								>
									{isPaid ? "Paid in Full" : isOverdue ? "Overdue" : invoice.status}
								</span>
							</div>
							<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1 font-medium">
								Issued to <strong className="text-foreground">{invoice.clinic.name}</strong>
							</p>
						</div>
					</div>

					{/* Right: Dossier Actions */}
					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0 justify-end">
						<Button
							variant="outline"
							onClick={() => window.print()}
							className="rounded-xl font-bold border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 h-10 px-4 transition-all shadow-sm text-xs print:hidden"
						>
							<Printer className="w-4 h-4 mr-2 opacity-60" />
							Print Invoice
						</Button>

						{/* RECORD PAYMENT (Sticky Header Backup) */}
						{!isPaid && (
							<Button
								onClick={() => openPaymentSheet(invoice)}
								className="rounded-xl h-10 px-6 font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-premium shadow-emerald-500/20 text-xs transition-all"
							>
								<CreditCard className="w-4 h-4 mr-2" />
								Log Payment
							</Button>
						)}
					</div>
				</div>
			</header>

			{/* ── STICKY SPLIT CANVAS ───────────────────────────────────────── */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="emerald" />

				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE: The Digital Bill (70%) [s1] */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-32">
						<div className="bg-white dark:bg-[#121214] border border-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all pr-2">
							<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

							<DigitalBillHeader
								lab={invoice.lab}
								clinic={invoice.clinic}
								issuedAt={invoice.issuedAt}
								dueDate={invoice.dueDate}
								invoiceNumber={invoice.invoiceNumber}
								isOverdue={invoice.isOverdue}
							/>
							<DigitalBillLineItems cases={invoice.cases} />
							<DigitalBillFooter
								subtotal={invoice.subtotal}
								discountAmount={invoice.discountAmount}
								total={invoice.total}
								amountPaid={invoice.amountPaid}
								amountDue={invoice.amountDue}
								appliedDiscountPercentage={invoice.appliedDiscountPercentage}
								discountReason={invoice.discountReason}
							/>
						</div>
					</div>

					{/* RIGHT PANE: The Accounting Sidebar (30%) [s1] */}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-12">
						{/* 1. Payment Status & Debt Gauge [3] */}
						<ClinicStatusGauge amountPaid={invoice.amountPaid} isOverdue={invoice.isOverdue} total={invoice.total} progress={invoice.paymentProgressPct} amountDue={invoice.amountDue} />

						{/* 2. Transaction Timeline */}
						<PaymentHistoryTimeline payments={invoice.payments} />

						{/* 3. Statement Sharing */}
						<StatementSharingBox
							amountDue={invoice.amountDue}
							clinicName={invoice.clinic.name}
							clinicPhone={invoice.clinic.phoneNumber}
							invoiceNumber={invoice.invoiceNumber}
							publicToken={invoice.publicToken}
						/>
					</div>

					{/* Mobile Floating Auditor (Tablet/Mobile Backup) */}
					{!isPaid && (
						<div className="xl:hidden sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-auto flex items-center justify-between">
							<div className="flex flex-col">
								<span className="text-xs font-bold text-foreground">Balance Due</span>
								<span className="text-lg font-mono font-bold text-rose-500">{formatMoney(invoice.amountDue)}</span>
							</div>
							<Button
								onClick={() => openPaymentSheet(invoice)}
								className="rounded-xl h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-premium flex items-center justify-center gap-2"
							>
								<CreditCard className="w-4 h-4" /> Log Payment
							</Button>
						</div>
					)}
				</div>
			</div>

			{/* --- GLOBAL SHEET RENDER --- */}
			{paymentInvoice && (
				<RecordPaymentSheet
					key={paymentInvoice.id}
					isOpen={!!paymentInvoice}
					onClose={closePaymentSheet}
					invoice={{
						id: paymentInvoice.id,
						invoiceNumber: paymentInvoice.invoiceNumber,
						clinicName: paymentInvoice.clinicName ? paymentInvoice.clinicName : "Selected Clinic",
						amountDue: paymentInvoice.amountDue,
						total: paymentInvoice.total,
					}}
				/>
			)}
		</div>
	);
}
