"use client";

import { useFormContext } from "react-hook-form";
import { Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CreateCaseInput } from "@/schema/composed/case.details";

// Mocking the Prisma data hierarchy
const CATEGORIES = [
	{ id: "cat1", name: "Fixed Prosthetics", icon: "💎", description: "Crowns, Bridges, Inlays" },
	{ id: "cat2", name: "Removables", icon: "🦷", description: "Dentures, Partials" },
	{ id: "cat3", name: "Implants", icon: "🔩", description: "Abutments, All-on-X" },
];

export function CaseCategorySelector() {
	const { watch, setValue } = useFormContext<CreateCaseInput>();
	const selectedCat = watch("caseCategoryId");

	return (
		<section className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
			<div className="flex items-center gap-2">
				<h3 className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">1. Select Clinical Category</h3>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Info className="w-3.5 h-3.5 text-muted-foreground" />
						</TooltipTrigger>
						<TooltipContent className="glass-ai-panel p-2 text-xs border-border">Categories filter the available materials and pricing logic.</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mx-1">
				{CATEGORIES.map((cat) => (
					<button
						key={cat.id}
						type="button"
						onClick={() => setValue("caseCategoryId", cat.id, { shouldValidate: true })}
						className={cn(
							"lab-card p-4 flex flex-col items-start text-left transition-all duration-300 group relative overflow-hidden",
							selectedCat === cat.id ? "ring-2 ring-primary border-transparent bg-primary/5 shadow-ai-glow-light" : "hover:border-primary/40 bg-card border-border",
						)}
					>
						<div
							className={cn(
								"w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-transform",
								selectedCat === cat.id ? "bg-primary text-white scale-110" : "bg-slate-100 dark:bg-white/5 text-slate-500 group-hover:scale-110 group-hover:text-primary",
							)}
						>
							<span className="text-xl">{cat.icon}</span>
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
	);
}
