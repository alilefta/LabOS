"use client";

import { Info, LayoutGrid, Layers, Package, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface HierarchyProps {
	categoryName: string;
	isCreatingProductOnly?: boolean;
	isCreatingPriceOnly?: boolean;
}

export function WorkTypeBlueprintHierarchy({ categoryName, isCreatingProductOnly, isCreatingPriceOnly }: HierarchyProps) {
	return (
		<div className="p-5 rounded-3xl bg-slate-50 dark:bg-white/2 border border-border space-y-4">
			<div className="flex items-center gap-2 mb-2">
				<Info className="w-4 h-4 text-primary" />
				<span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Manufacturing Blueprint</span>
			</div>

			<div className="flex flex-col gap-2 pl-2 border-l-2 border-primary/20 ml-2">
				{/* 1. Category (Read Only) */}
				<div className="flex items-center gap-3 opacity-60">
					<div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center">
						<LayoutGrid className="w-3.5 h-3.5" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase text-muted-foreground">Category</span>
						<span className="text-xs font-bold text-foreground">{categoryName}</span>
					</div>
				</div>

				<div className="h-4 w-px bg-border ml-3" />

				{/* 2. Work Type */}
				<div className={cn("flex items-center gap-3 transition-opacity", isCreatingProductOnly && "opacity-60")}>
					<div className={cn("w-6 h-6 rounded-lg flex items-center justify-center shadow-sm", isCreatingProductOnly ? "bg-slate-200 dark:bg-white/10" : "bg-primary text-white")}>
						<Layers className="w-3.5 h-3.5" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase text-muted-foreground">Work type</span>
						<span className="text-xs font-bold text-foreground">{isCreatingProductOnly ? "Existing Department" : "Defining New Department"}</span>
					</div>
				</div>

				<div className="h-4 w-px bg-border ml-3" />

				{/* 3. Product */}
				<div className="flex items-center gap-3">
					<div className="w-6 h-6 rounded-lg bg-ai text-white flex items-center justify-center shadow-sm shadow-ai/20">
						<Package className="w-3.5 h-3.5" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase text-muted-foreground">Initial product</span>
						<span className="text-xs font-bold text-foreground">Defining Catalog Item</span>
					</div>
				</div>

				<div className="h-4 w-px bg-border ml-3" />

				{/* 4. Pricing */}
				<div className="flex items-center gap-3">
					<div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
						<Wallet className="w-3.5 h-3.5" />
					</div>
					<div className="flex flex-col">
						<span className="text-[10px] font-bold uppercase text-muted-foreground">Default pricing</span>
						<span className="text-xs font-bold text-foreground">Defining Financial Logic</span>
					</div>
				</div>
			</div>
		</div>
	);
}
