"use client";

import { FileText, MapPin, User, Stethoscope } from "lucide-react";

export function DigitalWorkTicket() {
	return (
		<div className="bg-white dark:bg-[#121214] border border-border rounded-3xl p-10 shadow-sm relative overflow-hidden">
			{/* Decorative "Perforated" Edge */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />

			{/* Ticket Header */}
			<div className="flex justify-between items-start mb-12">
				<div className="space-y-1">
					<div className="flex items-center gap-2 mb-2">
						<div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white font-bold text-[10px]">L</div>
						<span className="text-sm font-bold uppercase tracking-widest text-foreground">LabOS Prescription</span>
					</div>
					<h2 className="text-3xl font-mono font-bold tracking-tighter text-foreground">#L-4492-AX</h2>
					<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Created: March 24, 2026 • 21:03</p>
				</div>
				<div className="text-right">
					<div className="px-3 py-1 bg-slate-100 dark:bg-white/5 border border-border rounded-lg text-[10px] font-bold text-foreground">URGENT PRODUCTION</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-12 mb-12">
				{/* Origin Section */}
				<div className="space-y-6">
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<User className="w-3 h-3" /> Patient
						</div>
						<p className="text-lg font-bold text-foreground">Johnathan Sterling</p>
					</div>
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<MapPin className="w-3 h-3" /> Clinic
						</div>
						<p className="text-md font-bold text-foreground">Apex Dental Design</p>
						<p className="text-xs text-muted-foreground">Dr. Sarah Mitchell</p>
					</div>
				</div>

				{/* Work Item Summary */}
				<div className="space-y-6">
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<Stethoscope className="w-3 h-3" /> Primary Work
						</div>
						<p className="text-lg font-bold text-foreground">Zirconia Multi-Layer</p>
						<p className="text-xs text-primary font-bold">Category: Fixed Prosthetics</p>
					</div>
					<div className="space-y-3">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<FileText className="w-3 h-3" /> Clinical Instructions
						</div>
						<p className="text-xs text-muted-foreground leading-relaxed italic">
							&quot;High translucency incisal edge. Match shade A2 to B1 gradient. Digital scan attached for margin fit.&quot;
						</p>
					</div>
				</div>
			</div>

			{/* THE DENTAL MAP RECAP */}
			<div className="border-t border-dashed border-border pt-10">
				<div className="flex items-center justify-between mb-6">
					<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mapped Positions</h4>
					<span className="text-xs font-bold text-foreground">3 Units Selected (Upper Arch)</span>
				</div>

				<div className="flex gap-4">
					{["18", "17", "16"].map((tooth) => (
						<div key={tooth} className="w-14 h-16 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center">
							<span className="text-[10px] font-bold text-primary opacity-60 uppercase">UR</span>
							<span className="text-xl font-mono font-bold text-primary">{tooth}</span>
						</div>
					))}
				</div>
			</div>

			{/* QR Code Placeholder for Lab Tracking */}
			<div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-xl border border-border flex items-center justify-center">
						{/* Mock QR */}
						<div className="w-10 h-10 border-2 border-slate-300 dark:border-zinc-700 opacity-20" />
					</div>
					<div className="space-y-1">
						<p className="text-[10px] font-bold text-foreground">SCAN TO TRACK</p>
						<p className="text-[9px] text-muted-foreground font-mono">LABOS-TRACK-4492-AX</p>
					</div>
				</div>
				<div className="text-right">
					<p className="text-[9px] text-muted-foreground font-medium max-w-37.5">Electronically verified by LabOS AI Auditor. No signature required.</p>
				</div>
			</div>
		</div>
	);
}
