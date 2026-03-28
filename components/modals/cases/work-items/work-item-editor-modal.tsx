"use client";

import { useEffect, useState } from "react";
import { X, Layers, Save, Check, Stethoscope } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { HighFidelityDentalChart } from "./high-fidelity-dental-chart";
import { ToothPosition } from "@/schema/base/tooth-position.base";

interface WorkItemEditorProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: any) => void;
	initialData?: any;
}

export function WorkItemEditorModal({ isOpen, onClose, onSave, initialData }: WorkItemEditorProps) {
	// Local state for ultra-fast interaction without lagging the main form
	const [productId, setProductId] = useState(initialData?.productId || "");
	const [jawType, setJawType] = useState(initialData?.jawType || "UPPER");

	const [selectedTeeth, setSelectedTeeth] = useState<ToothPosition[]>([]);

	const toggleTooth = (id: ToothPosition) => {
		setSelectedTeeth((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
	};

	// Reset local state when opened with new data
	useEffect(() => {
		if (isOpen) {
			setProductId(initialData?.productId || "");
			setJawType(initialData?.jawType || "UPPER");
			setSelectedTeeth(initialData?.selectedTeeth || []);
		}
	}, [isOpen, initialData]);

	const handleSave = () => {
		onSave({
			productId,
			jawType,
			selectedTeeth,
			pricingStrategy: "PERTOOTH", // or derived from product
			totalPrice: selectedTeeth.length * 140, // Mock calculation
		});
	};

	const isComplete = productId !== "" && (jawType === "OTHER" || selectedTeeth.length > 0);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="lg:max-w-7xl! max-w-5xl! p-0 overflow-hidden border-border bg-card shadow-2xl rounded-[32px] gap-0">
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
					<button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
						<X className="w-5 h-5 text-muted-foreground" />
					</button>
				</div>

				{/* --- MODAL BODY (SPLIT CANVAS) --- */}
				<div className="flex flex-col lg:flex-row h-[65vh]! min-h-[600px]!">
					{/* LEFT PANE: Clinical Settings (35%) */}
					<div className="w-full lg:w-[35%]! p-8 border-r border-border overflow-y-auto custom-scrollbar space-y-8 bg-background">
						<div className="space-y-3">
							<div className="flex items-center gap-2 mb-4">
								<Stethoscope className="w-4 h-4 text-primary" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Product Details</h4>
							</div>

							{/* Jaw Type Toggle */}
							<div className="flex flex-col gap-3 ">
								<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">Target Arch / Jaw</label>
								<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-12">
									{["UPPER", "LOWER", "BOTH", "OTHER"].map((type) => (
										<button
											key={type}
											type="button"
											onClick={() => {
												setJawType(type);
												setSelectedTeeth([]); // Reset teeth on jaw change
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

							{/* Product Grouped Selector Placeholder */}
							<div className="flex flex-col gap-3 pt-4">
								<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">Manufacturing Product</label>
								<div className="h-12 rounded-xl border border-border bg-slate-50 dark:bg-white/5 flex items-center px-4 text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
									Search Zirconia, E-Max...
								</div>
							</div>
						</div>

						{/* Live Pricing Preview */}
						<div className="mt-auto pt-8">
							<div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
								<p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Estimated Item Total</p>
								<div className="flex items-end justify-between">
									<span className="text-3xl font-mono font-bold text-foreground">${(selectedTeeth.length * 140).toFixed(2)}</span>
									<span className="text-xs font-bold text-muted-foreground">{selectedTeeth.length} Units Mapped</span>
								</div>
							</div>
						</div>
					</div>

					{/* RIGHT PANE: The Dental Canvas (65%) */}
					<div className="flex-1 bg-slate-50 dark:bg-[#09090B] relative flex flex-col overflow-hidden ">
						{jawType === "OTHER" ? (
							<div className="flex-1 flex flex-col items-center justify-center text-center p-8">
								<Layers className="w-12 h-12 text-slate-300 dark:text-zinc-700 mb-4" />
								<h3 className="text-lg font-bold text-foreground">Non-Arch Restoration</h3>
								<p className="text-sm text-muted-foreground mt-2 max-w-sm">
									Dental charting is disabled for &quot;Other&quot;. Use the clinical notes to describe this custom work item.
								</p>
							</div>
						) : (
							<HighFidelityDentalChart jawType={jawType} selectedTeeth={selectedTeeth} onToggleTooth={toggleTooth} />
						)}
					</div>
				</div>

				{/* --- MODAL FOOTER --- */}
				<div className="p-6 border-t border-border bg-background flex justify-between items-center">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-12 px-6 font-semibold">
						Cancel
					</Button>
					<Button onClick={handleSave} disabled={!isComplete} className="rounded-xl h-12 px-8 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all flex gap-2">
						<Check className="w-4 h-4" /> Save Work Item
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
