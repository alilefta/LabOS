"use client";

import { useState } from "react";
import { Receipt, Search, Filter, DownloadCloud, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// MOCK DATA: Invoice records for this clinic
const INVOICES = [
	{ id: "INV-2605-112", date: "May 01, 2026", due: "May 15, 2026", amount: 4250.0, status: "PENDING" },
	{ id: "INV-2604-084", date: "Apr 01, 2026", due: "Apr 15, 2026", amount: 1200.5, status: "OVERDUE" }, // Overdue!
	{ id: "INV-2603-042", date: "Mar 01, 2026", due: "Mar 15, 2026", amount: 3800.0, status: "PAID" },
	{ id: "INV-2602-018", date: "Feb 01, 2026", due: "Feb 15, 2026", amount: 2450.0, status: "PAID" },
	{ id: "INV-2601-009", date: "Jan 01, 2026", due: "Jan 15, 2026", amount: 5120.75, status: "PAID" },
];

export function ClinicInvoiceHistory() {
	const [search, setSearch] = useState("");

	const getStatusUI = (status: string) => {
		switch (status) {
			case "PAID":
				return { icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" };
			case "OVERDUE":
				return { icon: AlertTriangle, color: "text-rose-600 dark:text-rose-500", bg: "bg-rose-500/10 border-rose-500/20" };
			case "PENDING":
				return { icon: Clock, color: "text-amber-600 dark:text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" };
			default:
				return { icon: Receipt, color: "text-slate-500", bg: "bg-slate-100 border-border" };
		}
	};

	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
			{/* TOOLBAR */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm">
						<Receipt className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">Billing Statements</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-medium">Auto-generated monthly</p>
					</div>
				</div>

				<div className="flex items-center gap-3 w-full sm:w-auto">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<input
							type="text"
							placeholder="Search INV-..."
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

			{/* TABLE */}
			<div className="flex-1 overflow-auto custom-scrollbar relative">
				<table className="w-full text-left text-sm whitespace-nowrap">
					<thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-[#09090B]/95 backdrop-blur-md border-b border-border">
						<tr>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Invoice #</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date Issued</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Due Date</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
							<th className="h-10 px-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Amount</th>
							<th className="h-10 px-6 w-10">Actions</th> {/* Action column */}
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{INVOICES.map((row) => {
							const ui = getStatusUI(row.status);
							return (
								<tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
									<td className="p-4 px-6">
										<span className="font-mono font-bold text-foreground">{row.id}</span>
									</td>
									<td className="p-4 px-6">
										<span className="font-mono text-xs text-muted-foreground">{row.date}</span>
									</td>
									<td className="p-4 px-6">
										<span className={cn("font-mono text-xs", row.status === "OVERDUE" ? "text-rose-500 font-bold" : "text-muted-foreground")}>{row.due}</span>
									</td>
									<td className="p-4 px-6">
										<div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-bold uppercase tracking-widest", ui.bg, ui.color)}>
											<ui.icon className="w-3 h-3" />
											{row.status}
										</div>
									</td>
									<td className="p-4 px-6 text-right">
										<span className="font-mono font-bold text-foreground text-sm">${row.amount.toFixed(2)}</span>
									</td>
									<td className="p-4 px-6 text-right">
										<Button
											variant="ghost"
											size="icon"
											className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
										>
											<DownloadCloud className="w-4 h-4" />
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
