"use client";

import { Building2, MapPin, ChevronsUpDown, Loader2, Check, UserCircle, Hospital, GraduationCap, Briefcase, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { memo, useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { ClinicDetailsUI, ClinicSelectionDTO } from "@/schema/composed/clinic.details";

import { Skeleton } from "@/components/ui/skeleton";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { getBaseClinicsBySearchQueryAction } from "@/actions/clinics/get-clinics";

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

interface ClinicFilterSelectorProps {
	value: string | null;
	onSelect: (clinicId: string | null) => void;
	label: string;
	initialData?: ClinicSelectionDTO[];
}

export const ClinicFilterSelector = memo(({ value, onSelect, label }: ClinicFilterSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryKey = useMemo(() => ["clinics-selection", "search", debouncedSearch], [debouncedSearch]);

	const { data: fetchedClinics, isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getBaseClinicsBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res.data?.clinics as ClinicDetailsUI[]) || [];
		},
		enabled: open || !!value,
		staleTime: 1000 * 60 * 5,
	});

	const clinics = fetchedClinics || [];
	const selectedClinic = clinics.find((c) => c.id === value);

	const handleSelect = useCallback(
		(clinicId: string | null) => {
			onSelect(clinicId);
			setOpen(false);
			setSearch("");
		},
		[onSelect],
	);

	return (
		<div className="flex flex-col gap-2 animate-in fade-in duration-500">
			<label className="text-[11px] font-bold text-muted-foreground ml-1">{label}</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							"w-full h-12 justify-between rounded-xl border-border bg-slate-50 dark:bg-white/2  px-4 transition-all shadow-sm",
							open ? "ring-[3px] ring-emerald-500/20 border-emerald-500 outline-none bg-emerald-500/5" : "hover:bg-slate-100 dark:hover:bg-white/5 hover:border-emerald-500/50",
							value && !open && "border-emerald-500/50 bg-emerald-500/5",
						)}
					>
						<div className="flex items-center gap-3 truncate min-w-0">
							<Building2 className={cn("w-4 h-4 shrink-0 transition-colors", value ? "text-emerald-500" : "text-slate-400 dark:text-zinc-500")} />
							<span className={cn("text-sm truncate", !value ? "text-muted-foreground" : "font-bold text-emerald-700 dark:text-emerald-400")}>
								{selectedClinic ? (
									selectedClinic.name
								) : value ? (
									<span className="font-mono text-muted-foreground">ID: {value.substring(0, 8)}...</span>
								) : (
									"Filter by specific clinic..."
								)}
							</span>
						</div>
						{isFetching && !open ? <Loader2 className="w-4 h-4 animate-spin opacity-50 shrink-0 text-emerald-500" /> : <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width) flex flex-col">
					<Command className="dark:bg-[#121214] flex-1 min-h-0 flex flex-col" shouldFilter={false}>
						<CommandInput placeholder="Search clinics by name..." value={search} onValueChange={setSearch} className="py-3 shrink-0" />

						<CommandList className="max-h-60 custom-scrollbar flex-1">
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

							{!isFetching && clinics.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground font-medium">No partner found.</p>
								</CommandEmpty>
							)}

							{clinics.length > 0 && (
								<CommandGroup
									heading="Clinic Partners"
									className="**:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-emerald-500 **:[[cmdk-group-heading]]:bg-emerald-500/5 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:px-3 mb-2"
								>
									{/* CLEAR FILTER BUTTON */}
									{value && (
										<CommandItem
											onSelect={() => handleSelect(null)}
											className="flex items-center justify-center gap-2 py-3 cursor-pointer hover:bg-rose-500/10 text-rose-500 font-bold text-xs rounded-lg my-1"
										>
											<X className="w-3.5 h-3.5" /> Clear Selection
										</CommandItem>
									)}

									{clinics.map((clinic) => (
										<CommandItem
											key={clinic.id}
											value={clinic.name}
											onSelect={() => handleSelect(clinic.id)}
											className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-emerald-500/10 rounded-lg my-0.5 group"
										>
											<div className="flex flex-col items-start gap-1.5 flex-1 min-w-0">
												<div className="flex items-center gap-2 w-full">
													<span className="text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
														{clinic.name}
													</span>
													<div className="hidden sm:flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">
														{getClinicIcon(clinic.type)}
														{clinic.type}
													</div>
												</div>
												<span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1.5 font-medium truncate w-full">
													<MapPin className="w-3 h-3 shrink-0" /> {clinic.city}
												</span>
											</div>
											{value === clinic.id && (
												<span className="flex items-center justify-end shrink-0 ml-3">
													<Check className="h-4 w-4 text-emerald-500 animate-in zoom-in" />
												</span>
											)}
										</CommandItem>
									))}
								</CommandGroup>
							)}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
});

ClinicFilterSelector.displayName = "ClinicFilterSelector";
