"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const recentCases = [
	{ id: "#L-8842", clinic: "Smile Arts Dental", material: "Zirconia Crown", dueDate: "Mar 24", status: "PROCESSING", statusColor: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
	{ id: "#L-8841", clinic: "Dr. Alan Smith", material: "3-Unit Bridge PFM", dueDate: "Mar 23", status: "QC CHECK", statusColor: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
	{ id: "#L-8840", clinic: "Avicena Clinic", material: "E-Max Veneer", dueDate: "Mar 22", status: "URGENT REMAKE", statusColor: "text-destructive bg-destructive/10 border-destructive/20" },
	{ id: "#L-8839", clinic: "Downtown Perio", material: "Surgical Guide", dueDate: "Mar 22", status: "COMPLETED", statusColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
];

export function DashboardRecentCases() {
	return (
		<div className="lab-card overflow-hidden flex flex-col">
			<div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-white/2">
				<div>
					<h2 className="text-lg font-bold text-foreground tracking-tight">Active Floor Overview</h2>
					<p className="text-sm text-muted-foreground mt-0.5">Recently updated cases across all technicians.</p>
				</div>
				<Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 rounded-xl font-semibold">
					View All <ArrowRight className="w-4 h-4 ml-1.5" />
				</Button>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full text-left border-collapse whitespace-nowrap">
					<thead>
						<tr className="border-b border-border bg-background/50">
							<th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Case ID</th>
							<th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Clinic</th>
							<th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Product / Material</th>
							<th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Due Date</th>
							<th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
							<th className="px-6 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border/50">
						{recentCases.map((c, i) => (
							<tr key={i} className="row-hover group">
								<td className="px-6 py-4">
									{/* JetBrains Mono applied here for Data Precision */}
									<span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">{c.id}</span>
								</td>
								<td className="px-6 py-4 font-medium text-foreground">{c.clinic}</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">{c.material}</td>
								<td className="px-6 py-4 text-muted-foreground text-sm font-medium">{c.dueDate}</td>
								<td className="px-6 py-4">
									<span className={cn("px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase border", c.statusColor)}>{c.status}</span>
								</td>
								<td className="px-6 py-4 text-right">
									<Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground">
										<MoreHorizontal className="w-4 h-4" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
