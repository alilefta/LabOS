"use client";

import { Stethoscope, Droplet, FileText, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

// Assuming you have this component built and it accepts an `isLocked` prop
import { HighFidelityDentalChart } from "@/components/modals/cases/work-items/high-fidelity-dental-chart";
import { CaseWorkItemDetailsUI } from "@/schema/composed/case-work-item.details";
import { SelectedToothBase } from "@/schema/base/selected-tooth.base";

interface Props {
	// Using any for now, replace with your actual Prisma populated CaseWorkItem type
	workItems: CaseWorkItemDetailsUI[];
}

export function ClinicalRxFeed({ workItems }: Props) {
	if (!workItems || workItems.length === 0) return null;

	return (
		<section className="space-y-6 animate-in fade-in duration-500 delay-300">
			<div className="flex items-center gap-3 mb-6">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight text-foreground">Clinical Prescription</h2>
			</div>

			<div className="space-y-8">
				{workItems.map((item, index) => {
					// Parse teeth based on your schema output
					const teeth = item.selectedTeeth?.map((t: SelectedToothBase) => (typeof t === "string" ? t : t.toothPosition)) || [];
					const hasShade = item.baseShade || item.stumpShade || item.shadeNotes;
					const isNonArch = item.jawType === "OTHER";

					return (
						<div key={item.id || index} className="lab-card overflow-hidden flex flex-col">
							{/* --- ITEM HEADER --- */}
							{/* --- ITEM HEADER --- */}
							<div className="p-6 sm:p-8 border-b border-border bg-slate-50/50 dark:bg-white/2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div>
									<div className="flex items-center gap-3 mb-1.5">
										<span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center border border-primary/20 shrink-0">
											#{index + 1}
										</span>
										<h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{item.product?.name || "Unknown Product"}</h3>
									</div>
									<div className="flex items-center gap-3 ml-11">
										<span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{item.workType?.name || "Manufacturing Dept"}</span>
										<span className="w-1 h-1 rounded-full bg-border"></span>
										<span
											className={cn(
												"text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border",
												item.jawType === "UPPER"
													? "bg-blue-500/10 text-blue-600 border-blue-500/20"
													: item.jawType === "LOWER"
														? "bg-rose-500/10 text-rose-600 border-rose-500/20"
														: "bg-slate-200/50 text-slate-600 dark:bg-white/10 dark:text-zinc-400 border-border",
											)}
										>
											{item.jawType} Arch
										</span>
									</div>
								</div>

								{/* Top Level Shade System Badge */}
								{item.shadeSystem && (
									<div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-ai/5 border border-ai/20 text-ai text-xs font-bold uppercase tracking-widest shadow-sm">
										<Droplet className="w-4 h-4" />
										{item.shadeSystem}
									</div>
								)}
							</div>

							{/* --- ITEM BODY (Split View) --- */}
							<div className="flex flex-col lg:flex-row min-h-0 bg-background">
								{/* Left Pane: Clinical Metadata (Notes & Shades) */}
								<div className="w-full lg:w-[40%] p-6 sm:p-8 lg:border-r border-border flex flex-col gap-8 shrink-0 bg-background z-10">
									{/* Color Parameters */}
									{hasShade ? (
										<div className="space-y-3">
											<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
												<Droplet className="w-3.5 h-3.5 text-ai" /> Esthetic Requirements
											</h4>
											<div className="grid grid-cols-2 gap-3">
												{item.baseShade && (
													<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
														<p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">Final Shade</p>
														<p className="text-sm font-bold text-foreground">{item.baseShade}</p>
													</div>
												)}
												{item.stumpShade && (
													<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
														<p className="text-[10px] text-muted-foreground uppercase font-bold mb-0.5">Stump / Prep</p>
														<p className="text-sm font-bold text-foreground">{item.stumpShade}</p>
													</div>
												)}
											</div>
											{item.shadeNotes && (
												<div className="p-3 rounded-xl bg-ai/5 border border-ai/10 text-xs text-ai font-medium italic leading-relaxed">&quot;{item.shadeNotes}&quot;</div>
											)}
										</div>
									) : (
										<div className="space-y-3">
											<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
												<Droplet className="w-3.5 h-3.5 text-slate-400" /> Esthetic Requirements
											</h4>
											<p className="text-xs text-muted-foreground italic">No specific shade parameters provided.</p>
										</div>
									)}

									{/* Item Specific Notes */}
									<div className="space-y-3 pt-6 border-t border-border/50">
										<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
											<FileText className="w-3.5 h-3.5 text-primary" /> Technician Instructions
										</h4>
										{item.notes ? (
											<div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121214] border border-border text-sm text-foreground leading-relaxed italic shadow-sm">
												&quot;{item.notes}&quot;
											</div>
										) : (
											<p className="text-xs text-muted-foreground italic">No item-specific instructions provided.</p>
										)}
									</div>
								</div>

								{/* Right Pane: Dental Charting */}
								<div className="flex-1 bg-slate-50 dark:bg-[#09090B] relative flex flex-col border-t lg:border-t-0 border-border p-6 sm:p-8 min-h-[300px] lg:min-h-0">
									<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Odontogram Mapping ({teeth.length} Units)</h4>

									<div className="flex-1 rounded-2xl border border-border bg-white dark:bg-[#121214] shadow-sm overflow-hidden flex items-center justify-center relative">
										{isNonArch ? (
											<div className="flex flex-col items-center justify-center text-center p-8">
												<Layers className="w-10 h-10 text-slate-300 dark:text-zinc-700 mb-3" />
												<p className="text-sm font-bold text-foreground">Non-Arch Restoration</p>
												<p className="text-xs text-muted-foreground mt-1 max-w-[200px]">See technician instructions for physical dimensions.</p>
											</div>
										) : (
											/* CRITICAL: Passing isLocked={true} ensures no one accidentally edits the case here! */
											<HighFidelityDentalChart isReadOnly={true} jawType={item.jawType} selectedTeeth={teeth} onToggleTooth={() => {}} onSetTeeth={() => {}} />
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
