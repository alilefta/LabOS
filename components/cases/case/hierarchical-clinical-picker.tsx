"use client";

import { useState } from "react";
import { Check, Info, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mocking the Prisma data hierarchy
const CATEGORIES = [
	{ id: "cat1", name: "Fixed Prosthetics", image: "/icons/crown.png", description: "Crowns, Bridges, Inlays" },
	{ id: "cat2", name: "Removables", image: "/icons/denture.png", description: "Dentures, partials" },
	{ id: "cat3", name: "Implants", image: "/icons/implant.png", description: "Abutments, All-on-X" },
];

export function HierarchicalClinicalPicker() {
	const [selectedCat, setSelectedCat] = useState<string | null>(null);

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
			{/* 1. Category Selection */}
			<section>
				<div className="flex items-center gap-2 mb-4">
					<h3 className="text-sm font-bold uppercase tracking-widest text-foreground">1. Select Category</h3>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Info className="w-3.5 h-3.5 text-muted-foreground" />
							</TooltipTrigger>
							<TooltipContent className="glass-ai-panel p-2 text-xs">Categories determine the available work types and pricing logic.</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					{CATEGORIES.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setSelectedCat(cat.id)}
							className={cn(
								"lab-card p-4 flex flex-col items-start text-left transition-all duration-300 group relative overflow-hidden",
								selectedCat === cat.id ? "ring-2 ring-primary border-transparent bg-primary/5" : "hover:border-primary/40",
							)}
						>
							<div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
								{/* Placeholder for cat.image */}
								<div className="w-6 h-6 bg-primary/20 rounded-md" />
							</div>
							<p className="text-sm font-bold text-foreground mb-1">{cat.name}</p>
							<p className="text-[11px] text-muted-foreground leading-tight">{cat.description}</p>

							{selectedCat === cat.id && (
								<div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white animate-in zoom-in">
									<Check className="w-3 h-3 stroke-[3]" />
								</div>
							)}
						</button>
					))}
				</div>
			</section>

			{/* 2. Searchable WorkType & Product (Conditional) */}
			{selectedCat && (
				<section className="animate-in fade-in slide-in-from-top-2 duration-500">
					<div className="flex items-center gap-2 mb-4">
						<h3 className="text-sm font-bold uppercase tracking-widest text-foreground">2. Select Product</h3>
					</div>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
						<input
							placeholder="Search products (e.g. Zirconia Monolithic, E-Max Crown...)"
							className="w-full h-12 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none"
						/>
					</div>
				</section>
			)}
		</div>
	);
}
