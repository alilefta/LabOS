"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Mock Data
const data = [
	{ month: "Sep", cases: 980 },
	{ month: "Oct", cases: 1100 },
	{ month: "Nov", cases: 1050 },
	{ month: "Dec", cases: 900 }, // Holidays
	{ month: "Jan", cases: 1250 },
	{ month: "Feb", cases: 1400 },
	{ month: "Mar", cases: 1284 },
];

// Custom Tooltip using our Glassmorphism spec
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-slate-900/95 dark:bg-[#121214]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl flex flex-col items-center">
				<p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
				<p className="text-lg font-bold text-white font-mono">
					{payload[0].value} <span className="text-xs text-slate-400 font-sans font-medium">cases</span>
				</p>
			</div>
		);
	}
	return null;
};

export function DashboardProductionChart() {
	return (
		<div className="lab-card p-6 flex-1 flex flex-col h-[400px]">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h2 className="text-lg font-bold text-foreground tracking-tight">Production Volume</h2>
					<p className="text-sm text-muted-foreground mt-0.5">Total cases received over time</p>
				</div>
				<Button variant="outline" size="sm" className="rounded-xl h-9 text-xs font-medium border-border hover:bg-secondary">
					Last 6 Months <ChevronDown className="w-3 h-3 ml-2 text-muted-foreground" />
				</Button>
			</div>

			<div className="flex-1 w-full min-h-0">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
						<defs>
							{/* The smooth gradient matching Chart-1 (Primary Blue) */}
							<linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
								<stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
							</linearGradient>
						</defs>

						{/* Whisper-thin horizontal grid lines only */}
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />

						<XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12, fontWeight: 500 }} dy={10} />

						<YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12, fontWeight: 500 }} dx={-10} />

						<Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--color-border)", strokeWidth: 1, strokeDasharray: "4 4" }} />

						<Area
							type="monotone"
							dataKey="cases"
							stroke="var(--color-chart-1)"
							strokeWidth={3}
							fillOpacity={1}
							fill="url(#colorCases)"
							activeDot={{ r: 6, fill: "var(--color-background)", stroke: "var(--color-chart-1)", strokeWidth: 3 }}
							animationDuration={1500}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
