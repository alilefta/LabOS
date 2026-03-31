"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ChevronsUpDown, Plus, Layers, Package, CreditCard, LucideIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { ProductDetailsUI } from "@/schema/composed/product.details";
import { WorktypeDetailsUI } from "@/schema/composed/worktype.details";
import { CasePricingPlanDetailsUI } from "@/schema/composed/case-pricing-plan.details";

import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";
import { getWorkTypesByCategoryAction } from "@/actions/work-type";
import { getProductsByWorkTypeAction } from "@/actions/product";
import { getPricingPlansByProductAction } from "@/actions/pricing-plan";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

interface ClinicalProductConfiguratorProps {
	categoryId: string | null;
	selectedWorkTypeId: string; // Lifted state up if needed, otherwise managed internally
	selectedProductId: string;
	selectedPricingPlanId: string;
	onProductSelect: (id: string) => void;
	onPricingPlanSelect: (id: string) => void;
}

export function ClinicalProductConfigurator({ categoryId, selectedProductId, selectedPricingPlanId, onProductSelect, onPricingPlanSelect }: ClinicalProductConfiguratorProps) {
	// Internal cascading state for WorkType
	const [selectedWorkTypeId, setSelectedWorkTypeId] = useState<string>("");

	// Dropdown open states
	const [wtOpen, setWtOpen] = useState(false);
	const [prodOpen, setProdOpen] = useState(false);
	const [priceOpen, setPriceOpen] = useState(false);

	// Zustand Store Connectors
	const { openWorkTypeSheet, openProductSheet, openPricingSheet, newCreatedWorkTypeId, newCreatedProductId, newCreatedPricingId } = useClinicalCreationStore();

	// --- 1. REACT QUERY FETCHING (Cached, fast, automatic) ---

	const { data: workTypes = [], isFetching: isLoadingWT } = useQuery({
		queryKey: ["workTypes", categoryId],
		queryFn: async () => {
			const res = await getWorkTypesByCategoryAction({ caseCategoryId: categoryId!, limit: 50 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return (res.data?.workTypes as WorktypeDetailsUI[]) || [];
		},
		enabled: !!categoryId, // Only fetch if we have a category
	});

	const { data: products = [], isFetching: isLoadingProducts } = useQuery({
		queryKey: ["products", selectedWorkTypeId],
		queryFn: async () => {
			const res = await getProductsByWorkTypeAction({ workTypeId: selectedWorkTypeId, limit: 50 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return (res.data?.products as ProductDetailsUI[]) || [];
		},
		enabled: !!selectedWorkTypeId,
	});

	const { data: pricingPlans = [], isFetching: isLoadingPricing } = useQuery({
		queryKey: ["pricingPlans", selectedProductId],
		queryFn: async () => {
			const res = await getPricingPlansByProductAction({ productId: selectedProductId, limit: 50 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return (res.data?.pricings as CasePricingPlanDetailsUI[]) || [];
		},
		enabled: !!selectedProductId,
	});

	// --- 2. AUTO-SELECTION MAGIC (Listens to Zustand) ---

	useEffect(() => {
		if (newCreatedWorkTypeId) setSelectedWorkTypeId(newCreatedWorkTypeId);
	}, [newCreatedWorkTypeId]);

	useEffect(() => {
		if (newCreatedProductId) onProductSelect(newCreatedProductId);
	}, [newCreatedProductId, onProductSelect]);

	useEffect(() => {
		if (newCreatedPricingId) onPricingPlanSelect(newCreatedPricingId);
	}, [newCreatedPricingId, onPricingPlanSelect]);

	// --- 3. RENDER ---

	return (
		<div className="flex flex-col gap-5 animate-in fade-in duration-500">
			<div className="flex flex-col gap-2">
				<label className="text-[12px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">1. Work Type</label>
				<SelectorDropdown
					isOpen={wtOpen}
					setIsOpen={setWtOpen}
					isDisabled={!categoryId}
					isLoading={isLoadingWT}
					value={selectedWorkTypeId}
					placeholder={!categoryId ? "Select Category first" : "Select Work Type..."}
					icon={Layers}
					items={workTypes}
					onSelect={(id: string) => {
						setSelectedWorkTypeId(id);
						onProductSelect(""); // Reset child
						onPricingPlanSelect(""); // Reset grandchild
					}}
					onCreate={() => {
						setWtOpen(false);
						openWorkTypeSheet(categoryId!);
					}}
					createLabel="Create New Work Type"
					emptyText="No work types found."
					type="workType"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-[12px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">2. Manufacturing Product</label>
				<SelectorDropdown
					isOpen={prodOpen}
					setIsOpen={setProdOpen}
					isDisabled={!selectedWorkTypeId}
					isLoading={isLoadingProducts}
					value={selectedProductId}
					placeholder="Select Product..."
					icon={Package}
					items={products}
					onSelect={(id: string) => {
						onProductSelect(id);
						onPricingPlanSelect(""); // Reset grandchild
					}}
					onCreate={() => {
						setProdOpen(false);
						openProductSheet(selectedWorkTypeId);
					}}
					createLabel="Create New Product"
					emptyText="No products found in this work type."
					type="product"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-[12px] font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">3. Pricing Plan</label>
				<SelectorDropdown
					isOpen={priceOpen}
					setIsOpen={setPriceOpen}
					isDisabled={!selectedProductId}
					isLoading={isLoadingPricing}
					value={selectedPricingPlanId}
					placeholder="Select Pricing Plan..."
					icon={CreditCard}
					items={pricingPlans}
					onSelect={onPricingPlanSelect}
					onCreate={() => {
						setPriceOpen(false);
						openPricingSheet(selectedProductId);
					}}
					createLabel="Create Custom Pricing"
					emptyText="No pricing plans configured."
					type="pricing"
				/>
			</div>
		</div>
	);
}

// --- SUB-COMPONENT: REUSABLE SELECTOR ---

interface SelectorProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	isDisabled: boolean;
	isLoading: boolean;
	value: string;
	placeholder: string;
	icon: LucideIcon;
	items: any[];
	onSelect: (id: string) => void;
	onCreate: () => void;
	createLabel: string;
	emptyText: string;
	type: "workType" | "product" | "pricing";
}

const SelectorDropdown = ({ isOpen, setIsOpen, isDisabled, isLoading, value, placeholder, icon: Icon, items, onSelect, onCreate, createLabel, emptyText, type }: SelectorProps) => {
	const selectedItem = items.find((i) => i.id === value);

	// Helper to format pricing strategy display correctly
	const formatPricing = (item: any) => {
		if (item.pricingStrategy === "PERTOOTH") return `$${item.firstToothPrice}`;
		if (item.pricingStrategy === "BULK") return `$${item.bulkPrice} Bulk`;
		if (item.pricingStrategy === "CUSTOM") return `Custom`;
		return "";
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					disabled={isDisabled}
					className={cn(
						"w-full h-11 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
						isOpen ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:border-primary/50",
						isDisabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-white/[0.02]",
					)}
				>
					<div className="flex items-center gap-3 truncate min-w-0">
						{/* If loading and we don't have a value yet, show spinner. Otherwise show icon */}
						{isLoading && !selectedItem ? (
							<Loader2 className="w-4 h-4 shrink-0 animate-spin text-primary" />
						) : (
							<Icon className={cn("w-4 h-4 shrink-0 transition-colors", value ? "text-primary" : "text-slate-400 dark:text-zinc-500")} />
						)}

						<span className={cn("text-[13px] truncate", !value && "text-muted-foreground")}>
							{selectedItem ? <span className="font-bold text-foreground">{selectedItem.name}</span> : placeholder}
						</span>
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			{/* Using Tailwind v4/v5 variable for exact trigger width */}
			<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width)">
				<Command className="dark:bg-[#121214]">
					<CommandInput placeholder="Search..." className="py-2.5 text-[13px]" />

					<CommandList className="max-h-[220px] custom-scrollbar">
						{/* BEAUTIFUL LOADING SKELETON */}
						{isLoading ? (
							<div className="p-2 space-y-1">
								{Array.from({ length: 3 }).map((_, i) => (
									<div key={i} className="flex items-center justify-between p-3 rounded-lg border border-transparent">
										<div className="flex flex-col gap-1.5 w-full">
											<div className="h-3.5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md animate-pulse" />
											{type === "pricing" && <div className="h-2.5 w-1/3 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse" />}
										</div>
									</div>
								))}
							</div>
						) : (
							<>
								<CommandEmpty className="py-6 text-center text-sm">{emptyText}</CommandEmpty>
								<CommandGroup>
									{items.map((item) => (
										<CommandItem
											key={item.id}
											value={item.name}
											onSelect={() => {
												onSelect(item.id);
												setIsOpen(false);
											}}
											className="flex items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
										>
											<div className="flex flex-col min-w-0">
												<span className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors truncate">{item.name}</span>

												{/* Dynamically extract pricing strategy details based on your Prisma Schema */}
												{type === "pricing" && item.pricingStrategy && (
													<span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
														<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
														{item.pricingStrategy} • {formatPricing(item)}
													</span>
												)}
											</div>
											{value === item.id && <Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />}
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>

					{/* STICKY CREATE BUTTON */}
					<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/[0.02]">
						<Button
							variant="ghost"
							onClick={onCreate}
							className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl text-[13px] font-bold h-10 transition-colors"
						>
							<Plus className="mr-2 h-4 w-4" /> {createLabel}
						</Button>
					</div>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
