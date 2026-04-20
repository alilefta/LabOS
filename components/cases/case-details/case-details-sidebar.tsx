"use client";

import { MapPin, User, Truck, Wrench, CalendarClock, Clock, Wallet, LockKeyhole, AlertCircle } from "lucide-react";
import { format, differenceInDays, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CaseDetailsUI } from "@/schema/composed/case.details";
import { EditDeadlinePopover } from "./quick-edits/edit-deadline-popover";
import { EditStaffPopover } from "./quick-edits/edit-staff-popover";

interface Props {
	dentalCase: CaseDetailsUI;
}

export function CaseDetailsSidebar({ dentalCase }: Props) {
	const today = new Date();
	const daysUntilDeadline = dentalCase.deadline ? differenceInDays(startOfDay(dentalCase.deadline), startOfDay(today)) : 0;
	const isRush = daysUntilDeadline <= 3 && daysUntilDeadline >= 0;
	const isOverdue = daysUntilDeadline < 0;

	// Extract staff from the junction array safely
	const courier = dentalCase.staffAssignments?.find((s) => s.roleCategory === "COURIER")?.staff;
	const technician = dentalCase.staffAssignments?.find((s) => s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN")?.staff;

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
			{/* CARD 1: Deadline & Origin */}
			<div className="lab-card overflow-hidden">
				{/* Deadline */}
				<EditDeadlinePopover caseId={dentalCase.id} currentDeadline={dentalCase.deadline}>
					<div className={cn("p-5 border-b border-border flex items-start justify-between", isOverdue ? "bg-destructive/10" : isRush ? "bg-amber-500/10" : "bg-slate-50 dark:bg-white/2")}>
						<div className="flex items-center gap-3">
							<div
								className={cn(
									"w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
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
				</EditDeadlinePopover>

				{/* Clinic */}
				<div className="p-6 space-y-6">
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<MapPin className="w-3.5 h-3.5 text-primary" /> Clinic Partner
						</div>
						<p className="text-sm font-bold text-foreground">
							{/* TODO: Hydrate Clinic Name from DB */}
							{dentalCase.clinicId ? "Apex Dental Design" : "Unknown Clinic"}
						</p>
						<p className="text-xs text-muted-foreground font-medium">Dr. Sarah Mitchell</p>
					</div>

					<div className="h-px w-full bg-border border-dashed" />

					<div className="space-y-2">
						<div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
							<User className="w-3.5 h-3.5 text-primary" /> Patient
						</div>
						<p className="text-sm font-bold text-foreground">
							{/* TODO: Hydrate Patient Name from DB */}
							{dentalCase.patientId ? "Omar Hassan" : "Unknown Patient"}
						</p>
						<div className="flex items-center gap-2 mt-1">
							<span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[9px] font-bold text-muted-foreground">34Y / MALE</span>
						</div>
					</div>
				</div>
			</div>

			{/* CARD 2: Production Team & Routing */}
			<div className="lab-card overflow-hidden">
				<div className="px-6 py-4 border-b border-border bg-slate-50 dark:bg-white/2">
					<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Production Team</h3>
				</div>

				<div className="p-6 space-y-6">
					{/* Courier Assignment */}
					<div className="flex items-center justify-between group">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
								<Truck className="w-4 h-4" />
							</div>
							<div className="flex flex-col">
								<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Intake Route</span>
								{courier ? (
									// WRAP THE NAME SO THEY CAN RE-ASSIGN
									<EditStaffPopover caseId={dentalCase.id} roleCategory="COURIER" currentStaffId={courier.id}>
										<span className="text-sm font-bold text-foreground cursor-pointer hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4">
											{courier.firstName} {courier.lastName}
										</span>
									</EditStaffPopover>
								) : (
									<span className="text-sm font-medium text-slate-400 italic">Unassigned</span>
								)}
							</div>
						</div>
						{!courier && (
							// WRAP THE EMPTY STATE BUTTON
							<EditStaffPopover caseId={dentalCase.id} roleCategory="COURIER" currentStaffId={null}>
								<Button variant="outline" size="sm" className="h-7 text-xs rounded-lg hidden group-hover:flex">
									Assign
								</Button>
							</EditStaffPopover>
						)}
					</div>

					{/* Technician Assignment */}
					<div className="flex items-center justify-between group">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
								<Wrench className="w-4 h-4" />
							</div>
							<div className="flex flex-col">
								<span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Lead Tech</span>
								{technician ? (
									<span className="text-sm font-bold text-foreground">
										{technician.firstName} {technician.lastName}
									</span>
								) : (
									<span className="text-sm font-medium text-slate-400 italic">Awaiting Assignment</span>
								)}
							</div>
						</div>
						{!technician && (
							<Button variant="secondary" size="sm" className="h-7 text-xs rounded-lg text-primary font-bold bg-primary/10 hover:bg-primary/20">
								Assign
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* CARD 3: Financial Summary (Role Protected Concept) */}
			<div className="lab-card overflow-hidden relative">
				<div className="px-6 py-4 border-b border-border bg-emerald-500/5">
					<h3 className="text-[11px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest flex items-center gap-2">
						<Wallet className="w-3.5 h-3.5" /> Financial Summary
					</h3>
				</div>

				<div className="p-6 space-y-4 relative">
					{/* MOCK BLUR: Represents what a standard Technician sees (No access to prices) */}
					{/* Remove this blur wrapper in production if the user is a LAB_ADMIN */}
					<div className="absolute inset-0 bg-background/60 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-4">
						<LockKeyhole className="w-5 h-5 text-muted-foreground mb-2" />
						<p className="text-xs font-bold text-foreground">Restricted View</p>
						<p className="text-[10px] text-muted-foreground mt-0.5">Only Admins and Managers can view case financials.</p>
					</div>

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
}
