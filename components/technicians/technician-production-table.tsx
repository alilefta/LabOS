"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Search, Zap, AlertCircle } from "lucide-react";

const TECHS = [
	{ id: "1", name: "Marco Rossi", specialty: "Zirconia", capacity: 85, quality: 99, cases: 12, earnings: 4200 },
	{ id: "2", name: "Elena Vance", specialty: "E-Max", capacity: 95, quality: 92, cases: 18, earnings: 5100 },
	{ id: "3", name: "Julian Chen", specialty: "Implants", capacity: 40, quality: 100, cases: 4, earnings: 3800 },
];

export function TechnicianProductionTable() {
	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden">
			<div className="p-4 border-b border-border flex items-center justify-between gap-4">
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
					<input type="text" placeholder="Search technicians..." className="w-full h-9 pl-9 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary" />
				</div>
			</div>

			<div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-slate-50/30 dark:bg-white/1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
				<div className="col-span-4">Technician</div>
				<div className="col-span-3">Capacity</div>
				<div className="col-span-2 text-center">Quality</div>
				<div className="col-span-3 text-right">MTD Earnings</div>
			</div>

			<div className="flex-1 overflow-y-auto custom-scrollbar">
				{TECHS.map((tech) => (
					<div key={tech.id} className="row-hover grid grid-cols-12 px-6 py-4 border-b border-border items-center">
						<div className="col-span-4 flex items-center gap-3">
							<Avatar className="w-9 h-9 rounded-xl border border-border">
								<AvatarFallback className="bg-primary/10 text-primary font-bold">{tech.name.substring(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-sm font-bold">{tech.name}</span>
								<span className="text-[11px] text-muted-foreground">{tech.specialty}</span>
							</div>
						</div>

						{/* Capacity Visualizer */}
						<div className="col-span-3 pr-8">
							<div className="flex items-center justify-between text-[10px] mb-1.5 font-bold">
								<span className={tech.capacity > 90 ? "text-rose-500" : "text-muted-foreground"}>{tech.capacity}% Load</span>
								<span className="text-muted-foreground">{tech.cases} Cases</span>
							</div>
							<div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
								<div
									className={cn("h-full rounded-full transition-all duration-1000", tech.capacity > 90 ? "bg-rose-500" : tech.capacity > 70 ? "bg-amber-500" : "bg-primary")}
									style={{ width: `${tech.capacity}%` }}
								/>
							</div>
						</div>

						<div className="col-span-2 flex justify-center">
							<div className="flex items-center gap-1.5 font-mono font-bold text-sm text-emerald-500">
								<Zap className="w-3 h-3" /> {tech.quality}%
							</div>
						</div>

						<div className="col-span-3 text-right font-mono font-bold text-sm text-foreground">${tech.earnings.toLocaleString()}</div>
					</div>
				))}
			</div>
		</div>
	);
}
