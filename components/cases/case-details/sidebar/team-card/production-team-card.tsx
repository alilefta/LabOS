import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EditStaffPopover } from "../../quick-edits/edit-staff-popover";
import { StaffRoleCategory } from "@/schema/base/enums.base";
import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { Truck, Wrench, Microscope, ShieldCheck, LucideIcon } from "lucide-react";
import { CaseDetailsUI } from "@/schema/composed/case.details";

interface ProductionTeamCardProps {
	dentalCase: CaseDetailsUI;
}

export const ProductionTeamCard = memo(function ProductionTeamCard({ dentalCase }: ProductionTeamCardProps) {
	const assignments = dentalCase.staffAssignments || [];
	const seniorTech = assignments.find((s) => s.roleCategory === "SENIOR_TECHNICIAN");
	const leadTech = assignments.find((s) => s.roleCategory === "TECHNICIAN");
	const qcInspector = assignments.find((s) => s.roleCategory === "QC_INSPECTOR");
	const courier = assignments.find((s) => s.roleCategory === "COURIER");
	return (
		<div className="lab-card overflow-hidden">
			<div className="px-6 py-4 border-b border-border bg-slate-50 dark:bg-white/2">
				<h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Production Team & Routing</h3>
			</div>

			<div className="p-5 space-y-6">
				{/* Section A: Technical Production */}
				<div className="space-y-3">
					<h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Manufacturing & Quality</h4>

					<TeamSlot caseId={dentalCase.id} roleLabel="Supervising Tech" roleEnum="SENIOR_TECHNICIAN" assignment={seniorTech} icon={ShieldCheck} colorClass="bg-ai/10 text-ai border-ai/20" />

					<TeamSlot caseId={dentalCase.id} roleLabel="Lead Technician" roleEnum="TECHNICIAN" assignment={leadTech} icon={Wrench} colorClass="bg-primary/10 text-primary border-primary/20" />

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

					<TeamSlot caseId={dentalCase.id} roleLabel="Route Courier" roleEnum="COURIER" assignment={courier} icon={Truck} colorClass="bg-amber-500/10 text-amber-500 border-amber-500/20" />
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

export const TeamSlot = memo(function TeamSlot({ roleLabel, roleEnum, assignment, icon: Icon, colorClass, caseId }: TeamSlotProps) {
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
