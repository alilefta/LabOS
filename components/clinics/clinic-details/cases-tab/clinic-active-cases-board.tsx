"use client";

import { useEffect, useCallback, useState, memo } from "react";
import { CaseStatus } from "@/schema/base/enums.base";
import { useClinicPipelineStore } from "./use-clinic-pipeline-store";
import { getStatusTransitionWarning } from "@/lib/permissions/cases/clinical-status-rules";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";
import { MobilePipelineTabs } from "./kanban/kanban-mobile/mobile-pipeline-tabs";
import { DesktopPipelineBoard } from "./kanban/kanban-desktop/desktop-pipeline-board";
import { KanbanInterceptorDialog } from "@/components/cases/kanban/shared/interceptor-dialog";

interface ClinicKanbanWrapperProps {
	clinicId: string;
	serverData: ClinicActiveCaseDTO[];
	onStatusChangeAction: (caseId: string, newStatus: CaseStatus) => Promise<void>;
}

export const ClinicKanbanWrapper = memo(function ClinicKanbanWrapper({ serverData, onStatusChangeAction }: ClinicKanbanWrapperProps) {
	// 1. Hook into the highly-performant local store
	const syncCases = useClinicPipelineStore((state) => state.syncCases);
	const moveCaseOptimistically = useClinicPipelineStore((state) => state.moveCaseOptimistically);
	const revertCaseMove = useClinicPipelineStore((state) => state.revertCaseMove);

	// 2. INTERCEPTOR / TRANSITION STATE
	const [pendingUpdate, setPendingUpdate] = useState<{
		case: ClinicActiveCaseDTO;
		newStatus: CaseStatus;
		oldStatus: CaseStatus;
	} | null>(null);

	const [warningMessage, setWarningMessage] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	// 3. HYDRATION: Sync server data into the interactive store
	useEffect(() => {
		syncCases(serverData);
	}, [serverData, syncCases]);

	// --- THE EXECUTION ENGINE ---
	// Handles the actual Server Action and UI rollback
	const executeTransition = useCallback(
		async (caseId: string, newStatus: CaseStatus, oldStatus: CaseStatus) => {
			setIsUpdating(true);

			// Step A: Move instantly in the UI (0ms latency)
			moveCaseOptimistically(caseId, newStatus);

			try {
				// Step B: Server Network Call
				await onStatusChangeAction(caseId, newStatus);

				// Step C: Success - Clear transition states
				setPendingUpdate(null);
				setWarningMessage(null);
			} catch (error) {
				// Step D: Failure - Physical rollback of the card to its original stage
				revertCaseMove(caseId, oldStatus);
			} finally {
				setIsUpdating(false);
			}
		},
		[moveCaseOptimistically, onStatusChangeAction, revertCaseMove],
	);

	// --- THE GATEKEEPER ---
	// This is the function passed to Desktop/Mobile children
	const requestStatusTransition = useCallback(
		(caseItem: ClinicActiveCaseDTO, newStatus: CaseStatus, oldStatus: CaseStatus) => {
			// 1. Run Clinical Business Rules
			// (e.g., is a technician assigned? is a scan uploaded?)
			// You can adapt your existing rule engine here
			const warning = getStatusTransitionWarning(newStatus, []); // Adjust params as needed

			if (warning) {
				// 2. INTERCEPT: Block the move and ask the user for confirmation
				setWarningMessage(warning);
				setPendingUpdate({ case: caseItem, newStatus, oldStatus });
				return;
			}

			// 3. PROCEED: If no rules are violated, execute immediately
			executeTransition(caseItem.id, newStatus, oldStatus);
		},
		[executeTransition],
	);

	const handleCancelWarning = useCallback(() => {
		setPendingUpdate(null);
		setWarningMessage(null);
	}, []);

	return (
		<div className="h-full w-full flex flex-col relative animate-in fade-in slide-in-from-bottom-4 duration-700">
			{/* --- VIEWPORT SWITCHER --- */}

			{/* DESKTOP: DnD-Kit Virtualized Board */}
			<div className="hidden md:block h-full">
				<DesktopPipelineBoard requestStatusTransition={requestStatusTransition} />
			</div>

			{/* MOBILE: Tabbed Tap-to-Move Interface */}
			<div className="md:hidden h-full flex flex-col">
				<MobilePipelineTabs requestStatusTransition={requestStatusTransition} />
			</div>

			{/* --- SHARED INTERCEPTOR DIALOG --- */}
			{/* Keeps the logic out of the Kanban boards themselves */}
			<KanbanInterceptorDialog
				isOpen={pendingUpdate !== null}
				isUpdating={isUpdating}
				warningMessage={warningMessage}
				onCancel={handleCancelWarning}
				onConfirm={() => {
					if (pendingUpdate) {
						executeTransition(pendingUpdate.case.id, pendingUpdate.newStatus, pendingUpdate.oldStatus);
					}
				}}
			/>
		</div>
	);
});

// "use client";

// import { Clock, AlertCircle, Wrench, UserPlus, FileBox, ArrowRight } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { format, differenceInDays } from "date-fns";

// // MOCK DATA: In reality, you filter the Clinic's `cases` array by status
// const ACTIVE_CASES = [
// 	{ id: "LAB-4492", patient: "Sarah Jenkins", status: "NEW", deadline: new Date(Date.now() + 86400000 * 5), items: ["Zirconia Crown", "Custom Abutment"], isRush: false },
// 	{ id: "LAB-4493", patient: "Michael Chen", status: "ASSIGNED", deadline: new Date(Date.now() + 86400000 * 2), tech: { name: "Julian C.", avatar: "" }, items: ["E-Max Veneer x4"], isRush: true },
// 	{
// 		id: "LAB-4480",
// 		patient: "Emma Watson",
// 		status: "PROCESSING",
// 		deadline: new Date(Date.now() + 86400000 * 1),
// 		tech: { name: "Elena V.", avatar: "https://i.pravatar.cc/150?img=32" },
// 		items: ["Acrylic Partial"],
// 		isRush: true,
// 	},
// 	{
// 		id: "LAB-4485",
// 		patient: "David Kim",
// 		status: "PROCESSING",
// 		deadline: new Date(Date.now() + 86400000 * 4),
// 		tech: { name: "Elena V.", avatar: "https://i.pravatar.cc/150?img=32" },
// 		items: ["Zirconia Bridge (3 Unit)"],
// 		isRush: false,
// 	},
// ];

// const COLUMNS = [
// 	{ id: "NEW", label: "Intake / New", icon: FileBox, color: "text-blue-500", bg: "bg-blue-500/10" },
// 	{ id: "ASSIGNED", label: "Assigned / Pre-Op", icon: UserPlus, color: "text-primary", bg: "bg-primary/10" },
// 	{ id: "PROCESSING", label: "In Production", icon: Wrench, color: "text-amber-500", bg: "bg-amber-500/10" },
// ];

// export function ClinicActiveCasesBoard() {
// 	return (
// 		<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
// 			<div className="flex items-center justify-between">
// 				<div>
// 					<h3 className="text-sm font-bold text-foreground tracking-tight">Active Production Pipeline</h3>
// 					<p className="text-xs text-muted-foreground mt-1">Currently manufacturing {ACTIVE_CASES.length} cases for this partner.</p>
// 				</div>
// 			</div>

// 			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
// 				{COLUMNS.map((col) => {
// 					const columnCases = ACTIVE_CASES.filter((c) => c.status === col.id);

// 					return (
// 						<div key={col.id} className="flex flex-col bg-slate-50/50 dark:bg-[#09090B] border border-border rounded-[24px] overflow-hidden shadow-sm">
// 							{/* Column Header */}
// 							<div className="p-4 border-b border-border bg-card flex items-center justify-between sticky top-0 z-10">
// 								<div className="flex items-center gap-2.5">
// 									<div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", col.bg, col.color)}>
// 										<col.icon className="w-4 h-4" />
// 									</div>
// 									<h4 className="text-[13px] font-bold text-foreground">{col.label}</h4>
// 								</div>
// 								<span className="text-[10px] font-bold text-muted-foreground bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">{columnCases.length}</span>
// 							</div>

// 							{/* Column Body */}
// 							<div className="p-3 sm:p-4 flex-1 overflow-y-auto custom-scrollbar space-y-3 min-h-[300px] max-h-[600px]">
// 								{columnCases.length === 0 ? (
// 									<div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-50">
// 										<p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Empty Queue</p>
// 									</div>
// 								) : (
// 									columnCases.map((c) => (
// 										<div
// 											key={c.id}
// 											className={cn(
// 												"bg-card border rounded-2xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer group",
// 												c.isRush ? "border-l-4 border-l-amber-500 border-border" : "border-border hover:border-primary/40",
// 											)}
// 										>
// 											<div className="flex items-start justify-between mb-3">
// 												<div className="flex flex-col gap-1">
// 													<span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">{c.id}</span>
// 													<span className="text-sm font-bold text-foreground">{c.patient}</span>
// 												</div>
// 												{c.tech ? (
// 													<Avatar className="w-7 h-7 border border-border">
// 														<AvatarImage src={c.tech.avatar} />
// 														<AvatarFallback className="bg-primary/10 text-primary text-[9px] font-bold">{c.tech.name.substring(0, 2).toUpperCase()}</AvatarFallback>
// 													</Avatar>
// 												) : (
// 													<div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 border border-dashed border-border flex items-center justify-center">
// 														<UserPlus className="w-3 h-3 text-muted-foreground opacity-50" />
// 													</div>
// 												)}
// 											</div>

// 											<div className="flex flex-wrap gap-1.5 mb-4">
// 												{c.items.map((item, i) => (
// 													<span
// 														key={i}
// 														className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-muted-foreground border border-border/50 truncate max-w-[140px]"
// 													>
// 														{item}
// 													</span>
// 												))}
// 											</div>

// 											<div className="flex items-center justify-between pt-3 border-t border-border/50">
// 												<div className={cn("flex items-center gap-1.5 text-[11px] font-bold", c.isRush ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground")}>
// 													{c.isRush ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
// 													<span>Due: {format(c.deadline, "MMM dd")}</span>
// 												</div>
// 												<ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
// 											</div>
// 										</div>
// 									))
// 								)}
// 							</div>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// }
