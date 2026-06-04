'use client'

import { memo, useEffect } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Loader2,
	Layers,
	Network,
	Stethoscope,
	AlertCircle,
} from 'lucide-react'
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
import { InputWithLabel } from '@/components/ui/custom/input-with-label'
import { CustomFieldWithLabel } from '@/components/ui/custom/custom-field-with-label'

import { handleSafeActionError } from '@/lib/safe-action-helpers'
import {
	CreateWorkTypeInput,
	CreateWorkTypeInputSchema,
	WorktypeDetailsUI,
} from '@/schema/composed/worktype.details'
import { useClinicalCreationStore } from '@/store/use-clinical-creation-store'
import { WorkTypeBlueprintHierarchy } from './worktype-blueprint-hierarchy'
import { CatalogImageUpload } from '@/components/shared/file-assets/catalog-image-upload'

import { createWorkTypeAction } from '@/actions/work-type'
import { useQueryClient } from '@tanstack/react-query'
import { CatalogCategorySelector } from '@/components/catalog/category/catalog-category-selector'

type QueryDataShape = WorktypeDetailsUI[]
const FORM_DEFAULT_VALUES = {
	name: '',
	description: '',
	imageUrl: '',
	requireTeethSelection: true,
	caseCategoryId: '',
}
export const CreateWorkTypeSheet = memo(function CreateWorkTypeSheet() {
	// 1. Connect to Zustand Store
	const isWorkTypeSheetOpen = useClinicalCreationStore(
		(state) => state.isWorkTypeSheetOpen,
	)
	const closeAllSheets = useClinicalCreationStore(
		(state) => state.closeAllSheets,
	)
	const activeCategoryId = useClinicalCreationStore(
		(state) => state.activeCategoryId,
	)
	const activeCategoryName = useClinicalCreationStore(
		(state) => state.activeCategoryName,
	)
	const activeJawType = useClinicalCreationStore((state) => state.activeJawType)
	const setNewlyCreated = useClinicalCreationStore(
		(state) => state.setNewlyCreated,
	)

	const queryClient = useQueryClient()

	const form = useForm<CreateWorkTypeInput>({
		resolver: zodResolver(CreateWorkTypeInputSchema),
		defaultValues: FORM_DEFAULT_VALUES,
		mode: 'onBlur',
	})

	// 2. Hydrate the Category ID into the form when the sheet opens
	useEffect(() => {
		if (isWorkTypeSheetOpen) {
			if (activeCategoryId) {
				form.setValue('caseCategoryId', activeCategoryId, {
					shouldValidate: true,
				})
			} else {
				form.reset(FORM_DEFAULT_VALUES) // Hard reset to clear previous global entries
			}

			if (activeJawType) {
				form.setValue('requireTeethSelection', activeJawType !== 'OTHER')
			}
		}
	}, [isWorkTypeSheetOpen, activeCategoryId, activeJawType, form])

	// 3. Server Action with Dynamic Cache Invalidation
	const { executeAsync: createWorkType, isExecuting } = useAction(
		createWorkTypeAction,
		{
			onSuccess: ({ data }) => {
				toast.success('Work type department created successfully')

				if (data?.worktype?.id) {
					setNewlyCreated('workType', data.worktype.id)
				}

				// --- QA FIX 1: ALWAYS invalidate the global navigation trees ---
				// This guarantees the Left Pane Accordion instantly draws the new WorkType!
				queryClient.invalidateQueries({ queryKey: ['catalog-tree'] })
				queryClient.invalidateQueries({ queryKey: ['case-categories'] })

				// --- QA FIX 2: Safe Scoped Invalidation ---
				if (activeJawType && activeCategoryId) {
					queryClient.setQueryData<QueryDataShape>(
						['workTypes', activeCategoryId, activeJawType],
						(old) => {
							if (!old) return [data.worktype]
							const exists = old.some((c) => c.id === data.worktype.id)
							if (exists) return old
							return [...old, data.worktype]
						},
					)
				} else if (activeCategoryId) {
					queryClient.invalidateQueries({
						queryKey: ['workTypes', activeCategoryId],
					})
				}

				closeAllSheets()
				form.reset(FORM_DEFAULT_VALUES) // Unified reset
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: CreateWorkTypeInput) => {
		await createWorkType(data)
	}

	return (
		<Sheet
			open={isWorkTypeSheetOpen}
			onOpenChange={(open) => !open && closeAllSheets()}
		>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Network className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<Layers className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
						Define Work Type
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						Create a manufacturing department (e.g. &quot;Crowns &
						Bridges&quot;) to organize your products.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					{/* Hierarchy Blueprint */}
					<WorkTypeBlueprintHierarchy
						categoryName={activeCategoryName}
						isCreatingProductOnly={false}
						isCreatingPriceOnly={false}
					/>

					<FormProvider {...form}>
						<form
							id="create-work-type-form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							{/* --- GLOBAL CONTEXT FALLBACK: CATEGORY SELECTOR --- */}
							{!activeCategoryId && (
								<div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 shadow-sm space-y-3 mb-6 animate-in fade-in slide-in-from-top-2">
									<h4 className="text-[11px] font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
										<AlertCircle className="w-3.5 h-3.5" /> Parent Category
										Required
									</h4>
									<p className="text-xs text-muted-foreground font-medium leading-snug">
										Since you are creating a Work Type globally, you must assign
										it to a parent Category.
									</p>
									<Controller
										control={form.control}
										name="caseCategoryId"
										render={({ field, fieldState }) => (
											<CatalogCategorySelector
												value={field.value}
												onSelect={(id, name) => {
													field.onChange(id) // Handles RHF Dirty & Validation states automatically!
													// Update the blueprint map in real-time
													useClinicalCreationStore.setState({
														activeCategoryName: name,
													})
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
								<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300 ml-1">
									Work Type Image{' '}
									<span className="text-[10px] text-muted-foreground font-normal ml-1">
										(Optional)
									</span>
								</label>
								<div className="p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-white/2 shadow-sm">
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
										<textarea
											{...field}
											value={field.value ?? ''}
											placeholder="Briefly describe the types of restorations handled here..."
											className="w-full min-h-24 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-[3px] focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm custom-scrollbar"
										/>
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
											If enabled, technicians must map specific teeth on the 3D
											odontogram when selecting products from this department.
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

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
					<Button
						variant="ghost"
						onClick={closeAllSheets}
						className="rounded-xl h-11! px-6 font-semibold"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !form.formState.isDirty}
						form="create-work-type-form"
						className="rounded-xl flex shrink-0 items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground"
					>
						{isExecuting ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : (
							'Save Department'
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
})

CreateWorkTypeSheet.displayName = 'CreateWorkTypeSheet'
