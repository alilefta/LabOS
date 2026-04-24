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

// 2. INTERNAL BADGE COMPONENT (Semantic Styling)
function SummaryBadge({ color, label, value }: { color: "primary" | "indigo" | "ai" | "emerald"; label: string; value: string }) {
	const colorStyles = {
		primary: "border-border bg-slate-50 dark:bg-white/5",
		primaryLabel: "bg-primary text-white",
		primaryValue: "text-foreground font-mono",

		indigo: "border-border bg-slate-50 dark:bg-white/5",
		indigoLabel: "bg-indigo-500 text-white",
		indigoValue: "text-foreground font-mono",

		ai: "border-ai/30 bg-ai/5 shadow-[0_0_8px_rgba(139,92,246,0.15)]",
		aiLabel: "bg-ai text-white",
		aiValue: "text-ai font-sans",

		emerald: "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
		emeraldLabel: "bg-emerald-500 text-white",
		emeraldValue: "text-emerald-600 dark:text-emerald-400 font-sans",
	};

	return (
		<div className={cn("flex items-center rounded-md border overflow-hidden shadow-sm transition-all", colorStyles[color])}>
			<div className={cn("px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest", colorStyles[`${color}Label` as keyof typeof colorStyles])}>{label}</div>
			<div className={cn("px-2 py-0.5 text-[11px] font-bold tracking-tight", colorStyles[`${color}Value` as keyof typeof colorStyles])}>{value}</div>
		</div>
	);
}

// 3. THE VISUAL ALGORITHM COMPONENT
export function TeethQuadrantSummary({ selectedTeeth }: { selectedTeeth: CreateSelectedToothInput[] | undefined }) {
	if (!selectedTeeth || selectedTeeth.length === 0) {
		return <span className="text-[11px] text-muted-foreground italic">No specific teeth mapped</span>;
	}

	// Group the raw enums by Quadrant
	const grouped = selectedTeeth.reduce(
		(acc, rawTooth) => {
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

	// Extract and sort arrays (1 to 8)
	const ur = (grouped["UR"] || []).sort((a, b) => a - b);
	const ul = (grouped["UL"] || []).sort((a, b) => a - b);
	const lr = (grouped["LR"] || []).sort((a, b) => a - b);
	const ll = (grouped["LL"] || []).sort((a, b) => a - b);

	// Detect Full Quadrants (8 teeth)
	const urFull = ur.length === 8;
	const ulFull = ul.length === 8;
	const lrFull = lr.length === 8;
	const llFull = ll.length === 8;

	// Detect Full Arches (16 teeth) & Full Mouth (32 teeth)
	const upperFull = urFull && ulFull;
	const lowerFull = lrFull && llFull;
	const fullMouth = upperFull && lowerFull;

	const badges: React.ReactNode[] = [];

	if (fullMouth) {
		// Complete Dentition
		badges.push(<SummaryBadge key="full" color="emerald" label="FULL" value="Complete Dentition" />);
	} else {
		// --- UPPER ARCH EVALUATION ---
		if (upperFull) {
			badges.push(<SummaryBadge key="upper" color="ai" label="UPPER" value="Full Maxillary Arch" />);
		} else {
			if (urFull) badges.push(<SummaryBadge key="ur-full" color="primary" label="UR" value="Full Quadrant" />);
			else if (ur.length > 0) badges.push(<SummaryBadge key="ur" color="primary" label="UR" value={ur.join(", ")} />);

			if (ulFull) badges.push(<SummaryBadge key="ul-full" color="primary" label="UL" value="Full Quadrant" />);
			else if (ul.length > 0) badges.push(<SummaryBadge key="ul" color="primary" label="UL" value={ul.join(", ")} />);
		}

		// --- LOWER ARCH EVALUATION ---
		if (lowerFull) {
			badges.push(<SummaryBadge key="lower" color="ai" label="LOWER" value="Full Mandibular Arch" />);
		} else {
			if (lrFull) badges.push(<SummaryBadge key="lr-full" color="indigo" label="LR" value="Full Quadrant" />);
			else if (lr.length > 0) badges.push(<SummaryBadge key="lr" color="indigo" label="LR" value={lr.join(", ")} />);

			if (llFull) badges.push(<SummaryBadge key="ll-full" color="indigo" label="LL" value="Full Quadrant" />);
			else if (ll.length > 0) badges.push(<SummaryBadge key="ll" color="indigo" label="LL" value={ll.join(", ")} />);
		}
	}

	return <div className="flex flex-wrap gap-2">{badges}</div>;
}
