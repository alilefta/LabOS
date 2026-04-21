"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StaffRoleCategory } from "@/schema/base/enums.base";

// import { assignCaseStaffAction } from "@/actions/cases/update-case";
// import { getActiveLabStaffAction } from "@/actions/staff";

interface AddStaffPopoverProps {
	caseId: string;
	roleFilter: "LOGISTICS" | "PRODUCTION";
	assignedStaffIds: string[]; // CRITICAL: Used to prevent duplicate assignments
	children: React.ReactNode;
}

export function AddStaffPopover({ caseId, roleFilter, assignedStaffIds, children }: AddStaffPopoverProps) {
	const [open, setOpen] = useState(false);

	// --- FETCH STAFF ONLY WHEN OPEN ---
	const { data: staffList = [], isLoading } = useQuery({
		queryKey: ["labStaff", "active"],
		queryFn: async () => {
			// Replace with actual fetch: return (await getActiveLabStaffAction()).data;
			return [
				{ id: "s1", firstName: "Ahmed", lastName: "Ali", roleCategory: "COURIER", jobTitle: "Baghdad Route", commissionType: "FIXED", commissionValue: 5000 },
				{ id: "s2", firstName: "Mustafa", lastName: "Hassan", roleCategory: "SALES_REP", jobTitle: "Regional Sales", commissionType: "PERCENTAGE", commissionValue: 10 },
				{ id: "s3", firstName: "Sarah", lastName: "Jenkins", roleCategory: "TECHNICIAN", jobTitle: "Master Ceramist", commissionType: "PERCENTAGE", commissionValue: 20 },
				{ id: "s4", firstName: "David", lastName: "Kim", roleCategory: "TECHNICIAN", jobTitle: "CAD/CAM Specialist", commissionType: "PERCENTAGE", commissionValue: 15 },
				{ id: "s5", firstName: "Elena", lastName: "Rodriguez", roleCategory: "QC_INSPECTOR", jobTitle: "Quality Control", commissionType: "FIXED", commissionValue: 0 },
			];
		},
		enabled: open,
	});

	// 1. Filter by requested role type (Logistics vs Production)
	// 2. CRITICAL: Filter out anyone whose ID is already in the assignedStaffIds array!
	const availableStaff = staffList.filter((s: any) => {
		if (assignedStaffIds.includes(s.id)) return false; // Prevent duplicates

		if (roleFilter === "LOGISTICS") return s.roleCategory === "COURIER" || s.roleCategory === "SALES_REP";
		return s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN" || s.roleCategory === "QC_INSPECTOR" || s.roleCategory === "MANAGER";
	});

	// --- MOCK ACTION ---
	const isExecuting = false;
	const assignAction = async (payload: any) => {
		toast.success("Staff member assigned to case.");
		setOpen(false);
	};

	const handleAssign = async (staff: any) => {
		await assignAction({
			caseId,
			staffId: staff.id,
			roleCategory: staff.roleCategory, // We use their exact DB role
			commissionType: staff.commissionType,
			commissionValue: staff.commissionValue,
		});
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg text-left w-full sm:w-auto">{children}</PopoverTrigger>

			<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-64" align="end">
				<Command className="dark:bg-[#121214]">
					<CommandInput placeholder="Search team members..." className="py-2.5 text-[13px]" />

					<CommandList className="max-h-56 custom-scrollbar">
						{isLoading && (
							<div className="p-4 flex justify-center">
								<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
							</div>
						)}

						{!isLoading && (
							<>
								{availableStaff.length === 0 ? (
									<CommandEmpty className="py-4 text-center text-xs">No available staff found.</CommandEmpty>
								) : (
									<CommandGroup>
										{availableStaff.map((staff: any) => (
											<CommandItem
												key={staff.id}
												value={`${staff.firstName} ${staff.lastName}`}
												onSelect={() => handleAssign(staff)}
												className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg my-0.5 group"
											>
												<div className="flex items-center gap-2.5 min-w-0">
													<Avatar className="w-6 h-6 border border-border">
														{staff.avatarUrl && <AvatarImage src={staff.avatarUrl} />}
														<AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold">
															{staff.firstName[0]}
															{staff.lastName[0]}
														</AvatarFallback>
													</Avatar>
													<div className="flex flex-col min-w-0">
														<span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
															{staff.firstName} {staff.lastName}
														</span>
														<span className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{staff.jobTitle}</span>
													</div>
												</div>
												<UserPlus className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-opacity shrink-0 ml-2" />
											</CommandItem>
										))}
									</CommandGroup>
								)}
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
