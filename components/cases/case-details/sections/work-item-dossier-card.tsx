"use client";

import { memo, useMemo } from "react";
import { Droplet, FileText, Layers, Calculator, History, Info, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { HighFidelityDentalChart } from "@/components/modals/cases/work-items/high-fidelity-dental-chart";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";

interface CardProps {
	item: CaseWorkItemDetailsUI;
	index: number;
	canViewFinancials: boolean;
	canViewDetailedFinancials: boolean;
}

export const WorkItemDossierCard = memo(function WorkItemDossierCard({ item, index, canViewFinancials, canViewDetailedFinancials }: CardProps) {
	const teeth = useMemo(() => item.selectedTeeth?.map((t: any) => (typeof t === "string" ? t : t.toothPosition)) || [], [item.selectedTeeth]);

	const hasShade = !!(item.baseShade || item.stumpShade);

	return (
		<div className="lab-card overflow-hidden flex flex-col group/card border-slate-200/60 dark:border-white/5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 bg-card">
			{/* --- HEADER --- */}
			<div className="p-5 sm:p-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div className="flex items-start gap-4">
					<div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold shadow-lg shadow-primary/20 shrink-0">{index + 1}</div>
					<div className="min-w-0">
						<h3 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2 truncate">
							{item.product?.name || "Premium Restoration"}
							{item.notes && <Sparkles className="w-3.5 h-3.5 text-ai animate-pulse" />}
						</h3>
						<div className="flex items-center gap-2 mt-1">
							<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest truncate max-w-[120px]">{item.workType?.name || "Department"}</span>
							<span className="w-1.5 h-1.5 rounded-full bg-border" />
							<span
								className={cn(
									"text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter border",
									item.jawType === "UPPER" ? "bg-blue-500/10 text-blue-600 border-blue-500/20" : "bg-rose-500/10 text-rose-600 border-rose-500/20",
								)}
							>
								{item.jawType} Arch
							</span>
						</div>
					</div>
				</div>

				{canViewFinancials && <PricingLogicBadge item={item} showMath={canViewDetailedFinancials} unitCount={teeth.length} />}
			</div>

			{/* --- BODY --- */}
			<div className="flex flex-col md:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden">
				{/* LEFT: Technical Specs */}
				{/* FIX: Using bg-background/50 allows the CSS variable to handle the theme switch perfectly */}
				<div className="p-6 sm:p-8 bg-background/50 dark:bg-background/20 space-y-8 max-w-[340px] ">
					<div className="space-y-4">
						<div className="flex items-center justify-between px-1">
							<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
								<Droplet className="w-3.5 h-3.5 text-ai" /> Visual Metrics
							</h4>
							{item.shadeSystem && <span className="text-[9px] font-bold text-ai/80 bg-ai/5 px-1.5 py-0.5 rounded border border-ai/10">{item.shadeSystem}</span>}
						</div>

						{hasShade ? (
							<div className="grid grid-cols-2 gap-2.5">
								<div className="p-3 rounded-xl bg-card border border-border shadow-sm">
									<p className="text-[9px] text-muted-foreground font-bold uppercase mb-1">Final Shade</p>
									<p className="text-sm font-bold text-foreground">{item.baseShade || "--"}</p>
								</div>
								<div className="p-3 rounded-xl bg-card border border-border shadow-sm">
									<p className="text-[9px] text-muted-foreground font-bold uppercase mb-1">Stump Shade</p>
									<p className="text-sm font-bold text-foreground">{item.stumpShade || "--"}</p>
								</div>
							</div>
						) : (
							<div className="p-4 rounded-xl border border-dashed border-border bg-background/30 text-[11px] text-muted-foreground text-center italic">Standard shade logic</div>
						)}
					</div>

					<div className="space-y-3">
						<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-1">
							<FileText className="w-3.5 h-3.5 text-primary" /> Technician Notes
						</h4>
						<div className="p-4 rounded-2xl bg-card border border-border shadow-sm min-h-[120px]">
							<p className="text-[13px] text-foreground leading-relaxed whitespace-pre-wrap">{item.notes || "No custom instructions provided."}</p>
						</div>
					</div>
				</div>

				{/* RIGHT: Odontogram Mapping */}
				{/* FIX: Explicit bg-card and h-full ensures the grid fills the space */}
				<div className="p-6 sm:p-8 flex flex-col bg-card h-full min-h-[450px] w-full">
					<div className="flex items-center justify-between mb-6">
						<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Layers className="w-3.5 h-3.5 text-primary" /> Anatomical Mapping
						</h4>
						<span className="text-[10px] font-mono font-bold text-primary px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 shadow-sm">
							{teeth.length} {teeth.length === 1 ? "Unit" : "Units"} Mapped
						</span>
					</div>

					{/* Blueprint Grid Container */}
					<div className="flex-1 rounded-3xl border border-border bg-background/30 relative flex items-center justify-center overflow-hidden">
						<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

						<div className="w-full h-full flex items-center justify-center relative z-10">
							{item.jawType === "OTHER" ? (
								<div className="text-center space-y-3 opacity-40">
									<Layers className="w-8 h-8 mx-auto text-muted-foreground" />
									<p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Maxillofacial Restoration</p>
								</div>
							) : (
								<HighFidelityDentalChart isReadOnly={true} jawType={item.jawType} selectedTeeth={teeth} onToggleTooth={() => {}} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

// --- SUB-COMPONENT: THE MATH RECEIPT ---

function PricingLogicBadge({ item, showMath, unitCount }: { item: any; showMath: boolean; unitCount: number }) {
	const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(item.totalPrice || 0));

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					disabled={!showMath}
					className={cn("flex flex-col items-end gap-0.5 transition-all outline-none rounded-xl p-1", showMath ? "hover:bg-emerald-500/5 cursor-pointer group" : "cursor-default")}
				>
					<div className="flex items-center gap-2">
						<span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{formattedPrice}</span>
						{showMath && <ChevronRight className="w-4 h-4 text-emerald-500 opacity-20 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />}
					</div>
					<div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 group-hover:text-emerald-500 transition-colors mr-1">
						<span>{item.pricingStrategy}</span>
						<span className="opacity-30">•</span>
						<span>
							{unitCount} {unitCount === 1 ? "Unit" : "Units"}
						</span>
					</div>
				</button>
			</PopoverTrigger>

			<PopoverContent className="w-80 p-0 rounded-3xl border-border shadow-2xl overflow-hidden z-50 animate-in zoom-in-95 duration-200" align="end" sideOffset={10}>
				<div className="p-5 border-b border-border bg-linear-to-br from-emerald-500/10 to-transparent flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-white dark:bg-[#121214] border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm">
						<History className="w-5 h-5" />
					</div>
					<div>
						<h4 className="text-sm font-bold text-foreground tracking-tight uppercase">Billing Snapshot</h4>
						<p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Locked at Case Creation</p>
					</div>
				</div>

				<div className="p-6 space-y-6">
					<div className="space-y-3 font-mono">
						<div className="flex justify-between text-xs">
							<span className="text-muted-foreground uppercase tracking-widest">Rate Mode</span>
							<span className="font-bold text-foreground">{item.pricingStrategy}</span>
						</div>

						{item.pricingStrategy === "PERTOOTH" && (
							<div className="flex justify-between text-xs">
								<span className="text-muted-foreground uppercase tracking-widest">Unit Rate</span>
								<span className="font-bold text-foreground">${Number(item.toothPrice).toFixed(2)}</span>
							</div>
						)}

						<div className="h-px bg-border border-dashed my-4" />

						<div className="flex justify-between items-end">
							<div className="flex flex-col gap-1">
								<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Computation Logic</span>
								<span className="text-xs font-bold text-emerald-600 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">
									{item.pricingStrategy === "PERTOOTH" ? `${unitCount} Units × $${Number(item.toothPrice).toFixed(2)}` : "Flat Fee Applied"}
								</span>
							</div>
							<div className="text-right">
								<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-0.5 text-right">Subtotal</span>
								<span className="text-xl font-bold text-foreground">{formattedPrice}</span>
							</div>
						</div>
					</div>

					<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-border flex items-start gap-3">
						<Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
						<p className="text-[10px] text-muted-foreground leading-relaxed">
							This financial record is **archived**. Any future price increases in your catalog will not retroactively affect this work item.
						</p>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
