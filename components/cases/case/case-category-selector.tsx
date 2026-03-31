"use client";

import { useCallback, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AlertTriangle, Check, Info, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { getCaseCategoriesAction } from "@/actions/case-category";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { CaseCategoryDetailsUI } from "@/schema/composed/case-category.details";

// Mocking the data fallback
// const TESTING_UI_CATS = [
// 	{ id: "cat1", name: "Fixed Prosthetics", icon: "💎", description: "Crowns, Bridges, Inlays", imageUrl: undefined },
// 	{ id: "cat2", name: "Removables", icon: "🦷", description: "Dentures, Partials", imageUrl: undefined },
// 	{ id: "cat3", name: "Implants", icon: "🔩", description: "Abutments, All-on-X", imageUrl: undefined },
// 	{ id: "cat4", name: "Orthodontics", icon: "😬", description: "Aligners, Retainers", imageUrl: undefined },
// 	{ id: "cat5", name: "Orthodontics", icon: "😬", description: "Aligners, Retainers", imageUrl: undefined },
// 	{ id: "cat46", name: "Orthodontics", icon: "😬", description: "Aligners, Retainers", imageUrl: undefined },
// 	{ id: "cat7", name: "Orthodontics", icon: "😬", description: "Aligners, Retainers", imageUrl: undefined },
// ];

// const FALLBACK_ICONS = ["💎", "🦷", "😬"];

type DataShape = CaseCategoryDetailsUI[];

interface Props {
	onCreateNew: () => void;
	newCreatedCategory: CaseCategoryDetailsUI | null;
	onSelect: (id: string, name: string) => void;
}

export function CaseCategorySelector({ onCreateNew, newCreatedCategory, onSelect }: Props) {
	const [pendingCategory, setPendingCategory] = useState<string | null>(null);
	const { watch, setValue, control } = useFormContext<CreateCaseInput>();
	const selectedCat = watch("caseCategoryId");

	const { fields, remove } = useFieldArray({ control, name: "caseWorkItems" });

	const queryKey = ["categories"] as const;

	const {
		data: fetchedCategories,
		isFetching,
		isLoading,
	} = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getCaseCategoriesAction({ limit: 10 });

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}

			return (res.data?.categories || []) as DataShape;
		},
	});

	const handleSelect = useCallback(
		(id: string, catName: string) => {
			onSelect(id, catName);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		onCreateNew();
	}, [onCreateNew]);

	const displayCategories = fetchedCategories && fetchedCategories.length > 0 ? fetchedCategories : [];

	const handleCategoryClick = (catId: string) => {
		if (selectedCat === catId) return;

		if (fields.length > 0) {
			setPendingCategory(catId);
		} else {
			setValue("caseCategoryId", catId, { shouldValidate: true });
		}
	};

	useEffect(() => {
		if (newCreatedCategory?.id) {
			setValue("caseCategoryId", newCreatedCategory.id, { shouldValidate: true });
		}
	}, [newCreatedCategory, setValue]);

	const confirmCategoryChange = () => {
		if (pendingCategory) {
			remove();
			setValue("caseCategoryId", pendingCategory, { shouldValidate: true });
			setPendingCategory(null);
		}
	};

	return (
		<section className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex items-center gap-2">
				<div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">1</div>
				<h3 className="text-[15px] font-bold text-foreground tracking-tight">Select Clinical Category</h3>
				<TooltipProvider>
					<Tooltip delayDuration={300}>
						<TooltipTrigger asChild>
							<div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center cursor-help transition-colors hover:bg-slate-200 dark:hover:bg-white/20">
								<Info className="w-3 h-3 text-muted-foreground" />
							</div>
						</TooltipTrigger>
						<TooltipContent className="glass-ai-panel p-3 max-w-50 text-xs border-border text-center leading-relaxed">
							Categories filter the available materials and pricing logic for this case.
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
				{isLoading || isFetching
					? /* --- BEAUTIFUL LOADING SKELETONS --- */
						Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								// The animation-delay creates a beautiful subtle wave effect across the grid
								className="lab-card p-4 sm:p-5 flex flex-col items-start bg-card dark:bg-white/2 border-border h-full"
								style={{ animationDelay: `${i * 100}ms` }}
							>
								{/* Icon Skeleton */}
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-4 bg-slate-200/70 dark:bg-white/5 animate-pulse" />

								{/* Title Skeleton */}
								<div className="h-4 w-3/4 bg-slate-200/70 dark:bg-white/10 rounded-md animate-pulse mb-2.5" />

								{/* Description Skeletons */}
								<div className="h-2.5 w-full bg-slate-100 dark:bg-white/5 rounded-md animate-pulse mb-1.5" />
								<div className="h-2.5 w-2/3 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse" />
							</div>
						))
					: /* --- ACTUAL CATEGORY CARDS --- */
						displayCategories.map((cat) => {
							const isSelected = selectedCat === cat.id;

							return (
								<button
									key={cat.id}
									type="button"
									onClick={() => handleCategoryClick(cat.id)}
									className={cn(
										"lab-card p-4 sm:p-5 flex flex-col items-start text-left transition-all duration-300 group relative overflow-hidden h-full",
										isSelected
											? "ring-2 ring-primary border-transparent bg-primary/5 dark:bg-primary/10 shadow-[0_8px_30px_rgba(37,99,235,0.12)]"
											: "hover:border-primary/40 bg-card dark:bg-white/2 border-border hover:shadow-md",
									)}
								>
									<div
										className={cn(
											"w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 overflow-hidden relative",
											isSelected
												? "bg-primary text-white scale-110 shadow-md"
												: "bg-white dark:bg-[#121214] border border-border text-slate-500 group-hover:scale-110 group-hover:border-primary/30 shadow-sm",
										)}
									>
										{/* Handle both Prisma 'imageUrl' and Mock 'icon' */}
										{cat.imageUrl ? <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover p-2" /> : <span className="text-xl sm:text-2xl">{"🦷"}</span>}
									</div>

									<p className={cn("text-sm font-bold mb-1 transition-colors", isSelected ? "text-primary" : "text-foreground")}>{cat.name}</p>
									<p className="text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-2">{cat.description ?? "No Description"}</p>

									{/* Glowing Checkmark */}
									{isSelected && (
										<div className="absolute top-3 right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center text-white animate-in zoom-in-50 duration-300 shadow-md">
											<Check className="w-3 h-3 sm:w-4 sm:h-4 stroke-3" />
										</div>
									)}
								</button>
							);
						})}
				{!isFetching && (
					<button
						type="button"
						onClick={handleCreateNew}
						className={cn(
							"lab-card p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all duration-300 group h-full",
							"border-2 border-dashed border-border hover:border-primary/40 bg-transparent hover:bg-slate-50 dark:hover:bg-white/2",
						)}
					>
						<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center transition-transform bg-slate-100 dark:bg-white/5 text-slate-500 group-hover:scale-110 group-hover:text-primary shadow-sm">
							<Plus className="w-5 h-5 sm:w-6 sm:h-6" />
						</div>
						<p className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Add Category</p>
						<p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">Create a custom clinical category</p>
					</button>
				)}
			</div>

			{/* Premium Alert Dialog for destructive actions */}
			<AlertDialog open={pendingCategory !== null} onOpenChange={(open) => !open && setPendingCategory(null)}>
				<AlertDialogContent className="rounded-2xl border-border shadow-premium dark:bg-[#121214]">
					<AlertDialogHeader>
						<div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 border border-destructive/20">
							<AlertTriangle className="w-6 h-6 text-destructive" />
						</div>
						<AlertDialogTitle className="text-xl font-bold tracking-tight">Change Category?</AlertDialogTitle>
						<AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
							You have already added work items and selected teeth for this case. Changing the clinical category will{" "}
							<strong className="text-foreground">permanently remove all current items</strong> to reset the pricing logic.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="mt-6 gap-3 sm:gap-0">
						<AlertDialogCancel className="rounded-xl h-10 font-semibold border-border hover:bg-secondary">Keep Current</AlertDialogCancel>
						<AlertDialogAction onClick={confirmCategoryChange} className="rounded-xl h-10 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold shadow-sm">
							Yes, Reset Items
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</section>
	);
}
