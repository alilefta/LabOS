'use client'

import { memo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import {
	Settings2,
	Plus,
	Loader2,
	DollarSign,
	PackagePlus,
	PencilLine,
	Info,
} from 'lucide-react'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { getProductAddonByIdAction } from '@/actions/catalog/product-addons/get-product-addons'
import { createProductAddonAction } from '@/actions/catalog/product-addons/create-addon'
import { updateProductAddonAction } from '@/actions/catalog/product-addons/update-product-addon'
import {
	CreateProductAddonInput,
	CreateProductAddonInputSchema,
} from '@/schema/composed/catalog/product.schema'

interface Props {
	isOpen: boolean
	onClose: () => void
	onSuccess?: () => void
	productId: string
	addonIdToEdit: string | null
	isEdit: boolean
}

export const ProductAddonEditorSheet = memo(function ProductAddonEditorSheet({
	isOpen,
	onClose,
	productId,
	addonIdToEdit,
	isEdit,
	onSuccess,
}: Props) {
	const queryClient = useQueryClient()

	// ── 1. FORM SETUP ─────────────────────────────────────────────────────────
	const form = useForm<CreateProductAddonInput>({
		resolver: zodResolver(CreateProductAddonInputSchema),
		defaultValues: {
			productId: productId,
			name: '',
			price: undefined,
			isArchived: false,
		},
		mode: 'onBlur',
	})

	// ── 2. HYDRATION (EDIT MODE) ──────────────────────────────────────────────
	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ['product-addon-details', addonIdToEdit],
		queryFn: async () => {
			if (!addonIdToEdit) return null
			const res = await getProductAddonByIdAction({ addonId: addonIdToEdit })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return null
			}
			return res.data?.addon ?? null
		},
		enabled: isOpen && isEdit && !!addonIdToEdit,
		staleTime: 0,
	})

	// Sync states on open
	useEffect(() => {
		if (isOpen) {
			if (isEdit && initialData) {
				form.reset({
					productId,
					name: initialData.name,
					price: initialData.price,
					isArchived: initialData.isArchived,
				})
			} else if (!isEdit) {
				form.reset({ productId, name: '', price: undefined, isArchived: false })
			}
		}
	}, [isOpen, isEdit, initialData, form, productId])

	// ── 3. SERVER ACTIONS ─────────────────────────────────────────────────────
	const { executeAsync: createAddon, isExecuting: isCreating } = useAction(
		createProductAddonAction,
		{
			onSuccess: () => {
				toast.success('Accessory added to catalog.')
				queryClient.invalidateQueries({
					queryKey: ['product-addons', productId],
				})
				if (onSuccess) {
					onSuccess()
				}
				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const { executeAsync: updateAddon, isExecuting: isUpdating } = useAction(
		updateProductAddonAction,
		{
			onSuccess: () => {
				toast.success('Accessory updated.')

				if (onSuccess) {
					onSuccess()
				}
				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: CreateProductAddonInput) => {
		if (isEdit && addonIdToEdit) {
			await updateAddon({
				addonId: addonIdToEdit,
				name: data.name,
				price: data.price,
				isArchived: data.isArchived ?? false,
			})
		} else {
			await createAddon(data)
		}
	}

	const isProcessing = isCreating || isUpdating

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:max-w-md border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader
					className={cn(
						'p-8 border-b border-border relative overflow-hidden shrink-0 bg-linear-to-br',
						isEdit
							? 'from-amber-500/5 to-transparent'
							: 'from-emerald-500/5 to-transparent',
					)}
				>
					<div className="absolute top-0 right-0 p-8 opacity-10">
						{isEdit ? (
							<PencilLine className="w-24 h-24 text-amber-500" />
						) : (
							<PackagePlus className="w-24 h-24 text-emerald-500" />
						)}
					</div>

					<div
						className={cn(
							'w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm',
							isEdit
								? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20'
								: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
						)}
					>
						{isEdit ? (
							<PencilLine className="w-6 h-6" />
						) : (
							<Settings2 className="w-6 h-6" />
						)}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
						{isEdit ? 'Edit Accessory' : 'Add Accessory'}
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						Define optional physical modifications for this product.
					</SheetDescription>
				</SheetHeader>

				{/* --- BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* Hydration Skeleton */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 space-y-8 animate-pulse">
							<Skeleton className="h-10 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-20 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />
						</div>
					)}

					<div
						className={cn(
							'transition-opacity duration-500',
							isFetchingDetails ? 'opacity-0' : 'opacity-100',
						)}
					>
						<form
							id="addon-editor-form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel
										field={field}
										fieldState={fieldState}
										fieldTitle="Accessory Name"
										nameInSchema="name"
										placeholder="e.g. Z-Spring, Mesh Reinforcement"
									/>
								)}
							/>

							<div className="space-y-4 pt-4 border-t border-border">
								<div className="flex items-center gap-2 mb-2 px-1">
									<DollarSign
										className={cn(
											'w-6 h-6',
											isEdit ? 'text-amber-500' : 'text-emerald-500',
										)}
									/>
									<h4
										className={cn(
											'text-[11px] font-bold uppercase tracking-widest',
											isEdit
												? 'text-amber-600 dark:text-amber-500'
												: 'text-emerald-600 dark:text-emerald-400',
										)}
									>
										Flat Fee / Surcharge
									</h4>
								</div>

								<Controller
									control={form.control}
									name="price"
									render={({ field, fieldState }) => (
										<InputWithLabel
											type="number"
											step="0.01"
											field={field}
											fieldState={fieldState}
											fieldTitle="Additional Cost ($)"
											nameInSchema="price"
											placeholder="0.00"
											inputClassName={cn(
												'font-mono font-bold transition-colors',
												isEdit
													? 'text-amber-600 dark:text-amber-500 focus-visible:border-amber-500 focus-visible:ring-amber-500/20'
													: 'text-emerald-600 dark:text-emerald-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20',
											)}
										/>
									)}
								/>

								{/* UX MAGIC: Database Snapshot Warning */}
								<div className="p-4 rounded-xl bg-slate-50 dark:bg-white/2 border border-border flex items-start gap-3 mt-4">
									<Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
									<p className="text-[10px] text-muted-foreground leading-relaxed">
										{isEdit ? (
											<span>
												<strong className="text-foreground">
													Price Snapshot Rule:
												</strong>{' '}
												Updating this price will{' '}
												<strong className="text-foreground">not</strong> affect
												cases already in production. It only applies to new
												prescriptions.
											</span>
										) : (
											<span>
												This amount is automatically added to the case subtotal
												when a technician attaches this accessory.
											</span>
										)}
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button
						variant="ghost"
						onClick={onClose}
						className="rounded-xl h-11 px-6 font-semibold"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={
							isProcessing || isFetchingDetails || !form.formState.isDirty
						}
						form="addon-editor-form"
						className={cn(
							'rounded-xl flex items-center justify-center gap-2 h-11 shadow-premium font-bold transition-all text-white shrink-0',
							isEdit
								? 'bg-amber-600 hover:bg-amber-700'
								: 'bg-emerald-600 hover:bg-emerald-700',
						)}
					>
						{isProcessing ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : isEdit ? (
							<PencilLine className="w-4 h-4" />
						) : (
							<Plus className="w-4 h-4" />
						)}
						{isEdit ? 'Update Pricing' : 'Create Accessory'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
})
