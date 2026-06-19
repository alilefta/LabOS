'use client'

import { memo, useEffect } from 'react'
import { useForm, Controller, FormProvider, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import {
	Loader2,
	Layers,
	Network,
	Stethoscope,
	AlertCircle,
	Edit3,
	Plus,
	Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'
import { Skeleton } from '@/components/ui/skeleton'

import { CatalogImageUpload } from '@/components/shared/file-assets/catalog-image-upload'
import { WorkTypeBlueprintHierarchy } from '../../work-type/worktype-blueprint-hierarchy'
import { CatalogCategorySelector } from '@/components/catalog/category/catalog-category-selector'

import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	CreateWorkTypeInput,
	CreateWorkTypeInputSchema,
	UpdateWorkTypeInput,
} from '@/schema/composed/worktype.details'

// --- ASSUMED ACTION IMPORTS ---
import { getWorktypeByIdAction } from '@/actions/catalog/worktypes/get-worktype'
import { updateWorkTypeAction } from '@/actions/catalog/worktypes/update-worktype'
import { createWorkTypeAction } from '@/actions/work-type'

interface Props {
	isOpen: boolean
	onClose: () => void
	categoryId: string | null // The parent category (if known)
	categoryName: string | null
	workTypeIdToEdit?: string | null
	isEdit?: boolean
	onSuccess?: (workTypeId?: string) => void
}

const FORM_DEFAULT_VALUES = {
	name: '',
	description: '',
	imageUrl: '',
	requireTeethSelection: true,
	caseCategoryId: '',
}

export const WorkTypeEditorSheet = memo(function WorkTypeEditorSheet({
	isOpen,
	onClose,
	categoryId,
	categoryName,
	workTypeIdToEdit,
	isEdit = false,
	onSuccess,
}: Props) {
	// const queryClient = useQueryClient()

	// ── 1. FORM SETUP ─────────────────────────────────────────────────────────
	const form = useForm<CreateWorkTypeInput>({
		resolver: zodResolver(CreateWorkTypeInputSchema),
		defaultValues: FORM_DEFAULT_VALUES,
		mode: 'onBlur',
	})

	const selectedCategoryId = useWatch({
		control: form.control,
		name: 'caseCategoryId',
	})

	// ── 2. HYDRATION (EDIT MODE) ──────────────────────────────────────────────
	const { data: initialData, isFetching: isFetchingDetails } = useQuery({
		queryKey: ['worktype-details', workTypeIdToEdit],
		queryFn: async () => {
			if (!workTypeIdToEdit) return null
			const res = await getWorktypeByIdAction({ workTypeId: workTypeIdToEdit })
			if (res.serverError || res.validationErrors) {
				handleSafeActionError({
					serverError: res.serverError,
					validationErrors: res.validationErrors,
				})
				return null
			}
			return res.data?.workType ?? null
		},
		enabled: isOpen && isEdit && !!workTypeIdToEdit,
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
					requireTeethSelection: initialData.requireTeethSelection,
					caseCategoryId: initialData.caseCategoryId || categoryId || '',
				})
			} else if (!isEdit) {
				// Create Mode: Reset to incoming context
				form.reset({
					...FORM_DEFAULT_VALUES,
					caseCategoryId: categoryId || '',
				})
			}
		}
	}, [isOpen, isEdit, initialData, form, categoryId])

	// ── 3. ACTIONS ────────────────────────────────────────────────────────────
	const { executeAsync: createWorkType, isExecuting: isCreating } = useAction(
		createWorkTypeAction,
		{
			onSuccess: () => {
				toast.success('Work type department created successfully.')

				onClose()
				form.reset(FORM_DEFAULT_VALUES)
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const { executeAsync: updateWorkType, isExecuting: isUpdating } = useAction(
		updateWorkTypeAction,
		{
			onSuccess: () => {
				toast.success('Department details updated.')

				onClose()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: CreateWorkTypeInput) => {
		if (isEdit && workTypeIdToEdit) {
			await updateWorkType({
				...data,
				workTypeId: workTypeIdToEdit,
			} as UpdateWorkTypeInput)
		} else {
			await createWorkType(data)
		}

		if (onSuccess) {
			onSuccess()
		}
	}

	const isProcessing = isCreating || isUpdating

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<SheetContent className="sm:max-w-md border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Network className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						{isEdit ? (
							<Edit3 className="w-6 h-6" />
						) : (
							<Layers className="w-6 h-6" />
						)}
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
						{isEdit ? 'Edit Work Type' : 'Define Work Type'}
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						{isEdit
							? 'Modify the structural details and clinical requirements for this department.'
							: 'Create a manufacturing department (e.g. "Crowns & Bridges") to organize your products.'}
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
					{/* CRITICAL FIX: The Skeleton Overlay for Edit Mode Hydration */}
					{isFetchingDetails && (
						<div className="absolute inset-0 z-50 bg-card dark:bg-[#09090B] p-8 space-y-8">
							<Skeleton className="h-20 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />
							<div className="space-y-4">
								<Skeleton className="h-10 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
								<Skeleton className="h-32 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
							</div>
						</div>
					)}

					<div
						className={cn(
							'transition-opacity duration-500 space-y-8',
							isFetchingDetails ? 'opacity-0' : 'opacity-100',
						)}
					>
						{/* Hierarchy Blueprint (Contextually aware) */}
						<WorkTypeBlueprintHierarchy
							categoryName={categoryName || 'Selected Category'}
							isCreatingProductOnly={false}
							isCreatingPriceOnly={false}
						/>

						<FormProvider {...form}>
							<form
								id="work-type-editor-form"
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* --- GLOBAL CONTEXT FALLBACK: CATEGORY SELECTOR --- */}
								{/* If the user clicks "New Work Type" globally, they MUST select a parent category */}
								{!categoryId && !isEdit && (
									<div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 shadow-sm space-y-3 mb-6 animate-in fade-in slide-in-from-top-2">
										<h4 className="text-[11px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
											<AlertCircle className="w-3.5 h-3.5" /> Parent Category
											Required
										</h4>
										<p className="text-xs text-muted-foreground font-medium leading-snug">
											Since you are creating a Work Type globally, you must
											assign it to a parent Category.
										</p>
										<Controller
											control={form.control}
											name="caseCategoryId"
											render={({ field, fieldState }) => (
												<CatalogCategorySelector
													value={field.value}
													onSelect={(id) => {
														field.onChange(id) // Updates RHF state
													}}
													fieldError={fieldState.error}
												/>
											)}
										/>
									</div>
								)}

								<Controller
									control={form.control}
									name="name"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											fieldTitle="Department Name"
											nameInSchema="name"
											placeholder="e.g. Implant Components"
										/>
									)}
								/>

								{/* Work Type Image */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300 ml-1">
											Work Type Image{' '}
											<span className="text-[10px] text-muted-foreground font-normal ml-1">
												(Optional)
											</span>
										</label>
									</div>
									<div className="p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-white/2 shadow-sm transition-colors hover:border-primary/30 group">
										<CatalogImageUpload
											nameInSchema="imageUrl"
											label="Work Type"
										/>
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
											fieldTitle="Department Description"
											isOptional
										>
											<div className="relative group/desc">
												<div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-0 group-focus-within/desc:opacity-100 transition duration-500" />
												<textarea
													{...field}
													value={field.value ?? ''}
													placeholder="Briefly describe the types of restorations handled here..."
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

								{/* Dental Logic Toggle */}
								<div className="pt-2">
									<div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border shadow-sm">
										<div className="flex flex-col gap-1 pr-4">
											<span className="text-sm font-bold text-foreground flex items-center gap-2">
												<Stethoscope className="w-4 h-4 text-primary" />
												Require Clinical Charting
											</span>
											<span className="text-[11px] text-muted-foreground leading-relaxed">
												If enabled, technicians must map specific teeth on the
												3D odontogram when selecting products from this
												department.
											</span>
										</div>
										<Controller
											control={form.control}
											name="requireTeethSelection"
											render={({ field }) => (
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
													className="data-[state=checked]:bg-primary shrink-0"
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
						className="rounded-xl h-11 px-6 font-semibold"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={
							isProcessing ||
							isFetchingDetails ||
							!form.formState.isDirty ||
							(isEdit ? false : !selectedCategoryId)
						}
						form="work-type-editor-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground shrink-0"
					>
						{isProcessing ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : isEdit ? (
							<Check className="w-4 h-4" />
						) : (
							<Plus className="w-4 h-4" />
						)}
						{isEdit ? 'Update Department' : 'Save Department'}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
})

WorkTypeEditorSheet.displayName = 'WorkTypeEditorSheet'
