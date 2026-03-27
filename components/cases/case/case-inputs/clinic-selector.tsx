"use client";

import { Building2, MapPin, ChevronsUpDown, Loader2, Plus, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { CommandEmpty, CommandLoading } from "cmdk";
import { getClinicsAction } from "@/actions/clinic";
import { ClinicDetails } from "@/schema/composed/clinic.details";

type DataShape = ClinicDetails[];

export function ClinicSelector({ onSelect, onCreateNew, newCreatedClinic }: { onSelect: (id: string) => void; onCreateNew: () => void; newCreatedClinic: ClinicDetails | null }) {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["clinics", "search", debouncedSearch], [debouncedSearch]);

	const { data: clinics = [], isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getClinicsAction({ searchQuery: debouncedSearch });
			return res.data?.clinics || [];
		},
		enabled: open,
		staleTime: 1000 * 60 * 5,
	});

	useEffect(() => {
		if (!newCreatedClinic) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
			console.log("Data from Query Setter", data);
			if (!data) return [];

			const isClinicExists = data.find((clinic) => clinic.id === newCreatedClinic.id);
			if (!isClinicExists) {
				return [...data, newCreatedClinic];
			}
			return data;
		});
	}, [newCreatedClinic, queryClient, queryKey]);

	return (
		<div className="space-y-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Clinic Partner</h5>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" role="combobox" className="w-full h-12 justify-between rounded-xl border-border bg-card px-4">
						<div className="flex items-center gap-3">
							<Building2 className="w-4 h-4 text-slate-400" />
							<span className={cn("text-sm", !selectedId && "text-muted-foreground")}>{selectedId ? clinics.find((c) => c.id === selectedId)?.name : "Select Clinic..."}</span>
						</div>
						{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : <ChevronsUpDown className="w-4 h-4 opacity-50" />}{" "}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="PopoverContent p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Search 5,000+ clinics..." value={search} onValueChange={setSearch} className="py-3" />
						<CommandList className="max-h-80 custom-scrollbar">
							{isFetching && (
								<CommandLoading className="p-6 text-center flex! items-center justify-center">
									<p className="text-xs text-muted-foreground mb-4">Loading Clinics</p>
									<span className="text-center flex items-center justify-center">
										<Loader2 className="w-3.5 h-3.5 animate-spin" />
									</span>
								</CommandLoading>
							)}
							{!isFetching && clinics.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4">No clinic found.</p>
									<Button
										onClick={() => {
											setOpen(false);
											onCreateNew();
											setSearch("");
										}}
										className="w-full rounded-xl bg-primary text-white font-bold h-9"
									>
										<Plus className="w-3.5 h-3.5 mr-2" /> Register {search.length === 0 ? `New Clinic` : `"${search}"`}
									</Button>
								</CommandEmpty>
							)}

							<CommandGroup>
								{clinics.map((clinic) => (
									<CommandItem
										key={clinic.id}
										value={clinic.name}
										onSelect={() => {
											setSelectedId(clinic.id);
											onSelect(clinic.id);
											setOpen(false);
										}}
										className="flex flex-col items-start py-3 px-4 cursor-pointer hover:bg-primary/5 group"
									>
										<div className="flex items-center justify-between w-full">
											<span className="text-sm font-bold text-foreground">{clinic.name}</span>
											{selectedId === clinic.id && <Check className="w-4 h-4 text-primary" />}
										</div>
										<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1 mt-0.5 font-medium">
											<MapPin className="w-2.5 h-2.5" /> {clinic.city}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
