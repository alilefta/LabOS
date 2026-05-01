"use client";

import { Sparkles, Phone, Mail, AlertTriangle, TrendingUp, TrendingDown, Clock, Target, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClinicQuickOverviewDTO } from "@/schema/composed/clinic.details";
import { useRouter } from "next/navigation";
export function ClinicDossierContent({ clinic }: { clinic: ClinicQuickOverviewDTO }) {
	const router = useRouter();
	const partnerSince = format(clinic.createdAt, "MMM yyyy");

	return (
		<div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-700">
			{/* ── SECTION 1: PROFILE IDENTITY ─────────────────────────────────── */}
			<div className="p-6 text-center border-b border-border bg-linear-to-br from-slate-50/50 to-transparent dark:from-white/2 dark:to-transparent relative ">
				{/* Background Glow */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

				<div className="relative inline-block mb-4 mt-2">
					<div className="w-24 h-24 rounded-[32px] bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold border border-primary/20 shadow-ai-glow-light dark:shadow-ai-glow-dark animate-in zoom-in duration-500">
						{clinic.name.substring(0, 2).toUpperCase()}
					</div>
					<div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-4 border-card flex items-center justify-center shadow-lg">
						<div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
					</div>
				</div>

				<h2 className="text-2xl font-bold text-foreground tracking-tighter">{clinic.name}</h2>
				<p className="text-sm text-muted-foreground font-medium mb-6">
					Partnering in {clinic.city} since {partnerSince}
				</p>

				<div className="flex items-center justify-center gap-3">
					<Button variant="outline" className="h-10 rounded-xl text-xs font-bold px-5 border-border shadow-sm hover:bg-slate-50 dark:hover:bg-white/10" asChild>
						<a href={`mailto:${clinic.email}`}>
							<Mail className="w-4 h-4 mr-2 text-primary" /> Email Office
						</a>
					</Button>
					<Button variant="outline" className="h-10 rounded-xl text-xs font-bold px-5 border-border shadow-sm hover:bg-slate-50 dark:hover:bg-white/10" asChild>
						<a href={`tel:${clinic.phoneNumber}`}>
							<Phone className="w-4 h-4 mr-2 text-emerald-500" /> Call Direct
						</a>
					</Button>
				</div>
			</div>

			{/* ── SECTION 2: NEURAL AUDIT (Mockup Style) ─────────────────────── */}
			<div className="p-6">
				<div className="glass-ai-panel p-6 rounded-3xl relative overflow-hidden group/ai transition-all hover:shadow-ai-glow-light dark:hover:shadow-ai-glow-dark border-primary/10">
					<div className="absolute -top-10 -left-10 w-24 h-24 bg-ai/10 rounded-full blur-2xl pointer-events-none" />

					<div className="flex items-center gap-2.5 mb-4">
						<div className="w-8 h-8 rounded-xl bg-ai/20 flex items-center justify-center text-ai animate-ai-pulse border border-ai/20 shadow-inner">
							<Sparkles className="w-4.5 h-4.5" />
						</div>
						<span className="text-[11px] font-bold uppercase tracking-widest text-ai">Neural Health Audit</span>
					</div>

					<p className="text-sm font-medium leading-relaxed text-foreground mb-5">
						{clinic.name} is currently at <span className="text-emerald-500 font-bold">98% efficiency</span>. However, we detected a{" "}
						<span className="text-ai text-glow-ai font-bold">12% increase</span> in remakes over the last 48 hours.
					</p>

					<div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-3 shadow-sm">
						<AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
						<p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold leading-normal">
							Action Required: Review scan margins for Case #{clinic.recentCases[0]?.caseNumber || "NEW"} from this clinic.
						</p>
					</div>
				</div>
			</div>

			{/* ── SECTION 3: PERFORMANCE BENCHMARKS ──────────────────────────── */}
			<div className="px-6 space-y-4 pb-4">
				<h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-1">Operational Performance</h4>

				<div className="grid grid-cols-1 gap-3">
					{[
						{ label: "Avg. Turnaround", value: "3.2 Days", trend: "-0.5", icon: Clock, good: true },
						{ label: "Remake Rate", value: "1.4%", trend: "+0.2", icon: AlertTriangle, good: false },
						{ label: "Digital Readiness", value: "94%", trend: "+2.0", icon: Target, good: true },
					].map((stat, i) => (
						<div
							key={i}
							className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-border shadow-sm group hover:border-primary/30 transition-all duration-300"
						>
							<div className="flex items-center gap-3">
								<div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
									<stat.icon className="w-4.5 h-4.5" />
								</div>
								<span className="text-xs font-bold text-foreground">{stat.label}</span>
							</div>
							<div className="text-right">
								<div className="text-sm font-mono font-bold text-foreground">{stat.value}</div>
								<div className={cn("text-[10px] font-bold flex items-center justify-end gap-1", stat.good ? "text-emerald-500" : "text-rose-500")}>
									{stat.good ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
									{stat.trend}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ── SECTION 4: RECENT PRODUCTION ───────────────────────────────── */}
			<div className="px-6 space-y-4 pb-12">
				<div className="flex items-center justify-between px-1">
					<h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Production</h4>
					<span className="text-[10px] font-mono font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">{clinic.recentCases.length} ACTIVE</span>
				</div>

				<div className="space-y-2.5">
					{clinic.recentCases.map((c) => (
						<div key={c.id} className="p-4 rounded-2xl border border-border bg-card flex flex-col gap-3 group hover:border-primary/40 transition-all shadow-sm relative overflow-hidden">
							<div className="flex items-center justify-between relative z-10">
								<div className="flex items-center gap-2">
									<span
										className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer"
										onClick={() => router.push(`/cases/${c.id}`)}
									>
										#{c.caseNumber}
									</span>
									<span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded truncate max-w-28">
										{c.patientName}
									</span>
								</div>
								<span
									className={cn(
										"text-[9px] font-bold px-2 py-0.5 rounded-md uppercase border transition-all",
										c.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20",
									)}
								>
									{c.status}
								</span>
							</div>
							<div className="flex items-center justify-between text-[11px] relative z-10">
								<span className="font-bold text-foreground/80 truncate max-w-50">{c.caseItems.map((i) => i.productName).join(", ")}</span>
								{c.deadline && (
									<span className="text-muted-foreground font-medium flex items-center gap-1.5 shrink-0 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-lg border border-border/50">
										<Calendar className="w-3 h-3" /> {format(new Date(c.deadline), "MMM dd")}
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
