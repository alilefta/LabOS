"use client";

import { CreditCard, Receipt, CheckCircle2, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data
const invoices = [
	{ id: "INV-2026-03", date: "Mar 01, 2026", amount: "$299.00", status: "Paid" },
	{ id: "INV-2026-02", date: "Feb 01, 2026", amount: "$299.00", status: "Paid" },
	{ id: "INV-2026-01", date: "Jan 01, 2026", amount: "$299.00", status: "Paid" },
];

export default function BillingSettingsPage() {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
				<div>
					<h2 className="text-2xl font-bold text-foreground tracking-tight">Subscription & Billing</h2>
					<p className="text-sm text-muted-foreground mt-1">Manage your LabOS plan, usage limits, and payment methods.</p>
				</div>
				<Button className="rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-10 px-4">
					<Zap className="w-4 h-4 mr-2" />
					Upgrade Plan
				</Button>
			</div>

			{/* SECTION 1: Current Plan & Usage */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-ai/10 text-ai flex items-center justify-center">
							<SparklesIcon className="w-4 h-4" />
						</div>
						<div>
							<h3 className="text-lg font-bold text-foreground tracking-tight">Professional Plan</h3>
							<p className="text-sm text-muted-foreground mt-0.5">$299.00 / month</p>
						</div>
					</div>
					<span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1.5">
						<CheckCircle2 className="w-3.5 h-3.5" /> Active
					</span>
				</div>

				<div className="p-8">
					<div className="flex justify-between items-end mb-2">
						<div>
							<h4 className="text-sm font-semibold text-foreground">Monthly Case Volume</h4>
							<p className="text-xs text-muted-foreground mt-1">You have processed 4,102 cases this billing cycle.</p>
						</div>
						<div className="text-right">
							<span className="text-2xl font-bold text-foreground font-mono">4,102</span>
							<span className="text-sm text-muted-foreground font-medium"> / 5,000</span>
						</div>
					</div>

					{/* Custom Animated Progress Bar */}
					<div className="w-full h-3 bg-secondary rounded-full overflow-hidden mt-4 shadow-inner">
						<div className="h-full bg-gradient-to-r from-primary to-ai rounded-full transition-all duration-1000 ease-out" style={{ width: "82%" }}></div>
					</div>
					<p className="text-xs text-muted-foreground mt-3 font-medium text-right">82% of included capacity used. Resets on Apr 01, 2026.</p>
				</div>
			</div>

			{/* SECTION 2: Payment Method */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
						<CreditCard className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Payment Method</h3>
						<p className="text-sm text-muted-foreground mt-0.5">Cards associated with your workspace billing.</p>
					</div>
				</div>

				<div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-4 w-full sm:w-auto p-4 border border-border rounded-xl bg-slate-50 dark:bg-white/[0.02] shadow-sm">
						{/* Simulated Visa Icon */}
						<div className="w-12 h-8 bg-blue-900 rounded flex items-center justify-center text-white font-bold italic text-xs tracking-wider">VISA</div>
						<div>
							<p className="text-sm font-bold text-foreground font-mono">•••• •••• •••• 4242</p>
							<p className="text-xs text-muted-foreground">Expires 12/28</p>
						</div>
					</div>
					<Button variant="outline" className="rounded-xl font-semibold border-border hover:bg-secondary w-full sm:w-auto">
						Update Payment Method
					</Button>
				</div>
			</div>

			{/* SECTION 3: Invoice History */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-zinc-300 flex items-center justify-center">
						<Receipt className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Invoice History</h3>
						<p className="text-sm text-muted-foreground mt-0.5">View and download previous billing statements.</p>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse whitespace-nowrap">
						<thead>
							<tr className="border-b border-border/50">
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Invoice</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Date</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Amount</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Receipt</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border/50">
							{invoices.map((inv) => (
								<tr key={inv.id} className="row-hover group">
									<td className="px-8 py-4 font-mono text-sm font-semibold text-foreground">{inv.id}</td>
									<td className="px-8 py-4 text-sm text-muted-foreground">{inv.date}</td>
									<td className="px-8 py-4 font-mono text-sm text-foreground">{inv.amount}</td>
									<td className="px-8 py-4">
										<span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
											{inv.status}
										</span>
									</td>
									<td className="px-8 py-4 text-right">
										<Button variant="ghost" size="sm" className="rounded-lg text-primary hover:text-primary hover:bg-primary/10 text-xs font-semibold">
											<Download className="w-3.5 h-3.5 mr-1.5" /> PDF
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

// Dummy icon for the AI plan
function SparklesIcon(props: any) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
			<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
		</svg>
	);
}
