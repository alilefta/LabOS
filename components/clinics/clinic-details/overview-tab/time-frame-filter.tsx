import { cn } from "@/lib/utils";
import { ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import Link from "next/link";

const PERIODS: { id: ClinicDashboardTimeFramePeriod; label: string }[] = [
	{ id: "30d", label: "30D" },
	{ id: "90d", label: "90D" },
	{ id: "all", label: "ALL" },
	{ id: "ytd", label: "YTD" },
];

export function TimeFrameFilter({ activePeriod, clinicId }: { activePeriod: ClinicDashboardTimeFramePeriod; clinicId: string }) {
	return (
		<div className="flex items-center gap-2 bg-slate-100 dark:bg-[#121214] p-1 rounded-xl border border-border shadow-sm">
			{PERIODS.map((period) => {
				const isActive = activePeriod === period.id;
				return (
					<Link
						key={period.id}
						href={`/clinics/${clinicId}?period=${period.id}`}
						className={cn(
							"px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase",
							isActive ? "bg-white dark:bg-white/10 text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
						)}
					>
						{period.label}
					</Link>
				);
			})}
		</div>
	);
}

// ======================== nuqs version ===============================
// import { cn } from "@/lib/utils";
// import { parseAsStringLiteral, useQueryState } from "nuqs";
// import { CLINIC_PAGE_TIME_PERIODS } from "@/schema/composed/clinics/helpers";
// import { memo } from "react";

// export const TimeFrameFilter = memo(function TimeFrameFilter() {
// 	// Hook into nuqs
// 	const [activePeriod, setActivePeriod] = useQueryState("period", parseAsStringLiteral(CLINIC_PAGE_TIME_PERIODS).withDefault("90d"));
// 	return (
// 		<div className="flex items-center gap-2 bg-slate-100 dark:bg-[#121214] p-1 rounded-xl border border-border shadow-sm">
// 			{CLINIC_PAGE_TIME_PERIODS.map((period) => {
// 				const isActive = activePeriod === period;
// 				return (
// 					<button
// 						key={period}
// 						onClick={() => setActivePeriod(period)}
// 						className={cn(
// 							"px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase",
// 							isActive ? "bg-white dark:bg-white/10 text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
// 						)}
// 					>
// 						{period}
// 					</button>
// 				);
// 			})}
// 		</div>
// 	);
// });
