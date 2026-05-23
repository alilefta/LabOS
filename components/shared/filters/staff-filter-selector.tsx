"use client";

import { UserCog, ChevronsUpDown, Loader2, Check, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo, useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";

import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { getActiveLabStaffBySearchQueryAction } from "@/actions/staff"; // Adjust to your actual action path
import { handleSafeActionError } from "@/lib/safe-action-helpers";

interface StaffFilterSelectorProps {
	value: string | null;
	onSelect: (staffId: string | null) => void;
	variant?: "default" | "emerald"; // Context-aware theming
}

export const StaffFilterSelector = memo(({ value, onSelect, variant = "default" }: StaffFilterSelectorProps) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	const queryKey = useMemo(() => ["labStaff", "filter-search", debouncedSearch], [debouncedSearch]);

	const { data: fetchedStaff, isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getActiveLabStaffBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res.data?.staff as LabStaffDetailsUI[]) || [];
		},
		enabled: open || !!value,
		staleTime: 1000 * 60 * 5,
	});

	const staffList = fetchedStaff || [];
	const selectedStaff = staffList.find((s) => s.id === value);

	const handleSelect = useCallback(
		(staffId: string | null) => {
			onSelect(staffId);
			setOpen(false);
			setSearch("");
		},
		[onSelect],
	);

	// --- THEME DICTIONARY ---
	// Allows the component to seamlessly blend into Clinical (Primary) or Financial (Emerald) sheets
	const theme = {
		triggerActive: variant === "emerald" ? "ring-[3px] ring-emerald-500/20 border-emerald-500 bg-emerald-500/5" : "ring-[3px] ring-primary/20 border-primary bg-primary/5",
		triggerValue: variant === "emerald" ? "border-emerald-500/50 bg-emerald-500/5" : "border-primary/50 bg-primary/5",
		textActive: variant === "emerald" ? "text-emerald-700 dark:text-emerald-400" : "text-primary",
		iconActive: variant === "emerald" ? "text-emerald-500" : "text-primary",
		hoverItem: variant === "emerald" ? "hover:bg-emerald-500/10" : "hover:bg-primary/10",
		groupHeading:
			variant === "emerald"
				? "**:[[cmdk-group-heading]]:text-emerald-500 **:[[cmdk-group-heading]]:bg-emerald-500/5"
				: "**:[[cmdk-group-heading]]:text-primary **:[[cmdk-group-heading]]:bg-primary/5",
	};

	return (
		<div className="flex flex-col gap-2 animate-in fade-in duration-500">
			<label className="text-[11px] font-bold text-muted-foreground ml-1">Assigned Staff</label>

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							"w-full h-12 justify-between rounded-xl border-border bg-slate-50 dark:bg-white/[0.02] px-4 transition-all shadow-sm",
							open ? theme.triggerActive : "hover:bg-slate-100 dark:hover:bg-white/5",
							value && !open && theme.triggerValue,
						)}
					>
						<div className="flex items-center gap-3 truncate min-w-0">
							{selectedStaff ? (
								<Avatar className="w-5 h-5 border border-border">
									{selectedStaff.avatarUrl && <AvatarImage src={selectedStaff.avatarUrl} />}
									<AvatarFallback className={cn("text-[8px] font-bold", variant === "emerald" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary")}>
										{selectedStaff.firstName[0]}
										{selectedStaff.lastName[0]}
									</AvatarFallback>
								</Avatar>
							) : (
								<UserCog className={cn("w-4 h-4 shrink-0 transition-colors", value ? theme.iconActive : "text-slate-400 dark:text-zinc-500")} />
							)}

							<span className={cn("text-sm truncate", !value ? "text-muted-foreground" : cn("font-bold", theme.textActive))}>
								{selectedStaff ? (
									`${selectedStaff.firstName} ${selectedStaff.lastName}`
								) : value ? (
									<span className="font-mono text-muted-foreground">ID: {value.substring(0, 8)}...</span>
								) : (
									"Filter by staff member..."
								)}
							</span>
						</div>
						{isFetching && !open ? <Loader2 className={cn("w-4 h-4 animate-spin opacity-50 shrink-0", theme.iconActive)} /> : <ChevronsUpDown className="w-4 h-4 opacity-50 shrink-0" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[--radix-popover-trigger-width] flex flex-col">
					<Command className="dark:bg-[#121214] flex-1 min-h-0 flex flex-col" shouldFilter={false}>
						<CommandInput placeholder="Search staff by name..." value={search} onValueChange={setSearch} className="py-3 shrink-0" />

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

							{!isFetching && staffList.length === 0 && (
								<CommandEmpty className="p-6 text-center">
									<p className="text-xs text-muted-foreground font-medium">No staff member found.</p>
								</CommandEmpty>
							)}

							{staffList.length > 0 && (
								<CommandGroup
									heading="Team Members"
									className={cn(
										"**:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-bold **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:px-3 mb-2",
										theme.groupHeading,
									)}
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

									{staffList.map((staff) => (
										<CommandItem
											key={staff.id}
											value={`${staff.firstName} ${staff.lastName}`}
											onSelect={() => handleSelect(staff.id)}
											className={cn("flex items-center justify-between py-3 px-4 cursor-pointer rounded-lg my-0.5 group", theme.hoverItem)}
										>
											<div className="flex items-center gap-3 flex-1 min-w-0">
												<Avatar className="w-7 h-7 border border-border">
													{staff.avatarUrl && <AvatarImage src={staff.avatarUrl} />}
													<AvatarFallback className={cn("text-[9px] font-bold", variant === "emerald" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary/10 text-primary")}>
														{staff.firstName[0]}
														{staff.lastName[0]}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col items-start gap-0.5 min-w-0">
													<span className={cn("text-sm font-bold text-foreground transition-colors truncate", theme.hoverItem.replace("bg-", "text-").replace("/10", ""))}>
														{staff.firstName} {staff.lastName}
													</span>
													<span className="text-[10px] text-muted-foreground uppercase font-medium truncate w-full">{staff.jobTitle || staff.roleCategory}</span>
												</div>
											</div>
											{value === staff.id && (
												<span className="flex items-center justify-end shrink-0 ml-3">
													<Check className={cn("w-4 h-4 animate-in zoom-in", theme.iconActive)} />
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

StaffFilterSelector.displayName = "StaffFilterSelector";
