"use client";
import { memo } from "react";

type GlowVariant = "primary" | "amber" | "destructive" | "emerald" | "ai";

interface Props {
	variant?: GlowVariant;
	opacity?: number; // Allows you to tune the intensity per page
}

export const AmbientBgGlow = memo(function AmbientBgGlow({ variant = "primary", opacity = 0.15 }: Props) {
	const glowVar = `--glow-${variant}-rgb`;

	return (
		<div
			className="absolute top-0 inset-x-0 h-[150vh] max-h-[800px] pointer-events-none transition-[background] duration-1000 ease-in-out -z-10"
			style={{
				background: `radial-gradient(ellipse at top, rgba(var(${glowVar}), ${opacity}) 0%, transparent 60%)`,
			}}
		/>
	);
});
