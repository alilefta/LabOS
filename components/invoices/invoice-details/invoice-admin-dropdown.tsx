"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { MoreHorizontal, Trash2, Ban, AlertTriangle, Loader2, ShieldAlert } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";

// Actions
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { InvoiceStatus } from "@/schema/base/enums.base";
import { voidInvoiceAction } from "@/actions/invoices/admin-actions/void-invoice-action";
import { deleteDraftInvoiceAction } from "@/actions/invoices/admin-actions/delete-draft-invoice-action";

interface Props {
	invoiceId: string;
	invoiceNumber: string;
	status: InvoiceStatus;
	clinicName: string;
	totalAmount: number;
}

export function InvoiceAdminDropdown({ invoiceId, invoiceNumber, status, clinicName, totalAmount }: Props) {
	const router = useRouter();

	// Modal States
	const [isVoidDialogOpen, setIsVoidDialogOpen] = useState(false);
	const [voidReason, setVoidReason] = useState("");

	const isDraft = status === "DRAFT";
	const isCancelled = status === "CANCELLED";

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	// ── SERVER ACTION: DELETE DRAFT ───────────────────────────────────
	const { executeAsync: deleteDraft, isExecuting: isDeleting } = useAction(deleteDraftInvoiceAction, {
		onSuccess: () => {
			toast.success(`Draft ${invoiceNumber} permanently deleted.`);
			router.push("/invoices");
			router.refresh();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// ── SERVER ACTION: VOID INVOICE ───────────────────────────────────
	const { executeAsync: voidInvoice, isExecuting: isVoiding } = useAction(voidInvoiceAction, {
		onSuccess: () => {
			toast.success(`Invoice ${invoiceNumber} successfully voided.`);
			setIsVoidDialogOpen(false);
			router.refresh(); // Refetches the server component to apply the VOID watermark!
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// --- HANDLERS ---
	const handleDeleteDraft = async () => {
		toast.promise(deleteDraft({ invoiceId }), {
			loading: "Deleting draft statement...",
		});
	};

	const handleVoidInvoice = async () => {
		if (!voidReason.trim()) {
			toast.error("Please provide a reason for voiding this invoice.");
			return;
		}

		await voidInvoice({ invoiceId, reason: voidReason });
	};

	if (isCancelled) return null; // A cancelled invoice cannot be modified in any way

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl border border-transparent hover:border-border transition-colors">
						<MoreHorizontal className="w-5 h-5 text-muted-foreground" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-52 rounded-2xl border-border shadow-premium dark:bg-[#121214] z-40">
					<DropdownMenuLabel className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 py-2">Administrative</DropdownMenuLabel>
					<DropdownMenuSeparator className="bg-border" />

					{isDraft ? (
						// ACTION A: DELETE DRAFT (Wipes from DB)
						<DropdownMenuItem
							onClick={handleDeleteDraft}
							disabled={isDeleting}
							className="cursor-pointer font-bold py-2.5 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 rounded-xl mx-1"
						>
							<Trash2 className="w-4 h-4 mr-2" /> Delete Draft
						</DropdownMenuItem>
					) : (
						// ACTION B: VOID INVOICE (Safety Lock)
						<DropdownMenuItem onClick={() => setIsVoidDialogOpen(true)} className="cursor-pointer font-bold py-2.5 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10 rounded-xl mx-1">
							<Ban className="w-4 h-4 mr-2" /> Void Invoice
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			{/* ── VOID INVOICE CONFIRMATION DIALOG ── */}
			<Dialog open={isVoidDialogOpen} onOpenChange={(open) => !isVoiding && setIsVoidDialogOpen(open)}>
				<DialogContent className="sm:max-w-md p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl gap-0">
					{/* Header */}
					<div className="p-6 border-b border-border bg-linear-to-br from-rose-500/5 to-transparent flex items-start gap-4">
						<div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 shadow-sm shrink-0">
							<ShieldAlert className="w-6 h-6 animate-pulse" />
						</div>
						<div className="pt-1">
							<DialogTitle className="text-xl font-bold tracking-tight text-foreground">Void Statement #{invoiceNumber}</DialogTitle>
							<p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">You are about to cancel this live financial statement.</p>
						</div>
					</div>
					<DialogDescription className="sr-only">Access more control over the invoice like removing a draft or void.</DialogDescription>

					{/* Warning Card */}
					<div className="p-6 space-y-6">
						<div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
							<div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
								<AlertTriangle className="w-4 h-4 shrink-0" /> Escalation Consequences
							</div>
							<ul className="text-[11px] text-muted-foreground space-y-1.5 list-disc pl-4 font-medium leading-relaxed">
								<li>
									This will permanently set the invoice balance to <strong className="text-foreground">$0.00</strong>.
								</li>
								<li>
									It will reduce <strong className="text-foreground">{clinicName}&apos;s</strong> global debt by{" "}
									<strong className="text-foreground">{formatMoney(totalAmount)}</strong>.
								</li>
								<li>All billed cases will be **unlinked** and returned to the unbilled queue.</li>
							</ul>
						</div>

						{/* Void Reason Input */}
						<div className="space-y-2">
							<label htmlFor="void-reason" className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300">
								Reason for Voiding <span className="text-rose-500">*</span>
							</label>
							<textarea
								id="void-reason"
								required
								value={voidReason}
								onChange={(e) => setVoidReason(e.target.value)}
								placeholder="e.g., Clinic disputed case #123, duplicate billing..."
								className="w-full min-h-20 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none focus:border-rose-500 focus:ring-[3px] focus:ring-rose-500/20 custom-scrollbar"
							/>
						</div>
					</div>

					{/* Footer Actions */}
					<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1">
						<Button variant="ghost" disabled={isVoiding} onClick={() => setIsVoidDialogOpen(false)} className="rounded-xl h-11 px-6 font-semibold">
							Cancel
						</Button>
						<Button
							onClick={handleVoidInvoice}
							disabled={isVoiding || !voidReason.trim()}
							className="rounded-xl h-11 px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-premium flex items-center justify-center gap-2"
						>
							{isVoiding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
							Void Invoice
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
