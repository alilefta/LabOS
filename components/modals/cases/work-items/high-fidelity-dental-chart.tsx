"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToothPosition } from "@/schema/base/tooth-position.base";

interface ChartProps {
	jawType: "UPPER" | "LOWER" | "BOTH" | "OTHER";
	selectedTeeth: ToothPosition[];
	onToggleTooth: (id: ToothPosition) => void;
	onSelectArch?: (archTeeth: ToothPosition[]) => void;
	onClearArch?: (archTeeth: ToothPosition[]) => void;
}

type ToothDef = { id: ToothPosition; num: number; label: string };

// Patient's Right (Left side of screen) to Patient's Left (Right side of screen)
const UPPER_ARCH: ToothDef[] = [
	{ id: "UpperRightThirdMolar", num: 1, label: "UR8" },
	{ id: "UpperRightSecondMolar", num: 2, label: "UR7" },
	{ id: "UpperRightFirstMolar", num: 3, label: "UR6" },
	{ id: "UpperRightSecondPremolar", num: 4, label: "UR5" },
	{ id: "UpperRightFirstPremolar", num: 5, label: "UR4" },
	{ id: "UpperRightCanine", num: 6, label: "UR3" },
	{ id: "UpperRightLateralIncisor", num: 7, label: "UR2" },
	{ id: "UpperRightCentralIncisor", num: 8, label: "UR1" },
	{ id: "UpperLeftCentralIncisor", num: 9, label: "UL1" },
	{ id: "UpperLeftLateralIncisor", num: 10, label: "UL2" },
	{ id: "UpperLeftCanine", num: 11, label: "UL3" },
	{ id: "UpperLeftFirstPremolar", num: 12, label: "UL4" },
	{ id: "UpperLeftSecondPremolar", num: 13, label: "UL5" },
	{ id: "UpperLeftFirstMolar", num: 14, label: "UL6" },
	{ id: "UpperLeftSecondMolar", num: 15, label: "UL7" },
	{ id: "UpperLeftThirdMolar", num: 16, label: "UL8" },
];

const LOWER_ARCH: ToothDef[] = [
	{ id: "LowerRightThirdMolar", num: 32, label: "LR8" },
	{ id: "LowerRightSecondMolar", num: 31, label: "LR7" },
	{ id: "LowerRightFirstMolar", num: 30, label: "LR6" },
	{ id: "LowerRightSecondPremolar", num: 29, label: "LR5" },
	{ id: "LowerRightFirstPremolar", num: 28, label: "LR4" },
	{ id: "LowerRightCanine", num: 27, label: "LR3" },
	{ id: "LowerRightLateralIncisor", num: 26, label: "LR2" },
	{ id: "LowerRightCentralIncisor", num: 25, label: "LR1" },
	{ id: "LowerLeftCentralIncisor", num: 24, label: "LL1" },
	{ id: "LowerLeftLateralIncisor", num: 23, label: "LL2" },
	{ id: "LowerLeftCanine", num: 22, label: "LL3" },
	{ id: "LowerLeftFirstPremolar", num: 21, label: "LL4" },
	{ id: "LowerLeftSecondPremolar", num: 20, label: "LL5" },
	{ id: "LowerLeftFirstMolar", num: 19, label: "LL6" },
	{ id: "LowerLeftSecondMolar", num: 18, label: "LL7" },
	{ id: "LowerLeftThirdMolar", num: 17, label: "LL8" },
];

export function HighFidelityDentalChart({ jawType, selectedTeeth, onToggleTooth, onSelectArch, onClearArch }: ChartProps) {
	// Mathematics for the Dental Arch Curve
	const calculateTransform = (index: number, total: number, isUpper: boolean) => {
		const center = (total - 1) / 2; // 7.5
		const offset = index - center; // ranges from -7.5 to +7.5

		// 1. Rotation: Teeth curve inward at the edges
		const rotation = offset * (isUpper ? 3.5 : -3.5);

		// 2. Y-Translation: Quadratic curve to form the U-shape
		const yDistance = Math.pow(offset, 2) * 1.8;
		const translateY = isUpper ? yDistance : -yDistance;

		return `translateY(${translateY}px) rotate(${rotation}deg)`;
	};

	const renderArch = (teeth: ToothDef[], isUpper: boolean) => {
		return (
			<div className="flex justify-center gap-1.5 sm:gap-2 lg:gap-3 relative z-10 w-full! px-8">
				<TooltipProvider delayDuration={100}>
					{teeth.map((tooth, idx) => {
						const isSelected = selectedTeeth.includes(tooth.id);
						const transform = calculateTransform(idx, teeth.length, isUpper);

						return (
							<Tooltip key={tooth.id}>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={() => onToggleTooth(tooth.id)}
										style={{ transform }}
										className={cn(
											"relative group flex flex-col items-center justify-center transition-all duration-300",
											"w-8 h-12 sm:w-10 sm:h-16 lg:w-12 lg:h-20 rounded-[20px] border-2 overflow-hidden",
											isSelected
												? "bg-primary border-primary shadow-[0_0_20px_var(--color-primary)] scale-110 z-20"
												: "bg-white dark:bg-[#121214] border-slate-200 dark:border-white/10 hover:border-primary/50 hover:bg-primary/5 shadow-sm hover:z-20 hover:scale-105",
										)}
									>
										{/* 
                      --- THE "NATURAL TEETH" PLACEHOLDER ---
                      When you get your actual tooth SVGs or PNGs, 
                      insert them here using absolute positioning:
                      <img src={`/assets/teeth/${tooth.num}.png`} className="absolute inset-0 w-full h-full object-contain p-1" />
                    */}

										{/* Inner 3D Glass Effect */}
										<div className={cn("absolute inset-1 rounded-xl opacity-20 bg-linear-to-b from-white to-transparent", isSelected ? "opacity-30" : "dark:from-white/20")} />

										{/* Tooth Number Indicator */}
										<span
											className={cn(
												"relative z-10 font-mono text-[11px] sm:text-[13px] font-bold drop-shadow-md",
												isSelected ? "text-white" : "text-slate-600 dark:text-zinc-400 group-hover:text-primary",
											)}
										>
											{tooth.num}
										</span>
									</button>
								</TooltipTrigger>
								<TooltipContent side={isUpper ? "top" : "bottom"} className="glass-ai-panel bg-background! px-3 py-2 border-border shadow-2xl">
									<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{tooth.label}</p>
									<p className="text-sm font-bold text-foreground">{tooth.id.replace(/([A-Z])/g, " $1").trim()}</p>
								</TooltipContent>
							</Tooltip>
						);
					})}
				</TooltipProvider>
			</div>
		);
	};

	return (
		<div className="flex-1 w-full h-full flex flex-col items-center justify-center relative p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent dark:from-white/5">
			{/* Ambient Neural Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

			<div className="relative z-10 flex flex-col items-center justify-center w-full gap-24 sm:gap-32 lg:gap-40">
				{/* --- UPPER ARCH --- */}
				<div
					className={cn(
						"w-full flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
						jawType === "LOWER" ? "opacity-20 pointer-events-none grayscale blur-[2px] scale-95 translate-y-8" : "opacity-100 scale-100",
					)}
				>
					<div className="flex items-center gap-4 mb-16 lg:mb-20">
						<span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border shadow-sm">
							Maxillary Arch (Upper)
						</span>
						{onSelectArch && (
							<div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity focus-within:opacity-100 -ml-2 absolute right-0 translate-x-full">
								<button onClick={() => onSelectArch(UPPER_ARCH.map((t) => t.id))} className="p-1.5 rounded-md hover:bg-primary/10 text-primary transition-colors">
									<CheckIcon className="w-3.5 h-3.5" />
								</button>
								<button onClick={() => onClearArch && onClearArch(UPPER_ARCH.map((t) => t.id))} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
									<X className="w-3.5 h-3.5" />
								</button>
							</div>
						)}
					</div>
					{renderArch(UPPER_ARCH, true)}
				</div>

				{/* --- LOWER ARCH --- */}
				<div
					className={cn(
						"w-full flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
						jawType === "UPPER" ? "opacity-20 pointer-events-none grayscale blur-[2px] scale-95 -translate-y-8" : "opacity-100 scale-100",
					)}
				>
					{renderArch(LOWER_ARCH, false)}
					<div className="flex items-center gap-4 mt-16 lg:mt-20">
						<span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border shadow-sm">
							Mandibular Arch (Lower)
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
