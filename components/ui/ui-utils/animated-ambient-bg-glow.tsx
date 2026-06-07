'use client'
import { cn } from '@/lib/utils'
import { memo } from 'react'

type GlowVariant = 'primary' | 'amber' | 'destructive' | 'emerald' | 'ai'

interface Props {
	variant?: GlowVariant
	opacity?: number // Allows you to tune the intensity per page
	className?: string
}

export const AmbientBgGlow = memo(function AmbientBgGlow({
	variant = 'primary',
	opacity = 0.15,
	className,
}: Props) {
	const glowVar = `--glow-${variant}-rgb`

	return (
		<div
			className={cn(
				'absolute top-0 inset-x-0 h-[150vh] max-h-[800px] pointer-events-none transition-[background] duration-1000 ease-in-out -z-10',
				className,
			)}
			style={{
				background: `radial-gradient(ellipse at top, rgba(var(${glowVar}), ${opacity}) 0%, transparent 60%)`,
			}}
		/>
	)
})
