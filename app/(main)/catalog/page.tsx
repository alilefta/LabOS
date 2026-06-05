'use client'

import { useState } from 'react'
import {
	FolderTree,
	Layers,
	Package,
	Plus,
	Search,
	ChevronRight,
	Settings2,
	Stethoscope,
	DollarSign,
	Puzzle,
	AlertCircle,
	Archive,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// --- STATIC MOCK DATA (Matches the CatalogTreeDTO) ---
const MOCK_CATALOG = [
	{
		id: 'cat_1',
		name: 'Fixed Prosthetics',
		icon: '💎',
		isActive: true,
		workTypes: [
			{
				id: 'wt_1',
				name: 'Crowns & Bridges',
				requireTeethSelection: true,
				products: [
					{
						id: 'p_1',
						name: 'Zirconia Monolithic (High Translucency)',
						basePrice: '$140 / Unit',
						hasCustomDeals: true,
						addonsCount: 0,
					},
					{
						id: 'p_2',
						name: 'E-Max Pressed',
						basePrice: '$165 / Unit',
						hasCustomDeals: false,
						addonsCount: 0,
					},
					{
						id: 'p_3',
						name: 'PFM (Porcelain Fused to Metal)',
						basePrice: '$110 / Unit',
						hasCustomDeals: true,
						addonsCount: 2,
					},
				],
			},
			{
				id: 'wt_2',
				name: 'Implant Restorations',
				requireTeethSelection: true,
				products: [
					{
						id: 'p_4',
						name: 'Custom Titanium Abutment',
						basePrice: '$220 / Unit',
						hasCustomDeals: false,
						addonsCount: 1,
					},
					{
						id: 'p_5',
						name: 'Screw-Retained Crown',
						basePrice: '$350 / Unit',
						hasCustomDeals: true,
						addonsCount: 0,
					},
				],
			},
		],
	},
	{
		id: 'cat_2',
		name: 'Removables',
		icon: '🦷',
		isActive: true,
		workTypes: [
			{
				id: 'wt_3',
				name: 'Complete Dentures',
				requireTeethSelection: false,
				products: [
					{
						id: 'p_6',
						name: 'Premium Acrylic Denture (Upper)',
						basePrice: '$450 Flat',
						hasCustomDeals: false,
						addonsCount: 3,
					},
					{
						id: 'p_7',
						name: 'Standard Denture',
						basePrice: '$300 Flat',
						hasCustomDeals: false,
						addonsCount: 1,
					},
				],
			},
			{
				id: 'wt_4',
				name: 'Cast Partials',
				requireTeethSelection: true,
				products: [
					{
						id: 'p_8',
						name: 'Vitallium Framework',
						basePrice: '$250 Base + $15/Tooth',
						hasCustomDeals: true,
						addonsCount: 4,
					},
				],
			},
		],
	},
	{
		id: 'cat_3',
		name: 'Orthodontics',
		icon: '😬',
		isActive: true,
		workTypes: [], // Empty state demonstration
	},
]

export default function CatalogMockupPage() {
	// Navigation State
	const [selectedCatId, setSelectedCatId] = useState<string | null>(
		MOCK_CATALOG[0].id,
	)
	const [selectedWtId, setSelectedWtId] = useState<string | null>(
		MOCK_CATALOG[0].workTypes[0].id,
	)
	const [selectedProdId, setSelectedProdId] = useState<string | null>(null)

	const [search, setSearch] = useState('')

	// Derived Active Selections
	const activeCategory = MOCK_CATALOG.find((c) => c.id === selectedCatId)
	const activeWorkType = activeCategory?.workTypes.find(
		(wt) => wt.id === selectedWtId,
	)
	const activeProduct = activeWorkType?.products.find(
		(p) => p.id === selectedProdId,
	)

	// Handlers
	const handleCatSelect = (id: string) => {
		setSelectedCatId(id)
		setSelectedWtId(null)
		setSelectedProdId(null)
	}

	const handleWtSelect = (id: string) => {
		setSelectedWtId(id)
		setSelectedProdId(null)
	}

	return (
		<div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-700 bg-background">
			{/* --- ZONE A: HEADER --- */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 shrink-0 px-2 sm:px-0">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
						Manufacturing Catalog
					</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Manage your clinical offerings, default pricing, and manufacturing
						add-ons.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="relative w-full sm:w-64 group">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search products..."
							className="w-full h-10 pl-9 pr-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/20 transition-all shadow-sm"
						/>
					</div>
					<Button
						variant="outline"
						className="h-10 rounded-xl border-border bg-white dark:bg-white/5 font-semibold text-muted-foreground shadow-sm"
					>
						<Archive className="w-4 h-4 mr-2" /> Archived
					</Button>
					<Button className="h-10 rounded-xl shadow-premium bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6">
						<Plus className="w-4 h-4 mr-2" /> New Item
					</Button>
				</div>
			</div>

			{/* --- ZONE B: THE 3-COLUMN DRILL DOWN --- */}
			<div className="flex-1 flex overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
				{/* COLUMN 1: Categories */}
				<div className="w-1/3 min-w-[250px] max-w-[350px] border-r border-border flex flex-col bg-slate-50/50 dark:bg-white/[0.01]">
					<div className="p-4 border-b border-border flex items-center justify-between shrink-0">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<FolderTree className="w-3.5 h-3.5 text-primary/70" /> Clinical
							Categories
						</h3>
						<span className="text-[10px] font-mono bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">
							{MOCK_CATALOG.length}
						</span>
					</div>

					<div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
						{MOCK_CATALOG.map((cat) => (
							<button
								key={cat.id}
								onClick={() => handleCatSelect(cat.id)}
								className={cn(
									'w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left group outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
									selectedCatId === cat.id
										? 'bg-primary/5 border-primary/30 ring-1 ring-primary/20 shadow-sm'
										: 'bg-transparent border-transparent hover:bg-white dark:hover:bg-white/5 hover:border-border',
								)}
							>
								<div className="flex items-center gap-3">
									<span className="text-xl">{cat.icon}</span>
									<span
										className={cn(
											'text-sm font-semibold transition-colors',
											selectedCatId === cat.id
												? 'text-primary'
												: 'text-foreground group-hover:text-primary',
										)}
									>
										{cat.name}
									</span>
								</div>
								<ChevronRight
									className={cn(
										'w-4 h-4 transition-transform',
										selectedCatId === cat.id
											? 'text-primary translate-x-1'
											: 'text-muted-foreground opacity-0 group-hover:opacity-100',
									)}
								/>
							</button>
						))}
					</div>

					<div className="p-3 border-t border-border shrink-0">
						<Button
							variant="ghost"
							className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10 rounded-xl h-10 text-xs font-bold"
						>
							<Plus className="w-4 h-4 mr-2" /> Add Category
						</Button>
					</div>
				</div>

				{/* COLUMN 2: Work Types */}
				<div className="w-1/3 min-w-[300px] max-w-[400px] border-r border-border flex flex-col bg-white dark:bg-[#09090B]">
					<div className="p-4 border-b border-border flex items-center justify-between shrink-0">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Layers className="w-3.5 h-3.5 text-ai/70" /> Work Types
						</h3>
						{activeCategory && (
							<span className="text-[10px] font-mono bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-muted-foreground">
								{activeCategory.workTypes.length} Depts
							</span>
						)}
					</div>

					<div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
						{!activeCategory ? (
							<div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
								Select a category first.
							</div>
						) : activeCategory.workTypes.length === 0 ? (
							<div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
								<div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
									<Layers className="w-6 h-6 text-slate-400" />
								</div>
								<p className="text-sm font-bold text-foreground">
									No Work Types Found
								</p>
								<p className="text-xs text-muted-foreground">
									This category has no manufacturing departments.
								</p>
							</div>
						) : (
							activeCategory.workTypes.map((wt) => (
								<button
									key={wt.id}
									onClick={() => handleWtSelect(wt.id)}
									className={cn(
										'w-full flex items-start justify-between p-4 rounded-xl border transition-all text-left group outline-none',
										selectedWtId === wt.id
											? 'bg-ai/5 border-ai/30 ring-1 ring-ai/20 shadow-sm'
											: 'bg-slate-50/50 dark:bg-white/[0.02] border-border hover:border-ai/30',
									)}
								>
									<div className="flex flex-col gap-1.5 pr-2">
										<span
											className={cn(
												'text-sm font-bold transition-colors',
												selectedWtId === wt.id
													? 'text-ai'
													: 'text-foreground group-hover:text-ai',
											)}
										>
											{wt.name}
										</span>
										{wt.requireTeethSelection && (
											<span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
												<Stethoscope className="w-3 h-3 text-primary" />{' '}
												Requires Charting
											</span>
										)}
									</div>
									<div className="flex flex-col items-end gap-2 shrink-0">
										<span className="text-[10px] font-mono bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">
											{wt.products.length} Products
										</span>
										<ChevronRight
											className={cn(
												'w-4 h-4 transition-transform',
												selectedWtId === wt.id
													? 'text-ai translate-x-1'
													: 'text-muted-foreground opacity-0 group-hover:opacity-100',
											)}
										/>
									</div>
								</button>
							))
						)}
					</div>

					{activeCategory && (
						<div className="p-3 border-t border-border shrink-0">
							<Button
								variant="ghost"
								className="w-full justify-start text-ai hover:text-ai hover:bg-ai/10 rounded-xl h-10 text-xs font-bold"
							>
								<Plus className="w-4 h-4 mr-2" /> Add Work Type
							</Button>
						</div>
					)}
				</div>

				{/* COLUMN 3: Products & Addons */}
				<div className="flex-1 flex flex-col bg-slate-50 dark:bg-white/[0.01]">
					<div className="p-4 border-b border-border flex items-center justify-between shrink-0">
						<h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
							<Package className="w-3.5 h-3.5 text-emerald-500/70" /> Products &
							Pricing
						</h3>
					</div>

					<div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-3">
						{!activeWorkType ? (
							<div className="h-full flex items-center justify-center text-xs text-muted-foreground italic">
								Select a work type to view products.
							</div>
						) : activeWorkType.products.length === 0 ? (
							<div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
								<p className="text-sm font-bold text-foreground">
									No Products Found
								</p>
								<Button className="rounded-xl h-9 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm">
									Create First Product
								</Button>
							</div>
						) : (
							activeWorkType.products.map((prod) => (
								<div
									key={prod.id}
									onClick={() => setSelectedProdId(prod.id)}
									className={cn(
										'w-full flex flex-col p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-md',
										selectedProdId === prod.id
											? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/20'
											: 'bg-card border-border hover:border-emerald-500/30',
									)}
								>
									<div className="flex items-start justify-between mb-3">
										<span
											className={cn(
												'text-sm font-bold transition-colors',
												selectedProdId === prod.id
													? 'text-emerald-600 dark:text-emerald-500'
													: 'text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-500',
											)}
										>
											{prod.name}
										</span>
										<Button
											variant="ghost"
											size="icon"
											className="h-6 w-6 -mr-2 -mt-2 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<Settings2 className="w-3.5 h-3.5" />
										</Button>
									</div>

									<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
										<div className="flex items-center gap-1.5 text-[11px] font-bold text-foreground bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-border">
											<DollarSign className="w-3.5 h-3.5 text-emerald-500" />
											{prod.basePrice}
										</div>

										{prod.hasCustomDeals && (
											<span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500">
												<AlertCircle className="w-3 h-3" /> Custom Deals Active
											</span>
										)}

										{prod.addonsCount > 0 && (
											<span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-auto">
												<Puzzle className="w-3 h-3" /> {prod.addonsCount}{' '}
												Add-ons
											</span>
										)}
									</div>
								</div>
							))
						)}
					</div>

					{activeWorkType && (
						<div className="p-4 border-t border-border shrink-0 bg-background">
							<Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 font-bold shadow-md">
								<Plus className="w-4 h-4 mr-2" /> Add Manufacturing Product
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
