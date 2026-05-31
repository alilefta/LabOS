// components/team/team-details/payroll-tab/payroll-ledger-columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckCircle2, Printer, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { StaffPayoutHistoryItemDTO } from "@/schema/composed/team/payroll-history.dtos";

const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

// ── THE GENERATOR PATTERN ───────────────────────────────────────────────────
// This allows the table columns to dynamically generate the correct print
// link unique to this specific technician [1].
export const getPayrollLedgerColumns = (staffId: string): ColumnDef<StaffPayoutHistoryItemDTO>[] => [
	{
		accessorKey: "payoutDate",
		header: "Payout date",
		cell: ({ row }) => {
			const date = row.original.payoutDate;
			return (
				<div className="flex items-center gap-3">
					<Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
					<span className="font-mono font-bold text-sm text-foreground">{format(new Date(date), "yyyy-MM-dd")}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "casesCount",
		header: "Cases included",
		cell: ({ row }) => {
			const count = row.getValue("casesCount") as number;
			return (
				<span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
					{count} {count === 1 ? "Case" : "Cases"}
				</span>
			);
		},
	},
	{
		accessorKey: "totalPaid",
		header: "Total paid",
		cell: ({ row }) => {
			const total = row.getValue("totalPaid") as number;
			return <div className="flex items-center gap-1 font-mono font-bold text-sm text-emerald-600 dark:text-emerald-500">{formatMoney(total)}</div>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: () => {
			return (
				<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
					<CheckCircle2 className="w-3.5 h-3.5" />
					Settled
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const dateKey = row.original.id; // YYYY-MM-DD

			return (
				<div className="text-right pr-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={(e) => {
									e.stopPropagation();
									// 2. Open the printable statement in a new tab (Sprint 5) [4]
									window.open(`/paystub/${staffId}/${dateKey}`, "_blank");
								}}
								className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
							>
								<Printer className="h-4 w-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="glass-ai-panel border-border shadow-2xl z-50">
							<p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Accounts Payable</p>
							<p className="text-xs font-bold text-foreground">Print official paystub</p>
						</TooltipContent>
					</Tooltip>
				</div>
			);
		},
	},
];
