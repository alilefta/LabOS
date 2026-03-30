"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { teethPaths as TEETH_PATHS } from "@/lib/odontogram-data";
import { CheckSquare, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";

// Map the 4 Quadrants exactly to your Enums
const QUADRANTS = [
	{
		id: "UR",
		transform: "",
		isUpper: true,
		teeth: [
			"UpperRightCentralIncisor",
			"UpperRightLateralIncisor",
			"UpperRightCanine",
			"UpperRightFirstPremolar",
			"UpperRightSecondPremolar",
			"UpperRightFirstMolar",
			"UpperRightSecondMolar",
			"UpperRightThirdMolar",
		] as ToothPosition[],
	},
	{
		id: "UL",
		transform: "scale(-1, 1) translate(-409, 0)",
		isUpper: true,
		teeth: [
			"UpperLeftCentralIncisor",
			"UpperLeftLateralIncisor",
			"UpperLeftCanine",
			"UpperLeftFirstPremolar",
			"UpperLeftSecondPremolar",
			"UpperLeftFirstMolar",
			"UpperLeftSecondMolar",
			"UpperLeftThirdMolar",
		] as ToothPosition[],
	},
	{
		id: "LR",
		transform: "scale(1, -1) translate(0, -694)",
		isUpper: false,
		teeth: [
			"LowerRightCentralIncisor",
			"LowerRightLateralIncisor",
			"LowerRightCanine",
			"LowerRightFirstPremolar",
			"LowerRightSecondPremolar",
			"LowerRightFirstMolar",
			"LowerRightSecondMolar",
			"LowerRightThirdMolar",
		] as ToothPosition[],
	},
	{
		id: "LL",
		transform: "scale(-1, -1) translate(-409, -694)",
		isUpper: false,
		teeth: [
			"LowerLeftCentralIncisor",
			"LowerLeftLateralIncisor",
			"LowerLeftCanine",
			"LowerLeftFirstPremolar",
			"LowerLeftSecondPremolar",
			"LowerLeftFirstMolar",
			"LowerLeftSecondMolar",
			"LowerLeftThirdMolar",
		] as ToothPosition[],
	},
];

interface ChartProps {
	jawType: "UPPER" | "LOWER" | "OTHER";
	selectedTeeth: ToothPosition[];
	onToggleTooth: (id: ToothPosition) => void;
	onSetTeeth?: (teeth: ToothPosition[]) => void;
}

export function HighFidelityDentalChart({ jawType, selectedTeeth, onToggleTooth, onSetTeeth }: ChartProps) {
	// Power Action Handlers
	const handleSelectArch = () => {
		if (!onSetTeeth) return;
		const activeQuadrants = QUADRANTS.filter((q) => q.isUpper === (jawType === "UPPER"));
		const allArchTeeth = activeQuadrants.flatMap((q) => q.teeth);
		onSetTeeth(allArchTeeth);
	};

	const handleClearArch = () => {
		if (!onSetTeeth) return;
		onSetTeeth([]);
	};

	const renderTooth = (toothData: (typeof TEETH_PATHS)[0], enumId: ToothPosition) => {
		const isSelected = selectedTeeth.includes(enumId);
		const readableName = enumId.replace(/([A-Z])/g, " $1").trim();

		return (
			<Tooltip key={enumId}>
				<TooltipTrigger asChild>
					<g
						onClick={() => onToggleTooth(enumId)}
						className={cn(
							"cursor-pointer outline-none transition-all duration-300",
							isSelected ? "text-primary scale-105" : "text-slate-300 dark:text-white/10 hover:text-primary/60 hover:scale-[1.02]",
						)}
						style={{
							// This is safe because it's applied to the individual tooth, not the mirrored quadrant group
							transformBox: "fill-box",
							transformOrigin: "center",
							filter: isSelected ? "drop-shadow(0 0 12px rgba(37,99,235,0.6))" : "none",
						}}
					>
						{/* Stroke / Outline */}
						<path
							stroke="currentColor"
							strokeWidth={isSelected ? 3 : 2}
							strokeLinecap="round"
							strokeLinejoin="round"
							d={toothData.outlinePath}
							className="transition-colors duration-300"
						/>
						{/* Fill / Inner Body */}
						<path fill="currentColor" d={toothData.shadowPath} className={cn("transition-all duration-300", isSelected ? "opacity-30" : "opacity-0 hover:opacity-10")} />
					</g>
				</TooltipTrigger>
				<TooltipContent className="glass-ai-panel! bg-background! border-border shadow-2xl z-50 pointer-events-none">
					<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{toothData.type}</p>
					<p className="text-sm font-bold text-foreground">{readableName}</p>
				</TooltipContent>
			</Tooltip>
		);
	};

	return (
		<div className="flex-1 w-full h-full flex flex-col items-center justify-center relative p-8">
			{/* Ambient Radial Glow (Behind the teeth) */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-[0.08] dark:opacity-10 pointer-events-none" />
			{/* --- POWER ACTIONS (Arch Controls) --- */}
			{jawType !== "OTHER" && (
				<div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-xl p-1.5 rounded-2xl border border-border shadow-sm animate-in fade-in slide-in-from-top-4">
					<Button size="sm" variant="ghost" onClick={handleSelectArch} className="h-8 rounded-xl text-[11px] font-bold text-primary hover:bg-primary/10">
						<CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Select Full Arch
					</Button>
					<div className="w-px h-4 bg-border" />
					<Button
						size="sm"
						variant="ghost"
						onClick={handleClearArch}
						disabled={selectedTeeth.length === 0}
						className="h-8 rounded-xl text-[11px] font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					>
						<Eraser className="w-3.5 h-3.5 mr-1.5" /> Clear
					</Button>
				</div>
			)}

			{/* 
                THE FIX: The "Camera Pan" Wrapper
                Instead of touching the SVG groups, we translate the parent div.
                If UPPER is selected, we pull the canvas down (+15%).
                If LOWER is selected, we push the canvas up (-15%). 
            */}
			<div
				className={cn(
					"relative z-10 w-full max-w-[450px] mx-auto transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
					jawType === "UPPER" ? "translate-y-[15%]" : jawType === "LOWER" ? "-translate-y-[30%]" : "translate-y-0",
				)}
			>
				<TooltipProvider delayDuration={100}>
					<svg viewBox="-50 -50 509 794" className="w-full h-auto overflow-visible drop-shadow-xl">
						{QUADRANTS.map((quadrant) => {
							// Fade Logic
							const isFaded = (jawType === "UPPER" && !quadrant.isUpper) || (jawType === "LOWER" && quadrant.isUpper);

							return (
								// THE FIX: Reverted to pure SVG transform attribute
								<g
									key={quadrant.id}
									transform={quadrant.transform}
									className={cn("transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]", isFaded && "opacity-15 grayscale blur-[2px] pointer-events-none")}
								>
									{TEETH_PATHS.map((tooth, index) => {
										const toothEnum = quadrant.teeth[index];
										return renderTooth(tooth, toothEnum);
									})}
								</g>
							);
						})}
					</svg>
				</TooltipProvider>
			</div>
		</div>
	);
}
