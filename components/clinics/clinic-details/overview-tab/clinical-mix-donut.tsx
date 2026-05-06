"use client";

import { useState, useMemo, memo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Layers, Package, Shapes } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = ["var(--color-primary)", "var(--color-ai)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-1)", "var(--color-chart-2)"];

type MixData = { name: string; value: number };

interface Props {
	categories: MixData[];
	workTypes: MixData[];
	products: MixData[];
}

type DonutView = "category" | "workType" | "product";

export const ClinicalMixDonut = memo(function ClinicalMixDonut({ categories, workTypes, products }: Props) {
	const [view, setView] = useState<DonutView>("category");

	// Select the dataset based on toggle
	const activeData = useMemo(() => {
		if (view === "category") return categories;
		if (view === "workType") return workTypes;
		return products;
	}, [view, categories, workTypes, products]);

	// Get top performer for the center text
	const topPerformer = useMemo(() => {
		return [...activeData].sort((a, b) => b.value - a.value)[0];
	}, [activeData]);

	const totalValue = useMemo(() => {
		return activeData.reduce((sum, item) => sum + item.value, 0);
	}, [activeData]);

	return (
		<div className="lab-card flex-1 p-6 flex flex-col relative overflow-hidden group min-h-90">
			{/* --- HEADER & TOGGLE --- */}
			<div className="flex flex-col gap-4 mb-4 relative z-10">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
							{view === "category" ? <Shapes className="w-5 h-5" /> : view === "workType" ? <Layers className="w-5 h-5" /> : <Package className="w-5 h-5" />}
						</div>
						<div>
							<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Volume Mix</h3>
							<p className="text-xs font-bold text-foreground">Clinical Distribution</p>
						</div>
					</div>
				</div>

				{/* THE LENS TOGGLE */}
				<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border w-full">
					{[
						{ id: "category", label: "Depts", icon: Shapes },
						{ id: "workType", label: "Types", icon: Layers },
						{ id: "product", label: "Items", icon: Package },
					].map((btn) => (
						<button
							key={btn.id}
							onClick={() => setView(btn.id as DonutView)}
							className={cn(
								"flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all",
								view === btn.id ? "bg-white dark:bg-white/10 text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
							)}
						>
							<btn.icon className="w-3 h-3" />
							{btn.label}
						</button>
					))}
				</div>
			</div>

			{/* --- CHART --- */}
			<div className="flex-1 w-full relative min-h-45">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={activeData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none" animationDuration={800}>
							{activeData.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none cursor-pointer" />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>

				{/* Center Text: Dynamic based on view */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-2">
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Top {view}</span>
					<span className="text-xl font-mono font-black text-foreground max-w-25 truncate text-center">{topPerformer?.name || "N/A"}</span>
					<span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-1">
						{topPerformer ? Math.round((topPerformer.value / totalValue) * 100) : 0}% Share
					</span>
				</div>
			</div>

			{/* --- LEGEND (Limited to top 4 items for UI cleanlines) --- */}
			<div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 relative z-10 border-t border-border/50 pt-4">
				{activeData.slice(0, 4).map((item, i) => (
					<div key={i} className="flex items-center justify-between min-w-0">
						<div className="flex items-center gap-2 min-w-0">
							<div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
							<span className="text-[10px] font-semibold text-foreground truncate">{item.name}</span>
						</div>
						<span className="text-[10px] font-mono font-bold text-muted-foreground ml-2">{Math.round((item.value / totalValue) * 100)}%</span>
					</div>
				))}
			</div>
		</div>
	);
});
