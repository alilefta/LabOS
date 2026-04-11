"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, Loader2, Sparkles, Truck, Wrench, Briefcase, ShieldCheck, UserCog, Headset, BadgePercent, DollarSign, Wallet, Check } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { InputWithLabel } from "@/components/ui/custom/input-with-label";
import { cn } from "@/lib/utils";

import { StaffRoleCategory } from "@/schema/base/enums.base";
import { CreateLabStaffInput, CreateLabStaffInputSchema, LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { useAction } from "next-safe-action/hooks";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { createLabStaffAction } from "@/actions/staff";

type DataShape = LabStaffDetailsUI[];

// const transform = {
// 	input: (value: number | undefined) => (isNaN(value) || value === undefined ? "" : value.toString()),
// 	output: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
// 		const output = parseFloat(e.target.value);
// 		return isNaN(output) ? undefined : output;
// 	},
// };

// --- MOCK ACTION (Replace with your actual import) ---

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onStaffCreated?: (newStaff: LabStaffDetailsUI) => void;
	requiredRoles?: StaffRoleCategory[]; // used to allow the selection of the reqiured roles only.
}

// Visual mapping for the Enums to make the UI look incredible
const ROLE_OPTIONS = [
	{ id: "TECHNICIAN", label: "Technician", icon: Wrench, desc: "Production & CAD" },
	{ id: "COURIER", label: "Courier", icon: Truck, desc: "Pickup & Delivery" },
	{ id: "SALES_REP", label: "Sales Rep", icon: Briefcase, desc: "Account Management" },
	{ id: "QC_INSPECTOR", label: "QC Inspector", icon: ShieldCheck, desc: "Quality Assurance" },
	{ id: "MANAGER", label: "Manager", icon: UserCog, desc: "Lab Operations" },
	{ id: "RECEPTIONIST", label: "Receptionist", icon: Headset, desc: "Front Desk" },
];

export function RegisterStaffSheet({ isOpen, onClose, onStaffCreated, requiredRoles }: Props) {
	const queryClient = useQueryClient();

	const form = useForm<CreateLabStaffInput>({
		resolver: zodResolver(CreateLabStaffInputSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			email: "",
			isActive: true,
			roleCategory: "TECHNICIAN",
			jobTitle: "",
			specialization: "",
			commissionType: "PERCENTAGE",
			commissionValue: undefined,
		},
		mode: "onBlur",
	});

	// Watch values for dynamic UI rendering
	const selectedRole = useWatch({ control: form.control, name: "roleCategory" });
	const selectedCommission = useWatch({ control: form.control, name: "commissionType" });

	const displayedRoles = requiredRoles && requiredRoles.length > 0 ? ROLE_OPTIONS.filter((option) => requiredRoles.includes(option.id as StaffRoleCategory)) : ROLE_OPTIONS.slice(0, 6);

	const { executeAsync: registerStaff, isExecuting } = useAction(createLabStaffAction, {
		onSuccess: ({ data }) => {
			toast.success("Team member registered successfully!");

			if (data.staff.isActive) {
				const defaultSearchQueryKey = ["labStaff", "search", ""] as const;

				queryClient.setQueryData<DataShape>(defaultSearchQueryKey, (prevData): DataShape => {
					if (!prevData) return [];

					const isMemberExists = prevData.find((staff) => staff.id === data.staff.id);
					if (!isMemberExists) {
						return [data.staff as unknown as LabStaffDetailsUI, ...prevData];
					}
					return prevData;
				});

				// Trigger auto-assignment in the parent component
				if (onStaffCreated) onStaffCreated(data.staff as unknown as LabStaffDetailsUI);
			} else {
				// UX Touch: Remind the user why the staff member didn't appear in the dropdown
				toast.info("Account saved as Inactive", {
					description: "This member will not appear in assignment lists until activated.",
				});
			}

			// Always invalidate the main query so the global settings tables stay fresh
			queryClient.invalidateQueries({ queryKey: ["labStaff"] });
			onClose();
			form.reset();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const onSubmit = async (data: CreateLabStaffInput) => {
		await registerStaff(data);
	};

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="lg:max-w-md! max-w-full! w-full! sm:w-[90%]! md:w-[70%]! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* --- HEADER --- */}
				<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden shrink-0">
					<div className="absolute top-0 right-0 p-8 opacity-10">
						<UserPlus className="w-24 h-24 text-primary" />
					</div>
					<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
						<UserPlus className="w-6 h-6" />
					</div>
					<SheetTitle className="text-2xl font-bold tracking-tight">Register Staff Member</SheetTitle>
					<SheetDescription className="text-sm text-muted-foreground font-medium max-w-[90%]">Add a new employee to your lab and define their system role and compensation.</SheetDescription>
				</SheetHeader>

				{/* --- FORM BODY --- */}
				<div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
					<form id="register-staff-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
						{/* SECTION 1: SYSTEM ROLE (Visual Grid) */}
						<section className="space-y-4">
							<div className="flex items-center justify-between px-1">
								<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">System Role</label>
								<span className="text-[10px] font-mono text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">{selectedRole}</span>
							</div>

							<div className="grid grid-cols-2 gap-3">
								{displayedRoles.map((option) => {
									const isSelected = selectedRole === option.id;
									return (
										<button
											key={option.id}
											type="button"
											onClick={() => form.setValue("roleCategory", option.id as StaffRoleCategory)}
											className={cn(
												"relative flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 text-left group",
												isSelected
													? "bg-primary/5 border-primary shadow-ai-glow-light ring-1 ring-primary/20"
													: "bg-card border-border hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-white/5",
											)}
										>
											<div
												className={cn(
													"w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-colors",
													isSelected ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-primary",
												)}
											>
												<option.icon className="w-4 h-4" />
											</div>

											<div className="flex flex-col">
												<span className={cn("text-[13px] font-bold leading-none mb-1", isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>
													{option.label}
												</span>
												<span className="text-[10px] text-muted-foreground font-medium opacity-80">{option.desc}</span>
											</div>

											{isSelected && (
												<div className="absolute top-3 right-3 animate-in zoom-in duration-300">
													<div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
														<Check className="w-2.5 h-2.5 text-white stroke-4" />
													</div>
												</div>
											)}
										</button>
									);
								})}
							</div>
						</section>

						{/* SECTION 2: PERSONAL DETAILS */}
						<div className="space-y-5">
							<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
								<UserCog className="w-4 h-4 text-primary" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Identity & Contact</h4>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="firstName"
									render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="First Name" nameInSchema="firstName" placeholder="Ahmed" />}
								/>
								<Controller
									control={form.control}
									name="lastName"
									render={({ field, fieldState }) => <InputWithLabel field={field} fieldState={fieldState} fieldTitle="Last Name" nameInSchema="lastName" placeholder="Ali" />}
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="phoneNumber"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Phone Number" nameInSchema="phoneNumber" placeholder="+964 750 000 0000" />
									)}
								/>
								<Controller
									control={form.control}
									name="email"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Email Address" nameInSchema="email" placeholder="ahmed@lab.com" />
									)}
								/>
							</div>
						</div>

						{/* SECTION 3: JOB SPECIFICS */}
						<div className="space-y-5">
							<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
								<Briefcase className="w-4 h-4 text-primary" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Job Details</h4>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<Controller
									control={form.control}
									name="jobTitle"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Display Title" nameInSchema="jobTitle" placeholder="e.g. Master Ceramist" />
									)}
								/>
								<Controller
									control={form.control}
									name="specialization"
									render={({ field, fieldState }) => (
										<InputWithLabel field={field} fieldState={fieldState} fieldTitle="Specialization" nameInSchema="specialization" placeholder="e.g. Anterior Aesthetics" />
									)}
								/>
							</div>
							<p className="text-[10px] text-muted-foreground font-medium px-1">
								The System Role (above) controls permissions, but the Display Title is what shows on invoices and the clinic portal.
							</p>
						</div>

						{/* SECTION 4: COMPENSATION (Dynamic) */}
						<div className="space-y-5 pt-6 border-t border-border">
							<div className="flex items-center gap-2 mb-4">
								<Wallet className="w-4 h-4 text-emerald-500" />
								<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Compensation Model</h4>
							</div>

							{/* Commission Type Toggle */}
							<div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-border h-12">
								{(["PERCENTAGE", "FIXED"] as const).map((type) => (
									<button
										key={type}
										type="button"
										onClick={() => form.setValue("commissionType", type)}
										className={cn(
											"flex-1 flex items-center justify-center gap-2 text-[11px] font-bold rounded-lg transition-all uppercase tracking-wider",
											selectedCommission === type
												? "bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-500 shadow-sm ring-1 ring-border"
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{type === "PERCENTAGE" ? <BadgePercent className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
										{type === "PERCENTAGE" ? "% Split" : "Flat Rate"}
									</button>
								))}
							</div>

							{/* Dynamic Input based on selection */}
							<div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 animate-in fade-in zoom-in-95 duration-300">
								<Controller
									control={form.control}
									name="commissionValue"
									render={({ field, fieldState }) => (
										<InputWithLabel
											field={field}
											fieldState={fieldState}
											type="number"
											value={field.value}
											fieldTitle={selectedCommission === "PERCENTAGE" ? "Commission Percentage (%)" : "Fixed Amount per Case"}
											nameInSchema="commissionValue"
											placeholder={selectedCommission === "PERCENTAGE" ? "e.g. 15" : "e.g. 5000"}
										/>
										// <Input
										// 	name=""
										// 	type="number"
										// 	onChange={(e) => {
										// 		const v = e.currentTarget.value;

										// 		console.log("Revieved value: ", v);

										// 		field.onChange(e);
										// 	}}
										// 	value={field.value}
										// 	placeholder="Enter your amount"
										// />
									)}
								/>
								<p className="text-[10px] text-muted-foreground font-medium mt-3 flex items-start gap-1.5">
									<Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
									{selectedCommission === "PERCENTAGE"
										? "This percentage will be automatically calculated against the Grand Total of cases assigned to this staff member."
										: "This flat fee will be applied to the staff member's payout for every case they complete, regardless of case value."}
								</p>
							</div>
						</div>

						{/* Root Error Display */}
						{form.formState.errors.root && (
							<div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm flex items-center gap-2">
								<div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse"></div>
								{form.formState.errors.root.message}
							</div>
						)}
					</form>
				</div>

				{/* --- FOOTER --- */}
				<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
					<div className="flex items-center gap-3 w-full">
						{/* Active Toggle placed in footer for easy access */}
						<div className="flex-1 flex items-center gap-2 px-4 h-11 rounded-xl bg-card border border-border">
							<Controller
								control={form.control}
								name="isActive"
								render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-emerald-500 scale-75 origin-left" />}
							/>
							<span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Account</span>
						</div>
						<Button
							type="submit"
							disabled={isExecuting || !form.formState.isDirty}
							form="register-staff-form"
							className="rounded-xl flex-1 flex items-center justify-center gap-2 h-11 bg-primary shadow-premium font-bold hover:bg-primary/90 transition-all text-white"
						>
							{isExecuting ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Profile"}
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
