import { DashboardKpiCards } from "@/components/dashboard/overview/dashboard-kpi-cards";
import { DashboardAiInsight } from "@/components/dashboard/overview/dashboard-ai-insight";
import { DashboardProductionChart } from "@/components/dashboard/overview/dashboard-production-chart";
import { DashboardRecentCases } from "@/components/dashboard/overview/dashboard-recent-cases";

export const metadata = {
	title: "Overview | LabOS",
};

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Page Header */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Good Morning, Sarah</h1>
					<p className="text-muted-foreground mt-1">
						Here is what&apos;s happening in your lab today, <span className="text-foreground font-medium">Sunday, March 22, 2026</span>.
					</p>
				</div>
			</div>

			{/* Top Row: KPIs */}
			<DashboardKpiCards />

			{/* Middle Row: AI Insight & Main Chart (Bento Box Layout) */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* AI Card spans 4 columns on large screens */}
				<div className="lg:col-span-4 flex flex-col">
					<DashboardAiInsight />
				</div>

				{/* Chart spans 8 columns */}
				<div className="lg:col-span-8 flex flex-col">
					<DashboardProductionChart />
				</div>
			</div>

			{/* Bottom Row: Recent Urgent Cases */}
			<DashboardRecentCases />
		</div>
	);
}
