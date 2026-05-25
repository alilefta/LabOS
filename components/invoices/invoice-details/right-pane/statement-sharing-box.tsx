"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { Share2, MessageSquare, Copy, Check, EyeOff, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
	publicToken: string | null;
	invoiceNumber: string;
	clinicName: string;
	clinicPhone: string | null;
	amountDue: number;
}

export const StatementSharingBox = memo(function StatementSharingBox({ publicToken, invoiceNumber, clinicName, clinicPhone, amountDue }: Props) {
	const [copied, setCopied] = useState(false);

	const formatMoney = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	// 1. Dynamic Public URL Resolution
	const publicUrl = useMemo(() => {
		if (typeof window === "undefined" || !publicToken) return "";
		return `${window.location.origin}/statement/${publicToken}`;
	}, [publicToken]);

	// 2. Stable Copy Handler
	const handleCopy = useCallback(() => {
		if (!publicUrl) return;
		navigator.clipboard.writeText(publicUrl);
		setCopied(true);
		toast.success("Statement link copied to clipboard.");
		setTimeout(() => setCopied(false), 2000);
	}, [publicUrl]);

	// 3. Stable WhatsApp Deep-Link Generator (MENA Workflow)
	const handleWhatsAppShare = useCallback(() => {
		if (!publicToken || !clinicPhone) return;

		const message = encodeURIComponent(
			`Hello Dr. from ${clinicName},\n\nThis is an automated statement from our accounts team.\n\nYour statement #${invoiceNumber} for ${formatMoney(amountDue)} is ready. You can securely review the cases and download the PDF here:\n\n${publicUrl}\n\nThank you for your business!`,
		);

		// Clean non-numeric characters for the WhatsApp API
		const cleanPhone = clinicPhone.replace(/\D/g, "");
		window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
	}, [publicToken, clinicName, invoiceNumber, amountDue, publicUrl, clinicPhone]);

	const isDraft = !publicToken;

	return (
		<div className="lab-card p-6 flex flex-col justify-between relative overflow-hidden group min-h-[160px]">
			{/* Ambient Glow */}
			<div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

			{/* HEADER */}
			<div className="flex items-center gap-3 mb-4 shrink-0 relative z-10">
				<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-sm">
					<Share2 className="w-4 h-4" />
				</div>
				<div>
					<h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Portal Sharing</h3>
					<p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">{isDraft ? "Awaiting Activation" : "Secure Public Link"}</p>
				</div>
			</div>

			{/* DRAFT STATE: Sharing is completely locked */}
			{isDraft ? (
				<div className="flex-1 flex items-center gap-3 p-4 rounded-xl border border-border bg-slate-50 dark:bg-[#121214] animate-in fade-in duration-500">
					<EyeOff className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
					<div className="flex flex-col gap-0.5">
						<span className="text-xs font-bold text-foreground">Sharing Disabled</span>
						<span className="text-[10px] text-muted-foreground leading-normal">This invoice is currently in DRAFT status. Issue the invoice to generate a secure sharing link.</span>
					</div>
				</div>
			) : (
				// LIVE SHARING VIEW
				<div className="flex flex-col gap-4 relative z-10 animate-in fade-in duration-500">
					{/* Link Preview & Copy Input */}
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
							className={cn(
								"rounded-lg h-8 font-bold text-[10px] shrink-0 transition-all px-3 uppercase tracking-wider",
								copied ? "bg-emerald-500 text-white shadow-sm" : "bg-primary text-primary-foreground hover:bg-primary/90",
							)}
						>
							{copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
							{copied ? "Copied" : "Copy"}
						</Button>
					</div>

					{/* WhatsApp Action */}
					{clinicPhone ? (
						<Button
							type="button"
							onClick={handleWhatsAppShare}
							className="w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-premium shadow-emerald-500/10 font-bold text-xs flex items-center justify-center gap-2 transition-all"
						>
							<MessageSquare className="w-4 h-4" />
							Forward to Doctor via WhatsApp
						</Button>
					) : (
						<div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121214] border border-border flex items-center gap-2.5">
							<Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
							<p className="text-[10px] text-muted-foreground leading-snug">To send directly via WhatsApp, ensure a phone number is registered in the Clinic settings.</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
});

StatementSharingBox.displayName = "StatementSharingBox";
