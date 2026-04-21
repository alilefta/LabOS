"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, UserMinus } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { getActiveLabStaffAction } from "@/actions/staff";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";

import { assignCaseStaffAction, removeCaseStaffAction } from "@/actions/cases/update-case";

interface EditStaffPopoverProps {
	caseId: string;
	roleCategory: StaffRoleCategory;
	currentStaffId: string | null;
	children: React.ReactNode;
}

export function EditStaffPopover({ caseId, roleCategory, currentStaffId, children }: EditStaffPopoverProps) {
	const [open, setOpen] = useState(false);

	// --- FETCH STAFF ONLY WHEN POPOVER IS OPEN ---
	const { data: staffList = [], isLoading } = useQuery({
		queryKey: ["labStaff", "active", roleCategory],
		queryFn: async () => {
			const res = await getActiveLabStaffAction();

			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}

			return (res.data?.staff || []) as LabStaffDetailsUI[];
		},
		enabled: open,
	});

	// Strictly filter the list based on the requested slot role
	const availableStaff = staffList.filter((s) => s.roleCategory === roleCategory);

	// --- ACTIONS ---
	const { executeAsync: assignStaff } = useAction(assignCaseStaffAction);
	const { executeAsync: removeStaff } = useAction(removeCaseStaffAction);

	const handleAssign = async (staff: LabStaffDetailsUI) => {
		// 1. Optimistic Close: Instantly hide the popover so the UI feels blazing fast
		setOpen(false);

		// 2. Wrap the server actions in an async promise for the Toast
		const assignPromise = async () => {
			// If replacing someone, remove the old assignment first!
			if (currentStaffId && currentStaffId !== staff.id) {
				const removeRes = await removeStaff({ caseId, staffId: currentStaffId });
				if (removeRes?.serverError || removeRes?.validationErrors) throw new Error("Failed to remove previous staff");
			}

			// Assign the new person
			const assignRes = await assignStaff({
				caseId,
				staffId: staff.id,
				roleCategory,
				commissionType: staff.commissionType,
				commissionValue: staff.commissionValue || 0,
			});

			if (assignRes?.serverError || assignRes?.validationErrors) throw new Error("Failed to assign staff");

			return staff;
		};

		// 3. Fire the Promise Toast!
		toast.promise(assignPromise(), {
			loading: `Assigning ${staff.firstName}...`,
			success: `${staff.firstName} assigned successfully.`,
			error: "Failed to update assignment.",
		});
	};

	const handleRemove = async () => {
		if (!currentStaffId) return;

		// 1. Optimistic Close
		setOpen(false);

		const removePromise = async () => {
			const res = await removeStaff({ caseId, staffId: currentStaffId });
			if (res?.serverError || res?.validationErrors) throw new Error("Failed to remove assignment");
			return res;
		};

		toast.promise(removePromise(), {
			loading: "Removing assignment...",
			success: "Assignment removed.",
			error: "Failed to remove assignment.",
		});
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			{/* CRITICAL FIX: Removed the wrapper div completely. We use purely asChild so your flex layouts in the Sidebar remain 100% untouched! */}
			<PopoverTrigger asChild>{children}</PopoverTrigger>

			<PopoverContent className="p-0 rounded-2xl border-border shadow-premium overflow-hidden w-[280px]" align="end">
				<Command className="dark:bg-[#121214]">
					<CommandInput placeholder="Search team members..." className="py-2.5 text-[13px]" />

					<CommandList className="max-h-60 custom-scrollbar relative">
						{isLoading && (
							<div className="p-6 flex justify-center">
								<Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
							</div>
						)}

						{!isLoading && (
							<>
								{availableStaff.length === 0 ? (
									<CommandEmpty className="py-6 text-center text-xs">No eligible staff found.</CommandEmpty>
								) : (
									<CommandGroup>
										{/* Remove Option */}
										{currentStaffId && (
											<CommandItem
												onSelect={handleRemove}
												className="flex items-center justify-center py-2.5 px-3 cursor-pointer hover:bg-destructive/5 text-destructive rounded-xl my-1 font-bold text-xs group transition-colors"
											>
												<UserMinus className="w-3.5 h-3.5 mr-2 opacity-70 group-hover:opacity-100" />
												Remove Current Assignment
											</CommandItem>
										)}

										{/* Staff List */}
										{availableStaff.map((staff) => (
											<CommandItem
												key={staff.id}
												value={`${staff.firstName} ${staff.lastName}`}
												onSelect={() => handleAssign(staff)}
												className="flex items-center justify-between py-2.5 px-3 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 rounded-xl my-0.5 group"
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
														<span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 truncate">{staff.jobTitle || "Technician"}</span>
													</div>
												</div>
												{currentStaffId === staff.id && <Check className="w-4 h-4 text-primary animate-in zoom-in shrink-0 ml-3" />}
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
