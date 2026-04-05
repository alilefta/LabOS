"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, LucideIcon, Truck, UserPlus, Wrench } from "lucide-react";

import { CreateCaseInput } from "@/schema/composed/case.details";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CommissionType, StaffRoleCategory } from "@/schema/base/enums.base";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";

// --- MOCK DATA (Replace with actual Prisma Fetch) ---
const MOCK_STAFF = [
	{
		id: "s1",
		firstName: "Ahmed",
		lastName: "Ali",
		jobTitle: "Courier",
		commissionType: "FIXED",
		commissionValue: 5000,
		avatarUrl: null,
		isActive: true,
		phoneNumber: "123",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "s2",
		firstName: "Mustafa",
		lastName: "Hassan",
		jobTitle: "Sales Rep",
		commissionType: "PERCENTAGE",
		commissionValue: 10,
		avatarUrl: null,
		isActive: true,
		phoneNumber: "123",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "s3",
		firstName: "Sarah",
		lastName: "Jenkins",
		jobTitle: "Master Ceramist",
		commissionType: "PERCENTAGE",
		commissionValue: 20,
		avatarUrl: "https://i.pravatar.cc/150?img=11",
		isActive: true,
		phoneNumber: "123",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
] as LabStaffDetailsUI[];

interface Props {
	onOpenRegisterMemberSheet: () => void;
	// CRITICAL FIX: The modal creates a LabStaff employee, not a CaseAssignment
	newRegisteredStaffMember: LabStaffDetailsUI | null;
}

export function InitialStaffAssigner({ onOpenRegisterMemberSheet, newRegisteredStaffMember }: Props) {
	const { watch, setValue } = useFormContext<CreateCaseInput>();

	// Watch the entire array from the form
	const currentAssignments = watch("staffAssignments") || [];

	// --- 1. DATA FETCHING ---
	const { data: staffList = [], isLoading } = useQuery({
		queryKey: ["labStaff", "active"],
		queryFn: async (): Promise<LabStaffDetailsUI[]> => {
			// const res = await getActiveLabStaffAction();
			// return (res.data as StaffMemberData[]) ||[];
			return MOCK_STAFF;
		},
	});

	// --- 2. ARRAY MUTATION LOGIC ---
	// Wrapped in useCallback so it doesn't re-create the function reference on every render
	const handleAssign = useCallback(
		(staffMember: LabStaffDetailsUI | null, roleTarget: StaffRoleCategory) => {
			const filteredArray = currentAssignments.filter((a) => a.roleCategory !== roleTarget);

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
		[currentAssignments, setValue],
	);

	// Auto-select newly created staff
	useEffect(() => {
		if (newRegisteredStaffMember) {
			const role = newRegisteredStaffMember.roleCategory;

			// Map the system role to the correct dropdown
			const isIntakeRole = role === "COURIER" || role === "SALES_REP";
			const targetRole = isIntakeRole ? "COURIER" : "TECHNICIAN";

			handleAssign(newRegisteredStaffMember, targetRole);
		}
	}, [newRegisteredStaffMember, handleAssign]);

	// Helper to find who is currently assigned to a specific role
	const getAssignedStaffId = useCallback(
		(roleTarget: StaffRoleCategory) => {
			return currentAssignments.find((a) => a.roleCategory === roleTarget)?.staffId || "";
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
				isLoading={isLoading}
				staffList={staffList}
				assignedId={getAssignedStaffId("COURIER")}
				onAssign={handleAssign}
				onOpenRegister={onOpenRegisterMemberSheet}
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
				isLoading={isLoading}
				staffList={staffList}
				assignedId={getAssignedStaffId("TECHNICIAN")}
				onAssign={handleAssign}
				onOpenRegister={onOpenRegisterMemberSheet}
				filterFn={(s: LabStaffDetailsUI) => {
					// EXPLICIT ENUM FILTERING
					return s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN" || s.roleCategory === "QC_INSPECTOR" || s.roleCategory === "MANAGER";
				}}
			/>
		</div>
	);
}

interface StaffDropdownProps {
	label: string;
	roleTarget: StaffRoleCategory;
	icon: LucideIcon;
	iconColor: string;
	placeholder: string;
	isLoading: boolean;
	staffList: LabStaffDetailsUI[];
	assignedId: string;
	onAssign: (staff: LabStaffDetailsUI | null, role: StaffRoleCategory) => void;
	onOpenRegister: () => void;
	filterFn: (staff: LabStaffDetailsUI) => boolean;
}

export function StaffDropdown({ label, roleTarget, icon: Icon, iconColor, placeholder, isLoading, staffList, assignedId, onAssign, onOpenRegister, filterFn }: StaffDropdownProps) {
	const [open, setOpen] = useState(false);

	const selectedStaff = staffList.find((s) => s.id === assignedId);
	const availableStaff = staffList.filter(filterFn);

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
								{selectedStaff ? (
									<span className="flex items-center gap-2">
										<span className="font-bold text-foreground">
											{selectedStaff.firstName} {selectedStaff.lastName}
										</span>
										<span className="text-[9px] hidden sm:inline-flex px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-muted-foreground uppercase tracking-widest">
											{selectedStaff.jobTitle}
										</span>
									</span>
								) : (
									placeholder
								)}
							</span>
						</div>
						{isLoading ? <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
					</Button>
				</PopoverTrigger>

				<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[var(--radix-popover-trigger-width)]">
					<Command className="dark:bg-[#121214]">
						<CommandInput placeholder="Search staff by name..." className="py-2.5 text-[13px]" />
						<CommandList className="max-h-56 custom-scrollbar">
							<CommandEmpty className="py-6 text-center text-sm">No team members found.</CommandEmpty>

							<CommandGroup>
								{/* Option to clear the assignment */}
								{assignedId && (
									<CommandItem
										onSelect={() => {
											onAssign(null, roleTarget);
											setOpen(false);
										}}
										className="flex items-center justify-center py-2.5 px-3 cursor-pointer hover:bg-destructive/5 text-destructive rounded-lg my-0.5 group font-semibold text-xs"
									>
										Clear Selection
									</CommandItem>
								)}

								{availableStaff.map((staff) => (
									<CommandItem
										key={staff.id}
										value={`${staff.firstName} ${staff.lastName}`}
										onSelect={() => {
											onAssign(staff, roleTarget);
											setOpen(false);
										}}
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
												<span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{staff.jobTitle}</span>
											</div>
										</div>
										{assignedId === staff.id && <Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>

						{/* STICKY CREATE BUTTON */}
						<div className="p-2 border-t border-border bg-slate-50/80 dark:bg-white/2">
							<Button
								variant="ghost"
								onClick={() => {
									setOpen(false);
									onOpenRegister();
								}}
								className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl text-[13px] font-bold h-10 transition-colors"
							>
								<UserPlus className="mr-2 h-4 w-4" /> Register New Staff
							</Button>
						</div>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
