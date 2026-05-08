"use client";

import { memo, useMemo, useState } from "react";
import { isBefore, startOfDay } from "date-fns";
import { AlertCircle, User, Box, Lock, ArrowRight, Activity, PackageCheck, LucideIcon, RotateCcw } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

import { CaseStatus } from "@/schema/base/enums.base";
import { usePermissions } from "@/providers/permissions-provider";
import { VALID_TRANSITIONS } from "@/lib/permissions/cases/clinical-status-rules";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";

// Map internal statuses to simple, action-oriented labels for technicians
const STATUS_ACTION_MAP: Record<string, { label: string; icon: LucideIcon; color: string }> = {
	ASSIGNED: { label: "Move to Queue", icon: User, color: "text-slate-500 bg-slate-100 dark:bg-white/10" },
	PROCESSING: { label: "Start Production", icon: Activity, color: "text-amber-500 bg-amber-500/10" },
	COMPLETED: { label: "QC & Finish", icon: PackageCheck, color: "text-emerald-500 bg-emerald-500/10" },
};

interface MobilePipelineCardProps {
	caseItem: ClinicActiveCaseDTO;
	requestStatusTransition: (caseItem: ClinicActiveCaseDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => void;
}

export const MobilePipelineCard = memo(function MobilePipelineCard({ caseItem, requestStatusTransition }: MobilePipelineCardProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { canAdvanceStatus, isManagement, staffId } = usePermissions();

	// --- 1. MULTI-TECH PERMISSION LOGIC ---
	const isAssignedToMe = useMemo(() => {
		return caseItem.assignedTechs.some((tech) => tech.name.includes(staffId || "---"));
	}, [caseItem.assignedTechs, staffId]);

	const canMove = isManagement || (canAdvanceStatus && isAssignedToMe);

	// 2. Workflow: What are the valid next steps?
	const allowedNext = VALID_TRANSITIONS[caseItem.status] || [];
	const validNextSteps = allowedNext.filter((status) => ["ASSIGNED", "PROCESSING", "COMPLETED"].includes(status));

	// 3. Vitals: Is it late?
	const today = new Date();
	const isOverdue = caseItem.deadline ? isBefore(startOfDay(new Date(caseItem.deadline)), startOfDay(today)) : false;

	const handleMoveClick = (newStatus: CaseStatus) => {
		setIsDrawerOpen(false);
		requestStatusTransition(caseItem, newStatus, caseItem.status);
	};

	return (
		<div
			className={cn(
				"bg-card border rounded-2xl p-5 shadow-sm relative overflow-hidden transition-all active:scale-[0.98]",
				isOverdue && "border-l-4 border-l-destructive shadow-destructive/5",
				caseItem.isRush && !isOverdue && "border-l-4 border-l-amber-500 shadow-amber-500/5",
			)}
		>
			{/* TOP: IDENTITY & URGENCY */}
			<div className="flex items-start justify-between mb-4 gap-4">
				<div className="flex flex-col gap-1.5 min-w-0">
					<div className="flex items-center gap-2">
						<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-tighter">#{caseItem.caseNumber}</span>
						{caseItem.isRemake && (
							<span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 text-[8px] font-black uppercase tracking-widest border border-rose-500/20 shadow-sm shrink-0">
								<RotateCcw className="w-2.5 h-2.5" /> Remake
							</span>
						)}
					</div>
					<h4 className="text-base font-bold text-foreground truncate leading-tight">{caseItem.patientName}</h4>
				</div>

				{isOverdue && (
					<span className="flex items-center gap-1 text-[9px] font-black text-destructive uppercase animate-pulse shrink-0 bg-destructive/10 px-2 py-1 rounded-md">
						<AlertCircle className="w-3 h-3" /> Overdue
					</span>
				)}
			</div>

			{/* MIDDLE: PRODUCTS LIST */}
			<div className="flex flex-wrap gap-2 mb-5 overflow-hidden">
				{caseItem.products.slice(0, 3).map((prod, i) => (
					<div
						key={i}
						className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 dark:bg-white/2 border border-border text-[9px] font-bold text-foreground uppercase tracking-widest truncate max-w-35"
					>
						<Box className="w-2.5 h-2.5 shrink-0 opacity-40 text-primary" />
						<span className="truncate">{prod}</span>
					</div>
				))}
				{caseItem.products.length > 3 && (
					<span className="text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-lg flex items-center justify-center">
						+{caseItem.products.length - 3}
					</span>
				)}
			</div>

			{/* FOOTER: STAFF & ACTIONS */}
			<div className="flex items-center justify-between pt-4 border-t border-border/50">
				{/* Avatar Stack */}
				<div className="flex items-center -space-x-2 overflow-hidden">
					{caseItem.assignedTechs.length > 0 ? (
						<>
							{caseItem.assignedTechs.slice(0, 2).map((tech, i) => (
								<Avatar key={i} className="h-8 w-8 border-2 border-card shadow-sm ring-1 ring-border">
									{tech.avatar && <AvatarImage src={tech.avatar} />}
									<AvatarFallback className="text-[10px] font-black bg-primary/10 text-primary uppercase">{tech.name[0]}</AvatarFallback>
								</Avatar>
							))}
							{caseItem.assignedTechs.length > 2 && (
								<div className="h-8 w-8 rounded-full border-2 border-card bg-slate-100 dark:bg-white/5 ring-1 ring-border flex items-center justify-center text-[10px] font-black text-muted-foreground z-10">
									+{caseItem.assignedTechs.length - 2}
								</div>
							)}
						</>
					) : (
						<div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 border border-dashed border-border flex items-center justify-center text-slate-400">
							<User className="w-3.5 h-3.5 opacity-40" />
						</div>
					)}
				</div>

				{/* THE DRAWER TRIGGER */}
				{canMove ? (
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button className="h-10 rounded-xl font-bold bg-primary text-primary-foreground shadow-premium px-5 hover:bg-primary/90 transition-all">
								Move Stage <ArrowRight className="w-4 h-4 ml-1.5" />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="bg-card border-border px-4 pb-8 max-h-[85vh]">
							<div className="mx-auto w-full max-w-sm flex flex-col h-full">
								{/* Drawer Header */}
								<DrawerHeader className="px-0 pb-6 pt-4 text-left">
									<DrawerTitle className="text-2xl font-bold tracking-tight">Advance Production</DrawerTitle>
									<DrawerDescription className="text-sm mt-1">
										Move Case <span className="font-mono font-bold text-foreground">#{caseItem.caseNumber}</span> to the next stage.
									</DrawerDescription>
								</DrawerHeader>

								{/* Massive Thumb-Friendly Buttons */}
								<div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pb-4">
									{validNextSteps.length === 0 ? (
										<div className="p-8 text-center bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-border">
											<p className="text-sm text-muted-foreground italic font-medium">No further production stages available.</p>
										</div>
									) : (
										validNextSteps.map((status) => {
											const ui = STATUS_ACTION_MAP[status];
											if (!ui) return null;
											return (
												<button
													key={status}
													onClick={() => handleMoveClick(status as CaseStatus)}
													className="flex items-center w-full h-20 px-5 rounded-2xl border border-border bg-background hover:bg-slate-50 dark:hover:bg-white/2 active:bg-slate-100 transition-all text-left group"
												>
													<div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-transform group-active:scale-90 shrink-0", ui.color)}>
														<ui.icon className="w-6 h-6" />
													</div>
													<div className="flex flex-col">
														<span className="text-base font-bold text-foreground">{ui.label}</span>
														<span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Move to {status}</span>
													</div>
												</button>
											);
										})
									)}
								</div>

								{/* Sticky Bottom Footer */}
								<DrawerFooter className="px-0 mt-auto pt-4 border-t border-border">
									<DrawerClose asChild>
										<Button variant="ghost" className="h-14 rounded-xl font-bold text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5 w-full text-base">
											Cancel
										</Button>
									</DrawerClose>
								</DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
				) : (
					<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 px-3 py-2 bg-slate-50 dark:bg-white/2 rounded-lg border border-border/50">
						<Lock className="w-3 h-3" /> System Locked
					</div>
				)}
			</div>
		</div>
	);
});
