"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldCheck, PackageCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AmbientBgGlow } from "@/components/ui/ui-utils/animated-ambient-bg-glow";

interface Props {
	caseId: string;
	caseNumber: string;
	status: string;
}

export function LockedCaseRedirect({ caseId, caseNumber, status }: Props) {
	const router = useRouter();
	const [timeLeft, setTimeLeft] = useState(5);

	// --- FIX 1: The Tick Engine (Pure Math) ---
	useEffect(() => {
		if (timeLeft <= 0) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [timeLeft]);

	// --- FIX 2: The Navigation Observer (Side Effect) ---
	useEffect(() => {
		if (timeLeft === 0) {
			router.replace(`/cases/${caseId}`);
		}
	}, [timeLeft, caseId, router]);

	const glowVariant = status === "COMPLETED" ? "emerald" : status === "FAILED" ? "destructive" : "primary";

	// Contextual messaging based on the exact terminal state
	const getLockContext = () => {
		switch (status) {
			case "COMPLETED":
				return {
					icon: ShieldCheck,
					color: "text-emerald-500",
					bg: "bg-emerald-500/10",
					border: "border-emerald-500/20",
					title: "Production Finalized",
					desc: "This case has passed Quality Control. Structural modifications are locked to preserve the integrity of the clinical audit trail.",
				};
			case "DELIVERED":
				return {
					icon: PackageCheck,
					color: "text-blue-500",
					bg: "bg-blue-500/10",
					border: "border-blue-500/20",
					title: "Case Shipped & Invoiced",
					desc: "This case has been dispatched to the clinic. Financial ledgers and clinical prescriptions are now strictly immutable.",
				};
			case "FAILED":
				return {
					icon: ShieldAlert,
					color: "text-rose-500",
					bg: "bg-rose-500/10",
					border: "border-rose-500/20",
					title: "Archived Failure",
					desc: "This case was marked as a quality failure. It is permanently locked for administrative review and remake tracking.",
				};
			default:
				return {
					icon: Lock,
					color: "text-slate-500",
					bg: "bg-slate-500/10",
					border: "border-border",
					title: "Editing Locked",
					desc: "This case is in a terminal state and cannot be modified.",
				};
		}
	};

	const ctx = getLockContext();
	const Icon = ctx.icon;

	return (
		<div className="flex-1 w-full h-full flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
			{/* Ambient Lock Glow */}
			<AmbientBgGlow variant={glowVariant} opacity={0.1} />

			<div className="max-w-md w-full glass-ai-panel rounded-4xl p-8 flex flex-col items-center text-center relative z-10 animate-in fade-in zoom-in-95 duration-700">
				{/* Status Icon */}
				<div className="relative mb-6">
					<div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg relative z-10", ctx.bg, ctx.border)}>
						<Icon className={cn("w-10 h-10", ctx.color)} />
					</div>
					{/* Small overlay lock */}
					<div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center z-20">
						<Lock className="w-4 h-4 text-muted-foreground" />
					</div>
				</div>

				<h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">{ctx.title}</h1>

				<div className="flex items-center gap-2 mb-4">
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Case ID:</span>
					<span className="text-sm font-mono font-bold text-foreground px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-border">#{caseNumber}</span>
				</div>

				<p className="text-sm text-muted-foreground leading-relaxed mb-10">{ctx.desc}</p>

				{/* The Progress Bar & Actions */}
				<div className="w-full space-y-4">
					<Button
						onClick={() => router.replace(`/cases/${caseId}`)}
						className="w-full rounded-xl h-12 bg-primary text-white font-bold shadow-premium hover:bg-primary/90 transition-all flex items-center justify-between px-6"
					>
						<span>Return to Case Dossier</span>
						<div className="flex items-center gap-2">
							<span className="font-mono text-primary-foreground/70">{timeLeft}s</span>
							<ArrowRight className="w-4 h-4" />
						</div>
					</Button>

					{/* Visual CSS countdown line */}
					<div className="h-1 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
						<div
							className="h-full bg-primary/40 rounded-full transition-all ease-linear"
							style={{
								width: `${(timeLeft / 5) * 100}%`,
								transitionDuration: "1000ms",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
