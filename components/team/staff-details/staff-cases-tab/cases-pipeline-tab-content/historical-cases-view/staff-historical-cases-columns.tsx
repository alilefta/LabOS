// components/team/team-details/cases-tab/staff-historical-cases-columns.tsx

"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { PackageCheck, Truck, ShieldAlert, History, MoreHorizontal, FileText, DownloadCloud, LucideIcon } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaseStatus } from "@/schema/base/enums.base";
import { StaffHistoricalCaseDTO } from "@/schema/composed/team/staff-historical-cases.dtos";
import { sanitizeDentistName } from "@/lib/formatters/names-formatters";

// --- HISTORICAL STATUS CONFIG ---
const HISTORICAL_STATUS_CONFIG: Partial<Record<CaseStatus, { label: string; icon: LucideIcon; colorClass: string }>> = {
	COMPLETED: {
		label: "Completed",
		icon: PackageCheck,
		colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
	},
	DELIVERED: {
		label: "Delivered",
		icon: Truck,
		colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
	},
	FAILED: {
		label: "Failed",
		icon: ShieldAlert,
		colorClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
	},
};

export const staffHistoricalCasesColumns: ColumnDef<StaffHistoricalCaseDTO>[] = [
	{
		accessorKey: "caseNumber",
		header: "Case ID",
		cell: ({ row }) => {
			const { caseNumber, isRemake } = row.original;
			return (
				<div className="flex items-center gap-2">
					<span className="font-mono font-bold text-sm text-foreground hover:text-primary transition-colors">#{caseNumber}</span>
					{isRemake && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<div className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px] font-black text-amber-600 uppercase tracking-tighter">Remake</div>
								</TooltipTrigger>
								<TooltipContent className="glass-ai-panel p-2 text-[10px] font-bold border-border">This is a non-billable replacement case</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "resolvedDate",
		header: "Resolution Date",
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5">
				<span className="text-xs font-bold text-foreground">{format(new Date(row.original.resolvedDate), "MMM dd, yyyy")}</span>
				<span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Resolved</span>
			</div>
		),
	},
	{
		accessorKey: "patientName",
		header: "Patient & Clinic",
		cell: ({ row }) => {
			const { patientName, dentistName, clinicName } = row.original;
			return (
				<div className="flex flex-col gap-0.5 max-w-55">
					<span className="font-bold text-sm text-foreground truncate">{patientName}</span>
					<span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider truncate">
						{clinicName} {dentistName ? `• ${sanitizeDentistName(dentistName)}` : ""}
					</span>
				</div>
			);
		},
	},
	{
		id: "workSummary",
		header: "Clinical Prescription",
		cell: ({ row }) => {
			const items = row.original.workItems;
			const firstItem = items[0];
			const extraCount = items.length - 1;

			if (!firstItem) return <span className="text-muted-foreground text-xs italic">No items mapped</span>;

			return (
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-border shadow-sm group-hover:border-primary/30 transition-colors">
						<span
							className={cn(
								"text-[9px] font-black px-1 rounded uppercase tracking-tighter",
								firstItem.jawType === "UPPER" ? "text-blue-500 bg-blue-500/5" : "text-rose-500 bg-rose-500/5",
							)}
						>
							{firstItem.jawType}
						</span>
						<span className="text-xs font-bold text-foreground truncate max-w-30">{firstItem.productName}</span>
						<span className="text-[10px] font-mono font-bold text-muted-foreground">({firstItem.teethCount}U)</span>
					</div>

					{extraCount > 0 && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div className="h-6 px-2 rounded-md border border-dashed border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:border-primary hover:text-primary cursor-help transition-colors">
										+{extraCount} more
									</div>
								</TooltipTrigger>
								<TooltipContent className="glass-ai-panel p-3 border-border shadow-2xl z-50">
									<div className="space-y-2">
										<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border pb-1">Additional Items</p>
										{items.slice(1).map((item, i) => (
											<div key={i} className="flex items-center gap-3 text-xs font-medium">
												<span className="font-mono text-primary w-10">{item.jawType}</span>
												<span className="text-foreground truncate max-w-30">{item.productName}</span>
												<span className="text-muted-foreground">({item.teethCount} Units)</span>
											</div>
										))}
									</div>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Outcome",
		cell: ({ row }) => {
			const status = row.getValue("status") as CaseStatus;
			const config = HISTORICAL_STATUS_CONFIG[status] || { label: status, icon: History, colorClass: "bg-slate-100 text-slate-500" };
			const Icon = config.icon;

			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest transition-all", config.colorClass)}>
								<Icon className="w-3 h-3" />
								{config.label}
							</div>
						</TooltipTrigger>
						{status === "FAILED" && row.original.failureReason && (
							<TooltipContent side="top" className="bg-rose-600 text-white border-none p-3 shadow-xl max-w-xs">
								<p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Reason for Failure</p>
								<p className="text-xs font-bold leading-relaxed">{row.original.failureReason}</p>
							</TooltipContent>
						)}
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
	{
		accessorKey: "grandTotal",
		header: () => <div className="text-right">Revenue</div>,
		cell: ({ row }) => {
			const amount = row.getValue("grandTotal") as number | null;
			if (amount === null) return <div className="text-right text-muted-foreground">-</div>;

			return <div className="text-right font-mono font-bold text-sm text-foreground">${amount.toFixed(2)}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <ActionCell rowData={row.original} />,
	},
];

// ── 3. MEMOIZED DEDICATED ACTION CELL ─────────────────────────────────────────
const ActionCell = memo(function ActionCell({ rowData }: { rowData: StaffHistoricalCaseDTO }) {
	const router = useRouter();

	const handleNavigate = useCallback(() => {
		router.push(`/cases/${rowData.id}`);
	}, [rowData.id, router]);

	return (
		<div className="text-right" onClick={(e) => e.stopPropagation()}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]">
					<DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase tracking-widest">Historical Audit</DropdownMenuLabel>

					{/* Navigation Action */}
					<DropdownMenuItem onClick={handleNavigate} className="cursor-pointer font-medium py-2 hover:bg-primary/5">
						<FileText className="w-4 h-4 mr-2 text-muted-foreground" /> View Full Dossier
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-border" />

					{/* Archive Action */}
					<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5 text-primary focus:text-primary focus:bg-primary/10">
						<DownloadCloud className="w-4 h-4 mr-2" /> Download Statement
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
});
ActionCell.displayName = "ActionCell";
