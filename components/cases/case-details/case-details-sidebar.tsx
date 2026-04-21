"use client";

import { MapPin, User, Truck, Wrench, CalendarClock, Clock, Wallet, LockKeyhole, AlertCircle, Microscope, ShieldCheck, Plus, X, LucideIcon } from "lucide-react";
import { format, differenceInDays, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CaseDetailsUI } from "@/schema/composed/case.details";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { memo } from "react";
import { EditStaffPopover } from "./quick-edits/edit-staff-popover";

interface Props {
	dentalCase: CaseDetailsUI;
	userRole?: string;
}

export const CaseDetailsSidebar = memo(function CaseDetailsSidebar({ dentalCase, userRole = "MANAGER" }: Props) {
	const today = new Date();
	const daysUntilDeadline = dentalCase.deadline ? differenceInDays(startOfDay(dentalCase.deadline), startOfDay(today)) : 0;
	const isRush = daysUntilDeadline <= 3 && daysUntilDeadline >= 0;
	const isOverdue = daysUntilDeadline < 0;

	// Extract specific roles based on the unique constraint architecture
	const assignments = dentalCase.staffAssignments || [];
	const seniorTech = assignments.find((s) => s.roleCategory === "SENIOR_TECHNICIAN");
	const leadTech = assignments.find((s) => s.roleCategory === "TECHNICIAN");
	const qcInspector = assignments.find((s) => s.roleCategory === "QC_INSPECTOR");
	const courier = assignments.find((s) => s.roleCategory === "COURIER");

	const formatCurrency = (val: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
			{/* CARD 1: Deadline & Origin */}
			<div className="lab-card overflow-hidden">
				<div
					className={cn(
						"p-5 border-b border-border flex items-start justify-between cursor-pointer group hover:bg-slate-50 dark:hover:bg-white/2 transition-colors",
						isOverdue ? "bg-destructive/10" : isRush ? "bg-amber-500/10" : "bg-slate-50 dark:bg-white/2",
					)}
				>
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105",
								isOverdue ? "bg-destructive text-white" : isRush ? "bg-amber-500 text-white" : "bg-primary/10 text-primary",
							)}
						>
							{isOverdue ? <AlertCircle className="w-5 h-5" /> : isRush ? <Clock className="w-5 h-5" /> : <CalendarClock className="w-5 h-5" />}
						</div>
						<div>
							<h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Target Delivery</h3>
							<p className={cn("text-sm font-bold", isOverdue ? "text-destructive" : isRush ? "text-amber-600 dark:text-amber-500" : "text-foreground")}>
								{dentalCase.deadline ? format(new Date(dentalCase.deadline), "EEEE, MMM do") : "Unscheduled"}
							</p>
						</div>
					</div>
				</div>

				<div className="p-6 space-y-6">
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<MapPin className="w-3.5 h-3.5 text-primary" /> Clinic Partner
						</div>
						<p className="text-sm font-bold text-foreground">{dentalCase.clinicId ? "Apex Dental Design" : "Unknown Clinic"}</p>
						<p className="text-xs text-muted-foreground font-medium">{dentalCase.dentist ? <span>{dentalCase.dentist.name}</span> : "Unknown Dentist"}</p>
					</div>

					<div className="h-px w-full bg-border border-dashed" />

					<div className="space-y-2">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<User className="w-3.5 h-3.5 text-primary" /> Patient
						</div>
						<p className="text-sm font-bold text-foreground ">{dentalCase.patient ? <span>{dentalCase.patient.name}</span> : "Unknown Patient"}</p>
						<div className="flex items-center gap-2 mt-1">
							<span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground">
								{dentalCase.patient && dentalCase.patient.age ? `${dentalCase.patient.age}Y` : "Unknown Age"} /{" "}
								{dentalCase.patient && dentalCase.patient.gender ? dentalCase.patient.gender : "Unknown Gender"}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* CARD 2: Production Team & Routing */}
			<div className="lab-card overflow-hidden">
				<div className="px-6 py-4 border-b border-border bg-slate-50 dark:bg-white/2">
					<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Production Team & Routing</h3>
				</div>

				<div className="p-5 space-y-6">
					{/* Section A: Technical Production */}
					<div className="space-y-3">
						<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Manufacturing & Quality</h4>

						<TeamSlot
							caseId={dentalCase.id}
							roleLabel="Supervising Tech"
							roleEnum="SENIOR_TECHNICIAN"
							assignment={seniorTech}
							icon={ShieldCheck}
							colorClass="bg-ai/10 text-ai border-ai/20"
						/>

						<TeamSlot
							caseId={dentalCase.id}
							roleLabel="Lead Technician"
							roleEnum="TECHNICIAN"
							assignment={leadTech}
							icon={Wrench}
							colorClass="bg-primary/10 text-primary border-primary/20"
						/>

						<TeamSlot
							caseId={dentalCase.id}
							roleLabel="QC Inspector"
							roleEnum="QC_INSPECTOR"
							assignment={qcInspector}
							icon={Microscope}
							colorClass="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
						/>
					</div>

					<div className="h-px w-full bg-border border-dashed" />

					{/* Section B: Delivery & Logistics */}
					<div className="space-y-3">
						<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Logistics</h4>

						<TeamSlot
							caseId={dentalCase.id}
							roleLabel="Route Courier"
							roleEnum="COURIER"
							assignment={courier}
							icon={Truck}
							colorClass="bg-amber-500/10 text-amber-500 border-amber-500/20"
						/>
					</div>
				</div>
			</div>

			{/* CARD 3: Financial Summary (Role Protected) */}
			<div className="lab-card overflow-hidden relative">
				<div className="px-6 py-4 border-b border-border bg-emerald-500/5">
					<h3 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest flex items-center gap-2">
						<Wallet className="w-3.5 h-3.5" /> Financial Summary
					</h3>
				</div>

				<div className="p-6 space-y-4 relative">
					{userRole !== "ADMIN" && userRole !== "MANAGER" && userRole !== "OWNER" && (
						<div className="absolute inset-0 bg-background/60 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-4">
							<LockKeyhole className="w-5 h-5 text-muted-foreground mb-2" />
							<p className="text-xs font-bold text-foreground">Restricted View</p>
							<p className="text-[10px] text-muted-foreground mt-0.5">Only Admins and Managers can view case financials.</p>
						</div>
					)}

					<div className="flex justify-between items-center text-sm">
						<span className="text-muted-foreground font-medium">Production Subtotal</span>
						<span className="font-mono font-bold text-foreground">$420.00</span>
					</div>
					<div className="flex justify-between items-center text-sm">
						<span className="text-muted-foreground font-medium">Clinic Discount (10%)</span>
						<span className="font-mono font-bold text-destructive">-$42.00</span>
					</div>
					<div className="h-px w-full bg-border border-dashed my-2" />
					<div className="flex justify-between items-end">
						<span className="text-xs font-bold text-foreground uppercase tracking-widest">Grand Total</span>
						<span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">$378.00</span>
					</div>
				</div>
			</div>
		</div>
	);
});
// --- HELPER COMPONENT: ROLE SLOT ---
// Renders a predictable, fixed row for a specific job requirement

interface TeamSlotProps {
	roleLabel: string;
	roleEnum: StaffRoleCategory;
	assignment: CaseStaffAssignmentDetailsUI | undefined;
	icon: LucideIcon;
	colorClass: string;
	caseId: string;
}
const TeamSlot = memo(function TeamSlot({ roleLabel, roleEnum, assignment, icon: Icon, colorClass, caseId }: TeamSlotProps) {
	const isAssigned = !!assignment;
	const staff = assignment?.staff;

	return (
		<EditStaffPopover caseId={caseId} roleCategory={roleEnum} currentStaffId={staff?.id || null}>
			<button
				type="button"
				className={cn(
					"w-full text-left outline-none group flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer",
					isAssigned
						? "bg-card border-border hover:border-primary/40 hover:shadow-sm"
						: "bg-slate-50/50 dark:bg-white/2 border-dashed border-border hover:bg-slate-50 dark:hover:bg-white/4 hover:border-primary/40",
				)}
			>
				<div className="flex items-center gap-3 min-w-0">
					<div
						className={cn(
							"w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
							isAssigned ? colorClass : "bg-slate-100 dark:bg-[#121214] text-slate-400 dark:text-zinc-600 group-hover:text-primary group-hover:bg-primary/10",
						)}
					>
						<Icon className="w-4 h-4" />
					</div>

					<div className="flex flex-col min-w-0">
						<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">{roleLabel}</span>
						{isAssigned ? (
							<div className="flex items-center gap-2">
								{staff?.avatarUrl && (
									<Avatar className="w-4 h-4 border border-border shrink-0">
										<AvatarImage src={staff.avatarUrl} />
									</Avatar>
								)}
								<span className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
									{staff?.firstName} {staff?.lastName}
								</span>
							</div>
						) : (
							<span className="text-sm font-medium text-slate-400 italic group-hover:text-foreground transition-colors">Unassigned</span>
						)}
					</div>
				</div>
			</button>
		</EditStaffPopover>
	);
});
