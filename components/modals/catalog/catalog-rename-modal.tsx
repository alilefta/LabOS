'use client'

import { memo, useEffect, useState, useCallback } from 'react'
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
		icon: any
		colorClass: string
		glowClass: string
	}
> = {
	CATEGORY: {
		title: 'Rename Category',
		desc: 'Modify the high-level workflow department name.',
		icon: LayoutGrid,
		colorClass: 'text-primary bg-primary/10 border-primary/20',
		glowClass: 'bg-primary/5',
	},
	WORKTYPE: {
		title: 'Rename Work Type',
		desc: 'Modify the structural group folder name.',
		icon: Layers,
		colorClass: 'text-primary bg-primary/10 border-primary/20',
		glowClass: 'bg-primary/5',
	},
	PRODUCT: {
		title: 'Rename Product',
		desc: 'Modify the specific manufacturing material name.',
		icon: Package,
		colorClass: 'text-ai bg-ai/10 border-ai/20',
		glowClass: 'bg-ai/5',
	},
	PRICING_PLAN: {
		title: 'Rename Pricing Plan',
		desc: 'Modify the default or custom billing plan name.',
		icon: Calculator,
		colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
		glowClass: 'bg-emerald-500/5',
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
				toast.success(
					`Category ${initialName} renamed to ${data.category.name}`,
				)
			},
		})
	const { executeAsync: renameWorkType, isExecuting: isRenamingWorkType } =
		useAction(renameWorkTypeAction, {
			onSuccess: ({ data }) => {
				toast.success(
					`Work Type ${initialName} renamed to ${data.workType.name}`,
				)
			},
		})
	const { executeAsync: renameProduct, isExecuting: isRenamingProduct } =
		useAction(renameProductAction, {
			onSuccess: ({ data }) => {
				toast.success(`Product ${initialName} renamed to ${data.product.name}`)
			},
		})
	const {
		executeAsync: renamePricingPlan,
		isExecuting: isRenamingPricingPlan,
	} = useAction(renamePricingPlanAction, {
		onSuccess: ({ data }) => {
			toast.success(`Plan ${initialName} renamed to ${data.pricingPlan.name}`)
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

				toast.success(
					`${entityType.replace('_', ' ').toLowerCase()} successfully renamed.`,
				)

				if (onSuccess) onSuccess() // Invalidate specific React Query keys in the parent
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
			{/* Accessibility Headers */}
			<DialogHeader className="sr-only">
				<DialogTitle>{config.title}</DialogTitle>
				<DialogDescription>{config.desc}</DialogDescription>
			</DialogHeader>

			<DialogContent
				className="sm:max-w-md p-0 overflow-hidden border-border bg-card shadow-2xl rounded-3xl"
				showCloseButton={false}
			>
				{/* --- HEADER --- */}
				<div
					className={cn(
						'p-6 border-b border-border flex items-start gap-4 relative overflow-hidden bg-linear-to-br',
						config.glowClass,
					)}
				>
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<config.icon className="w-24 h-24" />
					</div>
					<div
						className={cn(
							'w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm shrink-0 relative z-10',
							config.colorClass,
						)}
					>
						<config.icon className="w-6 h-6" />
					</div>
					<div className="relative z-10 pt-1 text-left">
						<DialogTitle className="text-xl font-bold tracking-tight text-foreground">
							{config.title}
						</DialogTitle>
						<p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed pr-4">
							{config.desc}
						</p>
					</div>
				</div>

				{/* --- BODY --- */}
				<div className="p-6 space-y-6">
					<FormProvider {...form}>
						<form
							id="catalog-rename-form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
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
					<div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/2 border border-border flex gap-2.5 items-start">
						<Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
						<p className="text-[10px] text-muted-foreground leading-relaxed">
							<span className="font-bold text-foreground">Audit Notice:</span>{' '}
							Renaming this {entityType.toLowerCase().replace('_', ' ')} will
							instantly update all active cases on your production floor.
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
								className="rounded-xl h-11 px-6 font-semibold"
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
									? 'bg-primary text-white shadow-premium'
									: 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed',
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
