interface Props {
	varient: "destructive" | "amber" | "primary";
}

export function AnimatedAmbientBgGlow({ varient }: Props) {
	const glowVar = `--glow-${varient}-rgb`;

	return (
		<div
			className="absolute top-0 inset-x-0 h-150 pointer-events-none transition-[background] duration-1000 ease-in-out"
			style={{
				background: `radial-gradient(ellipse at top, rgba(var(${glowVar}), 0.15) 0%, transparent 60%)`,
			}}
		/>
	);
}
