"use client";

import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";
import { usePermissions } from "@/providers/permissions-provider";
import { WorkItemDossierCard } from "./work-item-dossier-card";

interface Props {
	workItems: CaseWorkItemDetailsUI[];
}

export function ClinicalRxFeed({ workItems }: Props) {
	const { canViewFinancials, canViewDetailedFinancials } = usePermissions();

	if (!workItems || workItems.length === 0) return null;

	return (
		<section className="space-y-6 animate-in fade-in duration-700 delay-300">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Clinical Prescription</h2>
				<span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-mono font-bold text-muted-foreground">{workItems.length} ITEMS</span>
			</div>

			<div className="space-y-8">
				{workItems.map((item, index) => (
					<WorkItemDossierCard key={item.id || index} item={item} index={index} canViewFinancials={canViewFinancials} canViewDetailedFinancials={canViewDetailedFinancials} />
				))}
			</div>
		</section>
	);
}
// --- SUB-COMPONENT: ROLE-AWARE PRICING BADGE ---

// function WorkItemPricingBadge({ item, showMath, unitCount }: { item: CaseWorkItemDetailsUI; showMath: boolean; unitCount: number }) {
// 	const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(item.totalPrice || 0));

// 	return (
// 		<Popover>
// 			<PopoverTrigger asChild>
// 				<button
// 					disabled={!showMath}
// 					className={cn("flex flex-col items-end gap-1 px-4 py-2 rounded-2xl transition-all", showMath ? "hover:bg-emerald-500/5 cursor-pointer group" : "cursor-default")}
// 				>
// 					<div className="flex items-center gap-2">
// 						<span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-500">{formattedPrice}</span>
// 						{showMath && <Calculator className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
// 					</div>
// 					<div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
// 						<span>{item.pricingStrategy}</span>
// 						<span className="opacity-50">•</span>
// 						<span>{unitCount} Units</span>
// 					</div>
// 				</button>
// 			</PopoverTrigger>

// 			<PopoverContent className="w-72 p-0 rounded-2xl border-border shadow-premium overflow-hidden z-50" align="end">
// 				<div className="p-4 border-b border-border bg-emerald-500/5 flex items-center gap-3">
// 					<div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
// 						<History className="w-4 h-4" />
// 					</div>
// 					<div>
// 						<h4 className="text-sm font-bold text-foreground tracking-tight">Pricing Snapshot</h4>
// 						<p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Historical Logic</p>
// 					</div>
// 				</div>

// 				<div className="p-4 space-y-4">
// 					<div className="space-y-2">
// 						<div className="flex justify-between text-xs">
// 							<span className="text-muted-foreground">Strategy</span>
// 							<span className="font-bold text-foreground">{item.pricingStrategy}</span>
// 						</div>

// 						{item.pricingStrategy === "PERTOOTH" && (
// 							<div className="flex justify-between text-xs">
// 								<span className="text-muted-foreground">Unit Rate</span>
// 								<span className="font-mono font-bold text-foreground">${Number(item.toothPrice).toFixed(2)}</span>
// 							</div>
// 						)}

// 						{item.pricingStrategy === "BULK" && (
// 							<div className="flex justify-between text-xs">
// 								<span className="text-muted-foreground">Bulk Rate</span>
// 								<span className="font-mono font-bold text-foreground">${Number(item.bulkPrice).toFixed(2)}</span>
// 							</div>
// 						)}

// 						<div className="h-px bg-border border-dashed my-2" />

// 						<div className="flex justify-between items-end">
// 							<span className="text-[10px] font-bold text-muted-foreground uppercase">Computed Math</span>
// 							<span className="text-sm font-mono font-bold text-emerald-600">{item.pricingStrategy === "PERTOOTH" ? `${unitCount} × $${item.toothPrice}` : "Flat Fee"}</span>
// 						</div>
// 					</div>

// 					<div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-border flex items-start gap-2">
// 						<Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
// 						<p className="text-[10px] text-muted-foreground leading-relaxed">This rate was snapshotted at creation. Future price changes in the catalog will not affect this case.</p>
// 					</div>
// 				</div>
// 			</PopoverContent>
// 		</Popover>
// 	);
// }
