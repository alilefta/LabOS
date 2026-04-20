"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2, Stethoscope, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { Control, FieldError, useWatch } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

// Mocking the action - replace with your actual server action!
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { getDentistsByClinicAction } from "@/actions/clinics/dentists/get-dentists";
import { CreateCaseInput } from "@/schema/composed/case.details";

interface Dentist {
	id: string;
	name: string;
	isOwner: boolean;
	isDefault: boolean;
}

interface DentistSelectorProps {
	value: string | undefined;
	onSelect: (id: string | undefined) => void;
	onCreateNew?: () => void; // Optional: To wire up a "Register Dentist" modal later
	fieldError: FieldError | undefined;
	control: Control<CreateCaseInput>;
}

export const DentistSelector = memo(function DentistSelector({ value, control, onSelect, onCreateNew, fieldError }: DentistSelectorProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");

	const clinicId = useWatch({ control, name: "clinicId" });

	// Only fetch dentists if a clinic is actually selected
	const { data: dentists = [], isFetching } = useQuery({
		queryKey: ["dentists", "clinic", clinicId],
		queryFn: async () => {
			if (!clinicId) return [];
			const res = await getDentistsByClinicAction({ clinicId });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res.data?.dentists as Dentist[]) || [];
		},
		enabled: !!clinicId, // Progressive Enablement
		staleTime: 1000 * 60 * 10,
	});

	const selectedDentist = dentists.find((d) => d.id === value);

	// --- THE SELF-HEALING MECHANISM ---
	useEffect(() => {
		if (value && !isFetching && clinicId) {
			const dentistExistsInNewClinic = dentists.some((d) => d.id === value);
			if (!dentistExistsInNewClinic) {
				onSelect(undefined);
			}
		}
	}, [clinicId, dentists, isFetching, value, onSelect]);

	const handleSelect = useCallback(
		(id: string) => {
			onSelect(id);
			setOpen(false);
		},
		[onSelect],
	);

	// If no clinic is selected, render a beautiful disabled state
	if (!clinicId) {
		return (
			<div className="flex flex-col gap-2">
				<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1 opacity-50">Ordering Dentist</h5>
				<div className="w-full h-12 rounded-xl border border-border bg-slate-50/50 dark:bg-white/2 px-4 flex items-center gap-3 cursor-not-allowed opacity-60">
					<Stethoscope className="w-4 h-4 text-slate-400" />
					<span className="text-sm text-muted-foreground">Awaiting Clinic...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 animate-in fade-in duration-300">
			<h5 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center justify-between">
				<span>
					Ordering Dentist <span className="text-destructive">*</span>
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
							<Stethoscope className={cn("w-4 h-4 shrink-0 transition-colors", value ? "text-primary" : "text-slate-400 dark:text-zinc-500")} />

							<span className={cn("text-sm truncate", !value && "text-muted-foreground")}>
								{selectedDentist ? (
									<span className="flex items-center gap-2">
										<span className="font-bold text-foreground">{selectedDentist.name}</span>
										{selectedDentist.isOwner && (
											<span className="hidden sm:inline-flex text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-500 uppercase tracking-widest">
												Owner
											</span>
										)}
									</span>
								) : value ? (
									<span className="font-mono text-muted-foreground">ID: {value.substring(0, 8)}...</span>
								) : (
									"Select Dentist..."
								)}
							</span>
						</div>
						{isFetching && !open ? <Loader2 className="w-4 h-4 animate-spin opacity-50 shrink-0" /> : <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width)">
					<Command className="dark:bg-[#121214]">
						<CommandInput placeholder="Search practitioners..." value={search} onValueChange={setSearch} className="py-3" />
						<CommandList className="max-h-60 custom-scrollbar">
							{isFetching && (
								<div className="p-2 space-y-2">
									<Skeleton className="h-10 w-full rounded-lg" />
									<Skeleton className="h-10 w-full rounded-lg" />
								</div>
							)}

							{!isFetching && dentists.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground mb-4">No dentists found.</p>
									{onCreateNew && (
										<Button
											onClick={() => {
												setOpen(false);
												onCreateNew();
											}}
											className="w-full rounded-xl bg-primary shadow-ai-glow-light font-bold h-9"
										>
											<UserPlus className="w-3.5 h-3.5 mr-2" /> Add Practitioner
										</Button>
									)}
								</CommandEmpty>
							)}

							<CommandGroup heading="Clinic Practitioners">
								{dentists.map((dentist) => (
									<CommandItem
										key={dentist.id}
										value={dentist.name}
										onSelect={() => handleSelect(dentist.id)}
										className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-primary/5 group"
									>
										<div className="flex items-center gap-2">
											<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{dentist.name}</span>
											{dentist.isOwner && (
												<span className="text-[9px] font-bold px-1.5 py-0.5 rounded border border-amber-500/20 text-amber-600 dark:text-amber-500 uppercase">Owner</span>
											)}
										</div>
										{value === dentist.id && <Check className="w-4 h-4 text-primary animate-in zoom-in" />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{fieldError && <span className="text-[11px] font-medium text-destructive ml-1">{fieldError.message}</span>}
		</div>
	);
});
