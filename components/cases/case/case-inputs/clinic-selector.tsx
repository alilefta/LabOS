"use client";

import { Building2, MapPin, ChevronsUpDown, Loader2, Plus, Check, UserCircle, Hospital, GraduationCap, Briefcase, Loader } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { CommandEmpty } from "cmdk";
import { ClinicDetailsUI } from "@/schema/composed/clinic.details";
import { getClinicsBySearchQueryAction } from "@/actions/clinic";
import { Skeleton } from "@/components/ui/skeleton";
import { handleSafeActionError } from "@/lib/safe-action-helpers";

type DataShape = ClinicDetailsUI[];
// Helper to get icon based on ClinicType
const getClinicIcon = (type: string) => {
	switch (type) {
		case "SOLO":
			return <UserCircle className="w-3 h-3" />;
		case "HOSPITAL":
			return <Hospital className="w-3 h-3" />;
		case "UNIVERSITY":
			return <GraduationCap className="w-3 h-3" />;
		default:
			return <Briefcase className="w-3 h-3" />;
	}
};

interface ClinicSelectorProps {
	onSelect: (id: string) => void;
	onCreateNew: () => void;
	newCreatedClinic: ClinicDetailsUI | null;
}

export const ClinicSelector = memo(({ onSelect, onCreateNew, newCreatedClinic }: ClinicSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string>("");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["clinics", "search", debouncedSearch], [debouncedSearch]);

	const { data: clinics = [], isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getClinicsBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}

			return res.data?.clinics || [];
		},
		enabled: open,
		staleTime: 1000 * 60 * 5,
	});

	const handleSelect = useCallback(
		(clinicId: string, clinicName: string) => {
			setSelectedId(clinicId);
			onSelect(clinicId);
			setOpen(false);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		onCreateNew();
		setSearch("");
	}, [onCreateNew]);

	useEffect(() => {
		if (!newCreatedClinic) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
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
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Clinic Partner <span className="text-destructive">*</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className="w-full h-12 justify-between rounded-xl border-border bg-card px-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm"
					>
						<div className="flex items-center gap-3">
							<Building2 className="w-4 h-4 text-slate-400" />
							<span className={cn("text-sm", !selectedId && "text-muted-foreground")}>{selectedId.length > 0 ? clinics.find((c) => c.id === selectedId)?.name : "Select Clinic..."}</span>
						</div>
						{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : <ChevronsUpDown className="w-4 h-4 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="PopoverContent p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Search 5,000+ clinics..." value={search} onValueChange={setSearch} className="py-3" />
						<CommandList className="max-h-80 custom-scrollbar">
							{/* --- 2. SKELETON LOADING --- */}
							{isFetching && (
								<div className="p-2 space-y-2">
									<Skeleton className="h-12 w-full rounded-lg" />
									<Skeleton className="h-12 w-full rounded-lg" />
								</div>
							)}

							{!isFetching && clinics.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4 font-medium">No partner found.</p>
								</CommandEmpty>
							)}

							<CommandGroup heading="Clinic Partners">
								{clinics.map((clinic) => (
									<CommandItem
										key={clinic.id}
										value={clinic.name}
										onSelect={() => handleSelect(clinic.id, clinic.name)}
										className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group"
									>
										<div className="flex flex-col items-start gap-1 flex-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-bold text-foreground">{clinic.name}</span>
												{/* --- 3. TYPE BADGES --- */}
												<div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground group-hover:text-primary transition-colors">
													{getClinicIcon(clinic.type)}
													{clinic.type}
												</div>
											</div>
											<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1 font-medium">
												<MapPin className="w-2.5 h-2.5" /> {clinic.city}
											</span>
										</div>
										{selectedId === clinic.id && (
											<span className="flex items-center justify-end">
												<Check className="w-4 h-4 text-primary animate-in zoom-in" />
											</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
						{/* --- NEW: STICKY CREATION FOOTER --- */}
						<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2 shrink-0">
							<Button
								variant="ghost"
								onClick={handleCreateNew}
								disabled={isFetching}
								className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl text-[13px] font-bold h-10 transition-colors"
							>
								{isFetching ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
								{search.length > 0 ? `Register "${search}"` : "Register New Clinic"}
							</Button>
						</div>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
});

ClinicSelector.displayName = "ClinicSelector";
