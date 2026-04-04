"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { UserCog, ChevronsUpDown, Loader2, Plus, Check, Star, Wrench } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// You will need to create this action and schema!
// import { getTechniciansBySearchQueryAction } from "@/actions/technician";
// import { TechnicianDetailsUI } from "@/schema/composed/technician.details";

// MOCK TYPES (Replace with your actual Schema imports)
interface TechnicianDetailsUI {
	id: string;
	firstName: string;
	lastName: string;
	city?: string;
	specialty?: string; // Optional: A nice UX touch if you add it to the DB later
	isSenior?: boolean; // Optional
}

// MOCK ACTION (Replace with your actual Server Action)
const getTechniciansBySearchQueryAction = async (params: any) => {
	return { data: { technicians: [] }, serverError: null, validationErrors: null };
};

type DataShape = TechnicianDetailsUI[];

interface TechnicianSelectorProps {
	onSelect: (id: string) => void;
	onCreateNew: () => void;
	newCreatedTechnician: TechnicianDetailsUI | null;
	value?: string; // Passed down from React Hook Form
}

export const TechnicianSelector = memo(({ onSelect, onCreateNew, newCreatedTechnician, value }: TechnicianSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string>(value || "");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["technicians", "search", debouncedSearch], [debouncedSearch]);

	const { data: technicians = [], isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getTechniciansBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res.data?.technicians || [];
		},
		enabled: open,
		staleTime: 1000 * 60 * 5,
	});

	const handleSelect = useCallback(
		(techId: string) => {
			setSelectedId(techId);
			onSelect(techId);
			setOpen(false);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		onCreateNew();
		setSearch("");
	}, [onCreateNew]);

	// Handle Auto-select when a new technician is created via a Sheet
	useEffect(() => {
		if (!newCreatedTechnician) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
			if (!data) return [];
			const exists = data.find((tech) => tech.id === newCreatedTechnician.id);
			if (!exists) {
				return [newCreatedTechnician, ...data];
			}
			return data;
		});

		// Auto-select the newly created technician
		setSelectedId(newCreatedTechnician.id);
		onSelect(newCreatedTechnician.id);
	}, [newCreatedTechnician, queryClient, queryKey, onSelect]);

	// Sync external value changes (e.g., form reset)
	useEffect(() => {
		if (value !== selectedId) {
			setSelectedId(value || "");
		}
	}, [value]);

	return (
		<div className="space-y-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Assign Technician <span className="text-muted-foreground/50 lowercase font-medium tracking-normal">(Optional)</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							"w-full h-12 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
							open ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:bg-slate-50 dark:hover:bg-white/5",
						)}
					>
						<div className="flex items-center gap-3">
							<UserCog className={cn("w-4 h-4", selectedId ? "text-primary" : "text-slate-400 dark:text-zinc-500")} />
							<span className={cn("text-sm", !selectedId && "text-muted-foreground")}>
								{selectedId ? technicians.find((t) => t.id === selectedId)?.firstName + " " + technicians.find((t) => t.id === selectedId)?.lastName : "Auto-assign (Recommended)"}
							</span>
						</div>
						{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : <ChevronsUpDown className="w-4 h-4 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Search technicians..." value={search} onValueChange={setSearch} className="py-3" />

						<CommandList className="max-h-60 custom-scrollbar">
							{/* SKELETON LOADING */}
							{isFetching && (
								<div className="p-2 space-y-2">
									<Skeleton className="h-12 w-full rounded-lg" />
									<Skeleton className="h-12 w-full rounded-lg" />
								</div>
							)}

							{/* EMPTY STATE & CREATE NEW */}
							{!isFetching && technicians.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4 font-medium">No technician found.</p>
									<Button onClick={handleCreateNew} className="w-full rounded-xl bg-primary text-white font-bold h-9 shadow-ai-glow-light">
										<Plus className="w-3.5 h-3.5 mr-2" /> Register {search ? `"${search}"` : "New Tech"}
									</Button>
								</CommandEmpty>
							)}

							<CommandGroup heading="Production Team">
								{technicians.map((tech) => (
									<CommandItem
										key={tech.id}
										value={tech.id} // Unique ID for value
										keywords={[`${tech.firstName} ${tech.lastName}`]} // Searchable text
										onSelect={() => handleSelect(tech.id)}
										className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group"
									>
										<div className="flex flex-col items-start gap-1 flex-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-bold text-foreground">
													{tech.firstName} {tech.lastName}
												</span>
												{/* Optional: Visual Badges if you have this data */}
												{tech.isSenior && (
													<span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/10 text-[9px] font-bold text-amber-600 dark:text-amber-500">
														<Star className="w-2 h-2 fill-current" /> Senior
													</span>
												)}
											</div>
											<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1 font-medium">
												<Wrench className="w-2.5 h-2.5" /> {tech.specialty || "General Ceramist"}
											</span>
										</div>
										{selectedId === tech.id && (
											<span className="flex items-center justify-end">
												<Check className="w-4 h-4 text-primary animate-in zoom-in" />
											</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>

						{/* STICKY CREATE BUTTON (Consistent with your other selectors) */}
						{!isFetching && technicians.length > 0 && (
							<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2">
								<Button
									variant="ghost"
									onClick={handleCreateNew}
									className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl text-[13px] font-bold h-10 transition-colors"
								>
									<Plus className="mr-2 h-4 w-4" /> Register New Technician
								</Button>
							</div>
						)}
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
});

TechnicianSelector.displayName = "TechnicianSelector";
