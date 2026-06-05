'use client'

import { MousePointerClick, Layers, Package, Shapes } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
	// 'category' means they are at the root, 'product' means they clicked a WorkType but no product yet
	type: 'category' | 'product'
}

export function CatalogEmptyState({ type }: Props) {
	const isCategory = type === 'category'

	return (
		<div className="flex-1 h-full w-full flex flex-col items-center justify-center p-8 relative animate-in fade-in duration-700">
			{/* Ambient Glowing Orbs */}
			<div
				className={cn(
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none -z-10',
					isCategory
						? 'bg-primary/5 dark:bg-primary/10'
						: 'bg-ai/5 dark:bg-ai/10',
				)}
			/>

			{/* The Glassmorphic Prompt Card */}
			<div className="relative z-10 max-w-md w-full flex flex-col items-center text-center p-10 rounded-[32px] border border-white/20 dark:border-white/5 bg-white/40 dark:bg-[#121214]/40 backdrop-blur-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
				{/* Floating Icons Animation */}
				<div className="relative w-24 h-24 mb-8 flex items-center justify-center">
					{isCategory ? (
						<>
							<div className="absolute inset-0 bg-primary/10 rounded-3xl animate-pulse" />
							<Shapes className="w-10 h-10 text-primary relative z-10" />
							<MousePointerClick className="w-5 h-5 text-primary absolute -bottom-2 -right-2 animate-bounce drop-shadow-md" />
						</>
					) : (
						<>
							<div className="absolute inset-0 bg-ai/10 rounded-3xl animate-pulse" />
							<Layers className="w-10 h-10 text-ai relative z-10" />
							<Package className="w-5 h-5 text-ai absolute -bottom-2 -right-2 drop-shadow-md" />
						</>
					)}
				</div>

				<h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3">
					{isCategory ? 'Select a Clinical Category' : 'Select a Product'}
				</h3>

				<p className="text-sm text-muted-foreground leading-relaxed">
					{isCategory
						? 'Choose a department from the directory to configure its associated work types and manufacturing products.'
						: 'Select a specific product from the directory to manage its base pricing and custom clinic deals.'}
				</p>

				{/* UX Hint / Keyboard Shortcut Placeholder */}
				<div className="mt-10 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-border flex items-center gap-2">
					<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
						{isCategory ? 'Step 1 of 3' : 'Step 2 of 3'}
					</span>
				</div>
			</div>
		</div>
	)
}
