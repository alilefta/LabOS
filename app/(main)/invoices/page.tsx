import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Plus, Receipt, Sparkles, Layers, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getServerSession } from "@/lib/get-session";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";
import { tenantPrisma } from "@/lib/prisma";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";
import { UninvoicedClinicsQuickBar } from "@/components/invoices/invoices-page/uninvoiced-clinics-quick-bar";
import { InvoicesDashboardClient } from "@/components/invoices/invoices-page/invoices-dashboard-client";

// --- PREFETCH DATA LOGIC ---
async function getUninvoicedClinicsSummary(labId: string) {
	const prisma = await tenantPrisma(labId);

	// Fetch clinics that have COMPLETED or DELIVERED cases with NO invoice attached
	const clinicsWithPendingCases = await prisma.clinic.findMany({
		where: {
			labId,
			cases: {
				some: {
					status: { in: ["COMPLETED", "DELIVERED"] },
					invoiceCase: null, // Uninvoiced!
				},
			},
		},
		select: {
			id: true,
			name: true,
			_count: {
				select: {
					cases: {
						where: {
							status: { in: ["COMPLETED", "DELIVERED"] },
							invoiceCase: null,
						},
					},
				},
			},
		},
		orderBy: {
			cases: { _count: "desc" },
		},
		take: 5, // Top 5 clinics with the most unbilled cases
	});

	// Calculate global unbilled totals
	const totalUnbilledCases = await prisma.case.count({
		where: {
			labId,
			status: { in: ["COMPLETED", "DELIVERED"] },
			invoiceCase: null,
		},
	});

	return {
		clinics: clinicsWithPendingCases.map((c) => ({
			id: c.id,
			name: c.name,
			unbilledCount: c._count.cases,
		})),
		totalUnbilledCases,
	};
}

export const metadata = {
	title: "Accounts Receivable | LabOS",
};

export default async function InvoicesDashboardPage() {
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labUser = await getCurrentLabUserRoleByAuthUserId();
	if (!labUser) redirect("/onboarding");

	const labId = session.user.labId;
	if (!labId) redirect("/onboarding");

	// 1. Fetch High-Priority Actionable Data on the Server
	const pendingBillingSummary = await getUninvoicedClinicsSummary(labId);

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
						<Button
							variant="outline"
							className="h-10 rounded-xl border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-foreground font-semibold shadow-sm transition-all"
						>
							<FileDown className="w-4 h-4 sm:mr-2 text-muted-foreground" />
							<span className="hidden sm:inline">Export Aging Report</span>
						</Button>
						<Button className="h-10 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 transition-all">
							<Plus className="w-4 h-4 mr-2" /> New Invoice
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

						{/* 2. THE CLIENT WRAPPER (Handles Vitals + Table + Filters) */}
						<InvoicesDashboardClient labId={labId} />
					</div>
				</div>
			</div>

			{/* ── MODALS & SHEETS ──────────────────────────────────────────────── */}
			{/* <RecordPaymentSheet /> */}
		</div>
	);
}
