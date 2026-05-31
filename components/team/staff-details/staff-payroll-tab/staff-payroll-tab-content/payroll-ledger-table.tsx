"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { History, Wallet } from "lucide-react";

// Components & DTOs
import { DataTable } from "@/components/shared/tables/data-table"; // Re-uses your virtualized table!
import { getPayrollLedgerColumns } from "./payroll-ledger-columns";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { getStaffPayoutHistoryAction } from "@/actions/team/finanical-ledger/get-payout-history";

interface Props {
	staffId: string;
}

export function PayrollLedgerTable({ staffId }: Props) {
	// ── 1. FETCH PAYOUT HISTORY (Client-Side Cached) ───────────────────
	const { data, isLoading } = useQuery({
		queryKey: ["staff-payout-history", staffId],
		queryFn: async () => {
			const res = await getStaffPayoutHistoryAction({ staffId });
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
			}
			return res?.data ?? { payouts: [], totalCount: 0 };
		},
		staleTime: 1000 * 60 * 5,
	});

	const payouts = data?.payouts || [];
	const totalCount = data?.totalCount || 0;

	// ── 2. MEMOIZE THE COLUMNS ARRAY ───────────────────────────────────
	// Prevents columns from re-instantiating and breaking table rendering on updates
	const columns = useMemo(() => {
		return getPayrollLedgerColumns(staffId);
	}, [staffId]);

	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden min-h-80 transition-all duration-300">
			{/* --- THE TOOLBAR --- */}
			<div className="p-4 sm:p-5 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center justify-between shrink-0">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm">
						<History className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-sm font-bold text-foreground">Payout History</h3>
						<p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-medium">{totalCount} Settled Paystubs</p>
					</div>
				</div>
			</div>

			{/* --- THE VIRTUALIZED TABLE --- */}
			<div className="flex-1 min-h-62.5 relative">
				<DataTable
					columns={columns}
					data={payouts}
					isLoading={isLoading}
					minHeight={250}
					emptyState={{
						title: "No Payout History",
						description: "No historical paystubs found. Log an initial payout in the queue above to start the ledger.",
						icon: <Wallet className="w-5 h-5 text-slate-400" />,
					}}
				/>
			</div>
		</div>
	);
}
