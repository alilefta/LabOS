"use client";

import { cn } from "@/lib/utils";
import { DENTAL_QUADRANTS, QUADRANT_TO_ENUM_MAP } from "@/lib/dental-mapping";
import { ToothPath } from "./tooth-path";
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { NewTeethPaths } from "@/lib/odontogram-data";

interface LabOSOdontogramProps {
	jawType: "UPPER" | "LOWER" | "BOTH" | "OTHER";
	selectedTeeth: ToothPosition[];
	onToggleTooth: (id: ToothPosition) => void;
}

export function LabOSOdontogram({ jawType, selectedTeeth, onToggleTooth }: LabOSOdontogramProps) {
	if (jawType === "OTHER") {
		return (
			<div className="flex-1 flex items-center justify-center h-full min-h-[400px]">
				<div className="text-center p-8 border-2 border-dashed border-border rounded-3xl bg-slate-50/50 dark:bg-white/2">
					<p className="text-sm font-bold text-foreground">Non-Arch Restoration</p>
					<p className="text-xs text-muted-foreground mt-1 max-w-xs">Dental charting is disabled for Custom/Other jaw types. Rely on clinical notes.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="relative w-full max-w-3xl mx-auto flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
			{/* viewBox matches the square layout of the library */}
			<svg viewBox="0 0 900 150" className="w-full h-auto overflow-visible">
				{DENTAL_QUADRANTS.map((quadrant) => {
					// Logic to fade out arches that aren't targeted
					const isFaded = (jawType === "UPPER" && !quadrant.isUpper) || (jawType === "LOWER" && quadrant.isUpper);

					return (
						<g key={quadrant.id} transform={quadrant.transform} className={cn("transition-all duration-700 ease-in-out", isFaded && "opacity-15 grayscale pointer-events-none blur-[1px]")}>
							{NewTeethPaths.map((toothPath, index) => {
								const toothEnum = QUADRANT_TO_ENUM_MAP[quadrant.id][index];

								return (
									<ToothPath
										key={toothEnum}
										toothEnum={toothEnum}
										toothNumber={index + 1}
										quadrantLabel={quadrant.label}
										outlinePath={toothPath.outlinePath}
										shadowPath={toothPath.shadowPath}
										lineHighlightPath={toothPath.lineHighlightPath}
										isSelected={selectedTeeth.includes(toothEnum)}
										onToggle={onToggleTooth}
									/>
								);
							})}
						</g>
					);
				})}
			</svg>
		</div>
	);
}
