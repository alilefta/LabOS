"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { teethPaths as TEETH_PATHS } from "@/lib/odontogram-data";

// Map the 4 Quadrants exactly to your Enums
const QUADRANTS = [
	{
		id: "UR",
		transform: "",
		isUpper: true,
		teeth: [
			// 1 to 8 mapping
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
		id: "LR", // Patient's Lower Right (Visual Bottom Left)
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
		id: "LL", // Patient's Lower Left (Visual Bottom Right)
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
}

export function HighFidelityDentalChart({ jawType, selectedTeeth, onToggleTooth }: ChartProps) {
	// Renders a single tooth SVG path with glowing/interactive properties
	const renderTooth = (toothData: (typeof TEETH_PATHS)[0], enumId: ToothPosition) => {
		const isSelected = selectedTeeth.includes(enumId);
		const readableName = enumId.replace(/([A-Z])/g, " $1").trim();

		return (
			<TooltipProvider key={enumId} delayDuration={100}>
				<Tooltip>
					<TooltipTrigger asChild>
						<g
							onClick={() => onToggleTooth(enumId)}
							className={cn(
								"cursor-pointer  duration-300 origin-center outline-none",
								isSelected ? "text-primary scale-101" : "text-slate-300 dark:text-white/10 hover:text-primary/60 hover:scale-[1.01]",
							)}
							style={{
								// Pure CSS SVG Glow for "Awwwards" feel
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
					<TooltipContent className="glass-ai-panel! bg-background!  border-border shadow-2xl z-50 pointer-events-none">
						<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{toothData.type}</p>
						<p className="text-sm font-bold text-foreground">{readableName}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	};

	return (
		<div className="flex-1 w-full h-full flex flex-col items-center justify-center relative p-8">
			{/* Ambient Radial Glow (Behind the teeth) */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

			{/* The Dental Canvas */}
			<div className="relative z-10 w-full max-w-[450px] mx-auto transition-all duration-700">
				{/* viewBox matching the library's dimensions (Total Width: 409, Total Height: 694) */}
				<svg viewBox="-50 -50 509 794" className="w-full h-auto overflow-visible">
					{QUADRANTS.map((quadrant) => {
						// Determine if this quadrant should be faded based on Jaw Selection
						const isFaded = (jawType === "UPPER" && !quadrant.isUpper) || (jawType === "LOWER" && quadrant.isUpper);

						return (
							<g
								key={quadrant.id}
								transform={quadrant.transform}
								className={cn("transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]", isFaded && "opacity-15 grayscale blur-[2px] pointer-events-none")}
							>
								{/* Render the 8 teeth for this quadrant */}
								{TEETH_PATHS.map((tooth, index) => {
									const toothEnum = quadrant.teeth[index];
									return renderTooth(tooth, toothEnum);
								})}
							</g>
						);
					})}
				</svg>
			</div>
		</div>
	);
}
