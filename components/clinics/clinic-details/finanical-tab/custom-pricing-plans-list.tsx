"use client";

import { BadgePercent, Plus, TrendingDown, Layers, CreditCard, Info, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { usePermissions } from "@/providers/permissions-provider";
import { getClinicPricingPlansAction } from "@/actions/clinics/get-pricings";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { ClinicPricingPlanDTO } from "@/schema/composed/clinics/clinic-pricings";
import { formatProductName } from "@/lib/formatters/products/product-formatters";
import { memo, useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const preloadEditorSheet = () => import("../../../modals/pricing/custom-pricing-per-clinic/pricing-plan-editor-sheet");
const PricingPlanEditorSheet = dynamic(() => import("../../../modals/pricing/custom-pricing-per-clinic/pricing-plan-editor-sheet").then((m) => m.PricingPlanEditorSheet), {
	ssr: false,
});

export function CustomPricingPlanList({ clinicId }: { clinicId: string }) {
	const { canViewFinancials } = usePermissions();
	const [sheetPlanId, setSheetPlanId] = useState<string | null>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const { data: plans = [], isLoading } = useQuery({
		queryKey: ["clinic-pricing", clinicId],
		queryFn: async () => {
			const res = await getClinicPricingPlansAction({ clinicId });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return [];
			}
			return (res.data?.plans as ClinicPricingPlanDTO[]) ?? [];
		},
		staleTime: 60 * 1000 * 5,
		enabled: canViewFinancials,
	});

	// Prefetch the sheet bundle as soon as the roster tab mounts
	useEffect(() => {
		preloadEditorSheet();
	}, []);

	const handleCreateNew = useCallback(() => {
		setSheetPlanId("new"); // Use "new" as a flag for creation mode
		setIsSheetOpen(true);
	}, []);

	const handleEdit = useCallback((id: string) => {
		setSheetPlanId(id);
		setIsSheetOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setIsSheetOpen(false);
		setTimeout(() => {
			setSheetPlanId(null);
		}, 300);
	}, []);

	const planIdToEdit = sheetPlanId && sheetPlanId !== "new" ? sheetPlanId : null;

	if (!canViewFinancials) return null;

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full min-h-0">
			{/* --- TOOLBAR --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-border shadow-sm">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-500/20">
						<BadgePercent className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">Negotiated Pricing Rates</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mt-0.5">Custom Catalog Pricing</p>
					</div>
				</div>
				<Button onClick={handleCreateNew} className="shrink-0 h-10 rounded-xl bg-primary text-white font-bold shadow-premium hover:bg-primary/90 transition-all">
					<Plus className="w-4 h-4 sm:mr-1.5" />
					<span className="hidden sm:inline">Add Custom Rate</span>
				</Button>
			</div>

			{/* --- PLAN GRID --- */}
			<div className="flex-1 overflow-y-auto custom-scrollbar pb-6 pr-2">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
					{isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-2xl bg-card border border-border animate-pulse" />)}

					{!isLoading &&
						plans.map((plan) => {
							const fqn = formatProductName(plan.workTypeName, plan.productName);
							return (
								<PricingPlanCard
									key={plan.id}
									plan={plan}
									fqn={fqn}
									onEdit={handleEdit} // Pass stable callback
								/>
							);
						})}

					{/* Quick Add Placeholder */}
					{!isLoading && (
						<button
							onClick={handleCreateNew}
							className="lab-card p-6 min-h-80 flex flex-col items-center justify-center text-center border-dashed hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-300 group cursor-pointer"
						>
							<div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/5 border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
								<Plus className="w-6 h-6 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
							</div>
							<span className="text-sm font-bold text-foreground">Create Custom Rate</span>
							<span className="text-[11px] text-muted-foreground mt-1.5 max-w-50 leading-relaxed font-medium">Override standard catalog pricing for this specific clinic.</span>
						</button>
					)}
				</div>
			</div>

			<PricingPlanEditorSheet clinicName={"test"} clinicId={clinicId} isOpen={isSheetOpen} isEdit={!!planIdToEdit} onClose={handleClose} planIdToEdit={planIdToEdit} key={sheetPlanId ?? "new"} />
		</div>
	);
}

const PricingPlanCard = memo(function PricingPlanCard({ plan, fqn, onEdit }: { plan: ClinicPricingPlanDTO; fqn: string; onEdit: (id: string) => void }) {
	const formatMoney = (val: number | null | undefined) => {
		if (val == null) return "$0.00";
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);
	};

	// Stable callback to prevent inline function recreation
	const handleEditClick = useCallback(() => {
		onEdit(plan.id);
	}, [plan.id, onEdit]);

	return (
		<div key={plan.id} className="lab-card p-6 group hover:border-emerald-500/40 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
			<div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

			{/* 1. HEADER */}
			<div className="mb-6 relative z-10 flex items-start justify-between">
				<div>
					<h4 className="text-sm font-bold text-foreground leading-tight max-w-50 truncate" title={fqn}>
						{fqn}
					</h4>
					<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1.5">
						<Layers className="w-3 h-3 text-primary/70" /> {plan.workTypeName}
					</p>
				</div>
				<div className="flex flex-col items-end gap-2 shrink-0">
					<span className="px-2 py-0.5 rounded-md border border-emerald-500/20 bg-emerald-500/5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
						{plan.pricingStrategy}
					</span>
					{/* Action Button */}
					<Button variant="ghost" size="icon" onClick={handleEditClick} className="w-7 h-7 text-muted-foreground hover:text-primary transition-colors">
						<Edit2 className="w-3.5 h-3.5" />
					</Button>
				</div>
			</div>

			{/* 2. DYNAMIC MATH CONTENT (Uses flat Prisma properties) */}
			<div className="flex-1 flex flex-col gap-3 relative z-10 mb-6">
				{plan.pricingStrategy === "PERTOOTH" && (
					<div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border shadow-inner flex items-center justify-between">
						<span className="text-[11px] font-bold text-muted-foreground uppercase">Unit Rate</span>
						<span className="text-2xl font-mono font-bold text-foreground">{formatMoney(plan.details.toothPrice)}</span>
					</div>
				)}

				{plan.pricingStrategy === "BULK" && (
					<div className="p-4 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border shadow-inner flex items-center justify-between">
						<span className="text-[11px] font-bold text-muted-foreground uppercase">Flat Rate</span>
						<span className="text-2xl font-mono font-bold text-foreground">{formatMoney(plan.details.bulkPrice)}</span>
					</div>
				)}

				{plan.pricingStrategy === "CUSTOM" && (
					<div className="space-y-3">
						<div className="grid grid-cols-2 gap-3">
							<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border">
								<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">1st Unit</span>
								<span className="text-lg font-mono font-bold text-foreground">{formatMoney(plan.details.firstToothPrice)}</span>
							</div>
							<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090B] border border-border">
								<span className="text-[9px] font-bold text-muted-foreground uppercase block mb-1">Additional</span>
								<span className="text-lg font-mono font-bold text-foreground">{formatMoney(plan.details.additionalToothPrice)}</span>
							</div>
						</div>

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

			{/* 3. FOOTER */}
			<div className="mt-auto pt-4 border-t border-border flex flex-col gap-3 relative z-10">
				{plan.standardComparison && (
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
							<CreditCard className="w-3.5 h-3.5" /> Catalog Rate:
							<span className="font-mono line-through opacity-60 ml-1">{formatMoney(plan.standardComparison.price)}</span>
						</div>
						{plan.standardComparison && plan.standardComparison?.discountPercent && plan.standardComparison?.discountPercent > 0 && (
							<div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
								<TrendingDown className="w-3 h-3" /> {plan.standardComparison.discountPercent}% SAVINGS
							</div>
						)}
					</div>
				)}
				<div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] text-muted-foreground flex items-start gap-2">
					<Info className="w-3 h-3 shrink-0 mt-0.5 text-primary" />
					<p>
						Calculated using <strong>{plan.pricingStrategy}</strong> logic. Final case price depends on anatomical tooth mapping.
					</p>
				</div>
			</div>
		</div>
	);
});
