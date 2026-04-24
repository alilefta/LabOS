import { CaseDetailsUI } from "@/schema/composed/case.details";
import { memo } from "react";
import { MapPin, User, CalendarClock, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { format, differenceInDays, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { EditDeadlinePopover } from "../../quick-edits/edit-deadline-popover";
interface DeadlineAndOriginCardProps {
	dentalCase: CaseDetailsUI;
}
export const DeadlineAndOriginCard = memo(function DeadlineAndOriginCard({ dentalCase }: DeadlineAndOriginCardProps) {
	const today = new Date();
	const daysUntilDeadline = dentalCase.deadline ? differenceInDays(startOfDay(dentalCase.deadline), startOfDay(today)) : 0;

	// Ensure terminal cases don't trigger "Overdue" or "Rush" UI
	const isTerminal = dentalCase.status === "COMPLETED" || dentalCase.status === "DELIVERED";
	const isRush = !isTerminal && daysUntilDeadline <= 3 && daysUntilDeadline >= 0;
	const isOverdue = !isTerminal && daysUntilDeadline < 0;

	return (
		<div className="lab-card overflow-hidden">
			{/* The Popover Wraps the top section only! */}
			<EditDeadlinePopover status={dentalCase.status} caseId={dentalCase.id} currentDeadline={dentalCase.deadline}>
				<div className={cn("p-5 border-b border-border flex items-start justify-between", isOverdue ? "bg-destructive/10" : isRush ? "bg-amber-500/10" : "bg-slate-50 dark:bg-white/2")}>
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105",
								isTerminal
									? "bg-slate-200 dark:bg-white/10 text-muted-foreground" // Grey out if finished
									: isOverdue
										? "bg-destructive text-white"
										: isRush
											? "bg-amber-500 text-white"
											: "bg-primary/10 text-primary",
							)}
						>
							{isTerminal ? (
								<CheckCircle2 className="w-5 h-5" />
							) : isOverdue ? (
								<AlertCircle className="w-5 h-5" />
							) : isRush ? (
								<Clock className="w-5 h-5" />
							) : (
								<CalendarClock className="w-5 h-5" />
							)}
						</div>

						<div>
							<h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Target Delivery</h3>
							<p
								className={cn(
									"text-sm font-bold",
									isTerminal
										? "text-muted-foreground line-through decoration-muted-foreground/50" // Strikethrough if finished
										: isOverdue
											? "text-destructive"
											: isRush
												? "text-amber-600 dark:text-amber-500"
												: "text-foreground",
								)}
							>
								{dentalCase.deadline ? format(new Date(dentalCase.deadline), "EEEE, MMM do") : "Unscheduled"}
							</p>
						</div>
					</div>
				</div>
			</EditDeadlinePopover>

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
	);
});
