"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
	AlertTriangle,
	CheckCircle2,
	Clock,
	FileText,
	Send,
	CreditCard,
	DownloadCloud,
	MessageCircle, // Using this for WhatsApp
	X,
	LucideIcon,
	Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { InvoiceStatus } from "@/schema/base/enums.base";
import { InvoiceListDTO } from "@/schema/composed/invoices/invoices.dtos";
import { useInvoiceUiStore } from "@/store/invoices/use-invoice-ui-store";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";

// --- STATUS UI DICTIONARY ---
const INVOICE_STATUS_UI: Record<InvoiceStatus, { label: string; icon: LucideIcon; color: string }> = {
	DRAFT: { label: "Draft", icon: FileText, color: "bg-slate-100 dark:bg-white/5 text-slate-500 border-border" },
	SENT: { label: "Sent", icon: Send, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
	PARTIAL: { label: "Partial", icon: Clock, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
	PAID: { label: "Paid", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
	OVERDUE: { label: "Overdue", icon: AlertTriangle, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
	CANCELLED: { label: "Void", icon: X, color: "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border opacity-50" },
};

// Helper for formatting currency
const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

export const invoiceColumns: ColumnDef<InvoiceListDTO>[] = [
	{
		accessorKey: "invoiceNumber",
		header: "Invoice #",
		cell: ({ row }) => (
			<span className="font-mono font-bold text-sm text-foreground group-hover:text-primary transition-colors cursor-pointer group-hover:underline underline-offset-4">
				{row.original.invoiceNumber}
			</span>
		),
	},
	{
		accessorKey: "clinicName",
		header: "Clinic Partner",
		cell: ({ row }) => (
			<div className="flex flex-col gap-0.5 max-w-62.5">
				<span className="font-bold text-sm text-foreground truncate">{row.original.clinicName}</span>
				<span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium flex items-center gap-1.5">
					{/* Show Issued Date as context under the clinic name */}
					Issued: {row.original.issuedAt ? format(new Date(row.original.issuedAt), "MMM dd, yyyy") : "Pending"}
				</span>
			</div>
		),
	},
	{
		accessorKey: "dueDate",
		header: "Due Date",
		cell: ({ row }) => {
			const date = row.original.dueDate;
			if (!date) return <span className="text-muted-foreground italic text-[11px] font-medium uppercase tracking-widest">On Receipt</span>;

			const isOverdue = row.original.isOverdue && row.original.status !== "PAID";

			return <span className={cn("text-xs font-bold", isOverdue ? "text-rose-600 dark:text-rose-500 animate-pulse" : "text-foreground")}>{format(new Date(date), "MMM dd, yyyy")}</span>;
		},
	},
	{
		id: "paymentProgress",
		header: "Payment Status",
		cell: ({ row }) => {
			const { status, progressPct, isOverdue } = row.original;

			// UX Safety: If the DB status hasn't updated to OVERDUE yet, but the date has passed, force the UI to show red.
			const displayStatus = isOverdue && status !== "PAID" && status !== "CANCELLED" ? "OVERDUE" : status;
			const ui = INVOICE_STATUS_UI[displayStatus];

			return (
				<div className="flex flex-col justify-center gap-1.5 min-w-25">
					<div className={cn("inline-flex w-fit items-center gap-1.5 px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-widest", ui.color)}>
						<ui.icon className="w-3 h-3" /> {ui.label}
					</div>

					{/* Micro-Progress Bar for Partial Payments */}
					{displayStatus === "PARTIAL" && (
						<div className="flex items-center gap-2 max-w-30">
							<Progress value={progressPct} className="h-1.5 bg-amber-500/20 [&>div]:bg-amber-500 w-full" />
							<span className="text-[9px] font-mono font-bold text-amber-600 dark:text-amber-500">{progressPct}%</span>
						</div>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "total",
		header: () => <div className="text-right">Total</div>,
		cell: ({ row }) => <div className="text-right text-sm font-mono font-bold text-foreground">{formatMoney(row.original.total)}</div>,
	},
	{
		accessorKey: "amountDue",
		header: () => <div className="text-right">Balance Due</div>,
		cell: ({ row }) => {
			const due = row.original.amountDue;
			const isOverdue = row.original.isOverdue && row.original.status !== "PAID";

			if (row.original.status === "PAID" || due <= 0) {
				return <div className="text-right text-emerald-500 font-mono text-sm font-bold opacity-50">$0.00</div>;
			}

			return <div className={cn("text-right text-sm font-mono font-black", isOverdue ? "text-rose-600 dark:text-rose-500" : "text-foreground")}>{formatMoney(due)}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const invoice = row.original;
			return <ActionsColumn invoice={invoice} />;
		},
	},
];

function ActionsColumn({ invoice }: { invoice: InvoiceListDTO }) {
	// Business Rule: Can only pay if it's not a draft, not cancelled, and owes money.
	const canPay = invoice.amountDue > 0 && invoice.status !== "DRAFT" && invoice.status !== "CANCELLED";
	const hasPublicLink = !!invoice.publicToken && invoice.status !== "DRAFT";
	const openPaymentSheet = useInvoiceUiStore((state) => state.openPaymentSheet);

	const publicUrl = useMemo(() => {
		if (typeof window === "undefined" || !invoice.publicToken) return "";
		return `${window.location.origin}/statement/${invoice.publicToken}`;
	}, [invoice.publicToken]);

	const handleCopy = useCallback(async ({ textToCopy }: { textToCopy: string }) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			toast.success(
				<p className="flex items-center gap-2">
					<Check className="w-4 h-4" /> Copied To Clipboard
				</p>,
				{
					richColors: true,
				},
			);
		} catch (err) {
			console.error("Failed to copy!", err);
		}
	}, []);

	return (
		<div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
			{/* WhatsApp / Copy Link Action */}
			{hasPublicLink && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							onClick={(e) => {
								e.stopPropagation();
								// Handle copy to clipboard or open WhatsApp URL logic here
								handleCopy({ textToCopy: publicUrl });
							}}
							className="w-8 h-8 rounded-lg text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-700 transition-colors"
						>
							<MessageCircle className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent className="glass-ai-panel border-border shadow-xl text-[10px] font-bold">Copy Sharing Link</TooltipContent>
				</Tooltip>
			)}

			{/* Download PDF Action */}
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()} className="w-8 h-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
						<DownloadCloud className="w-4 h-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent className="glass-ai-panel border-border shadow-xl text-[10px] font-bold">Download PDF</TooltipContent>
			</Tooltip>

			{/* 1-Click Record Payment Action */}
			{canPay && (
				<Button
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						// Trigger your "RecordPaymentSheet" via Zustand store here
						openPaymentSheet(invoice);
					}}
					className="h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3 ml-2 shadow-sm transition-all shadow-emerald-500/20"
				>
					<CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pay
				</Button>
			)}
		</div>
	);
}
