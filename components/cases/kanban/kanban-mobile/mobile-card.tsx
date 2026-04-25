"use client";

import { useState } from "react";
import { formatDistanceToNow, isBefore, startOfDay } from "date-fns";
import { AlertCircle, User, Box, Lock, ArrowRight, Activity, PackageCheck, Truck, LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

import { CaseStatus } from "@/schema/base/enums.base";
import { usePermissions } from "@/providers/permissions-provider";
import { CaseListDTO } from "@/schema/composed/case.details";
import { VALID_TRANSITIONS } from "@/lib/permissions/cases/clinical-status-rules";

// Mapping statuses to icons/colors for the Drawer buttons
const STATUS_UI_MAP: Record<string, { label: string; icon: LucideIcon; color: string }> = {
	ASSIGNED: { label: "Move to Queue", icon: User, color: "text-slate-500 bg-slate-100 dark:bg-white/10" },
	PROCESSING: { label: "Start Production", icon: Activity, color: "text-amber-500 bg-amber-500/10" },
	COMPLETED: { label: "Mark as Verified", icon: PackageCheck, color: "text-emerald-500 bg-emerald-500/10" },
	DELIVERED: { label: "Dispatch / Deliver", icon: Truck, color: "text-emerald-600 bg-emerald-600/10" },
};

interface MobileCardProps {
	caseItem: CaseListDTO;
	requestStatusTransition: (caseItem: CaseListDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => void;
}

export function MobileCard({ caseItem, requestStatusTransition }: MobileCardProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const { canAdvanceStatus, isManagement, staffId } = usePermissions();

	// 1. Permission Gating
	const isAssignedToMe = caseItem.leadTechnician?.id === staffId;
	const canMove = isManagement || (canAdvanceStatus && isAssignedToMe);

	const allowedNext = VALID_TRANSITIONS[caseItem.status] || [];
	const validNextSteps = allowedNext.filter((status) => ["ASSIGNED", "PROCESSING", "COMPLETED", "DELIVERED"].includes(status));

	const today = new Date();
	const isOverdue = caseItem.deadline ? isBefore(startOfDay(new Date(caseItem.deadline)), startOfDay(today)) : false;
	const isRush = caseItem.deadline && !isOverdue ? formatDistanceToNow(new Date(caseItem.deadline)).includes("day") : false;

	const handleMoveClick = (newStatus: CaseStatus) => {
		setIsDrawerOpen(false);
		// Let the Kanban Wrapper handle the optimistic UI and interceptor warnings!
		requestStatusTransition(caseItem, newStatus, caseItem.status);
	};

	return (
		<div className={cn("bg-card border rounded-2xl p-4 shadow-sm relative overflow-hidden", isOverdue && "border-l-4 border-l-destructive", isRush && "border-l-4 border-l-amber-500")}>
			{/* Top: Case ID & Badges */}
			<div className="flex items-center justify-between mb-3">
				<span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-tighter">#{caseItem.caseNumber}</span>
				{isOverdue && (
					<span className="flex items-center gap-1 text-[10px] font-black text-destructive uppercase animate-pulse">
						<AlertCircle className="w-3.5 h-3.5" /> Overdue
					</span>
				)}
			</div>

			{/* Middle: Patient & Clinic */}
			<div className="space-y-1 mb-4">
				<h4 className="text-base font-bold text-foreground truncate">{caseItem.patientName}</h4>
				<p className="text-xs text-muted-foreground font-medium truncate">{caseItem.clinicName}</p>
			</div>

			{/* Product Badge */}
			<div className="mb-5">
				<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest truncate max-w-full">
					<Box className="w-3.5 h-3.5 shrink-0" />
					<span className="truncate">{caseItem.primaryProduct || "No Product"}</span>
				</div>
			</div>

			{/* Footer: Tech & Move Action */}
			<div className="flex items-center justify-between pt-4 border-t border-border/50">
				{/* Avatar Block */}
				<div className="flex items-center gap-2">
					{caseItem.leadTechnician ? (
						<>
							<Avatar className="h-8 w-8 border border-border shadow-sm">
								{caseItem.leadTechnician.avatarUrl && <AvatarImage src={caseItem.leadTechnician.avatarUrl} />}
								<AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">{caseItem.leadTechnician.firstName[0]}</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lead Tech</span>
								<span className="text-xs font-bold text-foreground truncate max-w-25">{caseItem.leadTechnician.firstName}</span>
							</div>
						</>
					) : (
						<div className="flex items-center gap-2 text-slate-400">
							<div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-dashed border-border flex items-center justify-center">
								<User className="w-4 h-4" />
							</div>
							<span className="text-[10px] font-bold uppercase tracking-widest">Unassigned</span>
						</div>
					)}
				</div>

				{/* The Mobile Action Drawer */}
				{canMove ? (
					<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
						<DrawerTrigger asChild>
							<Button variant="secondary" size="sm" className="h-9 rounded-xl font-bold bg-primary/10 hover:bg-primary/20 text-primary">
								Move Case <ArrowRight className="w-4 h-4 ml-1.5" />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="bg-card border-border">
							<div className="mx-auto w-full max-w-sm">
								<DrawerHeader>
									<DrawerTitle>Advance Case Status</DrawerTitle>
									<DrawerDescription>Move Case #{caseItem.caseNumber} to the next production stage.</DrawerDescription>
								</DrawerHeader>
								<div className="p-4 pb-0 flex flex-col gap-3">
									{validNextSteps.length === 0 ? (
										<p className="text-sm text-center text-muted-foreground italic py-4">No further stages available.</p>
									) : (
										validNextSteps.map((status) => {
											const ui = STATUS_UI_MAP[status];
											if (!ui) return null;
											return (
												<Button
													key={status}
													variant="outline"
													className="h-14 justify-start px-4 rounded-2xl border-border hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-sm font-bold"
													onClick={() => handleMoveClick(status as CaseStatus)}
												>
													<div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mr-3", ui.color)}>
														<ui.icon className="w-4 h-4" />
													</div>
													{ui.label}
												</Button>
											);
										})
									)}
								</div>
								<DrawerFooter>
									<DrawerClose asChild>
										<Button variant="ghost" className="h-12 rounded-xl font-bold">
											Cancel
										</Button>
									</DrawerClose>
								</DrawerFooter>
							</div>
						</DrawerContent>
					</Drawer>
				) : (
					<div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground px-2 py-1 bg-slate-50 dark:bg-white/5 rounded-lg border border-border">
						<Lock className="w-3.5 h-3.5" /> Locked
					</div>
				)}
			</div>
		</div>
	);
}
