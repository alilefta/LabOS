"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ToothPosition } from "@/schema/base/tooth-position.base";

interface ToothPathProps {
	toothEnum: ToothPosition;
	toothNumber: number; // e.g. 8 for Central Incisor
	quadrantLabel: string;
	outlinePath: string;
	shadowPath: string;
	lineHighlightPath: string | string[];
	isSelected: boolean;
	onToggle: (id: ToothPosition) => void;
}

export function ToothPath({ toothEnum, toothNumber, quadrantLabel, outlinePath, shadowPath, lineHighlightPath, isSelected, onToggle }: ToothPathProps) {
	// Format enum to readable string (e.g., "Upper Right Central Incisor")
	const readableName = toothEnum.replace(/([A-Z])/g, " $1").trim();

	return (
		<TooltipProvider delayDuration={150}>
			<Tooltip>
				<TooltipTrigger asChild>
					<g
						onClick={() => onToggle(toothEnum)}
						className={cn("cursor-pointer transition-all duration-300 origin-center outline-none", isSelected ? "text-primary" : "text-slate-300 dark:text-white/15 hover:text-primary/50")}
						style={{
							// If selected, add the actual drop shadow to the SVG group
							filter: isSelected ? "drop-shadow(0 0 8px var(--color-primary))" : "none",
						}}
					>
						{/* Outline */}
						<path
							stroke="currentColor"
							strokeWidth={isSelected ? 3 : 2}
							strokeLinecap="round"
							strokeLinejoin="round"
							d={outlinePath}
							className={cn("transition-colors duration-300", isSelected && "stroke-primary")}
						/>

						{/* Inner Shadow / Fill */}
						<path
							fill="currentColor"
							d={shadowPath}
							className={cn("transition-all duration-300", isSelected ? "fill-primary opacity-20" : "fill-transparent hover:fill-primary hover:opacity-10")}
						/>

						{/* Highlights */}
						{Array.isArray(lineHighlightPath) ? (
							lineHighlightPath.map((d, i) => <path key={i} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d={d} />)
						) : (
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d={lineHighlightPath} />
						)}
					</g>
				</TooltipTrigger>
				<TooltipContent className="glass-ai-panel border-border shadow-2xl z-50">
					<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
						{quadrantLabel} • #{toothNumber}
					</p>
					<p className="text-sm font-bold text-foreground">{readableName}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
