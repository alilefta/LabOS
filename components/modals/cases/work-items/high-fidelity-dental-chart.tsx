"use client";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToothPosition } from "@/schema/base/tooth-position.base";
import { teethPaths as TEETH_PATHS } from "@/lib/odontogram-data";
import { CheckSquare, Eraser, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo, useCallback, useMemo } from "react";

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
	isLocked?: boolean; // Disables interaction but shows everything (for when product isn't selected)
	isReadOnly?: boolean; // NEW: Hides unused jaws and locks interaction (for Case Dossier)
}

export const HighFidelityDentalChart = memo(function HighFidelityDentalChart({ jawType, selectedTeeth, onToggleTooth, onSetTeeth, isLocked = false, isReadOnly = false }: ChartProps) {
	const isDisabled = isLocked || isReadOnly;

	const handleSelectArch = useCallback(() => {
		if (!onSetTeeth || isDisabled) return;
		const activeQuadrants = QUADRANTS.filter((q) => q.isUpper === (jawType === "UPPER"));
		const allArchTeeth = activeQuadrants.flatMap((q) => q.teeth);
		onSetTeeth(allArchTeeth);
	}, [onSetTeeth, isDisabled, jawType]);

	const handleToggle = useCallback(
		(id: ToothPosition) => {
			if (!isDisabled) onToggleTooth(id);
		},
		[isDisabled, onToggleTooth],
	);

	const handleClearArch = useCallback(() => {
		if (!onSetTeeth || isDisabled) return;
		onSetTeeth([]);
	}, [onSetTeeth, isDisabled]);

	const selectedSet = useMemo(() => new Set(selectedTeeth), [selectedTeeth]);

	const renderedQuadrants = useMemo(() => {
		if (!isReadOnly) return QUADRANTS;
		return QUADRANTS.filter((q) => q.isUpper === (jawType === "UPPER"));
	}, [isReadOnly, jawType]);

	// THE FIX: Tighter ViewBox calculations to "Zoom In" the camera
	// Total width of teeth is 409. We use -10 X and 430 Width to give just 10px of padding.
	const svgViewBox = useMemo(() => {
		if (!isReadOnly) return "-10 -10 430 720"; // Full Mouth Tight View
		if (jawType === "UPPER") return "-10 -10 430 330"; // Upper Arch Tight View
		if (jawType === "LOWER") return "-10 380 430 330"; // Lower Arch Tight View
		return "-10 -10 430 720";
	}, [isReadOnly, jawType]);

	return (
		<TooltipProvider delayDuration={150}>
			<div
				className={cn(
					"w-full h-full flex flex-col items-center justify-center relative transition-colors duration-500",
					isReadOnly ? "p-0" : "flex-1 p-8 overflow-hidden bg-slate-50 dark:bg-[#09090B]",
				)}
			>
				{/* Ambient Radial Glow (Behind the teeth) */}
				<div
					className={cn(
						"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-[0.08] dark:opacity-10 pointer-events-none",
						isReadOnly && "hidden",
					)}
				/>

				{/* --- READ-ONLY BADGE (Corners) --- */}
				{isReadOnly && (
					<div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-background/80 backdrop-blur-xl px-2.5 py-1.5 rounded-lg border border-border shadow-sm">
						<ShieldCheck className="w-3.5 h-3.5 text-primary" />
						<span className="md:text-[10px] text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Clinical View</span>
					</div>
				)}
				{/* Power Actions (Buttons) */}
				{jawType !== "OTHER" && !isReadOnly && (
					<div
						className={cn(
							"absolute top-4 right-4 md:top-6 md:right-6 z-20 flex items-center gap-2 bg-background/80 backdrop-blur-xl p-1.5 rounded-2xl border border-border shadow-sm transition-opacity duration-400",
							isLocked && "opacity-50 pointer-events-none",
						)}
					>
						<Button size="sm" variant="ghost" onClick={handleSelectArch} disabled={isLocked} className="h-8 rounded-xl text-[11px] font-bold text-primary hover:bg-primary/10">
							<CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Select Full Arch
						</Button>
						<div className="w-px h-4 bg-border" />
						<Button
							size="sm"
							variant="ghost"
							onClick={handleClearArch}
							disabled={isLocked || selectedTeeth.length === 0}
							className="h-8 rounded-xl text-[11px] font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10"
						>
							<Eraser className="w-3.5 h-3.5 mr-1.5" /> Clear
						</Button>
					</div>
				)}
				<div
					className={cn(
						"relative z-10 w-full mx-auto flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
						// THE FIX: Tighter aspect ratios and larger max-widths so it fills the card beautifully
						isReadOnly ? "aspect-430/330 max-w-85" : "aspect-430/720 max-w-95 lg:max-w-105",
						!isReadOnly && jawType === "UPPER"
							? "translate-y-[30%] lg:translate-y-[25%]"
							: !isReadOnly && jawType === "LOWER"
								? "lg:-translate-y-[25%] -translate-y-[22%]"
								: "translate-y-0",
					)}
				>
					<svg
						viewBox={svgViewBox}
						shapeRendering="geometricPrecision"
						className={cn(
							"w-full h-full overflow-visible drop-shadow-xl transition-all duration-500 will-change-transform",
							isLocked && !isReadOnly && "grayscale-30 blur-[1px] opacity-30",
							isReadOnly && "pointer-events-none",
						)}
					>
						{renderedQuadrants.map((quadrant) => {
							const isFaded = !isReadOnly && ((jawType === "UPPER" && !quadrant.isUpper) || (jawType === "LOWER" && quadrant.isUpper));

							return (
								<g
									key={quadrant.id}
									transform={quadrant.transform}
									className={cn(
										"transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
										isFaded && "opacity-15 grayscale blur-[2px] pointer-events-none",
										isReadOnly && "pointer-events-auto",
									)}
								>
									{TEETH_PATHS.map((tooth, index) => {
										const toothEnum = quadrant.teeth[index];
										return (
											<ToothItem key={toothEnum} toothData={tooth} enumId={toothEnum} isSelected={selectedSet.has(toothEnum)} isDisabled={isDisabled} onToggle={handleToggle} />
										);
									})}
								</g>
							);
						})}
					</svg>
				</div>
				{isLocked && !isReadOnly && jawType !== "OTHER" && (
					<div className="absolute inset-0 z-30 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500 bg-background/10 ">
						<div className="bg-background/90 backdrop-blur-xl border border-border shadow-2xl p-6 rounded-3xl flex flex-col items-center text-center max-w-70">
							<div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
								<Lock className="w-6 h-6" />
							</div>
							<h3 className="text-base font-bold text-foreground mb-1 text-balance">Mapping Locked</h3>
							<p className="text-xs text-muted-foreground font-medium leading-relaxed">Please select a product and pricing plan to enable anatomical mapping.</p>
						</div>
					</div>
				)}
			</div>
		</TooltipProvider>
	);
});

interface ToothProps {
	toothData: (typeof TEETH_PATHS)[0];
	enumId: ToothPosition;
	isSelected: boolean;
	isDisabled: boolean;
	onToggle: (id: ToothPosition) => void;
}

const ToothItem = memo(function ToothItem({ toothData, enumId, isSelected, isDisabled, onToggle }: ToothProps) {
	const readableName = enumId.replace(/([A-Z])/g, " $1").trim();
	const handleClick = useCallback(() => {
		onToggle(enumId);
	}, [onToggle, enumId]);

	return (
		<Tooltip key={enumId}>
			<TooltipTrigger asChild>
				<g
					onClick={handleClick}
					className={cn(
						"outline-none transition-all  duration-200 transform-gpu origin-center transform-fill",
						isDisabled ? "cursor-default" : "cursor-pointer",
						isSelected ? "text-primary scale-[1.03]" : "text-slate-300 dark:text-white/10",
						!isDisabled && !isSelected && "hover:text-primary/60 hover:scale-[1.02]",
					)}
				>
					<path
						stroke="currentColor"
						// 4. REMOVED COSTLY SVG FILTER, REPLACED WITH TAILWIND DROP-SHADOW
						strokeWidth={isSelected ? 2.5 : 1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
						d={toothData.outlinePath}
						className={cn("transition-colors duration-200", isSelected && "drop-shadow-md")}
					/>
					<path fill="currentColor" d={toothData.shadowPath} className={cn("transition-all duration-200", isSelected ? "opacity-30" : "opacity-0", !isDisabled && "hover:opacity-10")} />
				</g>
			</TooltipTrigger>
			<TooltipContent sideOffset={10} className="glass-ai-panel! bg-background! border-border shadow-2xl z-50 pointer-events-none">
				<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{toothData.type}</p>
				<p className="text-sm font-bold text-foreground">{readableName}</p>
			</TooltipContent>
		</Tooltip>
	);
});
