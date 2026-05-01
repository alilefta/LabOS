"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	status: string;
	balance: number;
	limit: number | null;
}

export function ClinicTerminalShell({ children, status, balance, limit }: Props) {
	// Determine the "Ambient Threat Level"
	const isSuspended = status === "SUSPENDED";
	const utilization = limit ? balance / limit : 0;
	const isWarning = utilization > 0.85 && !isSuspended;

	return (
		<div className="flex flex-col h-full bg-background relative overflow-hidden transition-colors duration-1000">
			{/* Ambient Lighting Engine */}
			<div
				className={cn(
					"absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000",
					isSuspended ? "bg-destructive/10 dark:bg-destructive/15" : isWarning ? "bg-amber-500/10 dark:bg-amber-500/15" : "bg-primary/5 dark:bg-primary/10",
				)}
			/>

			{/* The actual content (Header + Tabs + Body) */}
			<div className="relative z-10 flex flex-col h-full">{children}</div>
		</div>
	);
}
