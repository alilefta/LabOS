"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, History, ShieldAlert, CheckCircle2, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// MOCK DATA: Filtered by COMPLETED, DELIVERED, FAILED
const HISTORICAL_CASES = [
	{ id: "LAB-4301", patient: "Robert Fox", status: "DELIVERED", date: "2026-03-14", items: 2, total: 320.0, dentist: "Dr. Sarah M." },
	{ id: "LAB-4288", patient: "Alice Zhang", status: "DELIVERED", date: "2026-03-10", items: 1, total: 140.0, dentist: "Dr. Sarah M." },
	{ id: "LAB-4250", patient: "Johnathan Sterling", status: "COMPLETED", date: "2026-03-08", items: 3, total: 850.0, dentist: "Dr. John S." },
	{ id: "LAB-4202", patient: "William K.", status: "FAILED", date: "2026-02-28", items: 1, total: 0.0, dentist: "Dr. Sarah M.", failReason: "Margin Distortion" },
	{ id: "LAB-4199", patient: "Samantha B.", status: "DELIVERED", date: "2026-02-25", items: 1, total: 210.0, dentist: "Dr. John S." },
];

export function ClinicHistoricalDataTable() {
	const [search, setSearch] = useState("");

	const getStatusUI = (status: string) => {
		switch (status) {
			case "DELIVERED":
				return { icon: PackageCheck, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" };
			case "COMPLETED":
				return { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
			case "FAILED":
				return { icon: ShieldAlert, color: "text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" };
			default:
				return { icon: History, color: "text-slate-500", bg: "bg-slate-100 border-border" };
		}
	};

	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* TOOLBAR */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
						<History className="w-4 h-4" />
					</div>
					<h3 className="text-sm font-bold text-foreground">Historical Record</h3>
				</div>

				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search patient or ID..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full h-9 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-lg text-xs focus:ring-1 focus:ring-primary outline-none shadow-sm transition-all"
						/>
					</div>
					<Button variant="outline" size="sm" className="h-9 rounded-lg border-border hidden sm:flex">
						<Filter className="w-4 h-4 mr-2" /> Filter
					</Button>
				</div>
			</div>

			{/* TABLE CONTAINER (Ready for TanStack Virtualization) */}
			<div className="flex-1 overflow-auto custom-scrollbar relative">
				<table className="w-full text-left text-sm whitespace-nowrap">
					<thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-[#09090B]/95 backdrop-blur-sm border-b border-border">
						<tr>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer hover:text-foreground transition-colors group">
								Case ID <ArrowUpDown className="inline w-3 h-3 ml-1 opacity-0 group-hover:opacity-100" />
							</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Patient & Prescriber</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Items</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Total</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{HISTORICAL_CASES.map((row) => {
							const ui = getStatusUI(row.status);
							return (
								<tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
									<td className="p-4 px-6">
										<span className="font-mono font-bold text-primary group-hover:underline underline-offset-4">{row.id}</span>
									</td>

									<td className="p-4 px-6">
										<span className="font-mono text-xs text-muted-foreground">{row.date}</span>
									</td>

									<td className="p-4 px-6">
										<div className="flex flex-col">
											<span className="font-bold text-foreground">{row.patient}</span>
											<span className="text-[10px] text-muted-foreground mt-0.5">{row.dentist}</span>
										</div>
									</td>

									<td className="p-4 px-6">
										<span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-bold text-muted-foreground">
											{row.items} {row.items === 1 ? "Unit" : "Units"}
										</span>
									</td>

									<td className="p-4 px-6">
										<div className="flex items-center gap-2">
											<div className={cn("px-2 py-1 rounded-md border flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest", ui.bg, ui.color)}>
												<ui.icon className="w-3 h-3" />
												{row.status}
											</div>
											{row.failReason && <span className="text-[10px] text-rose-500 font-medium italic hidden lg:block">- {row.failReason}</span>}
										</div>
									</td>

									<td className="p-4 px-6 text-right">
										<span className="font-mono font-bold text-foreground">${row.total.toFixed(2)}</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				{/* Empty State Fallback */}
				{HISTORICAL_CASES.length === 0 && (
					<div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
						<History className="w-10 h-10 text-slate-300 dark:text-zinc-700 mb-4" />
						<h4 className="text-sm font-bold text-foreground">No Historical Records</h4>
						<p className="text-xs text-muted-foreground mt-1 max-w-sm">This clinic has no completed or delivered cases in the database yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}
