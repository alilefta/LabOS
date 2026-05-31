// components/team/team-details/settings-tab/staff-settings-tab-content.tsx

"use client";

import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LabRole } from "@/schema/base/enums.base";

// Import your 4 highly optimized setting cards
import { StaffIdentityCard } from "./staff-identity-card";
import { StaffScheduleCard } from "./staff-schedule-card";
import { StaffSecurityCard } from "./staff-security-card";
import { StaffCompensationCard } from "./staff-compensation-card";
import { usePermissions } from "@/providers/permissions-provider";

// Data Access
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { getStaffDataDossierAction } from "@/actions/team/get-staff-dossier-action";

interface Props {
	staffId: string;
	currentUserRole: LabRole;
}

export function StaffSettingsTabContent({ staffId, currentUserRole }: Props) {
	const { canViewFinancials } = usePermissions();

	// ── 1. HIGH-PERFORMANCE DATA FETCH (SUSPENDED) ────────────────────
	// useSuspenseQuery suspends the render and triggers the server-rendered
	// skeleton until the database returns the DTO [1].
	const { data: staff } = useSuspenseQuery({
		queryKey: ["staff-details", staffId],
		queryFn: async () => {
			// 🔥 CORRECTED: Execute the Server Action as a secure network fetch
			const res = await getStaffDataDossierAction({ staffId });

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				throw new Error("Failed to load staff details");
			}
			return res.data?.staff || null;
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 mins
	});

	if (!staff) return null;

	// ── 2. MAP DATA TO SPECIFIC CARD SCHEMAS ────────────────────────────
	const identityData = useMemo(
		() => ({
			staffId: staff.id,
			firstName: staff.firstName,
			lastName: staff.lastName,
			phoneNumber: staff.phoneNumber,
			jobTitle: staff.jobTitle,
			specialization: staff.specialization,
			roleCategory: staff.roleCategory,
			isActive: staff.isActive,
		}),
		[staff],
	);

	const compensationData = useMemo(
		() => ({
			staffId: staff.id,
			commissionType: staff.commissionType,
			commissionValue: staff.commissionValue,
		}),
		[staff],
	);

	// Fetch working days directly from our new schema field [3]
	const workingDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]; // it should be inserted in the db

	return (
		// strictly aligned to your 2000px layout grids
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* ── COLUMN 1: THE OPERATIONAL WORKER (Left) ── */}
			<div className="flex flex-col gap-6 h-fit">
				<StaffIdentityCard initialData={identityData} />
				<StaffScheduleCard staffId={staff.id} initialWorkingDays={workingDays} />
			</div>

			{/* ── COLUMN 2: THE SYSTEM & FINANCE (Right) ── */}
			<div className="flex flex-col gap-6 h-fit">
				{/* The IT software license manager */}
				<StaffSecurityCard initialData={staff} currentUserRole={currentUserRole} />

				{/* 
					Role-Guarded Compensation block. 
					If a standard technician is editing their own settings, 
					this card is completely removed from the DOM.
				*/}
				{canViewFinancials && <StaffCompensationCard initialData={compensationData} />}
			</div>
		</div>
	);
}
