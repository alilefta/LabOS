"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { Package, Layers, ChevronsUpDown, Loader2, Plus, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FieldError } from "react-hook-form";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { ProductDetailsUI } from "@/schema/composed/product.details";
import { getProductsOptionsBySearchQueryAction, ProductOptionDTO } from "@/actions/products/get-products";
import { formatProductName } from "@/lib/formatters/products/product-formatters";

interface ProductSelectorProps {
	value: string | undefined;
	onSelect: (productId: string) => void;
	onCreateNew?: () => void;
	disabled?: boolean;
	fieldError?: FieldError | undefined;
}

type DataShape = ProductOptionDTO[];

export const ProductSelector = memo(function ProductSelector({ value, onSelect, onCreateNew, disabled = false, fieldError }: ProductSelectorProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryKey = useMemo(() => ["products", "search", debouncedSearch], [debouncedSearch]);

	const { data: fetchedProducts, isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getProductsOptionsBySearchQueryAction({ searchQuery: debouncedSearch, limit: 20 });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res?.data?.options as DataShape) || [];
		},
		enabled: (open && !disabled) || !!value, // Fetch if open or hydrating
		staleTime: 1000 * 60 * 5, // Cache for 5 mins
	});

	const products = fetchedProducts || [];
	const selectedProduct = products.find((p) => p.id === value);

	// Determine the display value for the trigger button
	const displayValue = selectedProduct ? formatProductName(selectedProduct.workTypeName, selectedProduct.productName) : "Select Catalog Item...";

	const handleSelect = useCallback(
		(productId: string) => {
			onSelect(productId);
			setOpen(false);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		if (onCreateNew) {
			onCreateNew();
			setSearch("");
		}
	}, [onCreateNew]);

	return (
		<div className="flex flex-col gap-2 w-full animate-in fade-in duration-500">
			<Popover open={open && !disabled} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						disabled={disabled}
						className={cn(
							"w-full h-12 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
							open ? "ring-[3px] ring-emerald-500/20 border-emerald-500 outline-none" : "hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-white/5",
							disabled && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-white/[0.02]",
							fieldError && "border-destructive focus:ring-destructive/20 focus:border-destructive",
						)}
					>
						<div className="flex items-center gap-3 truncate min-w-0">
							<Package className={cn("w-4 h-4 shrink-0 transition-colors", value && !disabled ? "text-emerald-500" : "text-slate-400 dark:text-zinc-500")} />

							<span className={cn("text-sm truncate", !value && "text-muted-foreground")}>
								{selectedProduct ? (
									<span className="font-bold text-foreground">{displayValue}</span>
								) : value ? (
									// Fallback while the query fetches the product name during hydration
									<span className="font-mono text-muted-foreground">ID: {value.substring(0, 8)}...</span>
								) : (
									"Select Catalog Item..."
								)}
							</span>
						</div>
						{isFetching && !open ? <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width] flex flex-col">
					<Command className="dark:bg-[#121214] flex-1 min-h-0 flex flex-col" shouldFilter={false}>
						<CommandInput placeholder="Search materials or products..." value={search} onValueChange={setSearch} className="py-3 shrink-0" />

						<CommandList className="max-h-60 custom-scrollbar flex-1">
							{/* SKELETON LOADER */}
							{isFetching && (
								<div className="p-2 space-y-1">
									{Array.from({ length: 3 }).map((_, i) => (
										<div key={i} className="flex flex-col gap-1.5 p-3 rounded-lg">
											<Skeleton className="h-3.5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md" />
											<Skeleton className="h-2.5 w-1/3 bg-slate-100 dark:bg-white/5 rounded-md" />
										</div>
									))}
								</div>
							)}

							{!isFetching && products.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground font-medium mb-3">No catalog items found.</p>
									{onCreateNew && (
										<Button onClick={handleCreateNew} className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-9 shadow-sm">
											<Plus className="w-3.5 h-3.5 mr-2" /> Create {search ? `"${search}"` : "New Product"}
										</Button>
									)}
								</CommandEmpty>
							)}

							{products.length > 0 && (
								<CommandGroup
									heading="Manufacturing Catalog"
									className="**:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-emerald-600 **:[[cmdk-group-heading]]:bg-emerald-500/5 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:px-3 mb-2"
								>
									{products.map((product) => {
										// Format the fully qualified name for searchability and display
										const fqn = formatProductName(product.workTypeName, product.productName);

										return (
											<CommandItem
												key={product.id}
												value={fqn} // This allows cmdk to search against the full name
												onSelect={() => handleSelect(product.id)}
												className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 rounded-lg my-0.5 group"
											>
												<div className="flex flex-col items-start gap-1 flex-1 min-w-0">
													<span className="text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate w-full">
														{product.productName}
													</span>
													<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1.5 font-medium truncate w-full">
														<Layers className="w-2.5 h-2.5 shrink-0 text-emerald-500/70" />
														{product.workTypeName || "Uncategorized"}
													</span>
												</div>
												{value === product.id && (
													<span className="flex items-center justify-end shrink-0 ml-3">
														<Check className="h-4 w-4 text-emerald-500 animate-in zoom-in" />
													</span>
												)}
											</CommandItem>
										);
									})}
								</CommandGroup>
							)}
						</CommandList>

						{/* STICKY CREATION FOOTER */}
						{onCreateNew && (
							<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2 shrink-0">
								<Button
									variant="ghost"
									onClick={handleCreateNew}
									disabled={isFetching}
									className="w-full justify-start text-emerald-600 hover:text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-500 dark:hover:text-emerald-400 rounded-xl text-[13px] font-bold h-10 transition-colors"
								>
									{isFetching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
									{search.length > 0 ? `Register "${search}"` : "Create New Product"}
								</Button>
							</div>
						)}
					</Command>
				</PopoverContent>
			</Popover>

			{/* RHF Validation Error */}
			{fieldError && (
				<span className="text-[11px] font-medium text-destructive ml-1 flex items-center gap-1.5 animate-in fade-in">
					<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
					{fieldError.message}
				</span>
			)}
		</div>
	);
});

ProductSelector.displayName = "ProductSelector";
