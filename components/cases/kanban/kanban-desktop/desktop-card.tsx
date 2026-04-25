"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow, isBefore, startOfDay } from "date-fns";
import { Clock, AlertCircle, User, Box, Lock, ExternalLink } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { CaseListDTO } from "@/schema/composed/case.details";
import { usePermissions } from "@/providers/permissions-provider";

interface CardProps {
	caseItem: CaseListDTO;
	isOverlay?: boolean;
}

export const DesktopKanbanCard = memo(function DesktopKanbanCard({ caseItem, isOverlay }: CardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: caseItem.id,
		data: { ...caseItem },
	});

	const { canAdvanceStatus, isManagement, staffId } = usePermissions();

	// --- 1. MEMOIZED LOGIC (Performance Gain) ---
	const { canDrag, isOverdue, isRush, timeLabel } = useMemo(() => {
		const today = startOfDay(new Date());
		const deadlineDate = caseItem.deadline ? startOfDay(new Date(caseItem.deadline)) : null;

		const overdue = deadlineDate ? isBefore(deadlineDate, today) : false;

		// If it's not overdue but within 2 days, it's a rush case
		const rush = deadlineDate && !overdue ? formatDistanceToNow(deadlineDate).includes("day") : false;

		const isAssignedToMe = caseItem.leadTechnician?.id === staffId;

		return {
			canDrag: isManagement || (canAdvanceStatus && isAssignedToMe),
			isOverdue: overdue,
			isRush: rush,
			timeLabel: caseItem.deadline ? formatDistanceToNow(new Date(caseItem.deadline), { addSuffix: true }) : "Unscheduled",
		};
	}, [caseItem.deadline, caseItem.leadTechnician?.id, staffId, isManagement, canAdvanceStatus]);

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		// Performance hint for the browser
		willChange: isDragging ? "transform, opacity" : "auto",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...(canDrag ? listeners : {})}
			className={cn(
				"group relative bg-card border rounded-2xl transition-all duration-200 select-none touch-none",
				!canDrag && "cursor-default",
				isDragging ? "opacity-30 grayscale-[0.5] z-0" : "opacity-100 shadow-sm hover:shadow-md",
				canDrag && !isDragging && "hover:border-primary/30 active:scale-[0.98]",
				isOverlay && "shadow-2xl border-primary/50 cursor-grabbing rotate-2 scale-105 z-[100] bg-card/95 backdrop-blur-sm",
				isOverdue && "border-l-4 border-l-destructive",
				isRush && !isOverdue && "border-l-4 border-l-amber-500",
			)}
		>
			{/* 
				THE NAV LINK 
				We place the link inside the card but absolute-positioned to cover it.
				z-10 ensures it sits above the background but below drag handles if needed.
			*/}
			<Link
				href={`/cases/${caseItem.id}`}
				className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
				aria-label={`View dossier for case ${caseItem.caseNumber}`}
			/>

			{/* CONTENT WRAPPER (Relative z-20 to stay above the absolute link for visual icons) */}
			<div className="relative z-20 p-4 pointer-events-none">
				{/* Top Actions & Badges */}
				<div className="flex items-center justify-between mb-3">
					<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-tighter">#{caseItem.caseNumber}</span>

					<div className="flex items-center gap-2">
						{isOverdue && (
							<span className="flex items-center gap-1 text-[9px] font-black text-destructive uppercase animate-pulse">
								<AlertCircle className="w-3 h-3" /> Overdue
							</span>
						)}
						{/* Subtle indicator that the card is clickable */}
						<ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-40 transition-opacity" />
						{!canDrag && <Lock className="w-3 h-3 text-muted-foreground/30" />}
					</div>
				</div>

				{/* Middle: Patient & Clinic */}
				<div className="space-y-1 mb-4">
					<h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{caseItem.patientName}</h4>
					<p className="text-[11px] text-muted-foreground font-medium truncate italic">{caseItem.clinicName}</p>
				</div>

				{/* Product Badge */}
				<div className="mb-4">
					<div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest truncate max-w-full">
						<Box className="w-3 h-3 shrink-0" />
						<span className="truncate">{caseItem.primaryProduct || "No Product"}</span>
					</div>
				</div>

				{/* Footer: Deadline & Tech */}
				<div className="flex items-center justify-between pt-3 border-t border-border/50">
					<div className="flex items-center gap-1.5">
						<Clock className={cn("w-3.5 h-3.5", isOverdue ? "text-destructive" : "text-slate-400")} />
						<span className={cn("text-[10px] font-bold", isOverdue ? "text-destructive" : "text-muted-foreground")}>{timeLabel}</span>
					</div>

					<div className="pointer-events-auto relative z-30">
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
			</div>
		</div>
	);
});
