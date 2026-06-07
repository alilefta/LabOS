'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Settings2, Plus, Loader2, DollarSign, PackagePlus } from 'lucide-react'
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
import { toast } from 'sonner'
import { useAction } from 'next-safe-action/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import {
	CreateProductAddonInput,
	CreateProductAddonInputSchema,
} from '@/schema/composed/catalog/product.schema'

// import { createProductAddonAction } from "@/actions/catalog/create-addon"; // You will build this next

interface Props {
	isOpen: boolean
	onClose: () => void
	productId: string
}

export function CreateAddonSheet({ isOpen, onClose, productId }: Props) {
	const queryClient = useQueryClient()

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

	// --- SERVER ACTION (Placeholder) ---
	// const { executeAsync: createAddon, isExecuting } = useAction(createProductAddonAction, {
	// 	onSuccess: ({ data }) => {
	// 		toast.success(`Accessory "${data.addon.name}" added successfully.`);

	// 		// Optimistic Cache Update: Inject new addon into the grid instantly
	// 		queryClient.setQueryData(["product-addons", productId], (old: ProductAddonDTO[] | undefined) => {
	// 			if (!old) return [data.addon];
	// 			return [...old, data.addon];
	// 		});

	// 		onClose();
	// 		form.reset();
	// 	},
	// 	onError: ({ error }) => {
	// 		toast.error(error?.serverError || "Failed to create accessory.");
	// 	},
	// });

	const isExecuting = false // Temporary for mockup

	const onSubmit = async (data: CreateProductAddonInput) => {
		console.log('Submitting Addon Payload:', data)
		// await createAddon(data);
	}

	const isDirty = form.formState.dirtyFields.name

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="sm:max-w-md border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<PackagePlus className="w-24 h-24 text-primary" />
					</div>

					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<Settings2 className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
						Add Accessory
					</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">
						Define physical modifications or optional upgrades for this product.
					</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
					<form
						id="create-addon-form"
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						{/* Item Identity */}
						<div className="space-y-4">
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
						</div>

						{/* Item Pricing (Emerald Themed) */}
						<div className="space-y-4 pt-4 border-t border-border">
							<div className="flex items-center gap-2 mb-2 px-1">
								<DollarSign className="w-4 h-4 text-emerald-500" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
									Surcharge / Flat Fee
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
										inputClassName="font-mono text-emerald-600 dark:text-emerald-400 font-bold focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20"
									/>
								)}
							/>
							<div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-border mt-2">
								<p className="text-[10px] text-muted-foreground leading-relaxed">
									This amount will be added to the final invoice automatically
									whenever a technician attaches this accessory to the product
									during case entry.
								</p>
							</div>
						</div>
					</form>
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
						disabled={isExecuting || !isDirty}
						form="create-addon-form"
						className="rounded-xl flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all flex-1 text-primary-foreground"
					>
						{isExecuting ? (
							<Loader2 className="animate-spin w-4 h-4" />
						) : (
							<>
								<Plus className="w-4 h-4" /> Create Accessory
							</>
						)}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
