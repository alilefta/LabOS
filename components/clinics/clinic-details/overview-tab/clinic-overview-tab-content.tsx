"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

// Components
import { ClinicHealthRing } from "@/components/clinics/clinic/clinic-health-ring";
import { ClinicFinancialVitalsCard } from "@/components/clinics/clinic-details/overview-tab/clinic-financial-vitals-card";
import { ProductionQualityHeatmap } from "@/components/clinics/clinic/production-quality-heatmap";
import { AiRelationshipAuditor } from "@/components/clinics/clinic-details/overview-tab/ai-relationship-auditor";
import { Skeleton } from "@/components/ui/skeleton";

// Your grouped server action
import { handleSafeActionError } from "@/lib/safe-action-helpers";
import { ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import { Loader2, RefreshCcw, ServerCrash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClinicOverviewAnalyticsAction } from "@/actions/clinics/analytics";
import { ClinicalMixDonut } from "./clinical-mix-donut";
import { memo } from "react";

interface Props {
	clinicId: string;
	period: ClinicDashboardTimeFramePeriod;
	clinicName: string;
	currentBalance: number;
	creditLimit: number | null;
	discount: number | null;
}

export const ClinicOverviewTabContent = memo(function ClinicOverviewTabContent({ clinicId, period, clinicName, currentBalance, creditLimit, discount }: Props) {
	// 1. Fetch ALL overview data in one network request
	const { data, isError, refetch, isRefetching } = useSuspenseQuery({
		queryKey: ["clinic-overview", clinicId, period],
		queryFn: async () => {
			const res = await getClinicOverviewAnalyticsAction({ clinicId, period });

			if (res?.serverError || res?.validationErrors) {
				handleSafeActionError({ serverError: res.serverError, validationErrors: res.validationErrors });
				return null;
			}
			return res?.data ?? null;
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	});

	// // 2. High-End Skeleton Loading State
	// moved for a seperate component that is passed as a fallback around it's suspense boundary
	// if (isLoading) {
	// 	return (
	// 		<div className="flex flex-col gap-6 animate-in fade-in duration-500">
	// 			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
	// 				<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5" />
	// 				<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5" />
	// 				<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5" />
	// 			</div>
	// 			<Skeleton className="h-75 w-full rounded-4xl bg-slate-100 dark:bg-white/5" />
	// 			<Skeleton className="h-50 w-full rounded-4xl bg-slate-100 dark:bg-white/5" />
	// 		</div>
	// 	);
	// }

	// Safety fallback if data fails to load
	// 3. The "Awwwards-Level" Network Failure UI
	if (isError || !data) {
		return (
			<div className="w-full min-h-125 flex flex-col items-center justify-center p-8 rounded-4xl border-2 border-dashed border-destructive/20 bg-destructive/5 animate-in fade-in zoom-in-95 duration-500">
				<div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
					<ServerCrash className="w-8 h-8" />
				</div>
				<h3 className="text-xl font-bold text-foreground mb-2">Telemetry Disconnected</h3>
				<p className="text-sm text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
					LabOS was unable to retrieve the business intelligence metrics for this clinic. This is typically caused by a network interruption or a database timeout.
				</p>
				<Button
					onClick={() => refetch()}
					disabled={isRefetching}
					className="rounded-xl h-11 px-8 font-bold shadow-sm bg-background border border-border text-foreground hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
				>
					{isRefetching ? (
						<>
							<Loader2 className="w-4 h-4 mr-2 animate-spin text-muted-foreground" /> Reconnecting...
						</>
					) : (
						<>
							<RefreshCcw className="w-4 h-4 mr-2 text-muted-foreground" /> Retry Connection
						</>
					)}
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
			{/* TOP ROW: The 3 Pillars */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				<ClinicHealthRing scores={data.scores} />
				<ClinicalMixDonut categories={data.productMix.categories} workTypes={data.productMix.workTypes} products={data.productMix.products} />
				<ClinicFinancialVitalsCard balance={currentBalance} limit={creditLimit} discount={discount} />
			</div>

			{/* MIDDLE ROW: The Rhythm */}
			<div className="w-full">
				<ProductionQualityHeatmap clinicName={clinicName} heatmapData={data.heatmap} />
			</div>

			{/* BOTTOM ROW: The Brains */}
			<AiRelationshipAuditor clinicName={clinicName} scores={data.scores} meta={data.meta} />
		</div>
	);
});
