"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Printer, CreditCard, Ban, CheckCircle2, Edit3 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Schemas & State
import { InvoiceDetailsDTO } from "@/schema/composed/invoices/invoice-details.dtos";

// Billed Elements (Left Pane)
import { DigitalBillHeader } from "./left-pane/digital-bill-header";
import { DigitalBillLineItems } from "./left-pane/digital-bill-line-items";
import { DigitalBillFooter } from "./left-pane/digital-bill-footer";

// Financial Elements (Right Pane)
import { ClinicStatusGauge } from "./right-pane/clinic-status-gauge";
import { PaymentHistoryTimeline } from "./right-pane/payment-history-timeline";
import { StatementSharingBox } from "./right-pane/statement-sharing-box";
import { useInvoiceUiStore } from "@/store/invoices/use-invoice-ui-store";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { getInvoiceDossierAction } from "@/actions/invoices/get-invoice-dossier-action";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { InvoiceAdminDropdown } from "./invoice-admin-dropdown";

interface Props {
	initialData: InvoiceDetailsDTO;
	labId: string;
	initialAction?: string;
}

const RecordPaymentSheet = dynamic(() => import("../../modals/invoices/payments/record-payment-sheet").then((cm) => cm.RecordPaymentSheet), {
	ssr: false,
});

const InvoiceAdjustmentSheet = dynamic(() => import("../../modals/invoices/invoice-adjustment/invoice-adjustment-sheet").then((cm) => cm.InvoiceAdjustmentSheet), {
	ssr: false,
});

export function InvoiceDossierClient({ initialData, initialAction }: Props) {
	const router = useRouter();
	const pathname = usePathname();

	// ── 1. LIVE DATA DESK (TanStack Query) ───────────────────────────
	// Hydrates instantly with Server DTO. Automatically updates when payments are logged.
	const { data: invoice } = useQuery({
		queryKey: ["invoice-details", initialData.id],
		queryFn: async () => {
			const res = await getInvoiceDossierAction({
				invoiceId: initialData.id,
			});
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res?.data?.dossier as InvoiceDetailsDTO) || null;
		},
		initialData,
		staleTime: 1000 * 60 * 5, // 5 min
	});

	// ── 2. STATE COORDINATION ────────────────────────────────────────
	// Initialize directly from the server prop [1]
	const [isAdjustOpen, setIsAdjustOpen] = useState(initialAction === "adjust");
	const [prevAction, setPrevAction] = useState(initialAction);

	// 🔥 RENDER-PHASE PROP SYNC (No useEffect, no cascading warnings) [2]
	// Safely updates local state during render when server props change
	if (initialAction !== prevAction) {
		setPrevAction(initialAction);
		if (initialAction === "adjust") {
			setIsAdjustOpen(true);
		}
	}

	// ── 2. GLOBAL MODAL STORE CONNECTORS ─────────────────────────────
	const paymentInvoice = useInvoiceUiStore((s) => s.paymentInvoice);
	const openPaymentSheet = useInvoiceUiStore((s) => s.openPaymentSheet);
	const closePaymentSheet = useInvoiceUiStore((s) => s.closePaymentSheet);

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	const isPaid = invoice.status === "PAID";
	const isCancelled = invoice.status === "CANCELLED"; // 🔥 NEW: Isolate Cancelled State
	const isOverdue = invoice.isOverdue && !isPaid && !isCancelled;

	// Extract the date of the final payment to stamp on the seal
	const finalPaymentDate = invoice.payments.length > 0 ? invoice.payments[0].paidAt : invoice.updatedAt;

	// ── 3. URL PARAM DEEP LINKING HANDSHAKE ──────────────────────────
	// Clean up the URL on close by pushing back to the clean pathname
	const handleCloseAdjustment = useCallback(() => {
		setIsAdjustOpen(false);
		router.replace(pathname); // Wipes '?action=adjust' from address bar [3]
	}, [router, pathname]);

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative overflow-hidden print:bg-white print:h-auto print:overflow-visible print:block">
			{/* ── ZONE A: STICKY DOSSIER COMMAND HEADER ────────────────────── */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border print:hidden">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
					{/* Left: Wayfinding */}
					<div className="flex items-start sm:items-center gap-3 sm:gap-4">
						<Link href="/invoices" className="shrink-0">
							<Button
								variant="outline"
								size="icon"
								className="rounded-xl border-border bg-white dark:bg-white/5 shadow-sm hover:border-emerald-500/30 hover:text-emerald-600 transition-colors h-9 w-9 sm:h-10 sm:w-10"
							>
								<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-zinc-400" />
							</Button>
						</Link>
						<div className="flex flex-col min-w-0">
							<div className="flex items-center gap-3">
								<h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tighter text-foreground line-clamp-1">#{invoice.invoiceNumber}</h1>

								{/* --- THE UPDATED STATUS BADGE --- */}
								<span
									className={cn(
										"hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-widest shadow-sm",
										isPaid
											? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
											: isCancelled
												? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 border-dashed"
												: isOverdue
													? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 animate-pulse"
													: "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border",
									)}
								>
									{isPaid
										? "Paid in Full"
										: isCancelled
											? "Voided / Cancelled"
											: isOverdue
												? // 🔥 THE INJECTED AGING COUNTER
													`Overdue • ${invoice.agingDays} Days Aging`
												: invoice.status}
								</span>
							</div>
							<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 line-clamp-1 font-medium">
								Issued to <strong className="text-foreground">{invoice.clinic.name}</strong>
							</p>
						</div>
					</div>

					{/* Right: Dossier Actions */}
					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0 justify-end">
						{/* --- THE DYNAMIC EDIT / ADJUST BUTTON --- */}
						{invoice.status === "DRAFT" ? (
							// DRAFT STATE: Full Page complete overwrite access
							<Button
								asChild
								variant="outline"
								className="rounded-xl font-bold border-border bg-white dark:bg-white/5 h-10 px-4 shadow-sm text-xs hover:bg-slate-50 dark:hover:bg-white/10 transition-all print:hidden"
							>
								<Link href={`/invoices/${invoice.id}/edit`}>
									<Edit3 className="w-4 h-4 mr-2 opacity-60" />
									Edit Draft
								</Link>
							</Button>
						) : (
							// LIVE STATE: Controlled Delta Adjustment only (Slide-over)
							<Button
								variant="outline"
								disabled={isCancelled} // Locked completely if voided/cancelled
								onClick={() => setIsAdjustOpen(true)}
								className={cn(
									"rounded-xl font-bold border-border bg-white dark:bg-white/5 h-10 px-4 shadow-sm text-xs transition-all print:hidden",
									isCancelled ? "opacity-40 cursor-not-allowed pointer-events-none" : "hover:bg-slate-50 dark:hover:bg-white/10",
								)}
							>
								<Edit3 className="w-4 h-4 mr-2 opacity-60" />
								Adjust Statement
							</Button>
						)}

						<Button
							variant="outline"
							onClick={() => window.print()}
							className="rounded-xl font-bold border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 h-10 px-4 transition-all shadow-sm text-xs print:hidden"
						>
							<Printer className="w-4 h-4 mr-2 opacity-60" />
							Print
						</Button>

						{/* RECORD PAYMENT (Locked out if Paid or Cancelled) */}
						{!isPaid && !isCancelled && invoice.status !== "DRAFT" && (
							<Button
								onClick={() => openPaymentSheet(invoice)}
								className="rounded-xl h-10 px-6 font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-premium shadow-emerald-500/20 text-xs transition-all print:hidden"
							>
								<CreditCard className="w-4 h-4 mr-2" />
								Log Payment
							</Button>
						)}

						<InvoiceAdminDropdown invoiceId={invoice.id} invoiceNumber={invoice.invoiceNumber} status={invoice.status} clinicName={invoice.clinic.name} totalAmount={invoice.total} />
					</div>
				</div>
			</header>

			{/* ── STICKY SPLIT CANVAS ───────────────────────────────────────── */}
			<div className="flex-1 min-h-0 relative z-10 w-full print:block print:h-auto">
				<AmbientBgGlow variant="emerald" />

				<div className="flex flex-col xl:flex-row gap-8 h-full max-w-500 mx-auto px-4 sm:px-6 lg:px-8">
					{/* LEFT PANE: The Digital Bill (70%) */}
					<div className="flex-1 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-32 print:overflow-visible print:h-auto print:p-0 print:m-0">
						{/* 
                            THE DISSATURATION UPGRADE:
                            If cancelled, apply subtle grayscale and opacity to the bill sheet.
                        */}
						<div
							className={cn(
								"bg-white dark:bg-[#121214] border border-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden transition-all pr-2",
								// Print overrides: remove borders, shadows, dark backgrounds, and rounded corners
								"print:bg-white print:border-none print:shadow-none print:rounded-none print:p-0",
								isCancelled && "grayscale-35 opacity-90 border-dashed border-rose-500/20",
							)}
						>
							<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent" />

							<DigitalBillHeader
								lab={invoice.lab}
								clinic={invoice.clinic}
								issuedAt={invoice.issuedAt}
								dueDate={invoice.dueDate}
								invoiceNumber={invoice.invoiceNumber}
								isOverdue={invoice.isOverdue}
								agingDays={invoice.agingDays} // <-- Don't forget to pass this!
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
								notes={invoice.notes} // 🔥 ADD THIS PROP
							/>

							{/* 
								THE HOLE 2: DIAGONAL WATERMARK
								Perfectly centered, rotated, un-selectable VOID stamp 
							*/}
							{isCancelled && (
								<div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
									<span className="text-[130px] sm:text-[180px] lg:text-[220px] font-black tracking-[0.25em] text-rose-500/4 dark:text-rose-500/6 rotate-[-15deg] transform-gpu">
										VOID
									</span>
								</div>
							)}

							{/* 
								HOLE 3: THE HOLOGRAPHIC PAID SEAL 
								A beautiful, glowing, slightly rotated stamp that animates in.
							*/}
							{isPaid && (
								<div className="absolute top-8 right-8 z-20 pointer-events-none select-none print:top-0 print:right-0">
									<div className="relative transform-gpu -rotate-12 animate-in zoom-in-[1.5] fade-in duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
										{/* Outer Ring */}
										<div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-emerald-500/40 dark:border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 backdrop-blur-[2px]">
											{/* Inner Dashed Ring */}
											<div className="w-31 h-31 sm:w-39 sm:h-39 rounded-full border-2 border-dashed border-emerald-500/60 dark:border-emerald-500/50 flex flex-col items-center justify-center p-2">
												<CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 mb-1 opacity-90" />
												<span className="font-black text-xl sm:text-2xl tracking-[0.2em] text-emerald-600 dark:text-emerald-400 uppercase leading-none">PAID</span>
												<div className="mt-1 flex items-center gap-1 border-t border-emerald-500/30 pt-1">
													<span className="text-[8px] sm:text-[9px] font-mono font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-widest">
														{finalPaymentDate ? format(new Date(finalPaymentDate), "MMM dd, yyyy") : "Settled"}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* RIGHT PANE: The Accounting Sidebar (30%) [s1] */}
					<div className="hidden xl:flex w-96 shrink-0 flex-col gap-6 h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-12 print:hidden">
						{/* 1.  Status Gauge (Will render as grey/unpaid if cancelled) */}
						<ClinicStatusGauge
							amountPaid={invoice.amountPaid}
							isOverdue={isOverdue} // Will be false if cancelled
							progress={isCancelled ? 0 : invoice.paymentProgressPct}
							amountDue={isCancelled ? 0 : invoice.amountDue}
						/>
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

					{/* Mobile Floating Bars */}
					{!isPaid && !isCancelled && (
						<div className="xl:hidden sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-auto flex items-center justify-between print:hidden">
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

					{isCancelled && (
						<div className="xl:hidden sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 left-0 right-0 z-40 bg-rose-500/10 border-t border-rose-500/20 p-4 shadow-lg mt-auto flex items-center justify-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest print:hidden">
							<Ban className="w-4 h-4" /> Ledger Voided
						</div>
					)}
				</div>
			</div>

			{/* --- THE ADJUSTMENT SHEET --- */}
			<InvoiceAdjustmentSheet
				isOpen={isAdjustOpen}
				onClose={handleCloseAdjustment} // Cleans the URL search params smoothly on close
				invoice={{
					id: invoice.id,
					invoiceNumber: invoice.invoiceNumber,
					status: invoice.status,
					subtotal: invoice.subtotal,
					dueDate: invoice.dueDate,
					appliedDiscountPercentage: invoice.appliedDiscountPercentage,
					discountReason: invoice.discountReason,
					notes: invoice.notes,
				}}
			/>

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
