import { Plus, Download, BarChart3, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClinicsPerformanceTable } from "@/components/clinics/clinics-performance-table";
import { ClinicsIntelligenceDossier } from "@/components/clinics/clinics-intelligence-dossier";

export const metadata = {
	title: "Clinic Partners | LabOS",
	description: "Monitor relationship health and production quality across your partner network.",
};

export default function ClinicsPage() {
	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Page Header Area */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground">Clinic Partners</h1>
					<p className="text-muted-foreground mt-1">
						Managing <span className="text-foreground font-semibold">124 active clinics</span>. Overall network health is <span className="text-emerald-500 font-bold">92%</span>.
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button variant="outline" className="h-10 rounded-xl border-border bg-transparent hover:bg-secondary text-foreground font-medium">
						<Download className="w-4 h-4 mr-2" />
						Export Audit
					</Button>
					<Button className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
						<Plus className="w-4 h-4 mr-2" />
						Add New Clinic
					</Button>
				</div>
			</div>

			{/* THE PARTNER COMMAND CENTER LAYOUT */}
			<div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
				{/* LEFT PANE: 70% Width (Performance Table) */}
				<div className="flex-1 flex flex-col min-w-0">
					<ClinicsPerformanceTable />
				</div>

				{/* RIGHT PANE: 30% Width (AI Intelligence Dossier) */}
				<div className="w-full xl:w-100 shrink-0 flex flex-col gap-6">
					<ClinicsIntelligenceDossier />

					{/* Quick Network Stat Card (Optional Add-on) */}
					<div className="lab-card p-5 bg-linear-to-br from-primary/5 to-ai/5 border-primary/10">
						<div className="flex items-center gap-3 mb-2">
							<BarChart3 className="w-4 h-4 text-primary" />
							<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Network Growth</span>
						</div>
						<div className="text-2xl font-mono font-bold text-foreground">
							+12% <span className="text-xs text-muted-foreground font-sans font-medium">vs last month</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
