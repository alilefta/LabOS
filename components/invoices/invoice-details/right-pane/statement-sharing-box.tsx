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
		toast.success("Secure statement link copied.");
		setTimeout(() => setCopied(false), 2000);
	}, [publicUrl]);

	// 3. Stable WhatsApp Deep-Link Generator (MENA Workflow)
	const handleWhatsAppShare = useCallback(() => {
		if (!publicToken || !clinicPhone) return;

		const isSettled = amountDue <= 0;

		// Context-aware B2B phrasing
		const greeting = `Hello! This is an automated message regarding the account for ${clinicName}.`;

		const statusText = isSettled
			? `Your statement #${invoiceNumber} has been fully settled. Thank you for your prompt payment!`
			: `Your statement #${invoiceNumber} is ready, showing a remaining balance of *${formatMoney(amountDue)}*.`;

		const callToAction = `You can securely review the case details and download your PDF statement here:\n${publicUrl}`;

		const message = encodeURIComponent(`${greeting}\n\n${statusText}\n\n${callToAction}`);

		// CRITICAL FIX: Preserve the '+' sign for international MENA dialing codes
		const cleanPhone = clinicPhone.replace(/[^\d+]/g, "");
		window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
	}, [publicToken, clinicName, invoiceNumber, amountDue, publicUrl, clinicPhone]);

	const isDraft = !publicToken;

	return (
		<div className="lab-card p-6 flex flex-col justify-between relative overflow-hidden group min-h-40">
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
				<div className="flex flex-col gap-4 relative z-10 animate-in fade-in duration-500 mt-2">
					{/* Link Preview & Copy Input */}
					<div className="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-[#121214] border border-border rounded-xl focus-within:border-emerald-500/50 focus-within:ring-[3px] focus-within:ring-emerald-500/20 transition-all">
						<input
							title="Public URL"
							type="text"
							readOnly
							value={publicUrl}
							onClick={(e) => e.currentTarget.select()} // UX trick: auto-select text
							className="flex-1 bg-transparent border-none outline-none pl-3 text-xs font-mono text-muted-foreground truncate cursor-text"
						/>
						<Button
							type="button"
							onClick={handleCopy}
							className={cn(
								"rounded-lg h-8 font-bold text-[10px] shrink-0 transition-all px-3 uppercase tracking-wider",
								copied
									? "bg-emerald-500 text-white shadow-sm"
									: "bg-white dark:bg-white/10 text-foreground border border-border hover:bg-emerald-500 hover:text-white hover:border-emerald-500",
							)}
						>
							{copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 sm:mr-1.5" />}
							<span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
						</Button>
					</div>

					{/* WhatsApp Action */}
					{clinicPhone ? (
						<Button
							type="button"
							onClick={handleWhatsAppShare}
							className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-premium shadow-emerald-500/10 font-bold text-xs flex items-center justify-center gap-2 transition-all"
						>
							<MessageSquare className="w-4 h-4" />
							Forward to Doctor via WhatsApp
						</Button>
					) : (
						<div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-2.5">
							<Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
							<p className="text-[10px] text-amber-600 dark:text-amber-500 leading-snug font-medium">
								To send directly via WhatsApp, ensure a phone number is registered in the Clinic settings.
							</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
});

StatementSharingBox.displayName = "StatementSharingBox";
