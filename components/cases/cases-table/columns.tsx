"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, differenceInDays, startOfDay } from "date-fns";
import { MoreHorizontal, ShieldCheck, Activity, PackageCheck, Truck, Clock, AlertCircle, FileCheck, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// --- TYPES (Replace with your actual Prisma Return Type) ---
export type CaseListDTO = {
	id: string;
	caseNumber: string;
	status: "NEW" | "ASSIGNED" | "PROCESSING" | "QC" | "COMPLETED" | "DELIVERED" | "DRAFT";
	deadline: Date;
	patientName: string;
	clinicName: string;
	primaryProduct: string;
	technician: { firstName: string; lastName: string; avatarUrl: string | null } | null;
};

// --- STATUS BADGE CONFIGURATION ---
const STATUS_CONFIG: Record<CaseListDTO["status"], { label: string; icon: any; colorClass: string }> = {
	NEW: { label: "Intake", icon: FileCheck, colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
	ASSIGNED: { label: "Assigned", icon: User, colorClass: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border-border" },
	PROCESSING: { label: "Milling", icon: Activity, colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20" },
	QC: { label: "QC Check", icon: ShieldCheck, colorClass: "bg-ai/10 text-ai border-ai/20" },
	COMPLETED: { label: "Completed", icon: PackageCheck, colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
	DELIVERED: { label: "Delivered", icon: Truck, colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 opacity-50" },
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

			return (
				<div className="flex flex-col gap-0.5 max-w-[200px]">
					<span className="font-bold text-sm text-foreground truncate">{patientName}</span>
					<span className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">{clinicName}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "primaryProduct",
		header: "Primary Product",
		cell: ({ row }) => {
			const product = row.getValue("primaryProduct") as string;
			return <div className="text-xs font-medium text-slate-600 dark:text-zinc-300 max-w-[150px] truncate">{product || "N/A"}</div>;
		},
	},
	{
		accessorKey: "deadline",
		header: "Target Deadline",
		cell: ({ row }) => {
			const deadline = row.getValue("deadline") as Date;
			if (!deadline) return <div className="text-xs text-muted-foreground">Unscheduled</div>;

			const today = new Date();
			const daysUntil = differenceInDays(startOfDay(deadline), startOfDay(today));

			const isOverdue = daysUntil < 0;
			const isRush = daysUntil >= 0 && daysUntil <= 2;

			return (
				<div className="flex flex-col gap-1">
					<span className={cn("text-xs font-bold", isOverdue ? "text-destructive" : isRush ? "text-amber-600 dark:text-amber-500" : "text-foreground")}>
						{format(deadline, "MMM dd, yyyy")}
					</span>
					{/* Smart contextual badges based on the date difference */}
					{isOverdue ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-destructive animate-pulse">
							<AlertCircle className="w-3 h-3" /> {Math.abs(daysUntil)} Days Overdue
						</span>
					) : isRush ? (
						<span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
							<Clock className="w-3 h-3" /> Due in {daysUntil === 0 ? "Today" : `${daysUntil} Days`}
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
			const status = row.getValue("status") as CaseListDTO["status"];
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
		accessorKey: "technician",
		header: "Lead Tech",
		cell: ({ row }) => {
			const tech = row.original.technician;

			if (!tech) {
				return <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">Unassigned</span>;
			}

			return (
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6 border border-border">
						{tech.avatarUrl && <AvatarImage src={tech.avatarUrl} />}
						<AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold">
							{tech.firstName[0]}
							{tech.lastName[0]}
						</AvatarFallback>
					</Avatar>
					<span className="text-xs font-semibold text-foreground truncate max-w-[100px]">
						{tech.firstName} {tech.lastName}
					</span>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const caseId = row.original.id;

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
							<DropdownMenuItem className="cursor-pointer font-medium py-2">View Dossier</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer font-medium py-2">Assign Technician</DropdownMenuItem>
							<DropdownMenuSeparator className="bg-border" />
							<DropdownMenuItem className="cursor-pointer font-medium py-2 text-primary focus:text-primary focus:bg-primary/10">Print Work Ticket</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
