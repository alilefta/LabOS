"use client";

import { useEffect, useState } from "react";
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
	categoryId?: string | null;
	clinicId?: string | null;
	selectedProductId?: string | null;
	selectedPricingPlanId?: string | null;
	onProductSelect: (id: string) => void;
	onWorkTypeSelect: (id: string) => void;
	onPricingPlanSelect: (id: string, plan: CasePricingPlanDetailsUI | null) => void;
}

export function ClinicalProductConfigurator({
	categoryId,
	clinicId,
	selectedProductId,
	selectedPricingPlanId,
	onProductSelect,
	onPricingPlanSelect,
	onWorkTypeSelect,
}: ClinicalProductConfiguratorProps) {
	// Internal cascading state for WorkType
	const [selectedWorkTypeId, setSelectedWorkTypeId] = useState<string>("");

	// Dropdown open states
	const [wtOpen, setWtOpen] = useState(false);
	const [prodOpen, setProdOpen] = useState(false);
	const [priceOpen, setPriceOpen] = useState(false);

	// Zustand Store Connectors
	const openWorkTypeSheet = useClinicalCreationStore((state) => state.openWorkTypeSheet);
	const openProductSheet = useClinicalCreationStore((state) => state.openProductSheet);
	const openPricingSheet = useClinicalCreationStore((state) => state.openPricingSheet);
	const newCreatedWorkTypeId = useClinicalCreationStore((state) => state.newCreatedWorkTypeId);
	const newCreatedProductId = useClinicalCreationStore((state) => state.newCreatedProductId);
	const newCreatedPricingId = useClinicalCreationStore((state) => state.newCreatedPricingId);

	// ---  RENDER-PHASE STATE UPDATES (Fixes the useEffect Warning) ---
	const [prevNewCreatedWorkTypeId, setPrevNewCreatedWorkTypeId] = useState(newCreatedWorkTypeId);

	if (newCreatedWorkTypeId !== prevNewCreatedWorkTypeId) {
		setPrevNewCreatedWorkTypeId(newCreatedWorkTypeId);
		if (newCreatedWorkTypeId) {
			setSelectedWorkTypeId(newCreatedWorkTypeId); // Updates immediately, no flicker!
		}
	}

	// --- REACT QUERY FETCHING (Strict Null Checks Added) ---
	const { data: workTypes = [], isFetching: isLoadingWT } = useQuery({
		queryKey: ["workTypes", categoryId],
		queryFn: async () => {
			if (!categoryId) return [];
			const res = await getWorkTypesByCategoryAction({ caseCategoryId: categoryId, limit: 50 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return (res.data?.workTypes as WorktypeDetailsUI[]) || [];
		},
		enabled: !!categoryId && typeof categoryId === "string" && categoryId.length > 0,
	});

	const { data: products = [], isFetching: isLoadingProducts } = useQuery({
		queryKey: ["products", selectedWorkTypeId],
		queryFn: async () => {
			if (!selectedWorkTypeId) return [];
			const res = await getProductsByWorkTypeAction({ workTypeId: selectedWorkTypeId, limit: 50 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return (res.data?.products as ProductDetailsUI[]) || [];
		},
		enabled: !!selectedWorkTypeId && typeof selectedWorkTypeId === "string" && selectedWorkTypeId.length > 0,
	});

	const { data: pricingPlans = [], isFetching: isLoadingPricing } = useQuery({
		queryKey: ["pricingPlans", selectedProductId],
		queryFn: async () => {
			if (!selectedProductId) return [];
			const res = await getPricingPlansByProductAction({ productId: selectedProductId, limit: 50 });
			if (res.serverError || res.validationErrors) handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			return (res.data?.pricings as CasePricingPlanDetailsUI[]) || [];
		},
		enabled: !!selectedProductId && typeof selectedProductId === "string" && selectedProductId.length > 0,
	});

	// --- 2. AUTO-SELECTION & SYNCING ---

	// Sync local WorkType state if the parent clears the Product
	useEffect(() => {
		if (!selectedProductId) {
			onPricingPlanSelect("", null);
		}
	}, [selectedProductId, onPricingPlanSelect]);

	useEffect(() => {
		if (newCreatedWorkTypeId) {
			onWorkTypeSelect(newCreatedWorkTypeId);
		}
	}, [newCreatedWorkTypeId, onWorkTypeSelect]);

	useEffect(() => {
		if (newCreatedProductId) onProductSelect(newCreatedProductId);
	}, [newCreatedProductId, onProductSelect]);

	useEffect(() => {
		if (selectedPricingPlanId && pricingPlans.length > 0) {
			const plan = pricingPlans.find((p) => p.id === selectedPricingPlanId);
			if (plan) onPricingPlanSelect(selectedPricingPlanId, plan);
		}
	}, [selectedPricingPlanId, pricingPlans, onPricingPlanSelect]);

	useEffect(() => {
		if (newCreatedPricingId) {
			const plan = pricingPlans.find((p) => p.id === newCreatedPricingId) || null;
			onPricingPlanSelect(newCreatedPricingId, plan);
		}
	}, [newCreatedPricingId, pricingPlans, onPricingPlanSelect]);
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
						onWorkTypeSelect(id);
						onProductSelect("");
						onPricingPlanSelect("", null);
					}}
					onCreate={() => {
						setWtOpen(false);
						if (categoryId) openWorkTypeSheet(categoryId);
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
					value={selectedProductId || ""}
					placeholder="Select Product..."
					icon={Package}
					items={products}
					onSelect={(id: string) => {
						onProductSelect(id);
						onPricingPlanSelect("", null);
					}}
					onCreate={() => {
						setProdOpen(false);
						if (selectedWorkTypeId) openProductSheet(selectedWorkTypeId);
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
					value={selectedPricingPlanId || ""}
					placeholder="Select Pricing Plan..."
					icon={CreditCard}
					items={pricingPlans}
					onSelect={(id: string) => {
						const plan = pricingPlans.find((p) => p.id === id) || null;
						onPricingPlanSelect(id, plan);
					}}
					onCreate={() => {
						setPriceOpen(false);
						if (selectedProductId) openPricingSheet(selectedProductId, clinicId);
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

type BaseSelectorProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	isDisabled: boolean;
	isLoading: boolean;
	value: string;
	placeholder: string;
	icon: LucideIcon;
	onSelect: (id: string) => void;
	onCreate: () => void;
	createLabel: string;
	emptyText: string;
};

// Unified type allowing strict casting below
type SelectorProps = BaseSelectorProps & {
	type: "workType" | "product" | "pricing";
	items: Array<WorktypeDetailsUI | ProductDetailsUI | CasePricingPlanDetailsUI>;
};

const SelectorDropdown = (props: SelectorProps) => {
	const { isOpen, setIsOpen, isDisabled, isLoading, value, placeholder, icon: Icon, items, onSelect, onCreate, createLabel, emptyText, type } = props;

	// Safely find the selected item
	const selectedItem = items.find((i) => i.id === value);

	// Helper to format pricing strategy display correctly
	const formatPricing = (item: Partial<CasePricingPlanDetailsUI>) => {
		if (item.pricingStrategy === "PERTOOTH") return `$${item.toothPrice || 0}`;
		if (item.pricingStrategy === "BULK") return `$${item.bulkPrice || 0} Bulk`;
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
						isDisabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-white/2",
					)}
				>
					<div className="flex items-center gap-3 truncate min-w-0">
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

			<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width)">
				<Command className="dark:bg-[#121214]">
					<CommandInput placeholder="Search..." className="py-2.5 text-[13px]" />

					<CommandList className="max-h-55 custom-scrollbar">
						{/* SKELETON LOADER */}
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
											value={item.id} // CRITICAL FIX: Always use the unique ID for `value`
											keywords={[item.name]} // CRITICAL FIX: Let users search by the item's name
											onSelect={() => {
												onSelect(item.id);
												setIsOpen(false);
											}}
											className="flex items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
										>
											<div className="flex flex-col min-w-0">
												<span className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors truncate">{item.name}</span>

												{/* Extract pricing strategy details safely */}
												{type === "pricing" && "pricingStrategy" in item && (
													<span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
														<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
														{item.pricingStrategy} • {formatPricing(item as CasePricingPlanDetailsUI)}
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
					<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2">
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
