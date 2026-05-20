"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format, isBefore, startOfDay } from "date-fns";
import { AlertTriangle, CheckCircle2, Clock, DownloadCloud, FileText, XCircle, PieChart, ChevronRight, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClinicInvoiceListDTO } from "@/schema/composed/clinics/clinic-pricings";

// Assume you export these from your schema/dtos
export type InvoiceStatus = "DRAFT" | "SENT" | "PARTIAL" | "PAID" | "OVERDUE" | "CANCELLED";

const INVOICE_STATUS_CONFIG: Record<InvoiceStatus, { label: string; icon: LucideIcon; colorClass: string }> = {
	PAID: { label: "Paid", icon: CheckCircle2, colorClass: "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10" },
	OVERDUE: { label: "Overdue", icon: AlertTriangle, colorClass: "text-rose-600 dark:text-rose-400 border-rose-500/20 bg-rose-500/10" },
	PARTIAL: { label: "Partial", icon: PieChart, colorClass: "text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-500/10" },
	SENT: { label: "Sent / Pending", icon: Clock, colorClass: "text-amber-600 dark:text-amber-500 border-amber-500/20 bg-amber-500/10" },
	DRAFT: { label: "Draft", icon: FileText, colorClass: "text-slate-600 dark:text-slate-400 border-border bg-slate-100 dark:bg-white/5" },
	CANCELLED: { label: "Cancelled", icon: XCircle, colorClass: "text-muted-foreground border-border bg-transparent" },
};

export const clinicInvoiceColumns: ColumnDef<ClinicInvoiceListDTO>[] = [
	{
		accessorKey: "invoiceNumber",
		header: "Invoice ID",
		cell: ({ row }) => (
			<span className="font-mono font-bold text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer underline-offset-4 group-hover:underline">
				{row.original.invoiceNumber}
			</span>
		),
	},
	{
		accessorKey: "issuedAt",
		header: "Date Issued",
		cell: ({ row }) => {
			const date = row.original.issuedAt;
			return <span className="text-xs font-bold text-muted-foreground">{date ? format(new Date(date), "MMM dd, yyyy") : "--"}</span>;
		},
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const date = row.original.dueDate;
			const status = row.original.status;
			const isLate = status === "OVERDUE" || (date && isBefore(new Date(date), startOfDay(new Date())) && status !== "PAID" && status !== "CANCELLED");

			return <span className={cn("text-xs font-mono font-bold", isLate ? "text-rose-500" : "text-foreground")}>{date ? format(new Date(date), "MMM dd, yyyy") : "--"}</span>;
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			const config = INVOICE_STATUS_CONFIG[status] || INVOICE_STATUS_CONFIG["DRAFT"];
			const Icon = config.icon;
			return (
				<div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-bold uppercase tracking-widest", config.colorClass)}>
					<Icon className="w-3 h-3" /> {config.label}
				</div>
			);
		},
	},
	{
		accessorKey: "total",
		header: () => <div className="text-right">Total Amount</div>,
		cell: ({ row }) => <div className="text-right font-mono font-bold text-sm text-muted-foreground">${Number(row.original.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>,
	},
	{
		accessorKey: "amountDue",
		header: () => <div className="text-right">Balance Due</div>,
		cell: ({ row }) => {
			const due = Number(row.original.amountDue);
			return (
				<div className={cn("text-right font-mono font-bold text-sm", due > 0 ? "text-amber-600 dark:text-amber-500" : "text-emerald-600 dark:text-emerald-500")}>
					${due.toLocaleString(undefined, { minimumFractionDigits: 2 })}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: () => (
			<div className="flex items-center justify-end gap-2 pr-2">
				<Button
					title="Download PDF"
					variant="ghost"
					size="icon"
					className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
					onClick={(e) => {
						e.stopPropagation();
						// Handle PDF Download
					}}
				>
					<DownloadCloud className="w-4 h-4" />
				</Button>
				<div className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-all">
					<ChevronRight className="w-4 h-4" />
				</div>
			</div>
		),
	},
];
