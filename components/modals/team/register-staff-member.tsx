'use client'

import { useForm, Controller, useWatch, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	UserPlus,
	Loader2,
	Truck,
	Wrench,
	Briefcase,
	ShieldCheck,
	UserCog,
	Headset,
	Check,
	CheckCircle2,
	ChevronRight,
	MapPin,
} from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

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
import { cn } from '@/lib/utils'

import { StaffRoleCategory } from '@/schema/base/enums.base'
import { useAction } from 'next-safe-action/hooks'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import { createLabStaffAction } from '@/actions/team/register-staff-member-action'
import {
	CreateLabStaffInput,
	CreateLabStaffInputSchema,
} from '@/schema/composed/team/staff.schema'
import { LabStaffDetailsUI } from '@/schema/composed/lab-staff.details'

interface Props {
	isOpen: boolean
	onClose: () => void
	onStaffCreated?: (newStaff: LabStaffDetailsUI) => void
	requiredRoles?: StaffRoleCategory[]
}

const ROLE_OPTIONS = [
	{
		id: 'TECHNICIAN',
		label: 'Technician',
		icon: Wrench,
		desc: 'Production & CAD',
	},
	{
		id: 'SENIOR_TECHNICIAN',
		label: 'Senior Technician',
		icon: UserCog,
		desc: 'Production Supervisor',
	},
	{ id: 'COURIER', label: 'Courier', icon: Truck, desc: 'Pickup & Delivery' },
	{
		id: 'SALES_REP',
		label: 'Sales Rep',
		icon: Briefcase,
		desc: 'Account Manager',
	},
	{
		id: 'QC_INSPECTOR',
		label: 'QC Inspector',
		icon: ShieldCheck,
		desc: 'Quality Assurance',
	},
	{ id: 'MANAGER', label: 'Manager', icon: UserCog, desc: 'Lab Operations' },
	{
		id: 'RECEPTIONIST',
		label: 'Receptionist',
		icon: Headset,
		desc: 'Front Desk',
	},
]

export function RegisterStaffMemberSheet({
	isOpen,
	onClose,
	onStaffCreated,
	requiredRoles,
}: Props) {
	const queryClient = useQueryClient()

	// A-123 ends after the operational identity is created. Access and
	// compensation are configured later through their dedicated commands.
	const [successPayload, setSuccessPayload] = useState<{
		name: string
	} | null>(null)

	const defaultRoleCat =
		requiredRoles && requiredRoles.length > 0 ? requiredRoles[0] : 'TECHNICIAN'

	const form = useForm<CreateLabStaffInput>({
		resolver: zodResolver(CreateLabStaffInputSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			city: '',
			address1: '',
			address2: '',
			zipcode: '',
			isActive: true,
			roleCategory: defaultRoleCat,
			jobTitle: '',
			specialization: '',
		},
		mode: 'onBlur',
	})

	const selectedRole = useWatch({ control: form.control, name: 'roleCategory' })

	const displayedRoles =
		requiredRoles && requiredRoles.length > 0
			? ROLE_OPTIONS.filter((option) =>
					requiredRoles.includes(option.id as StaffRoleCategory),
				)
			: ROLE_OPTIONS.slice(0, 6)

	const { executeAsync: registerStaff, isExecuting } = useAction(
		createLabStaffAction,
		{
			onSuccess: ({ data }) => {
				setSuccessPayload({
					name: `${form.getValues('firstName')} ${form.getValues('lastName')}`,
				})

				if (data.staff.isActive) {
					queryClient.setQueryData<LabStaffDetailsUI[]>(
						['labStaff', 'search', ''],
						(prevData) => {
							if (!prevData) return [data.staff]
							const exists = prevData.find((s) => s.id === data.staff.id)
							return exists ? prevData : [data.staff, ...prevData]
						},
					)
					if (onStaffCreated) onStaffCreated(data.staff)
				}

				queryClient.invalidateQueries({ queryKey: ['labStaff'] })
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	const onSubmit = async (data: CreateLabStaffInput) => {
		await registerStaff(data)
	}

	const handleClose = () => {
		setSuccessPayload(null)
		form.reset()
		onClose()
	}

	return (
		<Sheet open={isOpen} onOpenChange={handleClose}>
			<SheetContent className="sm:max-w-md! border-l border-border bg-card dark:bg-[#09090B] p-0 flex flex-col shadow-2xl">
				{/* ── CONDITION 1: OPERATIONAL IDENTITY CREATED ───────────────────── */}
				{successPayload ? (
					<div className="flex-1 flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
						<div className="p-8 text-center flex flex-col items-center bg-linear-to-b from-primary/10 to-transparent border-b border-border">
							<div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-4 shadow-lg">
								<CheckCircle2 className="w-8 h-8" />
							</div>
							<h3 className="text-xl font-bold text-foreground">
								Worker Registered
							</h3>
							<p className="text-xs text-muted-foreground mt-1">
								{successPayload.name} is now on the active lab roster.
							</p>
						</div>

						<div className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">
							<p className="text-sm text-muted-foreground text-center leading-relaxed">
								The operational profile is ready and can be assigned to work.
								Configure compensation or grant system access from this Staff
								member&apos;s settings when needed.
							</p>
						</div>

						<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1">
							<Button
								onClick={handleClose}
								className="w-full rounded-xl h-11 bg-slate-100 dark:bg-white/5 border border-border text-xs font-bold flex items-center justify-center gap-1.5"
							>
								Close Window <ChevronRight className="w-4 h-4" />
							</Button>
						</SheetFooter>
					</div>
				) : (
					// ── CONDITION 2: STANDARD REGISTRATION FORM ──────────────────
					<>
						<SheetHeader className="p-8 border-b border-border bg-linear-to-br from-primary/5 to-transparent relative overflow-hidden shrink-0">
							<div className="absolute top-0 right-0 p-8 opacity-10">
								<UserPlus className="w-24 h-24 text-primary" />
							</div>
							<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-ai-glow-light">
								<UserPlus className="w-6 h-6" />
							</div>
							<SheetTitle className="text-2xl font-bold tracking-tight">
								Register Team Member
							</SheetTitle>
							<SheetDescription className="text-sm text-muted-foreground font-medium">
								Create an operational employee profile. Compensation and system
								access are configured separately after creation.
							</SheetDescription>
						</SheetHeader>

						<div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
							<FormProvider {...form}>
								<form
									id="register-staff-form"
									onSubmit={form.handleSubmit(onSubmit)}
									className="flex flex-col gap-10"
								>
									{/* SECTION 1: SYSTEM ROLE */}
									<section className="flex flex-col gap-4">
										<label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
											Operational Role
										</label>
										<div className="grid grid-cols-2 gap-3">
											{displayedRoles.map((option) => {
												const isSelected = selectedRole === option.id
												return (
													<button
														key={option.id}
														type="button"
														onClick={() =>
															form.setValue(
																'roleCategory',
																option.id as StaffRoleCategory,
																{ shouldDirty: true, shouldValidate: true },
															)
														}
														className={cn(
															'relative flex flex-col items-start p-4 rounded-2xl border transition-all duration-300 text-left group',
															isSelected
																? 'bg-primary/5 border-primary shadow-ai-glow-light ring-1 ring-primary/20'
																: 'bg-card border-border hover:border-primary/40 hover:bg-slate-50/50 dark:hover:bg-white/5',
														)}
													>
														<div
															className={cn(
																'w-8 h-8 rounded-lg flex items-center justify-center mb-3',
																isSelected
																	? 'bg-primary text-white'
																	: 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-primary',
															)}
														>
															<option.icon className="w-4 h-4" />
														</div>
														<span
															className={cn(
																'text-[13px] font-bold leading-none mb-1',
																isSelected
																	? 'text-foreground'
																	: 'text-muted-foreground group-hover:text-foreground',
															)}
														>
															{option.label}
														</span>
														<span className="text-[10px] text-muted-foreground font-medium opacity-80">
															{option.desc}
														</span>
														{isSelected && (
															<Check className="absolute top-3 right-3 w-4 h-4 text-primary animate-in zoom-in" />
														)}
													</button>
												)
											})}
										</div>
									</section>

									{/* SECTION 2: IDENTITY */}
									<div className="flex flex-col gap-5">
										<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
											<UserCog className="w-4 h-4 text-primary animate-pulse" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
												Identity & Contact
											</h4>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<Controller
												control={form.control}
												name="firstName"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="First Name"
														nameInSchema="firstName"
														placeholder="Ahmed"
													/>
												)}
											/>
											<Controller
												control={form.control}
												name="lastName"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="Last Name"
														nameInSchema="lastName"
														placeholder="Ali"
													/>
												)}
											/>
										</div>
										<Controller
											control={form.control}
											name="phoneNumber"
											render={({ field, fieldState }) => (
												<InputWithLabel
													field={field}
													fieldState={fieldState}
													fieldTitle="Phone Number"
													nameInSchema="phoneNumber"
													placeholder="+964 750 000 0000"
												/>
											)}
										/>
									</div>

									{/* SECTION 3: LOCATION & LOGISTICS */}
									<div className="flex flex-col gap-5">
										<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
											<MapPin className="w-4 h-4 text-primary" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
												Address & Logistics
											</h4>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<Controller
												control={form.control}
												name="city"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="City"
														nameInSchema="city"
														placeholder="Baghdad"
													/>
												)}
											/>
											<Controller
												control={form.control}
												name="zipcode"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="Postal Code (Optional)"
														nameInSchema="zipcode"
														placeholder="10001"
													/>
												)}
											/>
										</div>
										<Controller
											control={form.control}
											name="address1"
											render={({ field, fieldState }) => (
												<InputWithLabel
													field={field}
													fieldState={fieldState}
													fieldTitle="Street Address"
													nameInSchema="address1"
													placeholder="District, street, and building"
												/>
											)}
										/>
										<Controller
											control={form.control}
											name="address2"
											render={({ field, fieldState }) => (
												<InputWithLabel
													field={field}
													fieldState={fieldState}
													fieldTitle="Address Line 2 (Optional)"
													nameInSchema="address2"
													placeholder="Apartment, suite, or landmark"
												/>
											)}
										/>
									</div>

									{/* SECTION 4: JOB SPECIFICS */}
									<div className="flex flex-col gap-5">
										<div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
											<Briefcase className="w-4 h-4 text-primary" />
											<h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
												Job Details
											</h4>
										</div>

										<div className="grid grid-cols-2 gap-4">
											<Controller
												control={form.control}
												name="jobTitle"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="Display Title"
														nameInSchema="jobTitle"
														placeholder="e.g. Master Ceramist"
													/>
												)}
											/>
											<Controller
												control={form.control}
												name="specialization"
												render={({ field, fieldState }) => (
													<InputWithLabel
														field={field}
														fieldState={fieldState}
														fieldTitle="Specialization"
														nameInSchema="specialization"
														placeholder="e.g. Anterior Aesthetics"
													/>
												)}
											/>
										</div>
										<p className="text-[10px] text-muted-foreground font-medium px-1">
											This operational role describes the person&apos;s work. It
											does not grant application permissions.
										</p>
									</div>
								</form>
							</FormProvider>
						</div>

						{/* --- FOOTER --- */}
						<SheetFooter className="p-8 border-t border-border bg-slate-50/30 dark:bg-white/1 shrink-0">
							<Button
								variant="ghost"
								onClick={handleClose}
								className="rounded-xl h-11! px-6 font-semibold"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isExecuting}
								form="register-staff-form"
								className="rounded-xl h-11 bg-primary text-white shadow-premium font-bold hover:bg-primary/90 transition-all shrink-0"
							>
								{isExecuting ? (
									<Loader2 className="animate-spin w-4 h-4 mr-2" />
								) : (
									'Save Profile'
								)}
							</Button>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	)
}
