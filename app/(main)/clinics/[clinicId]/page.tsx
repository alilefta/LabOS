import { ChevronLeft, Edit3, MoreVertical, FileText, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClinicHealthRing } from "@/components/clinics/clinic/clinic-health-ring";
import { ProductionQualityHeatmap } from "@/components/clinics/clinic/production-quality-heatmap";

export default function ClinicDetailPage({ params }: { params: { clinicId: string } }) {
	return (
		<div className="flex flex-col gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* Header / Breadcrumbs */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<Link href="/clinics">
						<Button variant="ghost" size="icon" className="rounded-xl border border-border">
							<ChevronLeft className="w-4 h-4" />
						</Button>
					</Link>
					<div>
						<div className="flex items-center gap-3 mb-1">
							<h1 className="text-3xl font-bold tracking-tight text-foreground">Apex Dental Design</h1>
							<span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
								Premium Partner
							</span>
						</div>
						<p className="text-muted-foreground text-sm font-medium">ID: #CL-9920 • Dr. Sarah Mitchell • Miami, FL</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button variant="outline" className="rounded-xl border-border h-10 px-4 font-semibold">
						<Download className="w-4 h-4 mr-2" /> Statement
					</Button>
					<Button className="rounded-xl bg-primary text-primary-foreground h-10 px-4 shadow-premium font-bold hover:bg-primary/90">
						<Edit3 className="w-4 h-4 mr-2" /> Edit Clinic
					</Button>
					<Button variant="ghost" size="icon" className="rounded-xl border border-border">
						<MoreVertical className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* THE BENTO GRID */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* TOP LEFT: Relationship Vitals (The Ring) */}
				<div className="lg:col-span-4 flex">
					<ClinicHealthRing />
				</div>

				{/* TOP RIGHT: Production Patterns (Heatmap) */}
				<div className="lg:col-span-8 flex">
					<ProductionQualityHeatmap />
				</div>

				{/* MIDDLE: Intelligence Audit & Revenue (Plan for next turn) */}
				<div className="lg:col-span-12 h-64 border-2 border-dashed border-border rounded-2xl flex items-center justify-center bg-slate-50/30 dark:bg-white/1">
					<p className="text-muted-foreground font-medium italic">Relationship Intelligence & Active Cases Coming Next...</p>
				</div>
			</div>
		</div>
	);
}
