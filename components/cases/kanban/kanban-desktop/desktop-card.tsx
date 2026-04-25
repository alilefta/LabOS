"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow, isBefore, startOfDay } from "date-fns";
import { Clock, AlertCircle, User, Box, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CaseListDTO } from "@/schema/composed/case.details";
import { usePermissions } from "@/providers/permissions-provider";

interface CardProps {
	caseItem: CaseListDTO;
	isOverlay?: boolean;
}

export function DesktopKanbanCard({ caseItem, isOverlay }: CardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: caseItem.id, data: { ...caseItem } });
	const { canAdvanceStatus, isManagement, staffId } = usePermissions();

	// 1. Determine if the current user is allowed to pick this card up
	const isAssignedToMe = caseItem.leadTechnician?.id === staffId;

	// Management can drag anything. Techs can only drag their own cases (if they have advance permissions).
	const canDrag = isManagement || (canAdvanceStatus && isAssignedToMe);

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	const today = new Date();
	const isOverdue = caseItem.deadline ? isBefore(startOfDay(new Date(caseItem.deadline)), startOfDay(today)) : false;
	const isRush = caseItem.deadline && !isOverdue ? formatDistanceToNow(new Date(caseItem.deadline)).includes("day") : false;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...(canDrag ? listeners : {})} // Only attach drag listeners if authorized!
			className={cn(
				"group relative bg-card border rounded-2xl p-4 transition-all select-none touch-none",
				!canDrag && "cursor-default", // Remove grab cursor if locked
				isDragging ? "opacity-30 grayscale-[0.5]" : "opacity-100 shadow-sm hover:shadow-md",
				canDrag && !isDragging && "hover:border-primary/30",
				isOverlay && "shadow-2xl border-primary/50 cursor-grabbing rotate-2 scale-105 z-50 bg-card/95 backdrop-blur-sm",
				isOverdue && "border-l-4 border-l-destructive",
				isRush && "border-l-4 border-l-amber-500",
			)}
		>
			{/* Visual Lock for unauthorized users */}
			{!canDrag && <Lock className="absolute top-3 right-3 w-3 h-3 text-muted-foreground/30" />}

			{/* Top: Case ID & Badges */}
			<div className="flex items-center justify-between mb-3">
				<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-tighter">#{caseItem.caseNumber}</span>
				{isOverdue && (
					<span className="flex items-center gap-1 text-[9px] font-black text-destructive uppercase animate-pulse">
						<AlertCircle className="w-3 h-3" /> Overdue
					</span>
				)}
			</div>

			{/* Middle: Patient & Clinic */}
			<div className="space-y-1 mb-4">
				<h4 className="text-sm font-bold text-foreground truncate">{caseItem.patientName}</h4>
				<p className="text-[11px] text-muted-foreground font-medium truncate">{caseItem.clinicName}</p>
			</div>

			{/* Product Badge */}
			<div className="mb-4 pr-4">
				<div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest truncate max-w-full">
					<Box className="w-3 h-3 shrink-0" />
					<span className="truncate">{caseItem.primaryProduct || "No Product"}</span>
				</div>
			</div>

			{/* Footer: Deadline & Tech */}
			<div className="flex items-center justify-between pt-3 border-t border-border/50">
				<div className="flex items-center gap-1.5">
					<Clock className={cn("w-3.5 h-3.5", isOverdue ? "text-destructive" : "text-slate-400")} />
					<span className={cn("text-[10px] font-bold", isOverdue ? "text-destructive" : "text-muted-foreground")}>
						{caseItem.deadline ? formatDistanceToNow(new Date(caseItem.deadline), { addSuffix: true }) : "Unscheduled"}
					</span>
				</div>

				{caseItem.leadTechnician ? (
					<Avatar className="h-6 w-6 border border-border shadow-inner">
						{caseItem.leadTechnician.avatarUrl && <AvatarImage src={caseItem.leadTechnician.avatarUrl} />}
						<AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary">{caseItem.leadTechnician.firstName[0]}</AvatarFallback>
					</Avatar>
				) : (
					<div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/5 border border-dashed border-border flex items-center justify-center text-slate-400" title="Unassigned">
						<User className="w-3 h-3" />
					</div>
				)}
			</div>
		</div>
	);
}
