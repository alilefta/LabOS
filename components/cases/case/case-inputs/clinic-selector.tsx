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
import { FieldError } from "react-hook-form";

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
	value: string | undefined; // CRITICAL: Receives the exact state from RHF Controller
	onSelect: (clinicId: string, dentistId: string) => void;
	onCreateNew: () => void;
	newCreatedClinic: ClinicDetailsUI | null;
	fieldError: FieldError | undefined;
}
export const ClinicSelector = memo(({ value, onSelect, onCreateNew, newCreatedClinic, fieldError }: ClinicSelectorProps) => {
	const [open, setOpen] = useState(false);
	// const [selectedId, setSelectedId] = useState<string>("");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["clinics", "search", debouncedSearch], [debouncedSearch]);

	const { data: fetchedClinics, isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getClinicsBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res.data?.clinics || [];
		},
		// Enable fetching if popover is open OR if we are hydrating a draft (value exists but no data)
		enabled: open || !!value,
		staleTime: 1000 * 60 * 5,
	});

	const clinics = fetchedClinics || [];

	// Derived State: Find the selected clinic dynamically instead of using isolated state
	const selectedClinic = clinics.find((c) => c.id === value);

	// --- HANDLERS ---
	const handleSelect = useCallback(
		(clinicId: string, dentistId: string) => {
			onSelect(clinicId, dentistId);
			setOpen(false);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		onCreateNew();
		setSearch("");
	}, [onCreateNew]);

	// --- CACHE MUTATION FOR NEWLY CREATED CLINICS ---
	useEffect(() => {
		if (!newCreatedClinic) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
			if (!data) return [newCreatedClinic];

			const isClinicExists = data.find((clinic) => clinic.id === newCreatedClinic.id);
			if (!isClinicExists) {
				return [...data, newCreatedClinic];
			}
			return data;
		});
	}, [newCreatedClinic, queryClient, queryKey]);

	return (
		<div className="flex flex-col gap-2 animate-in fade-in duration-500">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center justify-between">
				<span>
					Clinic Partner <span className="text-destructive">*</span>
				</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							"w-full h-12 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
							open ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:bg-slate-50 dark:hover:bg-white/5",
							fieldError && "border-destructive focus:ring-destructive/20 focus:border-destructive",
						)}
					>
						<div className="flex items-center gap-3 truncate min-w-0">
							<Building2 className={cn("w-4 h-4 shrink-0 transition-colors", value ? "text-primary" : "text-slate-400 dark:text-zinc-500")} />

							<span className={cn("text-sm truncate", !value && "text-muted-foreground")}>
								{selectedClinic ? (
									<span className="font-bold text-foreground">{selectedClinic.name}</span>
								) : value ? (
									// Fallback while the query fetches the clinic name during draft hydration
									<span className="font-mono text-muted-foreground">ID: {value.substring(0, 8)}...</span>
								) : (
									"Select Clinic..."
								)}
							</span>
						</div>
						{isFetching && !open ? <Loader2 className="w-4 h-4 animate-spin opacity-50 shrink-0" /> : <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width) flex flex-col">
					<Command className="dark:bg-[#121214] flex-1 min-h-0 flex flex-col" shouldFilter={false}>
						<CommandInput placeholder="Search 5,000+ clinics..." value={search} onValueChange={setSearch} className="py-3 shrink-0" />

						<CommandList className="max-h-60 custom-scrollbar flex-1">
							{/* BEAUTIFUL SKELETON LOADER */}
							{isFetching && (
								<div className="p-2 space-y-1">
									{Array.from({ length: 3 }).map((_, i) => (
										<div key={i} className="flex items-center justify-between p-3 rounded-lg">
											<div className="flex flex-col gap-1.5 w-full">
												<Skeleton className="h-3.5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md" />
												<Skeleton className="h-2.5 w-1/3 bg-slate-100 dark:bg-white/5 rounded-md" />
											</div>
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
									className="**:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase**:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-primary **:[[cmdk-group-heading]]:bg-primary/5 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:px-3 mb-2"
								>
									{clinics.map((clinic) => (
										<CommandItem
											key={clinic.id}
											value={clinic.name}
											onSelect={() => {
												// Safe fallback to grab a dentist ID (Required by your onSelect signature)
												const dentistId = clinic.dentists?.find((cd) => cd.isDefault || cd.isOwner)?.id || "";
												handleSelect(clinic.id, dentistId);
											}}
											className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
										>
											<div className="flex flex-col items-start gap-1.5 flex-1 min-w-0">
												<div className="flex items-center gap-2 w-full">
													<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{clinic.name}</span>
													{/* TYPE BADGES */}
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
													<Check className="h-4 w-4 text-primary animate-in zoom-in" />
												</span>
											)}
										</CommandItem>
									))}
								</CommandGroup>
							)}
						</CommandList>
						{/* STICKY CREATION FOOTER */}
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

			{/* RHF Validation Error */}
			{fieldError && (
				<span className="text-[11px] font-medium text-destructive ml-1 flex items-center gap-1.5">
					<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
					{fieldError.message}
				</span>
			)}
		</div>
	);
});

ClinicSelector.displayName = "ClinicSelector";
