'use client'

import { memo, useEffect } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Shapes,
	Loader2,
	Info,
	LayoutGrid,
	Layers,
	Package,
	Edit3,
	Check,
	Plus,
	Archive,
} from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { cn } from '@/lib/utils'

import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	CaseCategoryDetailsUI,
	CreateCaseCategoryInput,
	CreateCaseCategoryInputSchema,
	UpdateCaseCategoryInput,
	UpdateCaseCategoryInputSchema,
} from '@/schema/composed/case-category.details'
import { createCaseCategoryAction } from '@/actions/case-category'
import { updateCaseCategoryAction } from '@/actions/catalog/categories/update-category'
import { CategoryIconUpload } from '../../case-category/category-icon-upload'
import { getCategoryByIdAction } from '@/actions/catalog/categories/get-category'

interface Props {
	isOpen: boolean
	onClose: () => void

	// Edit Mode Props
	categoryIdToEdit?: string | null
	isEdit?: boolean
	onSuccess?: () => void
	onCategoryCreated?: (newCategory: CaseCategoryDetailsUI) => void
}

type QueryDataShape = CaseCategoryDetailsUI[]

const FORM_DEFAULT_VALUES: CreateCaseCategoryInput = {
	name: '',
	description: '',
	isArchived: false,
	imageUrl: '',
}

export const CategoryEditorSheet = memo(function CategoryEditorSheet({
	isOpen,
	onClose,
	categoryIdToEdit,
	isEdit = false,
	onCategoryCreated,
	onSuccess,
}: Props) {
	const queryClient = useQueryClient()

	// ── 1. FORM SETUP ─────────────────────────────────────────────────────────
	const form = useForm<CreateCaseCategoryInput>({
		resolver: zodResolver(CreateCaseCategoryInputSchema),
		defaultValues: FORM_DEFAULT_VALUES,
		mode: 'onBlur',
	})

	// ── 2. HYDRATION (EDIT MODE) ──────────────────────────────────────────────
	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ['category-details', categoryIdToEdit],
		queryFn: async () => {
			if (!categoryIdToEdit) return null
			const res = await getCategoryByIdAction({ categoryId: categoryIdToEdit })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return null
			}
			return res.data?.category ?? null
		},
		enabled: isOpen && isEdit && !!categoryIdToEdit,
		staleTime: 0,
	})

	// Sync local states when opened/hydrated
	useEffect(() => {
		if (isOpen) {
			if (isEdit && initialData) {
				form.reset({
					name: initialData.name || '',
					description: initialData.description || undefined,
					imageUrl: initialData.imageUrl || undefined,
					isArchived: initialData.isArchived ?? false,
				})
			} else if (!isEdit) {
				// Create Mode: Reset to blank slate
				form.reset(FORM_DEFAULT_VALUES)
			}
		}
	}, [isOpen, isEdit, initialData, form])

	useEffect(() => {
		console.log(form.formState)
	}, [form.formState.isDirty])

	// ── 3. SERVER ACTIONS ─────────────────────────────────────────────────────
	const { executeAsync: createCategory, isExecuting: isCreating } = useAction(
		createCaseCategoryAction,
		{
			onSuccess: ({ data }) => {
				toast.success('Clinical category created successfully')
				if (onSuccess) onSuccess()

				if (onCategoryCreated) onCategoryCreated(data.category)

				queryClient.setQueryData<QueryDataShape>(['categories'], (old) => {
					if (!old) return [data.category]
					const exists = old.some((c) => c.id === data.category.id)
					if (exists) return old
					return [...old, data.category]
				})

				onClose()
				form.reset()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const { executeAsync: updateCategory, isExecuting: isUpdating } = useAction(
		updateCaseCategoryAction,
		{
			onSuccess: () => {
				toast.success('Category details updated successfully.')

				if (onSuccess) onSuccess()
				// Invalidate lists to show new name immediately
				queryClient.invalidateQueries({ queryKey: ['categories'] })
				queryClient.invalidateQueries({ queryKey: ['catalog-tree'] })
				queryClient.invalidateQueries({
					queryKey: ['category-details', categoryIdToEdit],
				})

				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: CreateCaseCategoryInput) => {
		console.log('Submit button clicked')
		if (isEdit && categoryIdToEdit) {
			// Cast to Update input which likely requires an ID
			await updateCategory({
				...data,
				categoryId: categoryIdToEdit,
			} as UpdateCaseCategoryInput)
		} else {
			await createCategory(data)
		}
	}

	const isProcessing = isCreating || isUpdating

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(open) => !open && !isProcessing && onClose()}
		>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Shapes className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light relative z-10">
						{isEdit ? (
							<Edit3 className="w-6 h-6" />
						) : (
							<LayoutGrid className="w-6 h-6" />
						)}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground relative z-10">
						{isEdit ? 'Edit Category' : 'Define Category'}
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium relative z-10">
						{isEdit
							? 'Modify the structural details of this high-level department.'
							: 'Organize your dental lab workflow by defining high-level production departments.'}
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* Skeleton Overlay for Edit Mode Hydration */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 space-y-8 animate-pulse">
							<div className="h-40 w-full rounded-2xl bg-slate-100 dark:bg-white/2" />
							<div className="space-y-4">
								<Skeleton className="h-10 w-full rounded-xl bg-slate-100 dark:bg-white/2" />
								<Skeleton className="h-32 w-full rounded-xl bg-slate-100 dark:bg-white/2" />
							</div>
						</div>
					)}

					<div
						className={cn(
							'transition-opacity duration-500 space-y-8',
							isFetchingDetails ? 'opacity-0' : 'opacity-100',
						)}
					>
						{/* --- UX FEATURE: HIERARCHY EDUCATION --- */}
						<div className="p-5 rounded-3xl bg-slate-50 dark:bg-white/2 border border-border space-y-4 shadow-sm">
							<div className="flex items-center gap-2 mb-2">
								<Info className="w-4 h-4 text-primary" />
								<span className="text-[11px] font-bold uppercase tracking-widest text-foreground">
									Understanding hierarchy
								</span>
							</div>

							<div className="flex flex-col relative pl-2 ml-1">
								<div className="absolute top-4 bottom-4 left-2.75 w-0.5 bg-border dark:bg-white/5 -z-10"></div>

								<div className="flex items-start gap-4 pb-5">
									<div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214] shadow-sm shadow-primary/20">
										<LayoutGrid className="w-3 h-3" />
									</div>
									<div className="flex flex-col mt-0.5">
										<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">
											Category (Current)
										</span>
										<span className="text-xs font-bold text-foreground">
											e.g. Fixed Prosthetics
										</span>
									</div>
								</div>

								<div className="flex items-start gap-4 opacity-60 pb-5">
									<div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214]">
										<Layers className="w-3 h-3 text-slate-500" />
									</div>
									<div className="flex flex-col mt-0.5">
										<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">
											Work type
										</span>
										<span className="text-xs font-bold text-foreground">
											e.g. Crowns & Bridges
										</span>
									</div>
								</div>

								<div className="flex items-start gap-4 opacity-40">
									<div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center ring-4 ring-slate-50 dark:ring-[#121214]">
										<Package className="w-3 h-3 text-slate-500" />
									</div>
									<div className="flex flex-col mt-0.5">
										<span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-none mb-1">
											Product
										</span>
										<span className="text-xs font-bold text-foreground">
											e.g. Zirconia Multi-layer
										</span>
									</div>
								</div>
							</div>
						</div>

						<FormProvider {...form}>
							<form
								id="category-editor-form"
								onSubmit={form.handleSubmit(onSubmit, (errors) =>
									console.error('RHF Errors:', errors),
								)}
								className="space-y-6"
							>
								<Controller
									control={form.control}
									name="name"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											fieldTitle="Category name"
											nameInSchema="name"
											placeholder="e.g. Implants, Removables..."
										/>
									)}
								/>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300 ml-1">
											Category Image{' '}
											<span className="text-[10px] text-muted-foreground font-normal ml-1">
												(Optional)
											</span>
										</label>
									</div>
									<div className="p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-white/2 shadow-sm transition-colors hover:border-primary/30 group">
										<CategoryIconUpload />
									</div>
								</div>

								<Controller
									control={form.control}
									name="description"
									render={({ field, fieldState }) => (
										<CustomFieldWithLabel
											field={field}
											fieldState={fieldState}
											nameInSchema="description"
											fieldTitle="Category description"
											isOptional
										>
											<div className="relative group/desc">
												<div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within/desc:opacity-100 transition duration-500" />
												<textarea
													{...field}
													value={field.value ?? ''}
													placeholder="Describe the clinical scope of this category..."
													className={cn(
														'relative w-full min-h-24 p-4 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-[3px] focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm custom-scrollbar',
														fieldState.invalid &&
															'border-destructive focus:border-destructive focus:ring-destructive/20',
													)}
												/>
											</div>
										</CustomFieldWithLabel>
									)}
								/>

								{/* Archival Toggle */}
								<div className="pt-2">
									<div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border shadow-sm transition-colors focus-within:border-amber-500/30 hover:border-amber-500/30">
										<div className="flex flex-col gap-1 pr-4">
											<span className="text-sm font-bold text-foreground flex items-center gap-2">
												<Archive className="w-4 h-4 text-amber-500" />
												Archive Category
											</span>
											<span className="text-[11px] text-muted-foreground leading-relaxed">
												Hide this category and all nested products from the New
												Case screen. Existing active cases and historical
												invoices will remain completely unaffected.
											</span>
										</div>
										<Controller
											control={form.control}
											name="isArchived"
											render={({ field }) => (
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
													// UX FIX: Turning this ON is a soft-delete, so we use Amber instead of Primary
													className="data-[state=checked]:bg-amber-500 shrink-0 shadow-sm"
												/>
											)}
										/>
									</div>
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
						className="rounded-xl h-11! px-6 font-semibold"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={
							isProcessing || isFetchingDetails || !form.formState.isDirty
						}
						form="category-editor-form"
						className="rounded-xl flex  items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground shrink-0"
					>
						{isProcessing ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : isEdit ? (
							<Check className="w-4 h-4" />
						) : (
							<Plus className="w-4 h-4" />
						)}
						{isEdit ? 'Update Category' : 'Create Category'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
})
