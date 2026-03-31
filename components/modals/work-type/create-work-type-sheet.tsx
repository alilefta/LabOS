"use client";

import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Layers, Network, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";

import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { CreateWorkTypeInput, CreateWorkTypeInputSchema } from "@/schema/composed/worktype.details";
import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";
import { WorkTypeBlueprintHierarchy } from "./worktype-blueprint-hierarchy";
import { CatalogImageUpload } from "@/components/shared/catalog-image-upload";

import { createWorkTypeAction } from "@/actions/work-type";

export function CreateWorkTypeSheet() {
	// 1. Connect to Zustand Store
	const isWorkTypeSheetOpen = useClinicalCreationStore((state) => state.isWorkTypeSheetOpen);
	const closeAllSheets = useClinicalCreationStore((state) => state.closeAllSheets);
	const activeCategoryId = useClinicalCreationStore((state) => state.activeCategoryId);
	const setNewlyCreated = useClinicalCreationStore((state) => state.setNewlyCreated);

	const form = useForm<CreateWorkTypeInput>({
		resolver: zodResolver(CreateWorkTypeInputSchema),
		defaultValues: {
			name: "",
			description: "",
			imageUrl: "",
			requireTeethSelection: true,
			caseCategoryId: "",
		},
		mode: "onBlur",
	});

	// 2. Hydrate the Category ID into the form when the sheet opens
	useEffect(() => {
		if (activeCategoryId) {
			form.setValue("caseCategoryId", activeCategoryId);
		}
	}, [activeCategoryId, form]);

	const { executeAsync: createWorkType, isExecuting } = useAction(createWorkTypeAction, {
		onSuccess: ({ data }) => {
			toast.success("Work type department created successfully");

			// MAGIC: Tell Zustand this ID was just created so the Configurator auto-selects it!
			if (data?.worktype?.id) {
				setNewlyCreated("workType", data.worktype.id);
			}

			closeAllSheets();
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: CreateWorkTypeInput) => {
		await createWorkType(data);
		console.log("Submitting Work Type:", data);

		// Mock success flow:
		toast.success("Work type department created successfully");
		setNewlyCreated("workType", "mock-new-wt-id");
		closeAllSheets();
		form.reset();
	};

	useEffect(() => {
		console.log("Create-work-type-sheet-form Errors", form.formState.errors);
	}, [form.formState.errors]);

	return (
		<Sheet open={isWorkTypeSheetOpen} onOpenChange={(open) => !open && closeAllSheets()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Network className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<Layers className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Define Work Type</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						Create a manufacturing department (e.g. &quot;Crowns & Bridges&quot;) to organize your products.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					{/* --- UX FEATURE: HIERARCHY EDUCATION --- */}
					<WorkTypeBlueprintHierarchy categoryName="Selected Category" isCreatingProductOnly={false} isCreatingPriceOnly={false} />

					<FormProvider {...form}>
						<form id="create-work-type-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Department Name" nameInSchema="name" placeholder="e.g. Implant Components" />
								)}
							/>

							{/* UI FIX: Added explicit "Optional" label wrapper so it flows visually with the other inputs */}
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">
										Work Type Image <span className="text-[10px] text-muted-foreground font-normal ml-1">(Optional)</span>
									</label>
								</div>
								<div className="p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-white/[0.02]">
									<CatalogImageUpload nameInSchema="imageUrl" label="Work Type" />{" "}
								</div>
							</div>

							<Controller
								control={form.control}
								name="description"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="description" fieldTitle="Department Description" isOptional>
										<textarea
											{...field}
											value={field.value ?? ""}
											placeholder="Briefly describe the types of restorations handled here..."
											className="w-full min-h-24 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-[3px] focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm"
										/>
									</CustomFieldWithLabel>
								)}
							/>

							{/* Dental Logic Toggle */}
							<div className="pt-2">
								<div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border">
									<div className="flex flex-col gap-1 pr-4">
										<span className="text-sm font-bold text-foreground flex items-center gap-2">
											<Stethoscope className="w-4 h-4 text-primary" />
											Require Clinical Charting
										</span>
										<span className="text-[11px] text-muted-foreground leading-relaxed">
											If enabled, technicians must map specific teeth on the 3D odontogram when selecting products from this department.
										</span>
									</div>
									<Controller
										control={form.control}
										name="requireTeethSelection"
										render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary shrink-0" />}
									/>
								</div>
							</div>
						</form>
					</FormProvider>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={closeAllSheets} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !form.formState.isDirty}
						form="create-work-type-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground"
					>
						{isExecuting ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Department"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
