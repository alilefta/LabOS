"use client";

import { Controller, useFormContext } from "react-hook-form";
import { UserCog, Briefcase } from "lucide-react";

import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { DeadlineSelector } from "../../case/case-inputs/deadline-selector";
// import { TechnicianSelector } from "../../case/case-inputs/technician-selector";
// import { SalesRepSelector } from "../../case/case-inputs/sales-rep-selector";
import { InitialStaffAssigner } from "../../case/case-inputs/initial-staff-assigner";
import { LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";

interface Props {
	onOpenRegisterMemberSheet: () => void;
	newRegisteredStaffMember: LabStaffDetailsUI | null;
}

export function LogisticsAndRoutingSection({ newRegisteredStaffMember, onOpenRegisterMemberSheet }: Props) {
	const form = useFormContext<CreateCaseInput>();

	return (
		<section className="space-y-6 animate-in fade-in duration-500">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Logistics & Routing</h2>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* 1. DEADLINE SELECTOR (1 Column) */}
				<div className="lg:col-span-1 flex flex-col gap-2">
					{/* We use Controller here because Date is a primitive value */}
					<Controller control={form.control} name="deadline" render={({ field, fieldState }) => <DeadlineSelector value={field.value} onChange={field.onChange} fieldState={fieldState} />} />
				</div>

				{/* 2. INITIAL STAFF ASSIGNMENTS (2 Columns) */}
				<div className="lg:col-span-2">
					<InitialStaffAssigner onOpenRegisterMemberSheet={onOpenRegisterMemberSheet} newRegisteredStaffMember={newRegisteredStaffMember} />
				</div>
			</div>
		</section>
	);
}
