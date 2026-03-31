"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Layers, Check, Stethoscope, AlertCircle, Calculator, CreditCard } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HighFidelityDentalChart } from "./high-fidelity-dental-chart"; // Assuming this exists
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { JawType } from "@/schema/base/enums.base";
import { CreateCaseWorkItemInput } from "@/schema/composed/case-work-item.details";
import { ClinicalProductConfigurator } from "@/components/cases/new-case/category-and-work-items/clinical-product-configurator";
import { toast } from "sonner";

interface WorkItemEditorProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: CreateCaseWorkItemInput) => void;
	initialData: CreateCaseWorkItemInput | null;
	selectedCategoryId: string | null;
}

const parseTeethFromData = (teethData: CreateCaseWorkItemInput["selectedTeeth"]): ToothPosition[] => {
	if (!teethData || !Array.isArray(teethData)) return [];
	return teethData.map((t) => (typeof t === "string" ? t : t.toothPosition));
};

export function WorkItemEditorModal({ isOpen, onClose, onSave, initialData, selectedCategoryId }: WorkItemEditorProps) {
	// Local State
	const [productId, setProductId] = useState(initialData?.productId || "");
	const [pricingPlanId, setPricingPlanId] = useState(initialData?.casePricingPlanId || "");
	const [worktypeId, setWorktypeId] = useState(initialData?.workTypeId || "");
	const [jawType, setJawType] = useState<"UPPER" | "LOWER" | "OTHER">(initialData?.jawType || "UPPER");
	const [selectedTeeth, setSelectedTeeth] = useState<ToothPosition[]>(parseTeethFromData(initialData?.selectedTeeth ?? []));

	// Reset state when modal opens
	// useEffect(() => {
	// 	if (isOpen) {
	// 		setProductId(initialData?.productId || "");
	// 		setWorktypeId(initialData?.workTypeId || "");
	// 		setPricingPlanId(initialData?.casePricingPlanId || "");
	// 		setJawType(initialData?.jawType || "UPPER");
	// 		setSelectedTeeth(parseTeethFromData(initialData?.selectedTeeth ?? []));
	// 	}
	// }, [isOpen, initialData]);

	const toggleTooth = (id: ToothPosition) => {
		setSelectedTeeth((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
	};

	const handleSave = () => {
		onSave({
			productId,
			workTypeId: worktypeId,
			jawType,
			selectedTeeth: selectedTeeth,
			casePricingPlanId: pricingPlanId,
			pricingStrategy: "PERTOOTH", // Will be fetched from actual plan in production
			totalPrice: selectedTeeth.length * 140, // Placeholder calculation
		});
	};

	// UX: Determine exactly what is missing for the "Save" button
	const missingRequirements = useMemo(() => {
		const missing = [];
		if (!productId) missing.push("Product");
		if (!pricingPlanId) missing.push("Pricing");
		if (jawType !== "OTHER" && selectedTeeth.length === 0) missing.push("Teeth");
		return missing;
	}, [productId, pricingPlanId, jawType, selectedTeeth]);

	const isComplete = missingRequirements.length === 0;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent
				className="w-[95vw]! sm:w-full! max-w-5xl! lg:max-w-7xl p-0 overflow-hidden border-border bg-card shadow-2xl rounded-[24px] lg:rounded-[32px] gap-0 [&>button]:hidden max-h-[100vh] lg:max-h-[90vh] flex flex-col"
				showCloseButton={false}
			>
				{/* --- HEADER --- */}
				<div className="p-4 sm:p-6 border-b border-border flex items-center justify-between bg-background shrink-0 z-20">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-ai-glow-light">
							<Layers className="w-4 h-4 sm:w-5 sm:h-5" />
						</div>
						<div>
							<DialogTitle className="text-lg sm:text-xl font-bold tracking-tight">Configure Work Item</DialogTitle>
							<p className="hidden sm:block text-xs text-muted-foreground font-medium">Select product, pricing, and map clinical positions.</p>
						</div>
					</div>
					<DialogClose onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
						<X className="w-5 h-5 text-muted-foreground" />
					</DialogClose>
				</div>

				{/* --- MODAL BODY (RESPONSIVE SPLIT) --- */}
				<div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden min-h-0 bg-background lg:bg-transparent">
					{/* LEFT PANE: Clinical Settings (35%) */}
					<div className="w-full lg:w-[35%] p-5 sm:p-8 lg:border-r border-border lg:overflow-y-auto custom-scrollbar flex flex-col bg-background shrink-0 z-10">
						<div className="space-y-8">
							{/* Jaw Type Toggle */}
							<div className="relative w-full flex flex-col gap-2">
								<div className="flex items-center gap-2 mb-1">
									<Stethoscope className="w-4 h-4 text-primary" />
									<label className="text-[13px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">Target Arch</label>
								</div>

								<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-11">
									{["UPPER", "LOWER", "OTHER"].map((type) => (
										<button
											key={type}
											type="button"
											onClick={() => {
												if (jawType !== type) {
													setJawType(type as JawType);
													setSelectedTeeth([]);
												}
											}}
											className={cn(
												"flex-1 text-[11px] font-bold rounded-lg transition-all uppercase tracking-wider",
												jawType === type ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
											)}
										>
											{type}
										</button>
									))}
								</div>
							</div>

							{/* The New Configurator Component */}
							<ClinicalProductConfigurator
								categoryId={selectedCategoryId}
								selectedProductId={productId}
								selectedPricingPlanId={pricingPlanId}
								onProductSelect={(id) => setProductId(id)}
								onPricingPlanSelect={(id) => setPricingPlanId(id)}
								onWorkTypeSelect={(id) => setWorktypeId(id)}
								selectedWorkTypeId={worktypeId}
							/>
						</div>

						{/* Live Pricing / Status Preview */}
						<div className="mt-8 lg:mt-auto lg:pt-8">
							{!pricingPlanId ? (
								<div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-border flex flex-col items-center justify-center text-center gap-2">
									<Calculator className="w-6 h-6 text-slate-300 dark:text-zinc-600 mb-1" />
									<p className="text-xs font-bold text-foreground">Awaiting Pricing Plan</p>
									<p className="text-[10px] text-muted-foreground">Select a pricing plan above to estimate costs.</p>
								</div>
							) : (
								<div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 transition-all duration-300 animate-in fade-in zoom-in-95 relative overflow-hidden">
									<div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl"></div>

									<div className="flex items-center justify-between mb-4 relative z-10">
										<p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
											<CreditCard className="w-3.5 h-3.5" /> Est. Item Total
										</p>
										<span className="px-2 py-0.5 rounded-md bg-white dark:bg-[#121214] border border-emerald-500/20 text-[9px] font-bold text-emerald-600 uppercase">
											Per-Tooth Rate
										</span>
									</div>
									<div className="flex items-end justify-between mt-2 relative z-10">
										<span className="text-3xl font-mono font-bold text-foreground">${(selectedTeeth.length * 140).toFixed(2)}</span>
										<span className="text-xs font-bold text-muted-foreground">{selectedTeeth.length} Units Mapped</span>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* RIGHT PANE: The Dental Canvas */}
					<div className="flex-1 bg-slate-50 dark:bg-[#09090B] relative flex flex-col overflow-hidden min-h-[400px] lg:min-h-0 border-t lg:border-t-0 border-border">
						{jawType === "OTHER" ? (
							<div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
								<Layers className="w-12 h-12 text-slate-300 dark:text-zinc-700 mb-4" />
								<h3 className="text-lg font-bold text-foreground">Non-Arch Restoration</h3>
								<p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm">
									Dental charting is disabled for &quot;Other&quot; restorations. Describe specific mapping in clinical notes.
								</p>
							</div>
						) : (
							<HighFidelityDentalChart jawType={jawType} selectedTeeth={selectedTeeth} onToggleTooth={toggleTooth} onSetTeeth={(teeth: ToothPosition[]) => setSelectedTeeth(teeth)} />
						)}
					</div>
				</div>

				{/* --- MODAL FOOTER --- */}
				<div className="p-4 sm:p-6 border-t border-border bg-background flex flex-col-reverse sm:flex-row justify-between items-center gap-4 shrink-0 z-20">
					<div className="flex items-center justify-center sm:justify-start w-full sm:w-auto gap-3">
						<Button variant="ghost" type="button" onClick={onClose} className="rounded-xl h-11 sm:h-12 px-6 font-semibold w-full sm:w-auto">
							Cancel
						</Button>

						{/* Missing Requirements Helper */}
						{!isComplete && (
							<div className="hidden sm:flex items-center gap-2 text-amber-600 dark:text-amber-500 text-[11px] font-bold bg-amber-500/10 px-3 py-1.5 rounded-lg animate-in fade-in">
								<AlertCircle className="w-3.5 h-3.5" />
								Missing: {missingRequirements.join(" & ")}
							</div>
						)}
					</div>

					<Button
						type="button"
						onClick={handleSave}
						disabled={!isComplete}
						className={cn(
							"rounded-xl h-11 sm:h-12 px-8 font-bold transition-all flex gap-2 shadow-sm w-full sm:w-auto",
							isComplete ? "bg-primary hover:bg-primary/90 text-white shadow-premium" : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed",
						)}
					>
						<Check className="w-4 h-4" /> Save Work Item
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
