import { cn } from "@/lib/utils";
import { ClinicDashboardTimeFramePeriod } from "@/schema/composed/clinics/helpers";
import Link from "next/link";

export const TimeFrameFilter = ({ activePeriod, clinicId }: { activePeriod: ClinicDashboardTimeFramePeriod; clinicId: string }) => {
	return (
		<div className="flex items-center gap-2 bg-slate-100 dark:bg-[#121214] p-1 rounded-xl border border-border shadow-sm">
			{["30D", "90D", "YTD", "ALL"].map((period) => (
				<Link
					key={period}
					href={`/clinics/${clinicId}?tab=overview&period=${period.toLowerCase()}`}
					replace
					className={cn(
						"px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
						activePeriod === period.toLowerCase() ? "bg-white dark:bg-white/10 text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
					)}
				>
					{period}
				</Link>
			))}
		</div>
	);
};
