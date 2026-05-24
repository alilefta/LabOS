"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassPanelVariants = cva(
	// Base classes: Hardware acceleration (transform-gpu) is CRITICAL here to prevent scroll lag.
	"relative overflow-hidden backdrop-blur-xl transform-gpu transition-colors duration-300",
	{
		variants: {
			variant: {
				// Standard Neutral Glass
				default: "bg-white/70 border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:bg-[#121214]/60 dark:border-white/10 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",

				// Primary (Blue) Tinted Glass
				primary: "bg-primary/5 border border-primary/20 shadow-[0_8px_30px_rgba(37,99,235,0.05)] dark:bg-primary/10 dark:border-primary/20",

				// AI (Violet) Tinted Glass
				ai: "bg-ai/5 border border-ai/20 shadow-[0_8px_30px_rgba(139,92,246,0.05)] dark:bg-ai/10 dark:border-ai/20",

				// Financial (Emerald) Tinted Glass
				emerald: "bg-emerald-500/5 border border-emerald-500/20 shadow-[0_8px_30px_rgba(16,185,129,0.05)] dark:bg-emerald-500/10 dark:border-emerald-500/20",

				// Danger (Red) Tinted Glass
				destructive: "bg-destructive/5 border border-destructive/20 shadow-[0_8px_30px_rgba(239,68,68,0.05)] dark:bg-destructive/10 dark:border-destructive/20",
			},
			intensity: {
				subtle: "backdrop-blur-md", // Best for small tooltips / cards
				medium: "backdrop-blur-xl", // Best for headers / footers
				heavy: "backdrop-blur-3xl", // Best for full-screen modals
			},
			radius: {
				md: "rounded-xl",
				lg: "rounded-2xl",
				xl: "rounded-3xl",
				full: "rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			intensity: "medium",
			radius: "lg",
		},
	},
);

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof glassPanelVariants> {
	children: React.ReactNode;
	// Optional: Adds a subtle radial glow behind the content, but inside the glass
	withGlow?: boolean;
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(({ className, variant, intensity, radius, withGlow, children, ...props }, ref) => {
	// Helper to map variant to actual Tailwind color variables for the internal glow
	const getGlowColor = () => {
		switch (variant) {
			case "primary":
				return "bg-primary/20";
			case "ai":
				return "bg-ai/20";
			case "emerald":
				return "bg-emerald-500/20";
			case "destructive":
				return "bg-destructive/20";
			default:
				return "bg-slate-500/10 dark:bg-white/5";
		}
	};

	return (
		<div ref={ref} className={cn(glassPanelVariants({ variant, intensity, radius }), className)} {...props}>
			{/* Optional Internal Ambient Glow (Performance friendly because it's just a div with blur, not backdrop-filter) */}
			{withGlow && <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-[80px] pointer-events-none -z-10", getGlowColor())} />}

			{/* Content Wrapper ensures content stays above the glow */}
			<div className="relative z-10 h-full w-full">{children}</div>
		</div>
	);
});

GlassPanel.displayName = "GlassPanel";
