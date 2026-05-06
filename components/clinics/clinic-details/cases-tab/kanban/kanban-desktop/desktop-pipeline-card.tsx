"use client";

import React, { memo, useMemo } from "react";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDistanceToNow, isBefore, startOfDay } from "date-fns";
import { Clock, AlertCircle, User, Box, Lock, ExternalLink, RotateCcw } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/providers/permissions-provider";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";

interface CardProps {
	caseItem: ClinicActiveCaseDTO;
	isOverlay?: boolean;
}

export const DesktopPipelineCard = memo(function DesktopPipelineCard({ caseItem, isOverlay }: CardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: caseItem.id,
		data: { ...caseItem },
	});

	// Use our existing permission layer to gate-keep movements
	const { canAdvanceStatus, isManagement, staffId } = usePermissions();

	// --- 1. DYNAMIC METADATA (Performance Optimized) ---
	const { canDrag, isOverdue, timeLabel } = useMemo(() => {
		const today = startOfDay(new Date());
		const deadlineDate = caseItem.deadline ? startOfDay(new Date(caseItem.deadline)) : null;

		const overdue = deadlineDate ? isBefore(deadlineDate, today) : false;

		// Logic: Managers can move anything. Technicians can move cases assigned to them.
		const isAssignedToMe = caseItem.leadTech?.name.includes(staffId || "---"); // Simplified matching

		return {
			canDrag: isManagement || (canAdvanceStatus && isAssignedToMe),
			isOverdue: overdue,
			timeLabel: caseItem.deadline ? formatDistanceToNow(new Date(caseItem.deadline), { addSuffix: true }) : "Unscheduled",
		};
	}, [caseItem.deadline, caseItem.leadTech, staffId, isManagement, canAdvanceStatus]);

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
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

				// "Awwwards" Drag Overlay Effect
				isOverlay && "shadow-2xl border-primary/50 cursor-grabbing rotate-2 scale-105 z-[100] bg-card/95 backdrop-blur-sm",

				// Priority Borders
				isOverdue && "border-l-4 border-l-destructive",
				caseItem.isRush && !isOverdue && "border-l-4 border-l-amber-500",
			)}
		>
			{/* THE NAV LINK (Covers the card for easy navigation to the Dossier) */}
			<Link
				href={`/cases/${caseItem.id}`}
				className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
				aria-label={`View case ${caseItem.caseNumber}`}
			/>

			{/* CONTENT WRAPPER */}
			<div className="relative z-20 p-4 pointer-events-none">
				{/* Header: IDs & Status Badges */}
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-tighter">#{caseItem.caseNumber}</span>
						{caseItem.isRemake && (
							<span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[8px] font-black uppercase tracking-widest border border-rose-500/20 shadow-sm">
								<RotateCcw className="w-2.5 h-2.5" /> Remake
							</span>
						)}
					</div>

					<div className="flex items-center gap-2">
						{isOverdue && (
							<span className="flex items-center gap-1 text-[9px] font-black text-destructive uppercase animate-pulse">
								<AlertCircle className="w-3 h-3" /> Overdue
							</span>
						)}
						<ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-40 transition-opacity" />
						{!canDrag && <Lock className="w-3 h-3 text-muted-foreground/30" />}
					</div>
				</div>

				{/* Middle: Patient Identity */}
				<div className="space-y-1 mb-4">
					<h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{caseItem.patientName}</h4>
					<p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.1em]">Patient Record</p>
				</div>

				{/* Product Tags: Shows up to 2 items then a count */}
				<div className="flex flex-wrap gap-1.5 mb-4 overflow-hidden">
					{caseItem.products.slice(0, 2).map((prod, i) => (
						<div
							key={i}
							className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-[9px] font-bold text-primary uppercase tracking-widest truncate max-w-[140px]"
						>
							<Box className="w-2.5 h-2.5 shrink-0" />
							<span className="truncate">{prod}</span>
						</div>
					))}
					{caseItem.products.length > 2 && (
						<span className="text-[9px] font-bold text-muted-foreground bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded-md">+{caseItem.products.length - 2} More</span>
					)}
				</div>

				{/* Footer: Timeline & Assigned Human */}
				<div className="flex items-center justify-between pt-3 border-t border-border/50">
					<div
						className={cn(
							"flex items-center gap-1.5 text-[10px] font-bold",
							isOverdue ? "text-destructive" : caseItem.isRush ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground",
						)}
					>
						{isOverdue ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
						<span>{timeLabel}</span>
					</div>

					<div className="pointer-events-auto relative z-30">
						{caseItem.leadTech ? (
							<div className="flex items-center gap-2 group/tech">
								<Avatar className="h-6 w-6 border border-border shadow-inner group-hover/tech:border-primary/50 transition-colors">
									{caseItem.leadTech.avatar && <AvatarImage src={caseItem.leadTech.avatar} />}
									<AvatarFallback className="text-[8px] font-bold bg-primary/10 text-primary">{caseItem.leadTech.name[0]}</AvatarFallback>
								</Avatar>
							</div>
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

DesktopPipelineCard.displayName = "DesktopPipelineCard";
