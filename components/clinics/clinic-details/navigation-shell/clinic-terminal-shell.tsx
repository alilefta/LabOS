"use client";

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

	const glowVar = isSuspended ? "--glow-destructive-rgb" : isWarning ? "--glow-amber-rgb" : "--glow-primary-rgb";

	return (
		<div className="flex flex-col h-full bg-background relative overflow-hidden">
			<div
				className="absolute top-0 inset-x-0 h-150 pointer-events-none transition-[background] duration-1000 ease-in-out"
				style={{
					background: `radial-gradient(ellipse at top, rgba(var(${glowVar}), 0.15) 0%, transparent 60%)`,
				}}
			/>
			<div className="relative z-10 flex flex-col h-full">{children}</div>
		</div>
	);
}
