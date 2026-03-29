import { cn } from "@/lib/utils";
import { CreateSelectedToothInput } from "@/schema/composed/selected-tooth.details";

// 1. PALMER / QUADRANT DICTIONARY
const TOOTH_MAP: Record<string, { q: "UR" | "UL" | "LL" | "LR"; n: number }> = {
	UpperRightCentralIncisor: { q: "UR", n: 1 },
	UpperRightLateralIncisor: { q: "UR", n: 2 },
	UpperRightCanine: { q: "UR", n: 3 },
	UpperRightFirstPremolar: { q: "UR", n: 4 },
	UpperRightSecondPremolar: { q: "UR", n: 5 },
	UpperRightFirstMolar: { q: "UR", n: 6 },
	UpperRightSecondMolar: { q: "UR", n: 7 },
	UpperRightThirdMolar: { q: "UR", n: 8 },
	UpperLeftCentralIncisor: { q: "UL", n: 1 },
	UpperLeftLateralIncisor: { q: "UL", n: 2 },
	UpperLeftCanine: { q: "UL", n: 3 },
	UpperLeftFirstPremolar: { q: "UL", n: 4 },
	UpperLeftSecondPremolar: { q: "UL", n: 5 },
	UpperLeftFirstMolar: { q: "UL", n: 6 },
	UpperLeftSecondMolar: { q: "UL", n: 7 },
	UpperLeftThirdMolar: { q: "UL", n: 8 },
	LowerLeftCentralIncisor: { q: "LL", n: 1 },
	LowerLeftLateralIncisor: { q: "LL", n: 2 },
	LowerLeftCanine: { q: "LL", n: 3 },
	LowerLeftFirstPremolar: { q: "LL", n: 4 },
	LowerLeftSecondPremolar: { q: "LL", n: 5 },
	LowerLeftFirstMolar: { q: "LL", n: 6 },
	LowerLeftSecondMolar: { q: "LL", n: 7 },
	LowerLeftThirdMolar: { q: "LL", n: 8 },
	LowerRightCentralIncisor: { q: "LR", n: 1 },
	LowerRightLateralIncisor: { q: "LR", n: 2 },
	LowerRightCanine: { q: "LR", n: 3 },
	LowerRightFirstPremolar: { q: "LR", n: 4 },
	LowerRightSecondPremolar: { q: "LR", n: 5 },
	LowerRightFirstMolar: { q: "LR", n: 6 },
	LowerRightSecondMolar: { q: "LR", n: 7 },
	LowerRightThirdMolar: { q: "LR", n: 8 },
};

// 2. THE VISUAL COMPONENT
export function TeethQuadrantSummary({ selectedTeeth }: { selectedTeeth: CreateSelectedToothInput[] | undefined }) {
	if (!selectedTeeth || selectedTeeth.length === 0) {
		return <span className="text-[11px] text-muted-foreground italic">No specific teeth mapped</span>;
	}

	// Group the raw enums by Quadrant
	const grouped = selectedTeeth.reduce(
		(acc, rawTooth) => {
			// Handle both { toothPosition: "..." } object format and direct string format
			const toothKey = typeof rawTooth === "string" ? rawTooth : rawTooth.toothPosition;
			const mapped = TOOTH_MAP[toothKey];

			if (mapped) {
				if (!acc[mapped.q]) acc[mapped.q] = [];
				acc[mapped.q].push(mapped.n);
			}
			return acc;
		},
		{} as Record<string, number[]>,
	);

	// Render a visual badge for each active quadrant
	return (
		<div className="flex flex-wrap gap-2 mt-1">
			{["UR", "UL", "LR", "LL"].map((quad) => {
				const teethInQuad = grouped[quad];
				if (!teethInQuad) return null;

				// Sort 1 to 8
				teethInQuad.sort((a, b) => a - b);

				return (
					<div key={quad} className="flex items-center rounded-md border border-border bg-slate-50 dark:bg-white/5 overflow-hidden shadow-sm">
						{/* Quadrant Indicator (e.g., UR, UL) */}
						<div
							className={cn(
								"px-1.5 py-0.5 text-[9px] font-bold text-white",
								quad.startsWith("U") ? "bg-primary" : "bg-indigo-500", // Blue for Upper, Indigo for Lower
							)}
						>
							{quad}
						</div>
						{/* Teeth Numbers (1-8) */}
						<div className="px-2 py-0.5 text-[11px] font-mono font-bold text-foreground">{teethInQuad.join(", ")}</div>
					</div>
				);
			})}
		</div>
	);
}
