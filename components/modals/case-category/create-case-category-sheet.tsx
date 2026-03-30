"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shapes, Loader2, Info, LayoutGrid, Layers, Package } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { createCaseCategoryAction } from "@/actions/case-category"; // Assuming your action name
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { cn } from "@/lib/utils";
import { CaseCategoryDetailsUI, CreateCaseCategoryInput, CreateCaseCategoryInputSchema } from "@/schema/composed/case-category.details";
import { CategoryIconUpload } from "./category-icon-upload";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onCategoryCreated?: (newCategory: CaseCategoryDetailsUI) => void;
}

export function CreateCategorySheet({ isOpen, onClose, onCategoryCreated }: Props) {
	const form = useForm<CreateCaseCategoryInput>({
		resolver: zodResolver(CreateCaseCategoryInputSchema),
		defaultValues: {
			name: "",
			description: "",
			isActive: true,
		},
		mode: "onBlur",
	});

	const { executeAsync: createCategory, isExecuting } = useAction(createCaseCategoryAction, {
		onSuccess: ({ data }) => {
			toast.success("Clinical category created successfully");

			if (onCategoryCreated) onCategoryCreated(data.category);

			onClose();
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: CreateCaseCategoryInput) => {
		await createCategory(data);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<Shapes className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<LayoutGrid className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">Create clinical category</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium">Organize your dental lab workflow by defining high-level production departments.</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					{/* --- UX FEATURE: HIERARCHY EDUCATION --- */}
					<div className="p-5 rounded-3xl bg-slate-50 dark:bg-white/2 border border-border space-y-4">
						<div className="flex items-center gap-2 mb-2">
							<Info className="w-4 h-4 text-primary" />
							<span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Understanding hierarchy</span>
						</div>

						{/* Visual Tree Representation */}
						<div className="flex flex-col gap-2 pl-2 border-l-2 border-primary/20 ml-2">
							<div className="flex items-center gap-3">
								<div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm">
									<LayoutGrid className="w-3.5 h-3.5" />
								</div>
								<div className="flex flex-col">
									<span className="text-xs font-bold text-foreground">Category (Current)</span>
									<span className="text-[10px] text-muted-foreground">e.g. Fixed Prosthetics</span>
								</div>
							</div>
							<div className="h-4 w-px bg-border ml-3" />
							<div className="flex items-center gap-3 opacity-60">
								<div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center">
									<Layers className="w-3.5 h-3.5" />
								</div>
								<div className="flex flex-col">
									<span className="text-xs font-bold">Work type</span>
									<span className="text-[10px]">e.g. Crowns & Bridges</span>
								</div>
							</div>
							<div className="h-4 w-px bg-border ml-3" />
							<div className="flex items-center gap-3 opacity-40">
								<div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center">
									<Package className="w-3.5 h-3.5" />
								</div>
								<div className="flex flex-col">
									<span className="text-xs font-bold">Product</span>
									<span className="text-[10px]">e.g. Zirconia Multi-layer</span>
								</div>
							</div>
						</div>
					</div>

					<FormProvider {...form}>
						<form id="create-category-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<Controller
								control={form.control}
								name="name"
								render={({ field, fieldState }) => (
									<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Category name" nameInSchema="name" placeholder="e.g. Implants, Removables..." />
								)}
							/>

							{/* Icon / Image URL placeholder */}
							<CategoryIconUpload />

							<Controller
								control={form.control}
								name="description"
								render={({ field, fieldState }) => (
									<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="description" fieldTitle="Category description" isOptional>
										<textarea
											{...field}
											value={field.value ?? ""}
											placeholder="Describe the clinical scope of this category..."
											className="w-full min-h-24 p-3 bg-white dark:bg-[#121214] border border-border rounded-xl text-sm focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
										/>
									</CustomFieldWithLabel>
								)}
							/>

							{/* Visibility Toggle */}
							<div className="pt-4 flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-border">
								<div className="flex flex-col gap-1">
									<span className="text-sm font-bold text-foreground">Active status</span>
									<span className="text-[11px] text-muted-foreground">Allow cases to be registered under this category.</span>
								</div>
								<Controller
									control={form.control}
									name="isActive"
									render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />}
								/>
							</div>
						</form>
					</FormProvider>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isExecuting || !form.formState.isDirty}
						form="create-category-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all "
					>
						{isExecuting ? <Loader2 className="animate-spin w-4 h-4" /> : "Create category"}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
