"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, ShieldAlert, Loader2, Save, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

// Custom UI Components
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { CustomFieldWithLabel } from "@/components/ui/custom/custom-field-with-label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Schemas & Actions
import { updateStaffIdentityAction } from "@/actions/team/staff-settings/update-staff-identity"; // Adjust import path
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { UpdateStaffIdentityInput, UpdateStaffIdentityInputSchema } from "@/schema/composed/team/staff-settings.schema";

interface Props {
	initialData: UpdateStaffIdentityInput;
}

const ROLE_OPTIONS = [
	{ id: "TECHNICIAN", label: "Technician" },
	{ id: "SENIOR_TECHNICIAN", label: "Senior Tech" },
	{ id: "QC_INSPECTOR", label: "QC Inspector" },
	{ id: "COURIER", label: "Courier" },
	{ id: "MANAGER", label: "Manager" },
];

export function StaffIdentityCard({ initialData }: Props) {
	// Initialize the localized form strictly for this card's scope [3]
	const form = useForm<UpdateStaffIdentityInput>({
		resolver: zodResolver(UpdateStaffIdentityInputSchema),
		defaultValues: initialData,
		mode: "onBlur",
	});

	const isWatcherActive = form.watch("isActive");

	// --- SERVER ACTION ---
	const { executeAsync: updateIdentity, isExecuting } = useAction(updateStaffIdentityAction, {
		onSuccess: () => {
			toast.success("Identity profile updated successfully.");
			form.reset(form.getValues()); // Re-hydrate defaultValues to reset `isDirty` state [3]
		},
		onError: ({ error }) => {
			// If the deactivation burnout guard throws, catch and print it here
			if (error.serverError) {
				toast.error("Operation Denied", { description: error.serverError.message });
			} else {
				handleSafeActionError(error);
			}
		},
	});

	const onSubmit = async (data: UpdateStaffIdentityInput) => {
		await updateIdentity(data);
	};

	// Save button remains disabled until a change actually occurs in this card [3]
	const isDirty = form.formState.isDirty;

	return (
		<div className="lab-card overflow-hidden flex flex-col relative group transition-all duration-300">
			{/* Ambient status indicator */}
			<div className={cn("absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-10 transition-colors duration-1000", isWatcherActive ? "bg-primary" : "bg-destructive")} />

			{/* --- CARD HEADER --- */}
			<div className="p-6 border-b border-border bg-slate-50/50 dark:bg-white/2 flex items-center gap-3 relative z-10">
				<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
					<User className="w-4 h-4" />
				</div>
				<div>
					<h3 className="text-sm font-bold text-foreground">Identity & Roster Position</h3>
					<p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Core Employment Details</p>
				</div>
			</div>

			{/* --- CARD BODY --- */}
			<div className="p-6 sm:p-8 space-y-6 relative z-10">
				<form id={`identity-form-${initialData.staffId}`} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Name Row */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Controller
							control={form.control}
							name="firstName"
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="First Name" nameInSchema="firstName" placeholder="Elena" />}
						/>
						<Controller
							control={form.control}
							name="lastName"
							render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Last Name" nameInSchema="lastName" placeholder="Vance" />}
						/>
					</div>

					{/* Phone & Job Title */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Controller
							control={form.control}
							name="phoneNumber"
							render={({ field, fieldState }) => (
								<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Phone Number" nameInSchema="phoneNumber" placeholder="+1 (555) 000-0000" />
							)}
						/>
						<Controller
							control={form.control}
							name="jobTitle"
							render={({ field, fieldState }) => (
								<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Internal Job Title (Optional)" nameInSchema="jobTitle" placeholder="Senior Ceramist" isOptional />
							)}
						/>
					</div>

					{/* Specialization & Role Category */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						<Controller
							control={form.control}
							name="specialization"
							render={({ field, fieldState }) => (
								<InputWithLabel
									field={field}
									fieldState={fieldState}
									fieldTitle="Technical Specialization (Optional)"
									nameInSchema="specialization"
									placeholder="e.g., Full Arch Zirconia"
									isOptional
								/>
							)}
						/>

						{/* Role Category Selector */}
						<Controller
							control={form.control}
							name="roleCategory"
							render={({ field, fieldState }) => (
								<CustomFieldWithLabel field={field} fieldState={fieldState} nameInSchema="roleCategory" fieldTitle="Roster Role Category">
									<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-11 w-full">
										{ROLE_OPTIONS.map((opt) => (
											<button
												key={opt.id}
												type="button"
												onClick={() => field.onChange(opt.id)}
												className={cn(
													"flex-1 text-[9px] font-bold rounded-lg transition-all uppercase tracking-tighter",
													field.value === opt.id ? "bg-white dark:bg-[#121214] text-primary shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
												)}
											>
												{opt.label}
											</button>
										))}
									</div>
								</CustomFieldWithLabel>
							)}
						/>
					</div>

					{/* Employment Status Toggle */}
					<div className="space-y-4 pt-4 border-t border-border">
						<div
							className={cn(
								"flex items-center justify-between p-4 rounded-xl border transition-all duration-300 shadow-sm",
								isWatcherActive ? "border-border bg-slate-50 dark:bg-white/1" : "border-destructive/30 bg-destructive/5 animate-pulse",
							)}
						>
							<div className="flex flex-col gap-0.5">
								<span className={cn("text-[13px] font-bold", !isWatcherActive && "text-destructive")}>Active Employment Status</span>
								<span className="text-[10px] text-muted-foreground leading-relaxed max-w-[260px]">Allow assignments and maintain system access.</span>
							</div>
							<Controller
								control={form.control}
								name="isActive"
								render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />}
							/>
						</div>

						{/* In-Line Warning Card on Status Change */}
						{!isWatcherActive && (
							<div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex gap-3 items-start animate-in fade-in slide-in-from-top-2 duration-300">
								<ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
								<div className="flex flex-col gap-0.5">
									<span className="text-[10px] font-bold text-destructive uppercase tracking-widest">Crucial Warning</span>
									<p className="text-[11px] text-destructive/80 font-medium leading-relaxed">
										Deactivating this employee will **instantly block their software login** and freeze their Roster profile. This action will fail if they have cases currently on
										their bench.
									</p>
								</div>
							</div>
						)}
					</div>
				</form>
			</div>

			<div className="p-6 border-t border-border bg-slate-50/30 dark:bg-white/1 mt-auto flex justify-end shrink-0 relative z-10">
				<Button
					type="submit"
					form={`identity-form-${initialData.staffId}`}
					disabled={!isDirty || isExecuting}
					className={cn(
						"rounded-xl h-11 px-6 font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2",
						isDirty ? "bg-primary text-primary-foreground shadow-premium hover:bg-primary/90" : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-zinc-500 cursor-not-allowed",
					)}
				>
					{isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 shrink-0" />}
					Save Profile Changes
				</Button>
			</div>
		</div>
	);
}
