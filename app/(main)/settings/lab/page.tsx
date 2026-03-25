"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, MapPin, Globe, Loader2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { toast } from "sonner";

// Mock Schema based on your Prisma Lab model
const LabSettingsSchema = z.object({
	title: z.string().min(2),
	subtitle: z.string().optional(),
	slug: z.string().min(3),
	brandAvatarUrl: z.string().url().optional().or(z.literal("")),
});
type LabSettingsInput = z.infer<typeof LabSettingsSchema>;

export default function LabSettingsPage() {
	const form = useForm<LabSettingsInput>({
		resolver: zodResolver(LabSettingsSchema),
		defaultValues: {
			title: "DentaFusion Labs",
			subtitle: "Premium Dental Restorations",
			slug: "dentafusion",
			brandAvatarUrl: "https://github.com/shadcn.png", // Mock
		},
	});

	const isUpdating = false;

	const onSubmit = async (data: LabSettingsInput) => {
		toast.success("Workspace details updated successfully");
	};

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-foreground tracking-tight">Workspace Settings</h2>
				<p className="text-sm text-muted-foreground mt-1">Manage the identity and public presence of your laboratory.</p>
			</div>

			{/* SECTION 1: Brand Identity */}
			<div className="lab-card overflow-hidden">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
						<Building2 className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Brand Identity</h3>
						<p className="text-sm text-muted-foreground mt-0.5">This is how clinics will identify your lab.</p>
					</div>
				</div>

				<div className="p-8">
					<div className="flex items-center gap-6 mb-8 pb-8 border-b border-border border-dashed">
						<div className="w-24 h-24 rounded-[20px] border border-border bg-slate-50 dark:bg-[#121214] flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
							<img src={form.getValues("brandAvatarUrl")} alt="Lab Logo" className="w-full h-full object-cover" />
							<div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
								<UploadCloud className="w-6 h-6 text-foreground" />
							</div>
						</div>
						<div>
							<h4 className="text-sm font-semibold text-foreground mb-1">Workspace Logo</h4>
							<p className="text-xs text-muted-foreground mb-4 max-w-sm">We recommend an image of at least 400x400px. This will be visible on invoices and the clinic portal.</p>
							<div className="flex gap-3">
								<Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-medium border-border hover:bg-secondary">
									Change Logo
								</Button>
							</div>
						</div>
					</div>

					<form onSubmit={form.handleSubmit(onSubmit)} id="lab-form" className="space-y-6">
						<Controller
							control={form.control}
							name="title"
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Lab Name" nameInSchema="title" />}
						/>

						<Controller
							control={form.control}
							name="subtitle"
							render={({ field, fieldState }) => (
								<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Subtitle (Optional)" nameInSchema="subtitle" placeholder="e.g. Precision Zirconia Specialists" />
							)}
						/>

						<div>
							<Controller
								control={form.control}
								name="slug"
								render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Portal URL Slug" nameInSchema="slug" />}
							/>
							<p className="text-[11px] text-muted-foreground mt-2 font-medium flex items-center gap-1.5">
								<Globe className="w-3 h-3 text-primary" />
								Your clinics will log in at: <span className="text-foreground font-mono">labos.app/portal/dentafusion</span>
							</p>
						</div>
					</form>
				</div>

				<div className="px-8 py-4 border-t border-border bg-slate-50/50 dark:bg-white/[0.02] flex justify-end">
					<Button
						type="submit"
						form="lab-form"
						disabled={isUpdating || !form.formState.isDirty}
						className="rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
					>
						{isUpdating ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
							</>
						) : (
							"Save Changes"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
