"use client";

import { BadgePercent, Plus, TrendingDown, Layers, CreditCard, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// MOCK DATA: Updated to reflect your real hybrid logic
const CUSTOM_PRICING_PLANS = [
	{
		id: "plan-1",
		productName: "Zirconia Multi-Layer (Monolithic)",
		workType: "Crowns & Bridges",
		strategy: "PERTOOTH",
		details: { toothPrice: 120.0 },
		standardComparison: { price: 140.0, discountPercent: 14 },
	},
	{
		id: "plan-2",
		productName: "Acrylic Partial Denture",
		workType: "Removables",
		strategy: "BULK",
		details: { bulkPrice: 350.0 },
		standardComparison: { price: 450.0, discountPercent: 22 },
	},
	{
		id: "plan-3",
		productName: "E-Max Pressed Veneer",
		workType: "Crowns & Bridges",
		strategy: "CUSTOM",
		details: {
			firstToothPrice: 160.0,
			additionalToothPrice: 110.0,
			bulkPrice: 950.0, // The Cap
			teethCountToApplyBulkPrice: 6, // The Threshold
		},
		standardComparison: { price: 180.0, discountPercent: 12 },
	},
];

export function CustomPricingPlanList() {
	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* TOOLBAR */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-border">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm">
						<BadgePercent className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">Negotiated Pricing Rates</h3>
						<p className="text-xs text-muted-foreground mt-0.5">Special catalog pricing overrides for this partner.</p>
					</div>
				</div>
				<Button className="shrink-0 h-9 rounded-lg bg-primary text-white font-bold shadow-sm hover:bg-primary/90">
					<Plus className="w-4 h-4 sm:mr-1.5" />
					<span className="hidden sm:inline">Add Custom Rate</span>
				</Button>
			</div>

			{/* PLAN GRID */}
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
				{CUSTOM_PRICING_PLANS.map((plan) => (
					<div key={plan.id} className="lab-card p-6 group hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
						{/* Background Polish */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

						{/* 1. HEADER: Product & Strategy */}
						<div className="mb-6 relative z-10">
							<div className="flex items-start justify-between gap-2 mb-2">
								<h4 className="text-sm font-bold text-foreground leading-tight">{plan.productName}</h4>
								<span className="px-2 py-0.5 rounded-md border border-emerald-500/20 bg-emerald-500/5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest shrink-0">
									{plan.strategy}
								</span>
							</div>
							<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5">
								<Layers className="w-3 h-3 text-primary/70" /> {plan.workType}
							</p>
						</div>

						{/* 2. DYNAMIC MATH CONTENT */}
						<div className="flex-1 flex flex-col gap-3 relative z-10 mb-6">
							{/* PER TOOTH VIEW */}
							{plan.strategy === "PERTOOTH" && (
								<div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border shadow-inner flex items-center justify-between">
									<span className="text-[11px] font-bold text-muted-foreground uppercase">Unit Rate</span>
									<span className="text-2xl font-mono font-bold text-foreground">{formatMoney(plan.details.toothPrice!)}</span>
								</div>
							)}

							{/* BULK VIEW */}
							{plan.strategy === "BULK" && (
								<div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border shadow-inner flex items-center justify-between">
									<span className="text-[11px] font-bold text-muted-foreground uppercase">Flat Rate</span>
									<span className="text-2xl font-mono font-bold text-foreground">{formatMoney(plan.details.bulkPrice!)}</span>
								</div>
							)}

							{/* CUSTOM TIERED + CAP VIEW */}
							{plan.strategy === "CUSTOM" && (
								<div className="space-y-3">
									<div className="grid grid-cols-2 gap-3">
										<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border">
											<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">1st Unit</span>
											<span className="text-lg font-mono font-bold text-foreground">{formatMoney(plan.details.firstToothPrice!)}</span>
										</div>
										<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border">
											<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Additional</span>
											<span className="text-lg font-mono font-bold text-foreground">{formatMoney(plan.details.additionalToothPrice!)}</span>
										</div>
									</div>

									{/* The Volume Cap Logic */}
									{plan.details.bulkPrice && (
										<div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
											<div className="flex flex-col">
												<span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 uppercase">Volume Cap</span>
												<span className="text-[10px] text-muted-foreground font-medium">Triggered at {plan.details.teethCountToApplyBulkPrice} units</span>
											</div>
											<span className="text-md font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatMoney(plan.details.bulkPrice)}</span>
										</div>
									)}
								</div>
							)}
						</div>

						{/* 3. FOOTER: Comparison & Actions */}
						<div className="mt-auto pt-4 border-t border-border flex flex-col gap-3 relative z-10">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase">
									<CreditCard className="w-3.5 h-3.5" /> Catalog Rate:
									<span className="font-mono line-through opacity-60 ml-1">{formatMoney(plan.standardComparison.price)}</span>
								</div>
								<div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
									<TrendingDown className="w-3 h-3" /> {plan.standardComparison.discountPercent}% SAVINGS
								</div>
							</div>

							<div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] text-muted-foreground flex items-start gap-2">
								<Info className="w-3 h-3 shrink-0 mt-0.5 text-primary" />
								<p>
									Calculated using <strong>{plan.strategy}</strong> logic. Final case price depends on anatomical tooth mapping.
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
