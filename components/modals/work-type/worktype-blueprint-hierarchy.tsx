"use client";

import { Info, LayoutGrid, Layers, Package, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface HierarchyProps {
	categoryName?: string | null;
	isCreatingProductOnly?: boolean;
	isCreatingPriceOnly?: boolean;
}

export function WorkTypeBlueprintHierarchy({ categoryName, isCreatingProductOnly, isCreatingPriceOnly }: HierarchyProps) {
	// Determine active states based on what we are explicitly creating
	const isWorkTypeActive = !isCreatingProductOnly && !isCreatingPriceOnly;
	const isProductActive = isCreatingProductOnly || isWorkTypeActive;
	const isPriceActive = isCreatingPriceOnly || isProductActive;

	return (
		<div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-white/2 border border-border space-y-5 shadow-sm">
			<div className="flex items-center gap-2">
				<div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
					<Info className="w-3.5 h-3.5 text-primary" />
				</div>
				<span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Manufacturing Blueprint</span>
			</div>

			<div className="flex flex-col relative pl-2 ml-1">
				{/* Continuous Timeline Line behind the icons */}
				<div className="absolute top-4 bottom-4 left-2.75 w-0.5 bg-border dark:bg-white/5 -z-10"></div>
				<div className="absolute top-4 bottom-4 left-2.75 w-0.5 bg-primary/20 -z-10" style={{ height: isCreatingPriceOnly ? "100%" : isCreatingProductOnly ? "66%" : "33%" }}></div>

				{/* 1. Category (Read Only - Always muted) */}
				<div className="flex items-start gap-4 opacity-60 pb-5">
					<div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214]">
						<LayoutGrid className="w-3 h-3 text-slate-500" />
					</div>
					<div className="flex flex-col mt-0.5">
						<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">Parent Category</span>
						<span className="text-xs font-bold text-foreground">{categoryName || "Selected Category"}</span>
					</div>
				</div>

				{/* 2. Work Type */}
				<div className={cn("flex items-start gap-4 transition-all duration-300 pb-5", !isWorkTypeActive && "opacity-60")}>
					<div
						className={cn(
							"w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214] shadow-sm transition-colors duration-300",
							isWorkTypeActive ? "bg-primary text-white shadow-primary/20" : "bg-slate-200 dark:bg-white/10 text-slate-500",
						)}
					>
						<Layers className="w-3 h-3" />
					</div>
					<div className="flex flex-col mt-0.5">
						<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">Work Type</span>
						<span className={cn("text-xs font-bold", isWorkTypeActive ? "text-primary" : "text-foreground")}>{isWorkTypeActive ? "Defining New Department" : "Existing Department"}</span>
					</div>
				</div>

				{/* 3. Product */}
				<div className={cn("flex items-start gap-4 transition-all duration-300 pb-5", !isProductActive && "opacity-60")}>
					<div
						className={cn(
							"w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214] shadow-sm transition-colors duration-300",
							isProductActive ? "bg-ai text-white shadow-ai/20" : "bg-slate-200 dark:bg-white/10 text-slate-500",
						)}
					>
						<Package className="w-3 h-3" />
					</div>
					<div className="flex flex-col mt-0.5">
						<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">Manufacturing Product</span>
						<span className={cn("text-xs font-bold", isProductActive ? "text-ai" : "text-foreground")}>{isProductActive ? "Defining Catalog Item" : "Existing Product"}</span>
					</div>
				</div>

				{/* 4. Pricing */}
				<div className={cn("flex items-start gap-4 transition-all duration-300", !isPriceActive && "opacity-60")}>
					<div
						className={cn(
							"w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214] shadow-sm transition-colors duration-300",
							isPriceActive ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-slate-200 dark:bg-white/10 text-slate-500",
						)}
					>
						<Wallet className="w-3 h-3" />
					</div>
					<div className="flex flex-col mt-0.5">
						<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">Default Pricing</span>
						<span className={cn("text-xs font-bold", isPriceActive ? "text-emerald-500 dark:text-emerald-400" : "text-foreground")}>
							{isPriceActive ? "Defining Financial Logic" : "Existing Pricing Plan"}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
