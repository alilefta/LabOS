"use client";

import { Activity, ArrowRight, FileCheck, Info, MessageSquare, Printer, Sparkles, UserPlus } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Mock Data structure for the Audit Trail
// In production, this would come from a `CaseActivityLog` Prisma model
const MOCK_AUDIT_LOGS = [
	{
		id: "log1",
		type: "STATUS_CHANGE",
		actor: { name: "System", isSystem: true },
		action: "Case status advanced to Processing",
		details: "Triggered by production start.",
		timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
		icon: Activity,
		colorClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
	},
	{
		id: "log2",
		type: "AI_AUDIT",
		actor: { name: "LabOS Neural Engine", isSystem: true },
		action: "Clinical audit completed automatically",
		details: "No structural anomalies detected. Cleared for milling.",
		timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
		icon: Sparkles,
		colorClass: "bg-ai/10 text-ai border-ai/20",
	},
	{
		id: "log3",
		type: "STAFF_ASSIGNMENT",
		actor: { name: "Sarah Jenkins", role: "Lab Admin" },
		action: "Assigned Lead Technician",
		details: "Marcus Chen (Master Ceramist) assigned to production.",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
		icon: UserPlus,
		colorClass: "bg-primary/10 text-primary border-primary/20",
	},
	{
		id: "log4",
		type: "NOTE_ADDED",
		actor: { name: "Dr. Alan Smith", role: "Prescribing Dentist" },
		action: "Added clinical instruction note",
		details: '"Please ensure heavy contacts are avoided. Patient has history of bruxism."',
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
		icon: MessageSquare,
		colorClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
	},
	{
		id: "log5",
		type: "CASE_CREATED",
		actor: { name: "Sarah Jenkins", role: "Lab Admin" },
		action: "Created case prescription",
		details: "Initial intake completed via LabOS portal.",
		timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5), // 1.1 days ago
		icon: FileCheck,
		colorClass: "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-zinc-400 border-border",
	},
];

export function AuditTrailLog() {
	return (
		<section className="space-y-6 animate-in fade-in duration-700 delay-500 pb-12">
			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-6 bg-slate-300 dark:bg-zinc-700 rounded-full" />
					<h2 className="text-xl font-bold tracking-tight text-foreground">Activity Log</h2>
				</div>
				<span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-border">
					{MOCK_AUDIT_LOGS.length} Events Recorded
				</span>
			</div>

			{/* --- TIMELINE CONTAINER --- */}
			<div className="relative pl-6 sm:pl-8">
				{/* Vertical Tracking Line */}
				<div className="absolute top-4 bottom-4 left-[21px] sm:left-[29px] w-px bg-border -z-10" />

				<div className="space-y-8">
					{MOCK_AUDIT_LOGS.map((log, index) => {
						const isLatest = index === 0;

						return (
							<div key={log.id} className="relative flex items-start gap-4 sm:gap-6 group">
								{/* --- TIMELINE NODE --- */}
								<div className="relative mt-1 shrink-0">
									{/* Outer Ring / Glow for the latest item */}
									{isLatest && <div className="absolute -inset-1.5 rounded-full bg-emerald-500/20 blur-sm animate-pulse" />}
									{/* The Icon Container */}
									<div
										className={cn(
											"w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm relative z-10 bg-background transition-transform duration-300 group-hover:scale-110",
											log.colorClass,
										)}
									>
										<log.icon className="w-3.5 h-3.5" />
									</div>
								</div>

								{/* --- EVENT DETAILS --- */}
								<div className="flex flex-col flex-1 min-w-0 pt-0.5">
									<div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1">
										<p className="text-sm font-bold text-foreground">
											<span className={cn("mr-1.5", log.actor.isSystem ? "text-ai font-mono" : "text-primary")}>{log.actor.name}</span>
											<span className="text-muted-foreground font-medium">{log.action}</span>
										</p>

										{/* Timestamp */}
										<div className="flex items-center gap-2 shrink-0">
											<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{formatDistanceToNow(log.timestamp, { addSuffix: true })}</span>
										</div>
									</div>

									{/* Extra Details / Payload */}
									{log.details && (
										<div
											className={cn(
												"mt-1.5 p-3 rounded-xl text-xs leading-relaxed border shadow-sm transition-colors",
												log.type === "NOTE_ADDED"
													? "bg-amber-500/5 border-amber-500/20 text-amber-700 dark:text-amber-500 italic"
													: "bg-slate-50 dark:bg-[#121214] border-border text-muted-foreground group-hover:border-primary/20",
											)}
										>
											{log.details}
										</div>
									)}

									{/* Explicit Date for older items (optional hover/metadata) */}
									<div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<Info className="w-3 h-3 text-slate-400" />
										<span className="text-[9px] font-mono text-slate-400">{format(log.timestamp, "MMM dd, yyyy • HH:mm:ss")}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* --- LOAD MORE BUTTON --- */}
			<div className="flex justify-center pt-4">
				<Button
					variant="outline"
					size="sm"
					className="h-9 rounded-xl border-border bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold text-muted-foreground"
				>
					Load Older Events
				</Button>
			</div>
		</section>
	);
}
