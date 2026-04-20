"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { StaffRoleCategory } from "@/schema/base/enums.base";

// import { assignCaseStaffAction, removeCaseStaffAction } from "@/actions/cases/update-case";
// import { getActiveLabStaffAction } from "@/actions/staff";

interface EditStaffPopoverProps {
	caseId: string;
	roleCategory: StaffRoleCategory;
	currentStaffId: string | null;
	children: React.ReactNode;
}

export function EditStaffPopover({ caseId, roleCategory, currentStaffId, children }: EditStaffPopoverProps) {
	const [open, setOpen] = useState(false);

	// --- FETCH STAFF ONLY WHEN OPEN ---
	const { data: staffList = [], isLoading } = useQuery({
		queryKey: ["labStaff", "active"],
		queryFn: async () => {
			// Replace with actual fetch: return (await getActiveLabStaffAction()).data;
			return [
				{ id: "s1", firstName: "Ahmed", lastName: "Ali", roleCategory: "COURIER", jobTitle: "Baghdad Route", commissionType: "FIXED", commissionValue: 5000 },
				{ id: "s3", firstName: "Sarah", lastName: "Jenkins", roleCategory: "TECHNICIAN", jobTitle: "Master Ceramist", commissionType: "PERCENTAGE", commissionValue: 20 },
			];
		},
		enabled: open,
	});

	// Filter based on the requested role
	const availableStaff = staffList.filter((s: any) => {
		if (roleCategory === "COURIER") return s.roleCategory === "COURIER" || s.roleCategory === "SALES_REP";
		return s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN" || s.roleCategory === "MANAGER";
	});

	// --- MOCK ACTIONS ---
	const isExecuting = false;
	const assignAction = async (payload: any) => {
		toast.success("Staff assigned.");
		setOpen(false);
	};
	const removeAction = async (payload: any) => {
		toast.success("Staff removed.");
		setOpen(false);
	};

	/*
	const { executeAsync: assignAction, isExecuting: isAssigning } = useAction(assignCaseStaffAction, {
		onSuccess: () => { toast.success("Staff assigned successfully"); setOpen(false); },
	});
	const { executeAsync: removeAction, isExecuting: isRemoving } = useAction(removeCaseStaffAction, {
		onSuccess: () => { toast.success("Staff removed successfully"); setOpen(false); },
	});
	*/

	const handleAssign = async (staff: any) => {
		await assignAction({
			caseId,
			staffId: staff.id,
			roleCategory,
			commissionType: staff.commissionType,
			commissionValue: staff.commissionValue,
		});
	};

	const handleRemove = async () => {
		if (!currentStaffId) return;
		await removeAction({ caseId, staffId: currentStaffId });
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				{/* The trigger accepts any children (e.g., the "Assign" button or the staff name) */}
				{children}
			</PopoverTrigger>

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
								<CommandEmpty className="py-4 text-center text-xs">No eligible staff found.</CommandEmpty>
								<CommandGroup>
									{currentStaffId && (
										<CommandItem
											onSelect={handleRemove}
											className="flex items-center justify-center py-2 px-3 cursor-pointer hover:bg-destructive/5 text-destructive rounded-lg my-0.5 font-bold text-xs"
										>
											{isExecuting ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : null}
											Remove Assignment
										</CommandItem>
									)}

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
											{currentStaffId === staff.id && <Check className="w-3 h-3 text-primary animate-in zoom-in shrink-0 ml-2" />}
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
