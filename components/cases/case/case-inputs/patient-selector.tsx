"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, UserPlus, History, MapPin, Phone, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PatientDetails } from "@/schema/composed/patient.details";
import { getPatientsAction } from "@/actions/patient";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import useDebounce from "@/hooks/useDebounce";
import { CommandLoading } from "cmdk";

type DataShape = PatientDetails[];

export function PatientSelector({ onSelect, onCreateNew, newCreatedPatient }: { onSelect: (id: string) => void; onCreateNew: () => void; newCreatedPatient: PatientDetails | null }) {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 }); // Wait 300ms after typing

	const queryClient = useQueryClient();
	const queryKey = useMemo(() => ["patients", "search", debouncedSearch], [debouncedSearch]);

	const { data: fetchedPatients, isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getPatientsAction({ searchQuery: debouncedSearch });

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}

			return res.data?.patients as DataShape;
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

	// if (isFetching) {
	// 	return <Skeleton className="h-11 w-full rounded-xl" />;
	// }

	const patients = fetchedPatients || [];

	return (
		<div className="flex flex-col gap-2">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
				Patient Name <span className="text-destructive">*</span>
			</h5>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-full h-12 justify-between rounded-xl border-border bg-card px-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm">
						<span className={cn("text-sm", !selectedId && "text-muted-foreground")}>{selectedId ? patients.find((p) => p.id === selectedId)?.name : "Search or Add Patient..."}</span>
						{isFetching ? <Loader2 className="w-4 h-4 animate-spin opacity-50" /> : <ChevronsUpDown className="w-4 h-4 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="PopoverContent p-0 rounded-2xl border-border shadow-premium overflow-hidden">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Search 5,000+ patients..." value={search} onValueChange={setSearch} className="py-3" />{" "}
						<CommandList className="max-h-80 custom-scrollbar">
							{isFetching && (
								<CommandLoading className="p-6 text-center flex! items-center justify-center">
									<p className="text-xs text-muted-foreground mb-4">Loading Patients</p>
									<span className="text-center flex items-center justify-center">
										<Loader2 className="w-3.5 h-3.5 animate-spin" />
									</span>
								</CommandLoading>
							)}

							{!isFetching && patients.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4">No clinical record found.</p>
									<Button
										onClick={() => {
											setOpen(false);
											onCreateNew();
											setSearch(""); // to allow the sheet create new one with the same search query key
										}}
										className="w-full rounded-xl bg-primary shadow-ai-glow-light"
									>
										<UserPlus className="w-4 h-4 mr-2" /> Create &quot;{search}&quot;
									</Button>
								</CommandEmpty>
							)}

							<CommandGroup heading="Recent & Matching Patients">
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
}

function PatientSearchItem({ patient, isSelected, onSelect }: { patient: PatientDetails; isSelected: boolean; onSelect: (id: string) => void }) {
	return (
		<HoverCard openDelay={200}>
			<HoverCardTrigger asChild>
				<CommandItem
					value={patient.name}
					onSelect={() => {
						onSelect(patient.id);
					}}
					className="flex w-full items-center gap-0 justify-between py-3 cursor-pointer hover:bg-primary/5 group"
				>
					<div className="flex flex-1 flex-col gap-1">
						<span className="text-sm font-bold text-foreground">{patient.name}</span>
						<div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter mt-0.5">
							<span className="flex items-center gap-1">
								<MapPin className="w-2.5 h-2.5" /> {patient.city}
							</span>
							{patient.phoneNumber && (
								<span className="flex items-center gap-1">
									<Phone className="w-2.5 h-2.5" /> {patient.phoneNumber}
								</span>
							)}
						</div>
					</div>
					{isSelected ? (
						<span>
							<Check className=" h-4 w-4 text-primary" />
						</span>
					) : null}
				</CommandItem>
			</HoverCardTrigger>

			{/* THE IDENTITY VERIFICATION CARD */}
			<HoverCardContent side="right" align="start" className="w-80! p-0 border-border bg-card/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden z-50">
				<div className="p-4 bg-linear-to-br from-primary/10 to-transparent border-b border-border">
					<p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Clinical Identity</p>
					<h4 className="text-lg font-bold text-foreground">{patient.name}</h4>
					<p className="text-xs text-muted-foreground">
						{patient.address1}, {patient.city}
					</p>
				</div>
				<div className="p-4 space-y-4">
					<div>
						<p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
							<History className="w-3 h-3" /> Recent Case History
						</p>
						<div className="space-y-2">
							{patient.cases.slice(0, 2).map((c) => (
								<div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-border">
									<span className="text-[11px] font-mono font-bold text-foreground">#{c.id.substring(0, 8)}</span>
									<span
										className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md", c.status === "DELIEVERD" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary")}
									>
										{c.status}
									</span>
								</div>
							))}
							{patient.cases.length === 0 && <p className="text-[11px] italic text-muted-foreground">No previous cases found.</p>}
						</div>
					</div>
					<div className="pt-2 border-t border-border flex justify-between items-center">
						<span className="text-[10px] font-bold text-muted-foreground uppercase">Total Lifetime Cases</span>
						<span className="text-sm font-mono font-bold text-foreground">{patient.cases.length}</span>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
