"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Briefcase, ChevronsUpDown, Loader2, Plus, Check, MapPin, Phone } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// MOCK ACTION & TYPE (Replace with your actual imports)
// import { getSalesRepsBySearchQueryAction } from "@/actions/sales-rep";
// import { SalesRepDetailsUI } from "@/schema/composed/sales-rep.details";

interface SalesRepDetailsUI {
	id: string;
	firstName: string;
	lastName: string;
	city: string;
	phoneNumber: string;
	avatarUrl?: string;
}

const getSalesRepsBySearchQueryAction = async (params: any) => {
	return { data: { salesReps: [] }, serverError: null, validationErrors: null };
};

type DataShape = SalesRepDetailsUI[];

interface SalesRepSelectorProps {
	onSelect: (id: string) => void;
	onCreateNew: () => void;
	newCreatedSalesRep: SalesRepDetailsUI | null;
	value?: string;
}

export const SalesRepSelector = memo(({ onSelect, onCreateNew, newCreatedSalesRep, value }: SalesRepSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string>(value || "");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["salesReps", "search", debouncedSearch], [debouncedSearch]);

	const { data: salesReps = [], isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getSalesRepsBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res.data?.salesReps || [];
		},
		enabled: open,
		staleTime: 1000 * 60 * 5,
	});

	const handleSelect = useCallback(
		(repId: string) => {
			setSelectedId(repId);
			onSelect(repId);
			setOpen(false);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		onCreateNew();
		setSearch("");
	}, [onCreateNew]);

	// Auto-select when a new Sales Rep is created via Sheet
	useEffect(() => {
		if (!newCreatedSalesRep) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
			if (!data) return [];
			const exists = data.find((rep) => rep.id === newCreatedSalesRep.id);
			if (!exists) {
				return [newCreatedSalesRep, ...data];
			}
			return data;
		});

		setSelectedId(newCreatedSalesRep.id);
		onSelect(newCreatedSalesRep.id);
	}, [newCreatedSalesRep, queryClient, queryKey, onSelect]);

	// Sync external value changes (e.g. form reset)
	useEffect(() => {
		if (value !== selectedId) {
			setSelectedId(value || "");
		}
	}, [value]);

	const selectedRep = salesReps.find((r) => r.id === selectedId);

	return (
		<div className="space-y-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Sales Representative <span className="text-muted-foreground/50 lowercase font-medium tracking-normal">(Optional)</span>
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
						<div className="flex items-center gap-3 truncate">
							{selectedRep ? (
								<Avatar className="w-5 h-5 rounded-md border border-border">
									<AvatarImage src={selectedRep.avatarUrl} />
									<AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold rounded-md">
										{selectedRep.firstName[0]}
										{selectedRep.lastName[0]}
									</AvatarFallback>
								</Avatar>
							) : (
								<Briefcase className="w-4 h-4 text-slate-400 dark:text-zinc-500 shrink-0" />
							)}
							<span className={cn("text-sm truncate", !selectedId && "text-muted-foreground")}>
								{selectedRep ? `${selectedRep.firstName} ${selectedRep.lastName}` : "Select representative..."}
							</span>
						</div>
						{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50 shrink-0" /> : <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Search representatives..." value={search} onValueChange={setSearch} className="py-3" />

						<CommandList className="max-h-60 custom-scrollbar">
							{/* SKELETON LOADING */}
							{isFetching && (
								<div className="p-2 space-y-2">
									<Skeleton className="h-14 w-full rounded-lg" />
									<Skeleton className="h-14 w-full rounded-lg" />
								</div>
							)}

							{/* EMPTY STATE */}
							{!isFetching && salesReps.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4 font-medium">No representative found.</p>
									<Button onClick={handleCreateNew} className="w-full rounded-xl bg-primary text-white font-bold h-9 shadow-ai-glow-light">
										<Plus className="w-3.5 h-3.5 mr-2" /> Register {search ? `"${search}"` : "New Rep"}
									</Button>
								</CommandEmpty>
							)}

							<CommandGroup heading="Account Managers">
								{salesReps.map((rep) => (
									<CommandItem
										key={rep.id}
										value={rep.id}
										keywords={[`${rep.firstName} ${rep.lastName}`]}
										onSelect={() => handleSelect(rep.id)}
										className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-primary/5 group rounded-lg my-0.5"
									>
										<div className="flex items-center gap-3 flex-1 min-w-0">
											<Avatar className="w-8 h-8 rounded-lg border border-border shadow-sm">
												<AvatarImage src={rep.avatarUrl} />
												<AvatarFallback className="bg-primary/10 text-primary text-xs font-bold rounded-lg">
													{rep.firstName[0]}
													{rep.lastName[0]}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col items-start gap-0.5 min-w-0">
												<span className="text-sm font-bold text-foreground truncate w-full">
													{rep.firstName} {rep.lastName}
												</span>
												<div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-medium">
													<span className="flex items-center gap-1">
														<MapPin className="w-2.5 h-2.5" /> {rep.city}
													</span>
													<span className="flex items-center gap-1">
														<Phone className="w-2.5 h-2.5" /> {rep.phoneNumber}
													</span>
												</div>
											</div>
										</div>
										{selectedId === rep.id && (
											<span className="flex items-center justify-end shrink-0 ml-3">
												<Check className="w-4 h-4 text-primary animate-in zoom-in" />
											</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>

						{/* STICKY CREATE BUTTON */}
						{!isFetching && salesReps.length > 0 && (
							<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2">
								<Button
									variant="ghost"
									onClick={handleCreateNew}
									className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl text-[13px] font-bold h-10 transition-colors"
								>
									<Plus className="mr-2 h-4 w-4" /> Register New Representative
								</Button>
							</div>
						)}
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
});

SalesRepSelector.displayName = "SalesRepSelector";
