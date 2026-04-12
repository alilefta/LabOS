"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader, Loader2, LucideIcon, Truck, UserPlus, Wrench, X } from "lucide-react";

import { CreateCaseInput } from "@/schema/composed/case.details";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CommissionType, StaffRoleCategory } from "@/schema/base/enums.base";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import useDebounce from "@/hooks/useDebounce";
import { getActiveLabStaffBySearchQueryAction } from "@/actions/staff";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
	onOpenRegisterMemberSheet: (requiredRoles: StaffRoleCategory[]) => void;
	newRegisteredStaffMember: LabStaffDetailsUI | null;
}

export const InitialStaffAssigner = memo(function InitialStaffAssigner({ onOpenRegisterMemberSheet, newRegisteredStaffMember }: Props) {
	const { setValue, getValues, control } = useFormContext<CreateCaseInput>();

	// We only watch this so the UI components re-render when an assignment is made
	const currentAssignments = useWatch({
		control,
		name: "staffAssignments",
		defaultValue: [],
	});
	const handleAssign = useCallback(
		(staffMember: LabStaffDetailsUI | null, roleTarget: StaffRoleCategory) => {
			const currentArray = getValues("staffAssignments") || [];
			const filteredArray = currentArray.filter((a) => a.roleCategory !== roleTarget);

			if (staffMember) {
				filteredArray.push({
					staffId: staffMember.id,
					roleCategory: roleTarget,
					commissionType: staffMember.commissionType as CommissionType,
					commissionValue: staffMember.commissionValue ?? 0,
				});
			}

			setValue("staffAssignments", filteredArray, { shouldDirty: true, shouldValidate: true });
		},
		[getValues, setValue],
	);

	useEffect(() => {
		if (newRegisteredStaffMember && newRegisteredStaffMember.isActive) {
			const role = newRegisteredStaffMember.roleCategory;
			const isIntakeRole = role === "COURIER" || role === "SALES_REP";
			const targetRole = isIntakeRole ? "COURIER" : "TECHNICIAN";

			handleAssign(newRegisteredStaffMember, targetRole);
		}
	}, [newRegisteredStaffMember, handleAssign]);

	// Fast render helper
	const getAssignedStaffId = useCallback(
		(roleTarget: StaffRoleCategory) => {
			return currentAssignments && currentAssignments.length > 0 ? currentAssignments.find((a) => a.roleCategory === roleTarget)?.staffId || "" : "";
		},
		[currentAssignments],
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
			{/* 1. The Intake / Courier Dropdown */}
			<StaffDropdown
				label="Intake / Delivered By"
				roleTarget="COURIER"
				icon={Truck}
				iconColor="text-amber-500"
				placeholder="Select Courier or Sales Rep..."
				assignedId={getAssignedStaffId("COURIER")}
				onAssign={handleAssign}
				newRegisteredStaffMember={newRegisteredStaffMember}
				onOpenRegister={() => onOpenRegisterMemberSheet(["COURIER", "SALES_REP"])}
				filterFn={(s: LabStaffDetailsUI) => {
					return s.roleCategory === "COURIER" || s.roleCategory === "SALES_REP";
				}}
			/>

			{/* 2. The Lead Technician Dropdown */}
			<StaffDropdown
				label="Lead Technician"
				roleTarget="TECHNICIAN"
				icon={Wrench}
				iconColor="text-primary"
				placeholder="Assign Production Tech..."
				assignedId={getAssignedStaffId("TECHNICIAN")}
				onAssign={handleAssign}
				newRegisteredStaffMember={newRegisteredStaffMember}
				onOpenRegister={() => onOpenRegisterMemberSheet(["TECHNICIAN", "MANAGER", "QC_INSPECTOR", "SENIOR_TECHNICIAN"])}
				filterFn={(s: LabStaffDetailsUI) => {
					return s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN" || s.roleCategory === "QC_INSPECTOR" || s.roleCategory === "MANAGER";
				}}
			/>
		</div>
	);
});

interface StaffDropdownProps {
	label: string;
	roleTarget: StaffRoleCategory;
	icon: LucideIcon;
	iconColor: string;
	placeholder: string;
	assignedId: string;
	onAssign: (staff: LabStaffDetailsUI | null, role: StaffRoleCategory) => void;
	onOpenRegister: () => void;
	filterFn: (staff: LabStaffDetailsUI) => boolean;
	newRegisteredStaffMember: LabStaffDetailsUI | null;
}

type DataShape = LabStaffDetailsUI[];

export const StaffDropdown = memo(({ label, roleTarget, icon: Icon, iconColor, placeholder, assignedId, onAssign, onOpenRegister, filterFn, newRegisteredStaffMember }: StaffDropdownProps) => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce({ value: search, delay: 300 });

	// Local state to keep the name visible when the dropdown is closed
	const [selectedStaffData, setSelectedStaffData] = useState<LabStaffDetailsUI | null>(null);

	const queryKey = useMemo(() => ["labStaff", "search", debouncedSearch], [debouncedSearch]);

	const { data: rawStaffList = [], isFetching } = useQuery({
		queryKey,
		queryFn: async () => {
			const res = await getActiveLabStaffBySearchQueryAction({ searchQuery: debouncedSearch, limit: 10 });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res.data?.staff as DataShape) || [];
		},
		enabled: open,
		staleTime: 1000 * 60 * 5,
	});

	const availableStaff = useMemo(() => rawStaffList.filter(filterFn), [rawStaffList, filterFn]);

	// --- CRITICAL FIX: DERIVED STATE INSTEAD OF USEEFFECT ---
	// Mathematically guarantees the UI always has data to display without triggering React warnings.
	const activeDisplayStaff = useMemo(() => {
		if (!assignedId) return null;

		// 1. Check if they are currently in the fetched search list
		const foundInSearch = rawStaffList.find((s) => s.id === assignedId);
		if (foundInSearch) return foundInSearch;

		// 2. Check if they were JUST created by the modal
		if (newRegisteredStaffMember && newRegisteredStaffMember.isActive && newRegisteredStaffMember.id === assignedId) {
			return newRegisteredStaffMember;
		}

		// 3. Fallback to local memory (used when the dropdown is closed and cache is empty)
		return selectedStaffData;
	}, [assignedId, rawStaffList, newRegisteredStaffMember, selectedStaffData]);

	const handleSelect = useCallback(
		(staff: LabStaffDetailsUI) => {
			setSelectedStaffData(staff);
			onAssign(staff, roleTarget);
			setOpen(false);
		},
		[onAssign, roleTarget],
	);

	const handleCreateNew = useCallback(() => {
		setOpen(false);
		onOpenRegister();
		setSearch("");
	}, [onOpenRegister]);

	return (
		<div className="flex flex-col gap-2">
			<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center justify-between">
				<span>
					{label} <span className="text-muted-foreground/50 lowercase tracking-normal font-medium">(Optional)</span>
				</span>
			</label>

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
						<div className="flex items-center gap-3 truncate min-w-0">
							<Icon className={cn("w-4 h-4 shrink-0 transition-colors", assignedId ? iconColor : "text-slate-400 dark:text-zinc-500")} />

							<span className={cn("text-sm truncate", !assignedId && "text-muted-foreground font-normal")}>
								{assignedId && activeDisplayStaff ? (
									<span className="flex items-center gap-2">
										<span className="font-bold text-foreground">
											{activeDisplayStaff.firstName} {activeDisplayStaff.lastName}
										</span>
										<span className="text-[9px] hidden sm:inline-flex px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-muted-foreground uppercase tracking-widest">
											{activeDisplayStaff.jobTitle || activeDisplayStaff.roleCategory}
										</span>
									</span>
								) : (
									placeholder
								)}
							</span>
						</div>
						{isFetching && !open ? <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-(--radix-popover-trigger-width)">
					<Command className="dark:bg-[#121214]" shouldFilter={false}>
						<CommandInput placeholder="Search staff by name..." value={search} onValueChange={setSearch} className="py-3" />
						<CommandList className="max-h-56 custom-scrollbar pb-1">
							{isFetching && (
								<div className="p-2 space-y-2">
									<Skeleton className="h-10 w-full rounded-lg" />
									<Skeleton className="h-10 w-full rounded-lg" />
								</div>
							)}

							{!isFetching && availableStaff.length === 0 && (
								<CommandEmpty className="p-6 text-center text-sm">
									<p className="text-xs text-muted-foreground mb-4 font-medium">No team members found.</p>
									{/* The UX Empty State Button (Remains active) */}
									<Button onClick={handleCreateNew} className="w-full rounded-xl bg-primary text-white font-bold h-9 shadow-ai-glow-light">
										<UserPlus className="w-3.5 h-3.5 mr-2" /> Register {search ? `"${search}"` : "New Staff"}
									</Button>
								</CommandEmpty>
							)}

							<CommandGroup>
								{/* Fixed: Replaced standard div with CommandItem to ensure keyboard accessibility works! */}
								{assignedId && (
									<CommandItem
										onSelect={() => {
											setSelectedStaffData(null);
											onAssign(null, roleTarget);
											setOpen(false);
										}}
										className="flex items-center justify-center gap-1.5 tracking-wider py-2.5 px-3 cursor-pointer hover:bg-destructive/10 data-[selected=true]:bg-destructive/10 text-destructive rounded-lg my-1 group font-bold text-xs"
									>
										<X className="w-3.5 h-3.5" />
										Clear Selection
									</CommandItem>
								)}

								{availableStaff.map((staff) => (
									<CommandItem
										key={staff.id}
										value={`${staff.firstName} ${staff.lastName}`}
										onSelect={() => handleSelect(staff)}
										className="flex items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
									>
										<div className="flex items-center gap-3 min-w-0">
											<Avatar className="w-7 h-7 border border-border">
												{staff.avatarUrl && <AvatarImage src={staff.avatarUrl} />}
												<AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
													{staff.firstName[0]}
													{staff.lastName[0]}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col min-w-0">
												<span className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors truncate">
													{staff.firstName} {staff.lastName}
												</span>
												<span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{staff.jobTitle || staff.roleCategory}</span>
											</div>
										</div>
										{assignedId === staff.id && <Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
					{/* --- NEW: STICKY CREATION FOOTER --- */}
					<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2 shrink-0">
						<Button
							variant="ghost"
							onClick={handleCreateNew}
							disabled={isFetching}
							className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl text-[13px] font-bold h-10 transition-colors"
						>
							{isFetching ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
							{search.length > 0 ? `Register "${search}"` : "Register New Member"}
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
});
StaffDropdown.displayName = "StaffDropdown";
