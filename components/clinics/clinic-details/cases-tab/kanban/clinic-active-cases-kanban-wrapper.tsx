"use client";

import { memo, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { CaseStatus } from "@/schema/base/enums.base";
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { updateCaseStatusAction } from "@/actions/cases/update-case";
import { ClinicActiveCasesKanban } from "./clinic-active-cases-kanban";
import { getClinicActivePipelineAction } from "@/actions/clinics/get-clinic";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
	clinicId: string;
}

export const ClinicActiveCasesKanbanWrapper = memo(function ClinicActiveCasesKanbanWrapper({ clinicId }: Props) {
	// ── 1. FETCH ACTIVE PIPELINE ──────────────────────────────────────────
	// Unlike the global cases page, we don't need infinite scroll here.
	// Active cases for a single clinic rarely exceed 50 at one time. A flat query is optimal.
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["clinic-active-pipeline", clinicId],
		queryFn: async () => {
			const res = await getClinicActivePipelineAction({ clinicId });
			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return null;
			}
			return res?.data ?? null;
		},
		staleTime: 1000 * 20, // 20 seconds
	});

	// ── 2. KANBAN STATUS MUTATION ──────────────────────────────────────────
	const { executeAsync: updateStatus } = useAction(updateCaseStatusAction, {
		onSuccess: () => {
			// Background refresh to ensure server and client match exactly
			refetch();
		},
		onError: ({ error }) => handleSafeActionError(error),
	});

	const handleStatusChange = useCallback(
		async (caseId: string, newStatus: CaseStatus) => {
			const promise = updateStatus({ caseId, newStatus });

			toast.promise(promise, {
				loading: "Moving case...",
				success: "Production stage updated.",
				error: "Failed to move case.",
			});

			await promise; // Return the promise so the Wrapper's try/catch works!
		},
		[updateStatus],
	);

	// Flatten the pipeline grouped data from the server into the flat array expected by the wrapper
	const flatCases = useMemo(() => {
		if (!data?.pipeline) return [];
		// Assuming the action returns { pipeline: { NEW: [], ASSIGNED: [], PROCESSING: [], COMPLETED: [] } }
		return [...data.pipeline.NEW, ...data.pipeline.ASSIGNED, ...data.pipeline.PROCESSING, ...data.pipeline.COMPLETED];
	}, [data]);

	// ── 3. RENDER STATES ───────────────────────────────────────────────────

	if (isLoading) {
		return (
			<div className="space-y-6 animate-in fade-in duration-500">
				<div className="flex items-center justify-between mb-4">
					<div className="space-y-2">
						<Skeleton className="h-5 w-48" />
						<Skeleton className="h-3 w-64" />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-125">
					<Skeleton className="rounded-3xl bg-slate-100 dark:bg-white/5 h-full w-full" />
					<Skeleton className="rounded-3xl bg-slate-100 dark:bg-white/5 h-full w-full hidden md:block" />
					<Skeleton className="rounded-3xl bg-slate-100 dark:bg-white/5 h-full w-full hidden md:block" />
					<Skeleton className="rounded-3xl bg-slate-100 dark:bg-white/5 h-full w-full hidden md:block" />
				</div>
			</div>
		);
	}

	return (
		<TooltipProvider delayDuration={200}>
			<div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full min-h-0">
				{/* Context Header */}
				<div className="flex items-center justify-between shrink-0">
					<div>
						<h3 className="text-sm font-bold text-foreground tracking-tight">Active Production Pipeline</h3>
						<p className="text-[11px] text-muted-foreground mt-1 font-medium">
							Currently manufacturing <span className="font-bold text-foreground">{flatCases.length}</span> active cases for this partner.
						</p>
					</div>
				</div>

				{/* 
                THE KANBAN WRAPPER 
                We pass the flat array and the mutation handler down.
            */}
				<div className="flex-1 min-h-0 relative w-full">
					<ClinicActiveCasesKanban clinicId={clinicId} serverData={flatCases} onStatusChangeAction={handleStatusChange} />
				</div>
			</div>
		</TooltipProvider>
	);
});
