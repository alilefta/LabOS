'use client'

import { memo, useEffect, useCallback } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	LayoutGrid,
	Layers,
	Package,
	Calculator,
	Loader2,
	Check,
	Info,
	Type,
	LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import {
	RenameEntityInput,
	RenameEntityInputSchema,
	CatalogEntityType,
} from '@/schema/composed/catalog/rename-entity.schema'

// --- IMPORT REAL SERVER ACTIONS ---
import {
	renameCaseCategoryAction,
	renameWorkTypeAction,
	renameProductAction,
	renamePricingPlanAction,
} from '@/actions/catalog/rename-catalog-entities'

interface Props {
	isOpen: boolean
	onClose: () => void
	entityType: CatalogEntityType
	entityId: string
	initialName: string
	onSuccess?: () => void
	isRenaming?: boolean
}

const ENTITY_CONFIG: Record<
	CatalogEntityType,
	{
		title: string
		desc: string
		icon: LucideIcon
		colorClass: string
		glowClass: string
	}
> = {
	CATEGORY: {
		title: 'Rename Category',
		desc: 'Modify the high-level workflow department name.',
		icon: LayoutGrid,
		colorClass: 'text-primary bg-primary/10 border-primary/20',
		glowClass: 'from-primary/10 via-primary/5 to-transparent',
	},
	WORKTYPE: {
		title: 'Rename Work Type',
		desc: 'Modify the structural group folder name.',
		icon: Layers,
		colorClass: 'text-primary bg-primary/10 border-primary/20',
		glowClass: 'from-primary/10 via-primary/5 to-transparent',
	},
	PRODUCT: {
		title: 'Rename Product',
		desc: 'Modify the specific manufacturing material name.',
		icon: Package,
		colorClass: 'text-ai bg-ai/10 border-ai/20',
		glowClass: 'from-ai/10 via-ai/5 to-transparent',
	},
	PRICING_PLAN: {
		title: 'Rename Pricing Plan',
		desc: 'Modify the default or custom billing plan name.',
		icon: Calculator,
		colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
		glowClass: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
	},
}

export const CatalogRenameModal = memo(function CatalogRenameModal({
	isOpen,
	onClose,
	entityType,
	entityId,
	initialName,
	onSuccess,
}: Props) {
	const config = ENTITY_CONFIG[entityType] || ENTITY_CONFIG['CATEGORY']

	const form = useForm<RenameEntityInput>({
		resolver: zodResolver(RenameEntityInputSchema),
		defaultValues: { name: initialName },
		mode: 'onBlur',
	})

	// Reset input when reopened or when target entity changes
	useEffect(() => {
		if (isOpen) {
			form.reset({ name: initialName })
		}
	}, [isOpen, initialName, form])

	// ── 1. INITIALIZE SERVER ACTIONS ─────────────────────────────────────────
	const { executeAsync: renameCategory, isExecuting: isRenamingCategory } =
		useAction(renameCaseCategoryAction, {
			onSuccess: ({ data }) => {
				toast.success(`Category renamed to ${data.category.name}`)
			},
		})
	const { executeAsync: renameWorkType, isExecuting: isRenamingWorkType } =
		useAction(renameWorkTypeAction, {
			onSuccess: ({ data }) => {
				toast.success(`Work Type renamed to ${data.workType.name}`)
			},
		})
	const { executeAsync: renameProduct, isExecuting: isRenamingProduct } =
		useAction(renameProductAction, {
			onSuccess: ({ data }) => {
				toast.success(`Product renamed to ${data.product.name}`)
			},
		})
	const {
		executeAsync: renamePricingPlan,
		isExecuting: isRenamingPricingPlan,
	} = useAction(renamePricingPlanAction, {
		onSuccess: ({ data }) => {
			toast.success(`Plan renamed to ${data.pricingPlan.name}`)
		},
	})

	// Unified execution state
	const isExecuting =
		isRenamingCategory ||
		isRenamingWorkType ||
		isRenamingProduct ||
		isRenamingPricingPlan

	// ── 2. ATOMIC DISPATCH SUBMISSION ────────────────────────────────────────
	const onSubmit = useCallback(
		async (data: RenameEntityInput) => {
			try {
				switch (entityType) {
					case 'CATEGORY':
						await renameCategory({ id: entityId, name: data.name })
						break
					case 'WORKTYPE':
						await renameWorkType({ id: entityId, name: data.name })
						break
					case 'PRODUCT':
						await renameProduct({ id: entityId, name: data.name })
						break
					case 'PRICING_PLAN':
						await renamePricingPlan({ id: entityId, name: data.name })
						break
				}

				if (onSuccess) onSuccess()
				onClose()
			} catch (err) {
				console.error(
					'[CatalogRenameModal] Failed to execute rename transaction:',
					err,
				)
			}
		},
		[
			entityType,
			entityId,
			renameCategory,
			renameWorkType,
			renameProduct,
			renamePricingPlan,
			onSuccess,
			onClose,
		],
	)

	const isDirty = form.formState.dirtyFields.name

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !isExecuting && !open && onClose()}
		>
			<DialogContent
				className="sm:max-w-md p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl"
				showCloseButton={false}
			>
				{/* --- HEADER: Centered & Refined --- */}
				<DialogHeader
					className={cn(
						'p-8 pb-4 flex flex-col items-center text-center bg-linear-to-b relative border-b border-border/50',
						config.glowClass,
					)}
				>
					<div
						className={cn(
							'w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm mb-4 relative z-10',
							config.colorClass,
						)}
					>
						<Type className="w-6 h-6" />
					</div>
					<div className="relative z-10">
						<DialogTitle className="text-xl font-bold tracking-tight text-foreground">
							{config.title}
						</DialogTitle>
						<DialogDescription className="text-xs text-muted-foreground font-medium mt-1">
							{config.desc}
						</DialogDescription>
					</div>
				</DialogHeader>

				{/* --- BODY --- */}
				<div className="p-6 space-y-6">
					<FormProvider {...form}>
						<form
							id="catalog-rename-form"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="New Name"
										nameInSchema="name"
										placeholder="e.g. New clinical standard..."
										autoFocus
									/>
								)}
							/>
						</form>
					</FormProvider>

					{/* Progressive Context Tip */}
					<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border flex gap-3 items-start shadow-sm">
						<Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
						<p className="text-[11px] text-muted-foreground leading-relaxed">
							<span className="font-bold text-foreground mr-1">
								Audit Notice:
							</span>
							Renaming this {entityType.toLowerCase().replace('_', ' ')} will
							instantly update the labels on all active cases on your production
							floor.
						</p>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<DialogFooter className="p-6 border-t border-border bg-slate-50/50 dark:bg-white/1">
					<div className="flex w-full items-center gap-3">
						<DialogClose asChild>
							<Button
								variant="ghost"
								disabled={isExecuting}
								className="rounded-xl h-11 px-6 font-semibold flex-1 hover:bg-slate-100 dark:hover:bg-white/5"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							form="catalog-rename-form"
							disabled={isExecuting || !isDirty}
							className={cn(
								'flex-1 rounded-xl h-11 font-bold transition-all flex items-center justify-center gap-2',
								isDirty
									? 'bg-primary text-white shadow-premium hover:bg-primary/90'
									: 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed border border-border',
							)}
						>
							{isExecuting ? (
								<Loader2 className="animate-spin w-4 h-4" />
							) : (
								<Check className="w-4 h-4" />
							)}
							Save New Name
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
})

CatalogRenameModal.displayName = 'CatalogRenameModal'
