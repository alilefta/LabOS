"use client";

import { memo, useState } from "react";
import { Receipt, Send, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (status: "DRAFT" | "SENT") => void;
	isExecuting: boolean;
	clinicName: string;
	totals: {
		subtotal: number;
		discountAmount: number;
		grandTotal: number;
		selectedCount: number;
	} | null;
}

export const InvoiceGenerationModal = memo(function InvoiceGenerationModal({ isOpen, onClose, onConfirm, isExecuting, clinicName, totals }: Props) {
	// --- LOCAL UX STATE ---
	// Default to 'SENT' as it's the most common action when completing an invoice
	const [selectedRoute, setSelectedRoute] = useState<"DRAFT" | "SENT">("SENT");

	// --- 1. RENDER-PHASE STATE RESET (The React Compiler Way) ---
	// We track the previous 'isOpen' prop. If it changes from false to true,
	// we reset the state DURING the render phase. React will throw away this render
	// and immediately re-render with the correct state, causing ZERO layout shifts or cascading warnings.
	const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

	if (isOpen !== prevIsOpen) {
		setPrevIsOpen(isOpen);
		if (isOpen) {
			// Reset to default whenever the modal opens
			setSelectedRoute("SENT");
		}
	}

	if (!totals) return null;

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !isExecuting && !open && onClose()}>
			<DialogHeader className="sr-only">
				<DialogTitle>Confirm Invoice Generation</DialogTitle>
				<DialogDescription>Review totals before generating the final invoice.</DialogDescription>
			</DialogHeader>

			<DialogContent className="sm:max-w-lg p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl" showCloseButton={false}>
				{/* --- HEADER --- */}
				<div className="p-6 border-b border-border bg-linear-to-br from-emerald-500/10 to-transparent flex items-start gap-4 relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700" />
					<div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#121214] border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-sm shrink-0 relative z-10">
						<Receipt className="w-6 h-6" />
					</div>
					<div className="relative z-10 pt-1">
						<DialogTitle className="text-xl font-bold tracking-tight text-foreground">Finalize Statement</DialogTitle>
						<p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed pr-4">
							You are about to lock <strong className="text-foreground">{totals.selectedCount} cases</strong> into a formal invoice for{" "}
							<strong className="text-foreground">{clinicName}</strong>.
						</p>
					</div>
				</div>

				{/* --- BODY: THE MATH SNAPSHOT --- */}
				<div className="p-6 space-y-8">
					{/* The Ledger Summary */}
					<div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border shadow-inner font-mono space-y-3">
						<div className="flex justify-between text-xs items-center">
							<span className="text-muted-foreground uppercase tracking-widest font-sans font-bold text-[10px]">Subtotal</span>
							<span className="font-bold text-foreground">{formatMoney(totals.subtotal)}</span>
						</div>

						{totals.discountAmount > 0 && (
							<div className="flex justify-between text-xs items-center">
								<span className="text-emerald-600 dark:text-emerald-500 uppercase tracking-widest font-sans font-bold text-[10px]">Discount</span>
								<span className="font-bold text-emerald-600 dark:text-emerald-500">-{formatMoney(totals.discountAmount)}</span>
							</div>
						)}

						<div className="h-px bg-border border-dashed my-2" />

						<div className="flex justify-between items-end">
							<span className="text-xs font-black text-foreground uppercase tracking-widest font-sans">Statement Total</span>
							<span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none tracking-tighter">{formatMoney(totals.grandTotal)}</span>
						</div>
					</div>

					{/* --- THE INTERACTIVE ROUTING CARDS --- */}
					<div className="space-y-3">
						<h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-1">Choose Routing Action</h4>

						<div className="grid gap-3">
							{/* Option 1: DRAFT */}
							<button
								type="button"
								onClick={() => setSelectedRoute("DRAFT")}
								className={cn(
									"p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
									selectedRoute === "DRAFT"
										? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm"
										: "border-border bg-card hover:border-slate-300 dark:hover:border-white/10",
								)}
							>
								<FileText className={cn("w-4 h-4 shrink-0 mt-0.5 transition-colors", selectedRoute === "DRAFT" ? "text-emerald-600" : "text-slate-400")} />
								<div className="flex flex-col gap-1 w-full">
									<div className="flex items-center justify-between">
										<span className={cn("text-xs font-bold transition-colors", selectedRoute === "DRAFT" ? "text-emerald-700 dark:text-emerald-500" : "text-foreground")}>
											Save as Internal Draft
										</span>
										{/* Active Indicator Ring */}
										<div
											className={cn(
												"w-3.5 h-3.5 rounded-full border-[1.5px] transition-all flex items-center justify-center",
												selectedRoute === "DRAFT" ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-zinc-700",
											)}
										>
											{selectedRoute === "DRAFT" && <div className="w-1.5 h-1.5 bg-background rounded-full" />}
										</div>
									</div>
									<span
										className={cn(
											"text-[10px] leading-snug transition-colors",
											selectedRoute === "DRAFT" ? "text-emerald-700/80 dark:text-emerald-400/80" : "text-muted-foreground",
										)}
									>
										Generates the invoice but keeps it hidden from the clinic. Useful if awaiting manager approval.
									</span>
								</div>
							</button>

							{/* Option 2: SENT */}
							<button
								type="button"
								onClick={() => setSelectedRoute("SENT")}
								className={cn(
									"p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
									selectedRoute === "SENT"
										? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20 shadow-sm"
										: "border-border bg-card hover:border-slate-300 dark:hover:border-white/10",
								)}
							>
								<Send className={cn("w-4 h-4 shrink-0 mt-0.5 transition-colors", selectedRoute === "SENT" ? "text-emerald-600" : "text-slate-400")} />
								<div className="flex flex-col gap-1 w-full">
									<div className="flex items-center justify-between">
										<span className={cn("text-xs font-bold transition-colors", selectedRoute === "SENT" ? "text-emerald-700 dark:text-emerald-500" : "text-foreground")}>
											Issue & Generate Link
										</span>
										{/* Active Indicator Ring */}
										<div
											className={cn(
												"w-3.5 h-3.5 rounded-full border-[1.5px] transition-all flex items-center justify-center",
												selectedRoute === "SENT" ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-zinc-700",
											)}
										>
											{selectedRoute === "SENT" && <div className="w-1.5 h-1.5 bg-background rounded-full" />}
										</div>
									</div>
									<span
										className={cn(
											"text-[10px] leading-snug transition-colors",
											selectedRoute === "SENT" ? "text-emerald-700/80 dark:text-emerald-400/80" : "text-muted-foreground",
										)}
									>
										Locks the invoice and generates a secure public link ready to be shared via WhatsApp.
									</span>
								</div>
							</button>
						</div>
					</div>

					{/* Safety Warning */}
					<div className="flex items-center gap-2 px-1 opacity-80">
						<AlertCircle className="w-3.5 h-3.5 text-amber-500" />
						<p className="text-[10px] text-muted-foreground font-medium">Cases mapped to this invoice cannot be edited once generated.</p>
					</div>
				</div>

				{/* --- FOOTER ACTIONS --- */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1 flex-col sm:flex-row gap-3 sm:gap-0">
					<Button variant="ghost" disabled={isExecuting} onClick={onClose} className="rounded-xl h-11 px-6 font-semibold w-full sm:w-auto">
						Cancel
					</Button>

					<div className="flex items-center gap-3 w-full sm:w-auto">
						{/* Dynamic Submit Button */}
						<Button
							onClick={() => onConfirm(selectedRoute)}
							disabled={isExecuting}
							className={cn(
								"flex-1 sm:flex-none rounded-xl h-11 px-8 shadow-premium font-bold transition-all text-white",
								selectedRoute === "SENT" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700",
							)}
						>
							{isExecuting ? (
								<Loader2 className="w-4 h-4 animate-spin mr-2" />
							) : selectedRoute === "SENT" ? (
								<CheckCircle2 className="w-4 h-4 mr-2" />
							) : (
								<FileText className="w-4 h-4 mr-2" />
							)}

							{selectedRoute === "SENT" ? "Issue Invoice" : "Save Draft"}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
});
