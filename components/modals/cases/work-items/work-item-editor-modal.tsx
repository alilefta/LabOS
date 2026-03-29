"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Layers, Check, Stethoscope, AlertCircle, Calculator } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HighFidelityDentalChart } from "./high-fidelity-dental-chart";
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { GroupedProductSelector } from "@/components/cases/new-case/category-and-work-items/grouped-product-selector";
import { JawType } from "@/schema/base/enums.base";

interface WorkItemEditorProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
	initialData?: any;
	selectedCategoryId: string;
}

// Helper to safely extract string arrays regardless of Prisma/Zod object shapes
const parseTeethFromData = (teethData: any): ToothPosition[] => {
	if (!teethData || !Array.isArray(teethData)) return [];
	return teethData.map((t) => (typeof t === "string" ? t : t.toothPosition));
};

export function WorkItemEditorModal({ isOpen, onClose, onSave, initialData, selectedCategoryId }: WorkItemEditorProps) {
	// Local State
	const [productId, setProductId] = useState("");
	const [jawType, setJawType] = useState<"UPPER" | "LOWER" | "OTHER">("UPPER");
	const [selectedTeeth, setSelectedTeeth] = useState<ToothPosition[]>([]);

	// Reset state when modal opens
	useEffect(() => {
		if (isOpen) {
			setProductId(initialData?.productId || "");
			setJawType(initialData?.jawType || "UPPER");
			setSelectedTeeth(parseTeethFromData(initialData?.selectedTeeth));
		}
	}, [isOpen, initialData]);

	const toggleTooth = (id: ToothPosition) => {
		setSelectedTeeth((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
	};

	const handleSave = () => {
		onSave({
			productId,
			jawType,
			selectedTeeth,
			pricingStrategy: "PERTOOTH", // Placeholder
			totalPrice: selectedTeeth.length * 140, // Placeholder calculation
		});
	};

	// UX: Determine exactly what is missing
	const missingRequirements = useMemo(() => {
		const missing = [];
		if (!productId) missing.push("Product");
		if (jawType !== "OTHER" && selectedTeeth.length === 0) missing.push("Teeth");
		return missing;
	}, [productId, jawType, selectedTeeth]);

	const isComplete = missingRequirements.length === 0;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="lg:max-w-7xl! max-w-5xl! p-0 overflow-hidden border-border bg-card shadow-2xl rounded-[32px] gap-0 [&>button]:hidden">
				{/* --- MODAL HEADER --- */}
				<div className="p-6 border-b border-border flex items-center justify-between bg-background">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-ai-glow-light">
							<Layers className="w-5 h-5" />
						</div>
						<div>
							<DialogTitle className="text-xl font-bold tracking-tight">Configure Work Item</DialogTitle>
							<p className="text-xs text-muted-foreground font-medium">Select product and map clinical positions.</p>
						</div>
					</div>
					<DialogClose onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary">
						<X className="w-5 h-5 text-muted-foreground" />
					</DialogClose>
				</div>

				{/* --- MODAL BODY (SPLIT CANVAS) --- */}
				<div className="flex flex-col lg:flex-row h-[65vh]! min-h-[600px]!">
					{/* LEFT PANE: Clinical Settings (35%) */}
					<div className="w-full lg:w-[35%]! p-8 border-r border-border overflow-y-auto custom-scrollbar flex flex-col bg-background">
						<div className="space-y-6">
							<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
								<Stethoscope className="w-4 h-4 text-primary" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Clinical Parameters</h4>
							</div>

							{/* Jaw Type Toggle - Mimicking CustomFieldWithLabel spacing */}
							<div className="relative space-y-1.5 w-full">
								<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">Target Arch</label>
								<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-11">
									{["UPPER", "LOWER", "OTHER"].map((type) => (
										<button
											key={type}
											type="button"
											onClick={() => {
												if (jawType !== type) {
													setJawType(type as JawType);
													setSelectedTeeth([]); // Reset teeth on jaw change
												}
											}}
											className={cn(
												"flex-1 text-[11px] font-bold rounded-lg transition-all uppercase tracking-tighter",
												jawType === type ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
											)}
										>
											{type}
										</button>
									))}
								</div>
							</div>

							{/* Product Selector */}
							<div className="relative space-y-1.5 w-full">
								<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">Manufacturing Product</label>
								<GroupedProductSelector selectedId={productId} onSelect={(id) => setProductId(id)} categoryId={selectedCategoryId} />
							</div>
						</div>

						{/* Live Pricing / Status Preview */}
						<div className="mt-auto pt-8">
							{!productId ? (
								<div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/2 border border-dashed border-border flex flex-col items-center justify-center text-center gap-2">
									<Calculator className="w-6 h-6 text-slate-300 dark:text-zinc-600" />
									<p className="text-xs font-bold text-foreground">Awaiting Product Selection</p>
									<p className="text-[10px] text-muted-foreground">Select a product to view estimated pricing.</p>
								</div>
							) : (
								<div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 transition-all duration-300 animate-in fade-in zoom-in-95">
									<div className="flex items-center justify-between mb-1">
										<p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Estimated Item Total</p>
										<span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-md">BULK RATE</span>
									</div>
									<div className="flex items-end justify-between mt-2">
										<span className="text-3xl font-mono font-bold text-foreground">${(selectedTeeth.length * 140).toFixed(2)}</span>
										<span className="text-xs font-bold text-muted-foreground">{selectedTeeth.length} Units Mapped</span>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* RIGHT PANE: The Dental Canvas (65%) */}
					<div className="flex-1 bg-slate-50 dark:bg-[#09090B] relative flex flex-col overflow-hidden ">
						{jawType === "OTHER" ? (
							<div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
								<Layers className="w-12 h-12 text-slate-300 dark:text-zinc-700 mb-4" />
								<h3 className="text-lg font-bold text-foreground">Non-Arch Restoration</h3>
								<p className="text-sm text-muted-foreground mt-2 max-w-sm">
									Dental charting is disabled for &quot;Other&quot; restorations. Describe specific mapping in clinical notes.
								</p>
							</div>
						) : (
							<HighFidelityDentalChart jawType={jawType} selectedTeeth={selectedTeeth} onToggleTooth={toggleTooth} />
						)}
					</div>
				</div>

				{/* --- MODAL FOOTER --- */}
				<div className="p-6 border-t border-border bg-background flex justify-between items-center">
					<div className="flex items-center gap-3">
						<Button variant="ghost" type="button" onClick={onClose} className="rounded-xl h-12 px-6 font-semibold">
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
							"rounded-xl h-12 px-8 font-bold transition-all flex gap-2 shadow-sm",
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
