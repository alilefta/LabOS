"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, Sparkles, Loader2, MousePointer2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { CreateWorkTypeInput, CreateWorkTypeInputSchema } from "@/schema/composed/worktype.details";
import { WorkTypeBlueprintHierarchy } from "./worktype-blueprint-hierarchy";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	categoryContext: { id: string; name: string };
	// If these are provided, we skip the WorkType section and just create a product
	existingWorkTypeId?: string;
}

export function CreateWorkTypeSheet({ isOpen, onClose, categoryContext, existingWorkTypeId }: Props) {
	const form = useForm<CreateWorkTypeInput>({
		resolver: zodResolver(CreateWorkTypeInputSchema),
		defaultValues: {
			caseCategoryId: categoryContext.id,
			requireTeethSelection: true,
			product: {
				name: "",
				workTypeId: existingWorkTypeId || "",
				casePricingPlan: {
					name: "Standard Plan",
					isDefault: true,
					pricingStrategy: "PERTOOTH",
					toothPrice: 0,
				},
			},
		},
		mode: "onBlur",
	});

	// Mocking the nested action
	const isExecuting = false;

	const onSubmit = async (data: CreateWorkTypeInput) => {
		console.log("Atomic Catalog Creation:", data);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md! lg:max-w-lg! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent">
					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<Layers className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight">Create production blueprint</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground">Define a new work type and its initial product and pricing logic.</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
					{/* Hierarchy Guide */}
					<WorkTypeBlueprintHierarchy categoryName={categoryContext.name} isCreatingProductOnly={!!existingWorkTypeId} />

					<FormProvider {...form}>
						<form id="create-atomic-worktype-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
							{/* --- SECTION 1: WORK TYPE FOUNDATION --- */}
							{!existingWorkTypeId && (
								<section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
									<div className="flex items-center gap-3">
										<div className="w-1 h-4 bg-primary rounded-full" />
										<h3 className="text-sm font-bold text-foreground">1. Work type details</h3>
									</div>

									<Controller
										control={form.control}
										name="name"
										render={({ field, fieldState }) => (
											<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Work type name" nameInSchema="name" placeholder="e.g. Crowns & Bridges, Nightguards..." />
										)}
									/>

									<div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-border flex items-center justify-between">
										<div className="flex gap-3 items-start">
											<div className="w-8 h-8 rounded-lg bg-white dark:bg-[#121214] border border-border flex items-center justify-center text-primary shadow-sm">
												<MousePointer2 className="w-4 h-4" />
											</div>
											<div className="flex flex-col gap-0.5">
												<span className="text-[13px] font-semibold text-foreground">Enable tooth mapping</span>
												<span className="text-[11px] text-muted-foreground">Show the dental arch UI for cases in this type.</span>
											</div>
										</div>
										<Controller
											control={form.control}
											name="requireTeethSelection"
											render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />}
										/>
									</div>
								</section>
							)}

							{/* --- SECTION 2: INITIAL PRODUCT (Placeholder for next turn) --- */}
							<div className="pt-10 border-t border-border border-dashed opacity-50">
								<h3 className="text-sm font-bold text-muted-foreground">2. Initial product details coming next...</h3>
							</div>
						</form>
					</FormProvider>
				</div>

				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<Button variant="ghost" onClick={onClose} className="rounded-xl h-11! px-6 font-semibold">
						Cancel
					</Button>
					<Button type="submit" form="create-atomic-worktype-form" className="rounded-xl h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 flex-1">
						Next: Define Pricing
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
