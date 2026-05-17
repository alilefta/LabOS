export function AmbientBlueBgGlow() {
	return (
		<div
			className="absolute top-0 inset-x-0 h-125 pointer-events-none -z-10"
			style={{
				background: "radial-gradient(ellipse at top, rgba(var(--glow-primary-rgb), 0.06) 0%, transparent 70%)",
			}}
		/>
	);
}
