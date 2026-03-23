import { Sparkles, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SalaryCommissionCalculator } from "@/components/technicians/technician/salary-commission-calculator";
import { EfficiencyRadarChart } from "@/components/technicians/technician/efficiency-radar-chart";
import { TechnicianAiCopilot } from "@/components/technicians/technician/technician-ai-copilot";

export default async function TechnicianOverviewPage(props: { params: Promise<{ technicianId: string }> }) {
	const params = await props.params;

	return (
		<div className="flex flex-col xl:flex-row gap-6 h-full min-h-0">
			{/* LEFT PANE: 70% (Performance Metrics) */}
			<div className="flex-1 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-8">
				{/* Quick Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<SalaryCommissionCalculator />
					<EfficiencyRadarChart />
				</div>

				{/* MTD Performance Highlights */}
				<div className="lab-card p-6">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Productivity Breakdown</h3>
						<span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Above Average</span>
					</div>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className="text-sm font-bold">Case Success Rate</p>
								<p className="text-xs text-muted-foreground">98.4% without remakes</p>
							</div>
							<div className="text-xl font-mono font-bold text-foreground">98.4%</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<p className="text-sm font-bold">Avg. Turnaround</p>
								<p className="text-xs text-muted-foreground">vs Lab Avg of 3.1 days</p>
							</div>
							<div className="text-xl font-mono font-bold text-foreground">2.4d</div>
						</div>
					</div>

					<div className="mt-8 p-4 bg-slate-50 dark:bg-white/2 border border-border rounded-xl flex items-start gap-3">
						<Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
						<p className="text-[11px] text-muted-foreground leading-relaxed">
							Elena’s current turnaround is <span className="text-foreground font-bold">22% faster</span> than the team average. This contributes to an estimated{" "}
							<span className="text-emerald-500 font-bold">+$450</span> in net profit this month.
						</p>
					</div>
				</div>
			</div>

			{/* RIGHT PANE: 30% (AI Copilot - Technician Scoped) */}
			<div className="w-full xl:w-96 shrink-0 flex flex-col">
				<TechnicianAiCopilot technicianName="Elena Vance" />
			</div>
		</div>
	);
}
