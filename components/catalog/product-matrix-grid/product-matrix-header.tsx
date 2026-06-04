'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { Search, Layers, PackagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import useDebounce from '@/hooks/useDebounce'

interface ProductMatrixHeaderProps {
	workTypeName: string
	totalItemsCount: number
	activeWorkTypeId: string
	onSearchChange: (value: string) => void
}

export const ProductMatrixHeader = memo(function ProductMatrixHeader({
	workTypeName,
	totalItemsCount,
	activeWorkTypeId,
	onSearchChange,
}: ProductMatrixHeaderProps) {
	// ── STORE CONNECTORS (For Creation Modal) ────────────────────────────────
	const openProductSheet = useClinicalCreationStore(
		(state) => state.openProductSheet,
	)

	const [searchQuery, setSearchQuery] = useState('')

	const debouncedSearch = useDebounce({ value: searchQuery })

	// STABILIZED HANDLER: Prevents re-creating the click handler on typing renders
	const handleCreateProduct = useCallback(() => {
		openProductSheet(activeWorkTypeId)
	}, [openProductSheet, activeWorkTypeId])

	// STABILIZED INPUT: Prevents input element from resetting listeners [1]
	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(e.target.value)
		},
		[onSearchChange],
	)

	useEffect(() => {
		onSearchChange(debouncedSearch)
	}, [debouncedSearch])

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50 shrink-0">
			{/* --- LEFT: Department Identity --- */}
			<div className="flex items-center gap-4 min-w-0">
				{/* Context Icon */}
				<div className="hidden sm:flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center text-primary shadow-sm border border-primary/20 shrink-0">
					<Layers className="w-6 h-6" />
				</div>

				<div className="flex flex-col min-w-0">
					<div className="flex items-center gap-3 mb-1">
						<h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
							{workTypeName}
						</h2>
					</div>
					<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
						<span className="bg-slate-100 dark:bg-white/5 border border-border px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest text-foreground">
							{totalItemsCount}
						</span>
						<span>Items Configured</span>
					</div>
				</div>
			</div>

			{/* --- RIGHT: Command Tools --- */}
			<div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
				{/* Local Client-Side Search */}
				<div className="relative w-full sm:w-64 group flex-1 sm:flex-none">
					<Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange} // Stable reference [1]
						placeholder="Search inventory..."
						className="w-full h-10 pl-10 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm placeholder:text-muted-foreground/60"
					/>
				</div>

				{/* Quick Action */}
				<Button
					onClick={handleCreateProduct} // Stable reference [1]
					className="shrink-0 h-10 rounded-xl bg-primary text-primary-foreground font-bold shadow-premium hover:bg-primary/90 transition-all px-4 sm:px-6"
				>
					<PackagePlus className="w-4 h-4 sm:mr-1.5" />
					<span className="hidden sm:inline">Add Product</span>
				</Button>
			</div>
		</div>
	)
})

ProductMatrixHeader.displayName = 'ProductMatrixHeader'
