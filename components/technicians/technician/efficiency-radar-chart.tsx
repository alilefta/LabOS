"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const data = [
	{ subject: "Speed", A: 85, fullMark: 100 },
	{ subject: "Quality", A: 98, fullMark: 100 },
	{ subject: "Consistency", A: 90, fullMark: 100 },
	{ subject: "Complexity", A: 70, fullMark: 100 },
	{ subject: "Diligence", A: 95, fullMark: 100 },
];

export function EfficiencyRadarChart() {
	return (
		<div className="lab-card p-6 flex flex-col h-full">
			<div className="mb-6">
				<h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Skill Blueprint</h3>
				<p className="text-xs text-muted-foreground mt-1">Multi-dimensional performance audit</p>
			</div>

			<div className="flex-1 w-full min-h-[250px]">
				<ResponsiveContainer width="100%" height="100%">
					<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
						<PolarGrid stroke="var(--color-border)" />
						<PolarAngleAxis dataKey="subject" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10, fontWeight: 600 }} />
						<Radar name="Performance" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} animationDuration={1500} />
					</RadarChart>
				</ResponsiveContainer>
			</div>

			<div className="mt-6 flex justify-center gap-6">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-primary" />
					<span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">Current Capacity: 92%</span>
				</div>
			</div>
		</div>
	);
}
