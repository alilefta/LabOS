"use client";

import { Activity, FileCheck, Info, MessageSquare, Sparkles, UserPlus, FileUp, Trash2, CalendarClock, ShieldCheck } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CaseActivityLogDetailsUI, CaseActivityPayloadSchema } from "@/schema/composed/case-activity-logs.details";

interface AuditTrailProps {
	logs: CaseActivityLogDetailsUI[] | null;
}

// --- HELPER: Parse and style the log based on its type ---
const parseLogData = (log: CaseActivityLogDetailsUI) => {
	// 1. Safe parsing of the JSON payload via your Zod Schema
	const parsedPayload = CaseActivityPayloadSchema.safeParse({
		type: log.type,
		payload: log.payload || {},
	});

	// Default fallback config
	let icon = Activity;
	let colorClass = "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-zinc-400 border-border";
	let detailsText = log.summary; // Fallback to raw summary if payload parsing fails

	// 2. Switch on the exact type to assign gorgeous visuals and payload text
	if (parsedPayload.success) {
		const { type, payload } = parsedPayload.data;

		switch (type) {
			case "CASE_CREATED":
				icon = FileCheck;
				colorClass = "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-zinc-400 border-border";
				detailsText = "Initial intake completed via LabOS portal.";
				break;

			case "STATUS_CHANGED":
				icon = Activity;
				colorClass = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
				detailsText = `Status advanced from ${payload.from} to ${payload.to}.`;
				break;

			case "STAFF_ASSIGNED":
				icon = UserPlus;
				colorClass = "bg-primary/10 text-primary border-primary/20";
				detailsText = `${payload.staffName} assigned to role: ${payload.roleCategory}.`;
				break;

			case "STAFF_REMOVED":
				icon = UserPlus; // or UserMinus if you have it imported
				colorClass = "bg-slate-100 dark:bg-white/5 text-muted-foreground border-border";
				detailsText = `${payload.staffName} removed from role: ${payload.roleCategory}.`;
				break;

			case "FILE_UPLOADED":
				icon = FileUp;
				colorClass = "bg-blue-500/10 text-blue-500 border-blue-500/20";
				detailsText = `Attached ${payload.assetFileType}: ${payload.fileName}`;
				break;

			case "FILE_DELETED":
				icon = Trash2;
				colorClass = "bg-destructive/10 text-destructive border-destructive/20";
				detailsText = `Removed file: ${payload.fileName}`;
				break;

			case "DEADLINE_CHANGED":
				icon = CalendarClock;
				colorClass = "bg-amber-500/10 text-amber-500 border-amber-500/20";
				const fromDate = payload.from ? format(new Date(payload.from), "MMM dd") : "Unscheduled";
				const toDate = payload.to ? format(new Date(payload.to), "MMM dd") : "Unscheduled";
				detailsText = `Production deadline shifted from ${fromDate} to ${toDate}.`;
				break;

			case "NOTE_ADDED":
				icon = MessageSquare;
				colorClass = "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20";
				detailsText = `"${payload.note}"`;
				break;

			case "AI_AUDIT_COMPLETED":
				icon = payload.passed ? ShieldCheck : Sparkles;
				colorClass = payload.passed ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-ai/10 text-ai border-ai/20";
				detailsText = payload.findings;
				break;
		}
	}

	return { icon, colorClass, detailsText };
};

export function AuditTrailLog({ logs }: AuditTrailProps) {
	if (!logs || logs.length === 0) {
		return null; // Or return an empty state UI
	}

	return (
		<section className="space-y-6 animate-in fade-in duration-700 delay-500 pb-12">
			{/* --- HEADER --- */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
				<div className="flex items-center gap-3">
					<div className="w-1.5 h-6 bg-slate-300 dark:bg-zinc-700 rounded-full" />
					<h2 className="text-xl font-bold tracking-tight text-foreground">Activity Log</h2>
				</div>
				<span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-border shadow-sm">
					{logs.length} Events Recorded
				</span>
			</div>

			{/* --- TIMELINE CONTAINER --- */}
			<div className="relative pl-6 sm:pl-8">
				{/* Vertical Tracking Line */}
				<div className="absolute top-4 bottom-4 left-5.25 sm:left-7.25 w-px bg-border -z-10" />

				<div className="space-y-8">
					{logs.map((log, index) => {
						const isLatest = index === 0;
						const { icon: Icon, colorClass, detailsText } = parseLogData(log);

						// Determine if the actor was the AI/System or a human
						const isSystemEvent = log.actorName === "System" || log.actorName === "LabOS Neural Engine" || log.type === "AI_AUDIT_COMPLETED";

						return (
							<div key={log.id} className="relative flex items-start gap-4 sm:gap-6 group">
								{/* --- TIMELINE NODE --- */}
								<div className="relative mt-1 shrink-0">
									{/* Outer Glow for the latest item */}
									{isLatest && <div className="absolute -inset-1.5 rounded-full bg-emerald-500/20 blur-sm animate-pulse" />}
									{/* The Icon Container */}
									<div
										className={cn(
											"w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm relative z-10 bg-background transition-transform duration-300 group-hover:scale-110",
											colorClass,
										)}
									>
										<Icon className="w-3.5 h-3.5" />
									</div>
								</div>

								{/* --- EVENT DETAILS --- */}
								<div className="flex flex-col flex-1 min-w-0 pt-0.5">
									<div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-1">
										<p className="text-sm font-bold text-foreground">
											<span className={cn("mr-1.5", isSystemEvent ? "text-ai font-mono" : "text-primary")}>{log.actorName || "System"}</span>
											<span className="text-muted-foreground font-medium">{log.summary}</span>
										</p>

										{/* Relative Timestamp */}
										<div className="flex items-center gap-2 shrink-0">
											<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
												{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
											</span>
										</div>
									</div>

									{/* Render Payload Details */}
									{detailsText && (
										<div
											className={cn(
												"mt-1.5 p-3 rounded-xl text-xs leading-relaxed border shadow-sm transition-colors",
												log.type === "NOTE_ADDED"
													? "bg-amber-500/5 border-amber-500/20 text-amber-700 dark:text-amber-500 italic"
													: "bg-slate-50 dark:bg-[#121214] border-border text-muted-foreground group-hover:border-primary/20",
											)}
										>
											{detailsText}
										</div>
									)}

									{/* Explicit Date reveal on hover */}
									<div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<Info className="w-3 h-3 text-slate-400" />
										<span className="text-[9px] font-mono text-slate-400">{format(new Date(log.createdAt), "MMM dd, yyyy • HH:mm:ss")}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* --- LOAD MORE BUTTON --- */}
			{logs.length >= 10 && (
				<div className="flex justify-center pt-4">
					<Button
						variant="outline"
						size="sm"
						className="h-9 rounded-xl border-border bg-slate-50 dark:bg-white/2 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold text-muted-foreground transition-all"
					>
						Load Older Events
					</Button>
				</div>
			)}
		</section>
	);
}
