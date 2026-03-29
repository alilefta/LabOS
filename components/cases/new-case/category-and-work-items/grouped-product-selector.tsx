"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Sparkles, Layers, Loader2, SearchX } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { CommandLoading } from "cmdk";
// import { getProductsByCategoryAction } from "@/actions/product"; // You will create this

interface GroupedProductSelectorProps {
	selectedId: string;
	categoryId: string; // CRITICAL: Passed from the main form to filter products
	onSelect: (id: string) => void;
}

export function GroupedProductSelector({ selectedId, categoryId, onSelect }: GroupedProductSelectorProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	// Fetch products based on the selected Category and Search Query
	const { data: fetchedProducts, isFetching } = useQuery({
		queryKey: ["products", "category", categoryId, "search", debouncedSearch],
		queryFn: async () => {
			if (!categoryId) return [];

			// Replace with your actual server action:
			// const res = await getProductsByCategoryAction({ categoryId, searchQuery: debouncedSearch });
			// return res.data?.products ||[];

			// --- TEMPORARY MOCK FOR VISUALIZATION ---
			return [
				{ id: "p1", name: "Zirconia Monolithic", workType: { name: "Crowns & Bridges" }, description: "High Translucency" },
				{ id: "p2", name: "E-Max Pressed", workType: { name: "Crowns & Bridges" }, description: "Lithium Disilicate" },
				{ id: "p3", name: "Custom Titanium Abutment", workType: { name: "Implant Components" }, description: "Milled Titanium" },
				{ id: "p4", name: "Zirconia Hybrid Abutment", workType: { name: "Implant Components" }, description: "Ti-Base + Zirconia" },
			];
		},
		enabled: open && !!categoryId, // Only fetch if popover is open AND we have a category
		staleTime: 1000 * 60 * 5,
	});

	const products = fetchedProducts || [];

	// Group the products by WorkType for the UI dynamically
	const groupedProducts = useMemo(() => {
		return products.reduce(
			(acc, product) => {
				const workTypeName = product.workType?.name || "Uncategorized";
				if (!acc[workTypeName]) acc[workTypeName] = [];
				acc[workTypeName].push(product);
				return acc;
			},
			{} as Record<string, typeof products>,
		);
	}, [products]);

	const selectedProduct = useMemo(() => {
		return products.find((p) => p.id === selectedId);
	}, [products, selectedId]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					disabled={!categoryId} // Disable if they haven't picked a category yet
					className={cn(
						"w-full h-12 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
						open ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:border-primary/50",
						!categoryId && "opacity-50 cursor-not-allowed bg-slate-50 dark:bg-white/2",
					)}
				>
					<div className="flex items-center gap-3 truncate">
						<Layers className={cn("w-4 h-4 shrink-0", selectedId ? "text-primary" : "text-slate-400")} />

						{!categoryId ? (
							<span className="text-sm text-amber-600 dark:text-amber-500 font-medium">Select a Category first...</span>
						) : (
							<span className={cn("text-sm truncate", !selectedId && "text-muted-foreground")}>
								{selectedId && selectedProduct ? (
									<span className="flex items-center gap-2">
										<span className="font-bold text-foreground">{selectedProduct.name}</span>
										<span className="text-[10px] hidden sm:inline-flex px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-muted-foreground uppercase tracking-widest">
											{selectedProduct.workType?.name}
										</span>
									</span>
								) : (
									"Search manufacturing product..."
								)}
							</span>
						)}
					</div>
					{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50 shrink-0" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
				</Button>
			</PopoverTrigger>

			<PopoverContent className="PopoverContent p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
				<Command
					className="dark:bg-[#121214]"
					shouldFilter={false} // Server-side filtering
					onWheel={(e) => e.stopPropagation()}
					onTouchMove={(e) => e.stopPropagation()}
				>
					<CommandInput placeholder="Search materials or products..." value={search} onValueChange={setSearch} className="py-3" />
					<CommandList className="max-h-[300px] custom-scrollbar overflow-y-auto">
						{isFetching && (
							<CommandLoading className="p-4 space-y-2">
								<Skeleton className="h-10 w-full rounded-lg" />
								<Skeleton className="h-10 w-full rounded-lg" />
							</CommandLoading>
						)}

						{!isFetching && products.length === 0 && (
							<CommandEmpty className="p-8 flex flex-col items-center justify-center text-center">
								<div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-3">
									<SearchX className="w-5 h-5 text-muted-foreground" />
								</div>
								<p className="text-sm font-bold text-foreground">No products found</p>
								<p className="text-xs text-muted-foreground mt-1">Try a different search term.</p>
							</CommandEmpty>
						)}

						{/* Render Groups dynamically */}
						{Object.entries(groupedProducts).map(([workType, items]) => (
							<CommandGroup
								key={workType}
								heading={workType}
								// Styling the group heading to look like a clinical section
								className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-primary [&_[cmdk-group-heading]]:bg-primary/5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:px-3 mb-2"
							>
								{items.map((product) => (
									<CommandItem
										key={product.id}
										value={product.name}
										onSelect={() => {
											onSelect(product.id);
											setOpen(false);
										}}
										className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group transition-colors my-0.5"
									>
										<div className="flex flex-col items-start gap-1 flex-1 min-w-0">
											<span className="text-sm font-bold text-foreground truncate w-full">{product.name}</span>
											<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1 font-medium truncate w-full">
												<Sparkles className="w-2.5 h-2.5 shrink-0" /> {product.description || "Standard Material"}
											</span>
										</div>
										{selectedId === product.id && <Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />}
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
