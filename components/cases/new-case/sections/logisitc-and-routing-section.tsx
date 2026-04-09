"use client";

import { Controller, useFormContext } from "react-hook-form";

import { CreateCaseInput } from "@/schema/composed/case.details";
import { DeadlineSelector } from "../../case/case-inputs/deadline-selector";
import { InitialStaffAssigner } from "../../case/case-inputs/initial-staff-assigner";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { useCallback } from "react";
import { StaffRoleCategory } from "@/schema/base/enums.base";

interface Props {
	handleOpenRegisterLabStaffSheet: (requiredStaffRoles: StaffRoleCategory[]) => void;
	newRegisteredStaffMember: LabStaffDetailsUI | null;
}

export function LogisticsAndRoutingSection({ newRegisteredStaffMember, handleOpenRegisterLabStaffSheet }: Props) {
	const form = useFormContext<CreateCaseInput>();

	const handleDeadlineSelect = useCallback(
		(deadline: Date | undefined) => {
			if (deadline) form.setValue("deadline", deadline, { shouldValidate: true });
		},
		[form],
	);

	return (
		<section className="space-y-6 animate-in fade-in duration-500">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Logistics & Routing</h2>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-1">
				{/* 1. DEADLINE SELECTOR (1 Column) */}
				<div className="lg:col-span-1 flex flex-col gap-2">
					{/* We use Controller here because Date is a primitive value */}
					<Controller
						control={form.control}
						name="deadline"
						render={({ field, fieldState }) => <DeadlineSelector value={field.value} onChange={handleDeadlineSelect} fieldState={fieldState} />}
					/>
				</div>

				{/* 2. INITIAL STAFF ASSIGNMENTS (2 Columns) */}
				<div className="lg:col-span-2">
					<InitialStaffAssigner onOpenRegisterMemberSheet={handleOpenRegisterLabStaffSheet} newRegisteredStaffMember={newRegisteredStaffMember} />
				</div>
			</div>
		</section>
	);
}
