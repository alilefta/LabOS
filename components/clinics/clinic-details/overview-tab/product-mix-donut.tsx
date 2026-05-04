"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Layers, TrendingUp } from "lucide-react";

const MOCK_MIX_DATA = [
	{ name: "Fixed Prosthetics", value: 65, color: "var(--color-primary)" },
	{ name: "Removables", value: 25, color: "var(--color-chart-2)" },
	{ name: "Implants", value: 10, color: "var(--color-chart-3)" },
];

export function ProductMixDonut() {
	return (
		<div className="lab-card flex-1 p-6 flex flex-col relative overflow-hidden group min-h-[320px]">
			<div className="flex items-center justify-between mb-2 relative z-10">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
						<Layers className="w-5 h-5" />
					</div>
					<div>
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Product Mix</h3>
						<p className="text-xs font-medium text-foreground mt-0.5">Lifetime Volume</p>
					</div>
				</div>
			</div>

			<div className="flex-1 w-full relative min-h-[160px] -mt-4">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={MOCK_MIX_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
							{MOCK_MIX_DATA.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity outline-none" />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				{/* Center Text */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
					<span className="text-2xl font-mono font-bold text-foreground">142</span>
					<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Cases</span>
				</div>
			</div>

			{/* Custom Legend */}
			<div className="space-y-2.5 mt-auto relative z-10">
				{MOCK_MIX_DATA.map((item, i) => (
					<div key={i} className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="text-xs font-semibold text-foreground">{item.name}</span>
						</div>
						<span className="text-xs font-mono font-bold text-muted-foreground">{item.value}%</span>
					</div>
				))}
			</div>
		</div>
	);
}
