"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, differenceInDays, startOfDay } from "date-fns";
import { MoreHorizontal, Activity, PackageCheck, Truck, Clock, AlertCircle, FileCheck, User, Users, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CaseStatus } from "@/schema/base/enums.base"; // Assuming this is where your enum lives
import { CaseListDTO } from "@/schema/composed/case.details";

// --- TYPES (Matching your updated backend DTO exactly) ---
// export type CaseListDTO = {
// 	id: string;
// 	caseNumber: string;
// 	status: CaseStatus;
// 	deadline: Date | null;
// 	grandTotal: number | null;
// 	patientName: string;
// 	clinicName: string | null;
// 	dentistName: string | null;
// 	caseCategory: string | null;
// 	primaryProduct: string | null;
// 	leadTechnician: {
// 		id: string;
// 		firstName: string;
// 		lastName: string;
// 		avatarUrl: string | null;
// 	} | null;
// 	staffCount: number;
// };

// --- STATUS BADGE CONFIGURATION (Fixed for Prisma Enum) ---
const STATUS_CONFIG: Record<CaseStatus, { label: string; icon: LucideIcon; colorClass: string }> = {
	NEW: { label: "Intake", icon: FileCheck, colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
	ASSIGNED: { label: "Assigned", icon: User, colorClass: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border-border" },
	PROCESSING: { label: "Milling", icon: Activity, colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" },
	COMPLETED: { label: "Completed", icon: PackageCheck, colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
	DELIVERED: { label: "Delivered", icon: Truck, colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 opacity-60" },
	FAILED: { label: "Failed", icon: AlertCircle, colorClass: "bg-destructive/10 text-destructive border-destructive/20" },
	DRAFT: { label: "Draft", icon: Clock, colorClass: "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border border-dashed" },
};

export const columns: ColumnDef<CaseListDTO>[] = [
	{
		accessorKey: "caseNumber",
		header: "Case ID",
		cell: ({ row }) => {
			const caseNumber = row.getValue("caseNumber") as string;
			return <div className="font-mono font-bold text-sm text-foreground hover:text-primary cursor-pointer transition-colors w-24 truncate">{caseNumber}</div>;
		},
	},
	{
		accessorKey: "patientName",
		header: "Patient & Clinic",
		cell: ({ row }) => {
			const patientName = row.getValue("patientName") as string;
			const clinicName = row.original.clinicName;
			const dentistName = row.original.dentistName;

			return (
				<div className="flex flex-col gap-0.5 max-w-[200px]">
					<span className="font-bold text-sm text-foreground truncate">{patientName}</span>
					<span className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">
						{clinicName || "Unknown Clinic"} {dentistName ? `• ${dentistName}` : ""}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "primaryProduct",
		header: "Primary Product",
		cell: ({ row }) => {
			const product = row.getValue("primaryProduct") as string | null;
			const category = row.original.caseCategory;

			return (
				<div className="flex flex-col gap-0.5 max-w-[180px]">
					<span className="text-xs font-bold text-foreground truncate">{product || "No items mapped"}</span>
					<span className="text-[10px] text-primary/80 dark:text-primary/60 font-medium uppercase tracking-widest truncate">{category || "Uncategorized"}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "deadline",
		header: "Target Deadline",
		cell: ({ row }) => {
			const deadline = row.getValue("deadline") as Date | null;
			if (!deadline) return <div className="text-xs font-bold text-muted-foreground italic">Unscheduled</div>;

			const today = startOfDay(new Date());
			const deadlineDate = startOfDay(deadline);
			const daysUntil = differenceInDays(deadlineDate, today);

			const isOverdue = daysUntil < 0;
			const isDueToday = daysUntil === 0;
			const isRush = daysUntil > 0 && daysUntil <= 2;

			// If the case is already delivered or completed, we shouldn't flash red/amber warnings!
			const isTerminal = row.original.status === "COMPLETED" || row.original.status === "DELIVERED" || row.original.status === "FAILED";

			return (
				<div className="flex flex-col gap-1">
					<span
						className={cn(
							"text-xs font-bold",
							isTerminal ? "text-muted-foreground" : isOverdue ? "text-destructive" : isDueToday || isRush ? "text-amber-600 dark:text-amber-500" : "text-foreground",
						)}
					>
						{format(deadline, "MMM dd, yyyy")}
					</span>

					{/* Smart Contextual Badges */}
					{!isTerminal && isOverdue ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-destructive animate-pulse">
							<AlertCircle className="w-3 h-3" /> {Math.abs(daysUntil)} Days Overdue
						</span>
					) : !isTerminal && isDueToday ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 animate-pulse">
							<Clock className="w-3 h-3" /> Due Today
						</span>
					) : !isTerminal && isRush ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
							<Clock className="w-3 h-3" /> Due in {daysUntil} Days
						</span>
					) : null}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Production Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as CaseStatus;
			const config = STATUS_CONFIG[status] || STATUS_CONFIG["NEW"];
			const Icon = config.icon;

			return (
				<div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest", config.colorClass)}>
					<Icon className="w-3 h-3" />
					{config.label}
				</div>
			);
		},
	},
	{
		accessorKey: "leadTechnician",
		header: "Production Team",
		cell: ({ row }) => {
			const tech = row.original.leadTechnician;
			const totalStaff = row.original.staffCount;

			if (!tech) {
				return <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">Unassigned</span>;
			}

			// Calculate additional staff (e.g., Courier, QC Inspector)
			const extraStaff = totalStaff > 1 ? totalStaff - 1 : 0;

			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-7 w-7 border border-border shadow-sm">
						{tech.avatarUrl && <AvatarImage src={tech.avatarUrl} />}
						<AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
							{tech.firstName[0]}
							{tech.lastName[0]}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col max-w-[120px]">
						<span className="text-xs font-semibold text-foreground truncate">
							{tech.firstName} {tech.lastName}
						</span>
						{extraStaff > 0 && (
							<span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 mt-0.5">
								<Users className="w-2.5 h-2.5" /> +{extraStaff} Assigned
							</span>
						)}
					</div>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			// const caseId = row.original.id;

			return (
				<div className="text-right">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]">
							<DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-widest">Actions</DropdownMenuLabel>
							<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5">View Dossier</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer font-medium py-2 hover:bg-primary/5">Assign Technician</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem className="cursor-pointer font-medium py-2 text-primary focus:text-primary focus:bg-primary/10">Print Work Ticket</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
