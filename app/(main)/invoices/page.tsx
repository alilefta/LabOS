import { redirect } from "next/navigation";
import { Plus, Receipt, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/get-session";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { UninvoicedClinicsQuickBar } from "@/components/invoices/invoices-page/uninvoiced-clinics-quick-bar";
import { InvoicesDashboardClient } from "@/components/invoices/invoices-page/invoices-dashboard-client";
import { AskAiButton } from "@/components/copilot/ask-ai-button";
import { GlobalTimeFramePeriod, GlobalTimeFramePeriodSchema } from "@/schema/composed/shared/date-preset";
import { TimeFrameFilter } from "@/components/shared/filters/time-frame-filter";
import { RiskRadarQuickBar } from "@/components/invoices/invoices-page/risk-radar-quick-bar";
import { getQueryClient } from "@/providers/get-query-client";
import { QueryHydrationBoundary } from "@/providers/query-hydration-boundary";
import { dehydrate } from "@tanstack/react-query";
import { getInvoicesListAction } from "@/actions/invoices/get-invoices";
import { GetInvoicesListResult, RiskClinicDTO, UninvoicedClinicsSummary } from "@/schema/composed/invoices/invoices.dtos";
import { DEFAULT_INVOICE_FILTERS } from "@/schema/composed/invoices/invoice-filters";
import { getArRiskClinicsAction } from "@/actions/invoices/get-risk-clinics";
import { getUninvoicedClinicsSummary } from "@/data/invoices/get-invoices";
import Link from "next/link";

export const metadata = {
	title: "Accounts Receivable | LabOS",
};

export default async function InvoicesDashboardPage({ searchParams }: { searchParams: Promise<{ period?: string }> }) {
	const queryClient = getQueryClient();
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labId = session.user.labId;
	if (!labId) redirect("/onboarding");

	const { period } = await searchParams;
	const parsedPeriod = GlobalTimeFramePeriodSchema.safeParse(period);
	const activePeriod = (parsedPeriod.success ? parsedPeriod.data : "30d") as GlobalTimeFramePeriod;

	// 1. Fetch High-Priority Actionable Data on the Server
	const res = await getUninvoicedClinicsSummary();

	const pendingBillingSummary = res.success ? res.data : ({ clinics: [], totalUnbilledCases: 0 } as UninvoicedClinicsSummary);
	await queryClient.prefetchInfiniteQuery({
		queryKey: ["invoices-list", labId, "", DEFAULT_INVOICE_FILTERS],
		queryFn: async ({ pageParam }): Promise<GetInvoicesListResult> => {
			const res = await getInvoicesListAction({
				cursor: pageParam as string | undefined,
				search: "",
				filters: DEFAULT_INVOICE_FILTERS,
				take: 30,
			});

			return res?.data ?? { invoices: [], nextCursor: null, totalCount: 0, totalAmountDue: 0 };
		},
		initialPageParam: undefined as string | undefined,
	});

	await queryClient.prefetchQuery({
		queryKey: ["ar-risk-radar", labId],
		queryFn: async () => {
			const res = await getArRiskClinicsAction(); // Get clinics exceeding limit OR with overdue invoices
			return (res?.data?.clinics as RiskClinicDTO[]) || [];
		},
	});

	return (
		<div className="flex flex-col h-full animate-in fade-in duration-700 bg-background relative">
			{/* ── STICKY HEADER ─────────────────────────────────────────────── */}
			<header className="shrink-0 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-4 pb-4">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 max-w-500 mx-auto w-full">
					<div>
						<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
							<Receipt className="w-6 h-6 text-emerald-500 opacity-80" />
							Accounts Receivable
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">Manage billing, collect payments, and track outstanding balances.</p>
					</div>

					<div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto mt-1 md:mt-0">
						<TimeFrameFilter activePeriod={activePeriod} />

						<AskAiButton mode="INVOICES" />

						<Button
							variant="outline"
							className="h-10 rounded-xl border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-foreground font-semibold shadow-sm transition-all"
						>
							<FileDown className="w-4 h-4 sm:mr-2 text-muted-foreground" />
							<span className="hidden sm:inline">Export Aging Report</span>
						</Button>
						<Button className="h-10 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 transition-all">
							<Link href={"/invoices/new-invoice"} className="flex items-center gap-2">
								<Plus className="w-4 h-4 mr-2" /> New Invoice
							</Link>
						</Button>
					</div>
				</div>
			</header>

			{/* ── SCROLLABLE WORKSPACE ───────────────────────────────────────── */}
			<div className="flex-1 min-h-0 relative z-10 w-full">
				<AmbientBgGlow variant="emerald" />

				<div className="h-full overflow-y-auto custom-scrollbar pt-6 lg:pt-8 pb-32">
					<div className="flex flex-col gap-8 max-w-500 mx-auto px-4 sm:px-6 lg:px-8">
						{/* 1. UNINVOICED CASES (PREFETCHED) */}
						{pendingBillingSummary.totalUnbilledCases > 0 && <UninvoicedClinicsQuickBar summary={pendingBillingSummary} />}

						{/* 2. THE RISK RADAR (DANGER CONTEXT - CLIENT DRIVEN) */}
						<QueryHydrationBoundary state={dehydrate(queryClient)}>
							<RiskRadarQuickBar labId={labId} />
						</QueryHydrationBoundary>

						{/* 3. THE CLIENT WRAPPER (Handles Vitals + Table + Filters) */}
						<QueryHydrationBoundary state={dehydrate(queryClient)}>
							<InvoicesDashboardClient labId={labId} period={activePeriod} />
						</QueryHydrationBoundary>
					</div>
				</div>
			</div>

			{/* ── MODALS & SHEETS ──────────────────────────────────────────────── */}
			{/* <RecordPaymentSheet /> */}
		</div>
	);
}
