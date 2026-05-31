// components/team/team-details/payroll-tab/staff-payroll-tab-content.tsx

"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Schemas & DTOs
import { StaffPayrollVitalsDTO, GetPendingCommissionsResultDTO } from "@/schema/composed/team/payroll-ledger.dtos";

// Actions (Query Functions)
import { handleSafeActionError } from "@/lib/safe-action-helpers";

// S2 Components
import { StaffCompensationVitals } from "./staff-compensation-vitals";
import { PendingCommissionsQueue } from "./pending-commissions-queue";
import { getStaffPayrollVitalsAction } from "@/actions/team/finanical-ledger/get-staff-payroll-vitals-action";
import { getPendingCommissionsAction } from "@/actions/team/finanical-ledger/get-pending-comission-action";
import dynamic from "next/dynamic";
import { PayrollLedgerTable } from "./payroll-ledger-table";
import { usePermissions } from "@/providers/permissions-provider";

interface Props {
	staffId: string;
}

const RecordPayoutSheet = dynamic(() => import("../../../../modals/team/record-payout-sheet").then((cm) => cm.RecordPayoutSheet), { ssr: false });

export function StaffPayrollTabContent({ staffId }: Props) {
	// ── 1. STATE FOR SPRINT 3'S RECONCILIATION SHEET ───────────────────
	const [isPayoutSheetOpen, setIsPayoutSheetOpen] = useState(false);

	const { canViewCommissions } = usePermissions();

	// ── 2. DATA HYDRATION HOOKS (0ms Load Time) ────────────────────────
	// Query 1: Fetch Financial Vitals
	const { data: vitals } = useQuery({
		queryKey: ["staff-payroll-vitals", staffId],
		queryFn: async () => {
			const res = await getStaffPayrollVitalsAction({ staffId });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res?.data as StaffPayrollVitalsDTO) || null;
		},
		staleTime: 1000 * 60 * 5,
	});

	// Query 2: Fetch Pending Cases list
	const { data: queue } = useQuery({
		queryKey: ["pending-commissions", staffId],
		queryFn: async () => {
			const res = await getPendingCommissionsAction({ staffId });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return (res?.data as GetPendingCommissionsResultDTO) || null;
		},
		staleTime: 1000 * 60 * 5,
	});

	const staffName = useMemo(() => {
		if (!vitals) return "N/A";
		return vitals.firstName + " " + vitals.lastName;
	}, [vitals]);

	// Safety Fallback (Actual skeletons are rendered by the Server Suspense boundary)
	if (!vitals || !queue || !canViewCommissions) return null;

	return (
		<div className="flex flex-col gap-6">
			{/* ZONE A: The Financial Vitals Bento Grid */}
			<StaffCompensationVitals vitals={vitals} />

			{/* ZONE B: The Pending Unbilled Ledger Queue */}
			<PendingCommissionsQueue
				pendingCommissions={queue.pendingCommissions}
				onPayClick={() => setIsPayoutSheetOpen(true)} // Opens Sprint 3 Modal
			/>

			<PayrollLedgerTable staffId={staffId} />

			{/* --- SPRINT 3: RECORD PAYOUT SHEET (Commented out for now) --- */}
			{/* 
                We will mount this sheet right here. 
                It will receive the exact queue array and totals to perform
                the final transaction handshake.
            */}

			<RecordPayoutSheet isOpen={isPayoutSheetOpen} onClose={() => setIsPayoutSheetOpen(false)} staffId={staffId} pendingCases={queue.pendingCommissions} staffName={staffName} />
		</div>
	);
}
