"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Check, MessageSquare, ChevronRight, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
	isOpen: boolean;
	onClose: () => void; // Navigates to the admin invoice page
	invoiceNumber: string;
	publicToken: string | null; // Null if saved as DRAFT
	clinicName: string;
	clinicPhone?: string; // Optional direct WhatsApp target
	amountDue: number;
}

export function InvoiceSuccessShareModal({ isOpen, onClose, invoiceNumber, publicToken, clinicName, clinicPhone, amountDue }: Props) {
	const [copied, setCopied] = useState(false);

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	// 1. Generate the secure public URL
	const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/statement/${publicToken}` : "";

	// 2. Clipboard copy handler
	const handleCopy = () => {
		if (!publicUrl) return;
		navigator.clipboard.writeText(publicUrl);
		setCopied(true);
		toast.success("Secure statement link copied.");
		setTimeout(() => setCopied(false), 2000);
	};

	// 3. Pre-formatted WhatsApp Message (MENA Contextual workflow)
	const handleWhatsAppShare = () => {
		if (!publicToken) return;

		const message = encodeURIComponent(
			`Hello Dr. from ${clinicName},\n\nThis is an automated statement from our accounts team.\n\nYour statement #${invoiceNumber} for ${formatMoney(amountDue)} is ready. You can securely review the cases and download the PDF here:\n\n${publicUrl}\n\nThank you for your business!`,
		);

		// Clean the phone number of non-numeric characters for the API
		const cleanPhone = clinicPhone ? clinicPhone.replace(/\D/g, "") : "";
		window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
	};

	const isDraft = !publicToken;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogHeader className="sr-only">
				<DialogTitle>Invoice Successfully Generated</DialogTitle>
				<DialogDescription>Your invoice has been recorded in the ledger.</DialogDescription>
			</DialogHeader>

			<DialogContent className="sm:max-w-md p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl" showCloseButton={false}>
				{/* --- VISUAL SUCCESS BANNER --- */}
				<div
					className={cn(
						"p-8 text-center flex flex-col items-center relative overflow-hidden border-b border-border bg-linear-to-b",
						isDraft ? "from-primary/10 to-transparent" : "from-emerald-500/10 to-transparent",
					)}
				>
					{/* Holographic background glares */}
					<div className={cn("absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none", isDraft ? "bg-primary/10" : "bg-emerald-500/10")} />

					<div
						className={cn(
							"w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-lg animate-in zoom-in-95 duration-500",
							isDraft ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20",
						)}
					>
						{isDraft ? <FileText className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
					</div>

					<DialogTitle className="text-2xl font-bold tracking-tight text-foreground">{isDraft ? "Draft Statement Saved" : "Invoice Successfully Issued"}</DialogTitle>
					<p className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest mt-1">
						{invoiceNumber} • {formatMoney(amountDue)}
					</p>
				</div>

				{/* --- ACTION BODY --- */}
				<div className="p-6 space-y-6">
					{isDraft ? (
						// DRAFT VIEW: Simple confirmation, no public links
						<p className="text-sm text-muted-foreground text-center leading-relaxed font-medium">
							This invoice has been securely recorded in your local ledger as a <strong className="text-foreground">Draft</strong>. It remains hidden from the clinic until you decide to
							issue it.
						</p>
					) : (
						// SENT/ISSUED VIEW: Rich sharing utilities
						<div className="space-y-4">
							<p className="text-sm text-muted-foreground text-center leading-relaxed font-medium">
								Invoice <strong className="text-foreground">{invoiceNumber}</strong> is locked and live. Share this secure portal link with the clinic.
							</p>

							{/* Public Link Copy Area */}
							<div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-[#121214] border border-border rounded-xl">
								<input
									title="Public URL"
									type="text"
									readOnly
									value={publicUrl}
									className="flex-1 bg-transparent border-none outline-none pl-3 text-xs font-mono text-muted-foreground truncate"
								/>
								<Button
									type="button"
									onClick={handleCopy}
									className={cn("rounded-lg h-9 font-bold text-xs shrink-0 transition-all px-4", copied ? "bg-emerald-500 text-white" : "bg-primary text-primary-foreground")}
								>
									{copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
									{copied ? "Copied" : "Copy"}
								</Button>
							</div>

							{/* Quick WhatsApp Action (MENA Contextual) */}
							<Button
								type="button"
								onClick={handleWhatsAppShare}
								className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-premium shadow-emerald-500/20 font-bold text-sm flex items-center justify-center gap-2"
							>
								<MessageSquare className="w-4 h-4" />
								Share Statement on WhatsApp
							</Button>
						</div>
					)}
				</div>

				{/* --- FOOTER: Redirection --- */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1">
					<Button
						onClick={onClose}
						className="w-full rounded-xl h-11 bg-slate-100 dark:bg-white/5 border border-border text-foreground hover:bg-slate-200 dark:hover:bg-white/10 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
					>
						Go to Invoice Ledger <ChevronRight className="w-4 h-4 opacity-60" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
