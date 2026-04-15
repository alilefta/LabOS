"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, History, Loader2, Activity, Loader, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PatientDetailsUI } from "@/schema/composed/patient.details";
import { getPatientsBySearchQueryAction } from "@/actions/patient";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { FieldError } from "react-hook-form";

type DataShape = PatientDetailsUI[];

interface PatientSelector {
	value: string;
	onSelect: (id: string) => void;
	onCreateNew: () => void;
	newCreatedPatient: PatientDetailsUI | null;
	fieldError: FieldError | undefined;
}

export const PatientSelector = memo(({ value, onCreateNew, newCreatedPatient, onSelect, fieldError }: PatientSelector) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });
	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["patients", "search", debouncedSearch], [debouncedSearch]);

	const { data: fetchedPatients, isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getPatientsBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}

			return (res.data?.patients as DataShape) || [];
		},
		enabled: open || !!value, // Only fetch when the popover is actually open
		staleTime: 1000 * 60 * 5, // Cache results for 5 mins
	});

	useEffect(() => {
		if (!newCreatedPatient) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
			if (!data) return [];

			const isPatientExists = data.find((patient) => patient.id === newCreatedPatient.id);
			if (!isPatientExists) {
				return [...data, newCreatedPatient];
			}
			return data;
		});
	}, [newCreatedPatient, queryClient, queryKey]);

	// --- HANDLERS ---
	const handleSelect = useCallback(
		(patientId: string) => {
			onSelect(patientId);
			setOpen(false);
		},
		[onSelect],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		onCreateNew();
		setSearch("");
	}, [onCreateNew]);
	const patients = fetchedPatients || [];

	// Find the selected patient directly from the fetched list based on the RHF `value` prop
	// This eliminates the need for a separate `selectedId` state that gets out of sync!
	const selectedPatient = patients.find((p) => p.id === value);

	return (
		<div className="flex flex-col gap-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Patient Name <span className="text-destructive">*</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full h-12 justify-between rounded-xl border-border bg-card px-4 transition-all shadow-sm",
							open ? "ring-[3px] ring-primary/20 border-primary outline-none" : "hover:bg-slate-50 dark:hover:bg-white/5",
							fieldError && "border-destructive focus:ring-destructive/20 focus:border-destructive",
						)}
					>
						<span className={cn("text-sm truncate min-w-0", !value && "text-muted-foreground")}>
							{selectedPatient ? (
								<span className="font-bold text-foreground">{selectedPatient.name}</span>
							) : value ? (
								// Fallback while the query fetches the patient name during draft hydration
								<span className="font-mono text-muted-foreground">ID: {value.substring(0, 8)}...</span>
							) : (
								"Search clinical records..."
							)}
						</span>

						{isFetching && !open ? <Loader2 className="w-4 h-4 animate-spin opacity-50 shrink-0" /> : <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="PopoverContent p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
					<Command className="dark:bg-[#121214] flex-1 min-h-0 flex flex-col" shouldFilter={false}>
						<CommandInput placeholder="Type name or clinical ID..." value={search} onValueChange={setSearch} className="py-3  shrink-0" />
						<CommandList className="max-h-60 custom-scrollbar flex-1">
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

							{!isFetching && patients.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground font-medium">No record found.</p>
								</CommandEmpty>
							)}

							{patients.length > 0 && (
								<CommandGroup
									heading="Matching Clinical Profiles"
									className="**:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-primary **:[[cmdk-group-heading]]:bg-primary/5 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:px-3 mb-2"
								>
									{patients.map((patient) => (
										<PatientSearchItem
											key={patient.id}
											patient={patient}
											isSelected={value === patient.id} // Replaced selectedId with value
											onSelect={handleSelect}
										/>
									))}
								</CommandGroup>
							)}
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
			{fieldError && <span className="text-[11px] font-medium text-destructive ml-1">{fieldError.message}</span>}
		</div>
	);
});
PatientSelector.displayName = "PatientSelector";

const PatientSearchItem = memo(function PatientSearchItem({ patient, isSelected, onSelect }: { patient: PatientDetailsUI; isSelected: boolean; onSelect: (id: string) => void }) {
	return (
		<HoverCard openDelay={300}>
			<HoverCardTrigger asChild>
				<CommandItem
					value={patient.name}
					onSelect={() => onSelect(patient.id)}
					className="flex w-full items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
				>
					<div className="flex flex-1 flex-col gap-0.5 min-w-0">
						<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{patient.name}</span>
						<div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter truncate">
							<span className="flex items-center gap-1">{patient.age ? `${patient.age}Y` : "Age N/A"}</span>
							<span className="opacity-30">•</span>
							<span
								className={cn(
									"px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5",
									patient.gender === "MALE" && "text-blue-600 dark:text-blue-500",
									patient.gender === "FEMALE" && "text-rose-600 dark:text-rose-500",
								)}
							>
								{patient.gender || "UNKNOWN"}
							</span>
						</div>
					</div>
					{isSelected && (
						<span className="flex items-center justify-end shrink-0 ml-3">
							<Check className="h-4 w-4 text-primary animate-in zoom-in" />
						</span>
					)}
				</CommandItem>
			</HoverCardTrigger>

			{/* The Hover Dossier */}
			<HoverCardContent side="right" align="start" className="w-80 p-0 border-border bg-card/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden z-100 animate-in fade-in zoom-in-95">
				<div className="p-4 bg-linear-to-br from-primary/10 to-transparent border-b border-border">
					<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
						<Activity className="w-3 h-3" /> Clinical Dossier
					</p>
					<h4 className="text-lg font-bold text-foreground tracking-tight">{patient.name}</h4>
					<p className="text-[10px] text-muted-foreground font-mono uppercase mt-0.5">Internal ID: {patient.id.substring(0, 12)}</p>
				</div>

				<div className="p-4 space-y-4">
					<div className="grid grid-cols-2 gap-3">
						<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Vitals</p>
							<p className="text-xs font-bold text-foreground">
								{patient.age || "?"}Y / {patient.gender || "NA"}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121214] border border-border shadow-sm">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Total Cases</p>
							<p className="text-xs font-mono font-bold text-foreground">{patient.cases?.length || 0}</p>
						</div>
					</div>

					<div>
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1.5">
							<History className="w-3.5 h-3.5" /> Case History
						</p>
						<div className="space-y-1.5">
							{patient.cases?.slice(0, 2).map((c) => (
								<div
									key={c.id}
									className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/2 border border-border hover:border-primary/30 transition-colors"
								>
									<span className="text-[11px] font-mono font-bold text-foreground">#{c.caseNumber || c.id.substring(0, 6)}</span>
									<span
										className={cn(
											"text-[9px] font-bold px-1.5 py-0.5 rounded-md border",
											c.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-primary/10 text-primary border-primary/20",
										)}
									>
										{c.status}
									</span>
								</div>
							))}
							{(!patient.cases || patient.cases.length === 0) && <p className="text-[10px] italic text-muted-foreground p-1">No production history recorded.</p>}
						</div>
					</div>

					{patient.description && (
						<div className="pt-3 border-t border-border">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Clinical Description</p>
							<p className="text-[11px] text-foreground leading-relaxed line-clamp-3 italic">&quot;{patient.description}&quot;</p>
						</div>
					)}
				</div>
			</HoverCardContent>
		</HoverCard>
	);
});
