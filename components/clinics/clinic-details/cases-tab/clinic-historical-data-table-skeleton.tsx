import { Skeleton } from "@/components/ui/skeleton";

export function ClinicHistoricalDataTableSkeleton() {
	return (
		<div className="lab-card flex-1 flex flex-col overflow-hidden min-h-150 w-full animate-pulse border-border/50">
			{/* --- ZONE A & B: COMMAND STRIP SKELETON --- */}
			<div className="p-4 sm:p-5 border-b border-border/50 bg-slate-50/50 dark:bg-white/2 flex flex-col gap-5">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					{/* Zone A: Vitals */}
					<div className="flex items-center gap-3">
						<Skeleton className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-32 rounded-md bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-3 w-24 rounded-md bg-slate-100 dark:bg-white/5" />
						</div>
					</div>

					{/* Zone B: Global Controls */}
					<div className="flex items-center gap-3">
						<Skeleton className="w-32 h-9 rounded-xl bg-slate-100 dark:bg-white/5" />
						<Skeleton className="w-24 h-9 rounded-xl bg-slate-100 dark:bg-white/5" />
						<Skeleton className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5" />
					</div>
				</div>

				{/* SEARCH BAR SKELETON */}
				<Skeleton className="w-full h-11 rounded-2xl bg-slate-100 dark:bg-white/5" />
			</div>

			{/* --- DATA TABLE ZONE SKELETON --- */}
			<div className="flex-1 bg-card flex flex-col">
				{/* Table Header */}
				<div className="flex items-center h-10 border-b border-border/50 bg-slate-50/95 dark:bg-[#09090B]/95 px-6 gap-6">
					<Skeleton className="h-3 w-16 bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-3 w-20 bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-3 w-32 bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-3 w-24 bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-3 w-16 bg-slate-100 dark:bg-white/5 ml-auto" />
				</div>

				{/* Table Rows */}
				<div className="flex-1 p-0">
					{[1, 2, 3, 4, 5, 6].map((row) => (
						<div key={row} className="flex items-center h-16 border-b border-border/30 px-6 gap-6">
							<Skeleton className="h-4 w-20 bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-4 w-24 bg-slate-100 dark:bg-white/5" />

							<div className="space-y-1.5 w-40">
								<Skeleton className="h-4 w-full bg-slate-100 dark:bg-white/5" />
								<Skeleton className="h-2.5 w-2/3 bg-slate-100 dark:bg-white/5" />
							</div>

							<Skeleton className="h-6 w-32 rounded-lg bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-4 w-16 bg-slate-100 dark:bg-white/5 ml-auto" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
