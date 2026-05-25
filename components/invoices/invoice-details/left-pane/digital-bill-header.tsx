"use client";

import { Building2, Calendar, FileText, Phone, Mail, Landmark } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
	lab: {
		title: string;
		subtitle: string | null;
		brandAvatarUrl: string | null;
	};
	clinic: {
		name: string;
		city: string;
		address1: string;
		phoneNumber: string;
		email: string;
	};
	invoiceNumber: string;
	issuedAt: Date | null;
	dueDate: Date | null;
	isOverdue: boolean;
}

export function DigitalBillHeader({ lab, clinic, invoiceNumber, issuedAt, dueDate, isOverdue }: Props) {
	return (
		<div className="space-y-8 pb-8 border-b border-border/50 animate-in fade-in duration-500">
			{/* --- ROW 1: LAB BRANDING & INVOICE META --- */}
			<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
				{/* Lab Info */}
				<div className="flex items-center gap-4">
					{lab.brandAvatarUrl ? (
						<div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border shadow-sm shrink-0">
							<Image src={lab.brandAvatarUrl} alt="Lab Logo" fill className="object-cover p-0.5 rounded-xl" />
						</div>
					) : (
						<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-mono font-bold text-xl border border-primary/20 shrink-0">
							{lab.title.substring(0, 1).toUpperCase()}
						</div>
					)}
					<div className="flex flex-col">
						<span className="text-base font-bold text-foreground leading-none mb-1">{lab.title}</span>
						{lab.subtitle && <span className="text-xs text-muted-foreground font-medium">{lab.subtitle}</span>}
					</div>
				</div>

				{/* Invoice Reference Data (Locked to Monospace for precision) */}
				<div className="text-left sm:text-right space-y-1.5 font-mono">
					<div className="flex items-center sm:justify-end gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest font-sans">
						<Landmark className="w-3.5 h-3.5 text-emerald-500" /> Bill Statement
					</div>
					<h2 className="text-2xl font-black text-foreground tracking-tighter">#{invoiceNumber}</h2>
					<p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Issued: {issuedAt ? format(new Date(issuedAt), "yyyy-MM-dd") : "Draft Statement"}</p>
				</div>
			</div>

			{/* --- ROW 2: BILLED ENTITY (CLINIC) --- */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
				{/* Billed To Address */}
				<div className="space-y-2.5">
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block px-1">Billed To</span>
					<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-border space-y-2">
						<p className="text-sm font-bold text-foreground flex items-center gap-2">
							<Building2 className="w-4 h-4 text-emerald-500 shrink-0" />
							{clinic.name}
						</p>
						<p className="text-xs text-muted-foreground pl-6 leading-relaxed">
							{clinic.address1}, {clinic.city}
						</p>
					</div>
				</div>

				{/* Financial Due Dates & Contacts */}
				<div className="space-y-2.5">
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block px-1">Payment parameters</span>
					<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-border space-y-3">
						{/* Due Date Indicator */}
						<div className="flex items-center justify-between text-xs font-semibold text-foreground">
							<span className="text-muted-foreground">Due Date</span>
							<span className={cn("font-mono font-bold", isOverdue ? "text-rose-500 dark:text-rose-400 animate-pulse" : "text-foreground")}>
								{dueDate ? format(new Date(dueDate), "yyyy-MM-dd") : "On Receipt"}
							</span>
						</div>

						<div className="h-px bg-border/50 border-dashed" />

						{/* Clinic Accounts Contact */}
						<div className="flex items-center justify-between text-xs">
							<span className="text-muted-foreground">Contact</span>
							<div className="flex flex-col items-end gap-1 font-medium text-slate-700 dark:text-zinc-300">
								<span className="flex items-center gap-1.5">
									<Phone className="w-3 h-3 text-slate-400" /> {clinic.phoneNumber}
								</span>
								<span className="flex items-center gap-1.5">
									<Mail className="w-3 h-3 text-slate-400" /> {clinic.email}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
