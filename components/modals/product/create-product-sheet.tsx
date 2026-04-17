"use client";

import { memo, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Package, Box } from "lucide-react";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";

import { useClinicalCreationStore } from "@/store/use-clinical-creation-store";

import { WorkTypeBlueprintHierarchy } from "../work-type/worktype-blueprint-hierarchy";
import { CatalogImageUpload } from "@/components/shared/file-assets/catalog-image-upload";
import { createProductAction } from "@/actions/product";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { CreateProductInput, CreateProductInputSchema, ProductDetailsUI } from "@/schema/composed/product.details";
import { useQueryClient } from "@tanstack/react-query";

type QueryDataShape = ProductDetailsUI[];

export const CreateProductSheet = memo(function CreateProductSheet() {
	// 1. High-Performance Atomic Zustand Subscriptions
	const isProductSheetOpen = useClinicalCreationStore((state) => state.isProductSheetOpen);
	const closeAllSheets = useClinicalCreationStore((state) => state.closeAllSheets);
	const activeWorkTypeId = useClinicalCreationStore((state) => state.activeWorkTypeId);
	const setNewlyCreated = useClinicalCreationStore((state) => state.setNewlyCreated);

	const queryClient = useQueryClient();

	const form = useForm<CreateProductInput>({
		resolver: zodResolver(CreateProductInputSchema),
		defaultValues: {
			name: "",
			description: "",
			imageUrl: "",
			workTypeId: "",
		},
		mode: "onBlur",
	});

	console.log("Create-Product-Sheet Rendered, WT ID:", activeWorkTypeId);

	const { executeAsync: createProduct, isExecuting } = useAction(createProductAction, {
		onSuccess: ({ data }) => {
			toast.success("Product created successfully");

			// MAGIC: Tell Zustand this ID was just created so the Configurator auto-selects it!
			if (data?.product?.id) {
				setNewlyCreated("product", data.product.id);
			}

			queryClient.setQueryData<QueryDataShape>(["products", activeWorkTypeId], (old: QueryDataShape | undefined) => {
				if (!old) return [data.product];

				// Safely check if the background fetch already pulled this new item in
				const exists = old.some((c) => c.id === data.product.id);
				if (exists) return old;

				return [...old, data.product];
			});

			queryClient.invalidateQueries({
				queryKey: ["products", activeWorkTypeId],
			});

			closeAllSheets();
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	// 2. Hydrate the WorkType ID when the sheet opens
	useEffect(() => {
		if (activeWorkTypeId) {
			form.setValue("workTypeId", activeWorkTypeId);
		}
	}, [activeWorkTypeId, form]);

	const onSubmit = async (data: CreateProductInput) => {
		await createProduct(data);
	};

	return (
		<Sheet open={isProductSheetOpen} onOpenChange={(open) => !open && closeAllSheets()}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER (Violet AI Branding) --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-ai/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Box className="w-24 h-24 text-ai" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-ai/10 flex items-center justify-center text-ai mb-4 shadow-ai-glow-light">
						<Package className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Define Catalog Item</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">Add a specific manufacturing product to your selected department.</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					{/* UX FEATURE: HIERARCHY EDUCATION */}
					{/* NOTE: If you have access to the activeCategoryName in your store, pass it here! */}
					<WorkTypeBlueprintHierarchy categoryName="Selected Category" isCreatingProductOnly={true} />

					<FormProvider {...form}>
						<form id="create-product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Product Name" nameInSchema="name" placeholder="e.g. Zirconia Monolithic Crown" />
								)}
							/>

							{/* UI FIX: Added explicit "Optional" label wrapper so it flows visually with the other inputs */}
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label className="text-[13px] font-semibold text-slate-700 dark:text-zinc-300">
										Product Image <span className="text-[10px] text-muted-foreground font-normal ml-1">(Optional)</span>
									</label>
								</div>
								<div className="p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-white/2">
									<CatalogImageUpload nameInSchema="imageUrl" label="Product" />
								</div>
							</div>

							<Controller
								control={form.control}
								name="description"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="description" fieldTitle="Product Description" isOptional>
										<textarea
											{...field}
											value={field.value ?? ""}
											placeholder="Internal notes or specific manufacturing details..."
											className="w-full min-h-24 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-[3px] focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm"
										/>
									</CustomFieldWithLabel>
								)}
							/>
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
						form="create-product-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-primary-foreground"
					>
						{isExecuting ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Product"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
});
