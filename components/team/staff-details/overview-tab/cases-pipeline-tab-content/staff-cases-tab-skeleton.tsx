// components/team/team-details/cases-tab/staff-cases-tab-skeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export function StaffCasesTabSkeleton() {
	return (
		<div className="space-y-6 animate-pulse">
			{/* Active Workload Summary Card Skeleton */}
			<div className="p-6 rounded-3xl border border-border bg-slate-50/50 dark:bg-white/2 flex justify-between items-center">
				<div className="space-y-2">
					<Skeleton className="h-4 w-32 bg-slate-200 dark:bg-white/5" />
					<Skeleton className="h-6 w-48 bg-slate-200 dark:bg-white/5" />
				</div>
				<Skeleton className="h-10 w-32 bg-slate-200 dark:bg-white/5 rounded-xl" />
			</div>

			{/* Active Cases Table Skeleton */}
			<div className="rounded-4xl border border-border overflow-hidden">
				<div className="h-12 bg-slate-50 dark:bg-white/5 border-b border-border" />
				<div className="p-4 space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="flex items-center justify-between gap-4 py-2">
							<Skeleton className="h-8 w-24 bg-slate-100 dark:bg-white/5 rounded-lg" />
							<Skeleton className="h-8 w-48 bg-slate-100 dark:bg-white/5 rounded-lg" />
							<Skeleton className="h-8 w-32 bg-slate-100 dark:bg-white/5 rounded-lg" />
							<Skeleton className="h-8 w-20 bg-slate-100 dark:bg-white/5 rounded-lg" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
