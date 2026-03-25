"use client";

import { Plus, Trash2, ShieldCheck, Layers } from "lucide-react";
import { DentalChartSelection } from "./dental-chart-selection";
import { Button } from "@/components/ui/button";

export function CaseWorkItemManager() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Layers className="w-5 h-5 text-primary" />
					<h2 className="text-lg font-bold tracking-tight">Case Work Items</h2>
				</div>
				<Button variant="outline" size="sm" className="rounded-xl border-dashed border-primary/50 text-primary hover:bg-primary/5">
					<Plus className="w-4 h-4 mr-2" /> Add Additional Product
				</Button>
			</div>

			<div className="lab-card overflow-hidden">
				{/* Work Item Header */}
				<div className="p-4 bg-slate-50 dark:bg-white/2 border-b border-border flex items-center justify-between">
					<div className="flex items-center gap-3">
						<span className="w-6 h-6 rounded-lg bg-primary text-white text-[10px] font-bold flex items-center justify-center">1</span>
						<span className="text-sm font-bold text-foreground italic">Product: Zirconia Multi-Layer (Monolithic)</span>
					</div>
					<Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
						<Trash2 className="w-4 h-4" />
					</Button>
				</div>

				{/* Work Item Content */}
				<div className="p-6 space-y-8">
					{/* Jaw & Teeth Selection */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						<div className="lg:col-span-4">
							<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block">Jaw Type</label>
							<div className="flex gap-2">
								{["Upper", "Lower", "Both"].map((jaw) => (
									<button key={jaw} className="flex-1 h-10 rounded-xl border border-border text-xs font-bold hover:border-primary transition-all">
										{jaw}
									</button>
								))}
							</div>
						</div>
						<div className="lg:col-span-8">
							<DentalChartSelection />
						</div>
					</div>

					{/* Pricing Details */}
					<div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
								<ShieldCheck className="w-5 h-5" />
							</div>
							<div>
								<p className="text-xs font-bold text-foreground">Standard Pricing Plan Applied</p>
								<p className="text-[10px] text-muted-foreground uppercase tracking-tight font-medium">Strategy: Bulk Discount (3+ Units)</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-sm font-mono font-bold text-foreground">$420.00</p>
							<p className="text-[10px] text-muted-foreground">($140.00 / unit)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
