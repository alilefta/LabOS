"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, UserPlus, History, Loader2, Activity } from "lucide-react";
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

type DataShape = PatientDetailsUI[];

export const PatientSelector = memo(({ onSelect, onCreateNew, newCreatedPatient }: { onSelect: (id: string) => void; onCreateNew: () => void; newCreatedPatient: PatientDetailsUI | null }) => {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 }); // Wait 300ms after typing

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
		enabled: open, // Only fetch when the popover is actually open
		staleTime: 1000 * 60 * 5, // Cache results for 5 mins
	});

	useEffect(() => {
		if (!newCreatedPatient) return;
		queryClient.setQueryData<DataShape>(queryKey, (data): DataShape => {
			console.log("Data from Query Setter", data);
			if (!data) return [];

			const isPatientExists = data.find((patient) => patient.id === newCreatedPatient.id);
			if (!isPatientExists) {
				return [...data, newCreatedPatient];
			}
			return data;
		});
	}, [newCreatedPatient, queryClient, queryKey]);

	const patients = fetchedPatients || [];

	return (
		<div className="flex flex-col gap-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Patient Name <span className="text-destructive">*</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full h-12 justify-between rounded-xl border-border bg-card px-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm">
						<span className={cn("text-sm", !selectedId && "text-muted-foreground")}>{selectedId ? patients.find((p) => p.id === selectedId)?.name : "Search clinical records..."}</span>
						{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : <ChevronsUpDown className="w-4 h-4 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="PopoverContent p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width]">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Type name or clinical ID..." value={search} onValueChange={setSearch} className="py-3" />
						<CommandList className="max-h-80 custom-scrollbar">
							{isFetching && (
								<div className="p-2 space-y-2">
									<Skeleton className="h-12 w-full rounded-lg" />
									<Skeleton className="h-12 w-full rounded-lg" />
								</div>
							)}

							{!isFetching && patients.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4">No record found for &quot;{search}&quot;</p>
									<Button
										onClick={() => {
											setOpen(false);
											onCreateNew();
											setSearch("");
										}}
										className="w-full rounded-xl bg-primary shadow-ai-glow-light font-bold"
									>
										<UserPlus className="w-4 h-4 mr-2" /> Register New Clinical Profile
									</Button>
								</CommandEmpty>
							)}

							<CommandGroup heading="Matching Clinical Profiles">
								{patients.map((patient) => (
									<PatientSearchItem
										key={patient.id}
										patient={patient}
										isSelected={selectedId === patient.id}
										onSelect={(id) => {
											setSelectedId(id);
											onSelect(id);
											setOpen(false);
										}}
									/>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
});

PatientSelector.displayName = "PatientSelector";

function PatientSearchItem({ patient, isSelected, onSelect }: { patient: PatientDetailsUI; isSelected: boolean; onSelect: (id: string) => void }) {
	return (
		<HoverCard openDelay={200}>
			<HoverCardTrigger asChild>
				<CommandItem value={patient.name} onSelect={() => onSelect(patient.id)} className="flex w-full items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group">
					<div className="flex flex-1 flex-col gap-0.5">
						<span className="text-sm font-bold text-foreground">{patient.name}</span>
						<div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
							<span className="flex items-center gap-1">{patient.age ? `${patient.age}Y` : "Age N/A"}</span>
							<span className="opacity-30">•</span>
							<span className={cn("px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5", patient.gender === "MALE" && "text-blue-500", patient.gender === "FEMALE" && "text-rose-500")}>
								{patient.gender || "UNKNOWN"}
							</span>
						</div>
					</div>
					{isSelected && (
						<span className="flex items-center justify-end">
							<Check className="h-4 w-4 text-primary animate-in zoom-in" />
						</span>
					)}
				</CommandItem>
			</HoverCardTrigger>

			<HoverCardContent side="right" align="start" className="w-80 p-0 border-border bg-card/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden z-50">
				<div className="p-4 bg-linear-to-br from-primary/10 to-transparent border-b border-border">
					<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-2">
						<Activity className="w-3 h-3" /> Clinical Dossier
					</p>
					<h4 className="text-lg font-bold text-foreground">{patient.name}</h4>
					<p className="text-[10px] text-muted-foreground font-mono uppercase">Internal ID: {patient.id.substring(0, 12)}</p>
				</div>

				<div className="p-4 space-y-4">
					{/* Clinical Profile Grid */}
					<div className="grid grid-cols-2 gap-2">
						<div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Vitals</p>
							<p className="text-xs font-bold text-foreground">
								{patient.age || "?"}Y / {patient.gender || "NA"}
							</p>
						</div>
						<div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-border">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Total Cases</p>
							<p className="text-xs font-mono font-bold text-foreground">{patient.cases?.length || 0}</p>
						</div>
					</div>

					<div>
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
							<History className="w-3 h-3" /> Case History
						</p>
						<div className="space-y-1.5">
							{patient.cases?.slice(0, 2).map((c) => (
								<div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-100/50 dark:bg-white/5 border border-border/50">
									<span className="text-[11px] font-mono font-bold text-foreground">#{c.id.substring(0, 6)}</span>
									<span
										className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md", c.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary")}
									>
										{c.status}
									</span>
								</div>
							))}
							{(!patient.cases || patient.cases.length === 0) && <p className="text-[10px] italic text-muted-foreground p-1">No production history recorded.</p>}
						</div>
					</div>

					{patient.description && (
						<div className="pt-2 border-t border-border">
							<p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Clinical Description</p>
							<p className="text-[11px] text-foreground leading-relaxed line-clamp-2 italic">&quot;{patient.description}&quot;</p>
						</div>
					)}
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
