'use client'

import { memo, useEffect } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Package, Box, Edit3, Plus, Check } from 'lucide-react'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'

// Components
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
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { Skeleton } from '@/components/ui/skeleton'
import { CatalogImageUpload } from '@/components/shared/file-assets/catalog-image-upload'

// Schemas & Actions
import {
	CreateProductInput,
	CreateProductInputSchema,
} from '@/schema/composed/product.details'
import { createProductAction } from '@/actions/product'
// Assume these two actions exist for the edit flow:

import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { UpdateProductInput } from '@/schema/composed/catalog/product.schema'
import { getProductByIdAction } from '@/actions/catalog/products/get-product'
import { updateProductAction } from '@/actions/catalog/products/update-product'

interface Props {
	isOpen: boolean
	onClose: () => void
	workTypeId: string // The structural parent
	productIdToEdit?: string | null // Pass an ID to enter Edit Mode
	isEdit?: boolean
	onSuccess?: (productId: string) => void // Optional callback for the parent
}

export const ProductEditorSheet = memo(function ProductEditorSheet({
	isOpen,
	onClose,
	workTypeId,
	productIdToEdit,
	isEdit = false,
	onSuccess,
}: Props) {
	const queryClient = useQueryClient()

	// ── 1. FORM SETUP ─────────────────────────────────────────────────────────
	const form = useForm<CreateProductInput>({
		resolver: zodResolver(CreateProductInputSchema),
		defaultValues: {
			name: '',
			description: '',
			imageUrl: '',
			workTypeId: workTypeId,
		},
		mode: 'onBlur',
	})

	// ── 2. HYDRATION (EDIT MODE) ──────────────────────────────────────────────
	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ['product-editor-details', productIdToEdit],
		queryFn: async () => {
			if (!productIdToEdit) return null
			const res = await getProductByIdAction({ productId: productIdToEdit })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return null
			}
			return res.data?.product ?? null
		},
		enabled: isOpen && isEdit && !!productIdToEdit,
	})

	// Sync local states when opened or when hydration completes
	useEffect(() => {
		if (isOpen) {
			if (isEdit && initialData) {
				form.reset({
					name: initialData.name || '',
					description: initialData.description || undefined,
					imageUrl: initialData.imageUrl || undefined,
					workTypeId: initialData.workTypeId || workTypeId,
				})
			} else if (!isEdit) {
				// Create Mode: Reset to clean slate
				form.reset({
					name: '',
					description: '',
					imageUrl: '',
					workTypeId: workTypeId,
				})
			}
		}
	}, [isOpen, isEdit, initialData, form, workTypeId])

	// ── 3. ACTIONS ────────────────────────────────────────────────────────────
	const { executeAsync: createProduct, isExecuting: isCreating } = useAction(
		createProductAction,
		{
			onSuccess: ({ data }) => {
				toast.success('Catalog item created successfully.')

				// Invalidate the product list for this specific WorkType
				queryClient.invalidateQueries({
					queryKey: ['catalog-products', workTypeId],
				})

				if (onSuccess && data?.product?.id) {
					onSuccess(data.product.id)
				}
				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const { executeAsync: updateProduct, isExecuting: isUpdating } = useAction(
		updateProductAction,
		{
			onSuccess: () => {
				toast.success('Product details updated.')
				queryClient.invalidateQueries({
					queryKey: ['catalog-products', workTypeId],
				})
				queryClient.invalidateQueries({
					queryKey: ['product-details', productIdToEdit],
				}) // Clear old cache
				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: CreateProductInput) => {
		if (isEdit && productIdToEdit) {
			// Cast safely or use your specific Update Schema

			await updateProduct({
				...data,
				productId: productIdToEdit,
			} as unknown as UpdateProductInput)
		} else {
			await createProduct(data)
		}
	}

	const isProcessing = isCreating || isUpdating

	// ... UI rendering continues in Part 2
	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:max-w-md border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER (Violet AI Branding) --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-ai/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Box className="w-24 h-24 text-ai" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-ai/10 flex items-center justify-center text-ai mb-4 shadow-ai-glow-light">
						{isEdit ? (
							<Edit3 className="w-6 h-6" />
						) : (
							<Package className="w-6 h-6" />
						)}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
						{isEdit ? 'Edit Catalog Item' : 'Define Catalog Item'}
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						{isEdit
							? 'Modify the name, description, and visual assets for this product.'
							: 'Add a specific manufacturing product to this department.'}
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* Skeleton Overlay for Edit Mode Hydration */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 space-y-8 animate-pulse">
							<div className="space-y-2">
								<Skeleton className="h-5 w-32 bg-slate-100 dark:bg-white/5 rounded-md" />
								<Skeleton className="h-11 w-full bg-slate-100 dark:bg-white/5 rounded-xl" />
							</div>
							<div className="flex flex-col items-center justify-center space-y-4 pt-4">
								<Skeleton className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-2xl" />
								<Skeleton className="h-4 w-24 bg-slate-100 dark:bg-white/5 rounded-md" />
							</div>
							<div className="space-y-2 pt-4">
								<Skeleton className="h-5 w-40 bg-slate-100 dark:bg-white/5 rounded-md" />
								<Skeleton className="h-32 w-full bg-slate-100 dark:bg-white/5 rounded-xl" />
							</div>
						</div>
					)}

					<div
						className={cn(
							'transition-opacity duration-500',
							isFetchingDetails ? 'opacity-0' : 'opacity-100',
						)}
					>
						<FormProvider {...form}>
							<form
								id="product-editor-form"
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
											fieldTitle="Product Name"
											nameInSchema="name"
											placeholder="e.g. Zirconia Monolithic Crown"
										/>
									)}
								/>

								<div className="pt-2">
									<div className="flex items-center justify-between mb-2">
										<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">
											Product Image{' '}
											<span className="text-[10px] text-muted-foreground font-normal ml-1">
												(Optional)
											</span>
										</label>
									</div>
									<div className="p-6 rounded-2xl border border-border bg-slate-50/50 dark:bg-white/2 shadow-sm transition-colors hover:border-ai/30 group">
										{/* Note: Ensure CatalogImageUpload uses 'nameInSchema' internally via useFormContext */}
										<CatalogImageUpload
											nameInSchema="imageUrl"
											label="Product Thumbnail"
										/>
									</div>
								</div>

								<div className="pt-2">
									<Controller
										control={form.control}
										name="description"
										render={({ field, fieldState }) => (
											<CustomFieldWithLabel
												field={field}
												fieldState={fieldState}
												nameInSchema="description"
												fieldTitle="Technical Description"
												isOptional
											>
												<div className="relative group/desc">
													{/* Subtle Violet Glow behind textarea */}
													<div className="absolute -inset-0.5 bg-ai/20 rounded-xl blur opacity-0 group-focus-within/desc:opacity-100 transition duration-500" />
													<textarea
														{...field}
														value={field.value ?? ''}
														placeholder="Material specs, translucency properties, specific manufacturing details..."
														className={cn(
															'relative w-full min-h-30 p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm outline-none transition-all resize-none shadow-sm custom-scrollbar',
															fieldState.invalid
																? 'border-destructive focus:ring-destructive/20'
																: 'focus:ring-[3px] focus:ring-ai/20 focus:border-ai',
														)}
													/>
												</div>
											</CustomFieldWithLabel>
										)}
									/>
								</div>
							</form>
						</FormProvider>
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
						form="product-editor-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-ai shadow-premium shadow-ai/20 font-bold hover:bg-ai/90 transition-all text-white shrink-0"
					>
						{isProcessing ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : isEdit ? (
							<Check className="w-4 h-4" />
						) : (
							<Plus className="w-4 h-4" />
						)}
						{isEdit ? 'Update Product' : 'Save Product'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
})
