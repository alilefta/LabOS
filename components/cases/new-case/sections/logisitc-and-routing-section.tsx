"use client";

import { Controller, useFormContext } from "react-hook-form";
import { UserCog, Briefcase } from "lucide-react";

import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { CreateCaseInput } from "@/schema/composed/case.details";
import { DeadlineSelector } from "../../case/case-inputs/deadline-selector";
import { TechnicianSelector } from "../../case/case-inputs/technician-selector";
import { SalesRepSelector } from "../../case/case-inputs/sales-rep-selector";

// // Dummy Selectors (You can swap these with your TanStack Command Selectors later)
// import { TechnicianSelector } from "../../case/case-inputs/technician-selector";
// import { SalesRepSelector } from "../../case/case-inputs/sales-rep-selector";

interface Props {
	onOpenTechnicianSheet: () => void;
	onOpenSalesRepSheet: () => void;
	newCreatedTechnician: any | null;
	newCreatedSalesRep: any | null;
}

export function LogisticsAndRoutingSection({ onOpenTechnicianSheet, onOpenSalesRepSheet, newCreatedTechnician, newCreatedSalesRep }: Props) {
	const form = useFormContext<CreateCaseInput>();

	return (
		<section className="space-y-6">
			<div className="flex items-center gap-3">
				<div className="w-1.5 h-6 bg-primary rounded-full" />
				<h2 className="text-xl font-bold tracking-tight">Logistics & Routing</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* 1. DEADLINE SELECTOR */}
				<div className="lg:col-span-1">
					<Controller control={form.control} name="deadline" render={({ field, fieldState }) => <DeadlineSelector value={field.value} onChange={field.onChange} fieldState={fieldState} />} />
				</div>

				{/* 2. TECHNICIAN SELECTOR */}
				<div className="lg:col-span-1">
					<Controller
						control={form.control}
						name="technicianId"
						render={({ field }) => <TechnicianSelector value={field.value} onSelect={field.onChange} onCreateNew={onOpenTechnicianSheet} newCreatedTechnician={newCreatedTechnician} />}
					/>
				</div>

				{/* 3. SALES REP SELECTOR */}
				<div className="lg:col-span-1">
					<Controller
						control={form.control}
						name="salesRepsId"
						render={({ field }) => <SalesRepSelector value={field.value} onSelect={field.onChange} onCreateNew={onOpenSalesRepSheet} newCreatedSalesRep={newCreatedSalesRep} />}
					/>
				</div>
			</div>
		</section>
	);
}
