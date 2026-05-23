"use client";

import { cn } from "@/lib/utils";
import { GlobalTimeFramePeriod } from "@/schema/composed/shared/date-preset";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const PERIODS: { id: GlobalTimeFramePeriod; label: string }[] = [
	{ id: "30d", label: "30D" },
	{ id: "90d", label: "90D" },
	{ id: "ytd", label: "YTD" },
	{ id: "all", label: "ALL" },
];

export function TimeFrameFilter({ activePeriod }: { activePeriod: GlobalTimeFramePeriod }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Helper to dynamically update the URL while preserving other search params (like ?tab=)
	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);
		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="flex items-center gap-1 sm:gap-2 bg-slate-100 dark:bg-[#121214] p-1 rounded-xl border border-border shadow-sm w-fit shrink-0">
			{PERIODS.map((period) => {
				const isActive = activePeriod === period.id;
				return (
					<Link
						key={period.id}
						href={createQueryString("period", period.id)}
						replace // Prevents bloating the browser "Back" history with filter clicks
						className={cn(
							"px-2 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all uppercase tracking-widest",
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
