"use client";

import { memo, useMemo, useState } from "react";
import { formatDistanceToNow, isBefore, startOfDay } from "date-fns";
import { AlertCircle, User, Box, Lock, ArrowRight, Activity, PackageCheck, Truck, LucideIcon, RotateCcw } from "lucide-react";

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
				"bg-card border rounded-2xl p-4 shadow-sm relative overflow-hidden transition-all active:scale-[0.99]",
				isOverdue && "border-l-4 border-l-destructive shadow-destructive/5",
				caseItem.isRush && !isOverdue && "border-l-4 border-l-amber-500 shadow-amber-500/5",
			)}
		>
			{/* TOP: IDENTITY & BADGES */}
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-tighter">#{caseItem.caseNumber}</span>
					{caseItem.isRemake && (
						<span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 text-[8px] font-black uppercase tracking-widest border border-rose-500/20">
							<RotateCcw className="w-2.5 h-2.5" /> Remake
						</span>
					)}
				</div>

				{isOverdue && (
					<span className="flex items-center gap-1 text-[10px] font-black text-destructive uppercase animate-pulse">
						<AlertCircle className="w-3.5 h-3.5" /> Overdue
					</span>
				)}
			</div>

			{/* MIDDLE: PATIENT & PRODUCTS */}
			<div className="space-y-1 mb-4">
				<h4 className="text-base font-bold text-foreground truncate">{caseItem.patientName}</h4>
				<div className="flex flex-wrap gap-1.5 mt-2">
					{caseItem.products.slice(0, 2).map((prod, i) => (
						<div
							key={i}
							className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-border text-[9px] font-bold text-muted-foreground uppercase tracking-widest truncate max-w-[120px]"
						>
							<Box className="w-2.5 h-2.5 shrink-0 opacity-50" />
							<span className="truncate">{prod}</span>
						</div>
					))}
					{caseItem.products.length > 2 && <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md">+{caseItem.products.length - 2} More</span>}
				</div>
			</div>

			{/* FOOTER: STAFF & ACTIONS */}
			<div className="flex items-center justify-between pt-4 border-t border-border/50">
				<div className="flex items-center -space-x-2 overflow-hidden">
					{caseItem.assignedTechs.length > 0 ? (
						<>
							{caseItem.assignedTechs.slice(0, 2).map((tech, i) => (
								<Avatar key={i} className="h-8 w-8 border-2 border-card shadow-sm ring-1 ring-border">
									{tech.avatar && <AvatarImage src={tech.avatar} />}
									<AvatarFallback className="text-[10px] font-black bg-primary/10 text-primary">{tech.name[0]}</AvatarFallback>
								</Avatar>
							))}
							{caseItem.assignedTechs.length > 2 && (
								<div className="h-8 w-8 rounded-full border-2 border-card bg-slate-100 dark:bg-white/5 ring-1 ring-border flex items-center justify-center text-[10px] font-black text-muted-foreground z-10">
									+{caseItem.assignedTechs.length - 2}
								</div>
							)}
						</>
					) : (
						<div className="flex items-center gap-2 text-slate-400 italic">
							<div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 border border-dashed border-border flex items-center justify-center">
								<User className="w-4 h-4 opacity-30" />
							</div>
						</div>
					)}
				</div>

				{/* THE DRAWER TRIGGER */}
				{canMove ? (
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button variant="secondary" size="sm" className="h-9 rounded-xl font-bold bg-primary text-primary-foreground shadow-sm px-4">
								Move <ArrowRight className="w-4 h-4 ml-1.5" />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="bg-card border-border px-4 pb-8">
							<div className="mx-auto w-full max-w-sm">
								<DrawerHeader className="px-0 pb-6">
									<DrawerTitle className="text-xl font-bold">Advance Production</DrawerTitle>
									<DrawerDescription className="text-sm">
										Move Case <span className="font-mono font-bold text-foreground">#{caseItem.caseNumber}</span> to the next stage.
									</DrawerDescription>
								</DrawerHeader>

								<div className="flex flex-col gap-3">
									{validNextSteps.length === 0 ? (
										<div className="p-8 text-center bg-slate-50 dark:bg-white/5 rounded-2xl border border-dashed border-border">
											<p className="text-sm text-muted-foreground italic">No further production stages available.</p>
										</div>
									) : (
										validNextSteps.map((status) => {
											const ui = STATUS_ACTION_MAP[status];
											if (!ui) return null;
											return (
												<Button
													key={status}
													variant="outline"
													className="h-16 justify-start px-5 rounded-2xl border-border hover:bg-primary/5 hover:border-primary/30 transition-all text-base font-bold group"
													onClick={() => handleMoveClick(status as CaseStatus)}
												>
													<div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-transform group-active:scale-90", ui.color)}>
														<ui.icon className="w-5 h-5" />
													</div>
													{ui.label}
												</Button>
											);
										})
									)}
								</div>

								<DrawerFooter className="px-0 mt-4">
									<DrawerClose asChild>
										<Button variant="ghost" className="h-12 rounded-xl font-bold text-muted-foreground">
											Close
										</Button>
									</DrawerClose>
								</DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
				) : (
					<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 px-3 py-1.5 bg-slate-50 dark:bg-white/2 rounded-lg border border-border/50">
						<Lock className="w-3 h-3" /> System Locked
					</div>
				)}
			</div>
		</div>
	);
});
