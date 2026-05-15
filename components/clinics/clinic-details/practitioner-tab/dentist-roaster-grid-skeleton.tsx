import { Skeleton } from "@/components/ui/skeleton";

export function DentistRosterGridSkeleton() {
	return (
		<div className="flex flex-col gap-6 w-full min-h-0 animate-pulse">
			{/* --- TOOLBAR ZONE SKELETON --- */}
			<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-border/50">
				{/* Left: Vitals & Roles */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-6">
					<div className="flex items-center gap-3">
						<Skeleton className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5" />
						<div className="space-y-1.5">
							<Skeleton className="h-4 w-32 rounded-md bg-slate-100 dark:bg-white/5" />
							<Skeleton className="h-3 w-16 rounded-md bg-slate-100 dark:bg-white/5" />
						</div>
					</div>

					{/* Role Filter Skeleton */}
					<div className="flex p-1 bg-white dark:bg-[#121214] rounded-xl border border-border/50">
						{[1, 2, 3, 4].map((i) => (
							<Skeleton key={i} className="w-20 sm:w-24 h-8 rounded-lg mx-0.5 bg-slate-100 dark:bg-white/5" />
						))}
					</div>
				</div>

				{/* Right: Search & Actions */}
				<div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">
					<Skeleton className="w-full sm:w-64 h-10 rounded-xl bg-slate-100 dark:bg-white/5" />
					<Skeleton className="shrink-0 w-full sm:w-36 h-10 rounded-xl bg-slate-100 dark:bg-white/5" />
				</div>
			</div>

			{/* --- GRID ZONE SKELETON --- */}
			<div className="flex-1 overflow-hidden pr-2">
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
					{/* Render 8 Dummy Cards to fill most standard desktop screens */}
					{Array.from({ length: 8 }).map((_, i) => (
						<div key={i} className="lab-card min-h-90 p-5 flex flex-col gap-4 border-border/50 bg-card">
							{/* Zone A: Identity */}
							<div className="flex items-start justify-between mb-2">
								<div className="flex gap-3 min-w-0 w-full">
									<Skeleton className="w-11 h-11 rounded-full shrink-0 bg-slate-100 dark:bg-white/5" />
									<div className="flex flex-col gap-2 w-full pt-1">
										<Skeleton className="h-4 w-2/3 rounded-md bg-slate-100 dark:bg-white/5" />
										<Skeleton className="h-3 w-1/3 rounded-md bg-slate-100 dark:bg-white/5" />
										<div className="flex gap-1.5 mt-1">
											<Skeleton className="h-4 w-12 rounded-md bg-slate-100 dark:bg-white/5" />
											<Skeleton className="h-4 w-16 rounded-md bg-slate-100 dark:bg-white/5" />
										</div>
									</div>
								</div>
								<Skeleton className="w-6 h-6 rounded-md shrink-0 bg-slate-100 dark:bg-white/5" />
							</div>

							{/* Zone B: Contact */}
							<div className="space-y-3 mb-4">
								<Skeleton className="h-3 w-3/4 rounded-md bg-slate-100 dark:bg-white/5" />
								<Skeleton className="h-3 w-full rounded-md bg-slate-100 dark:bg-white/5" />
							</div>

							{/* Zone C: Vitals Box */}
							<div className="mt-auto p-4 rounded-xl bg-slate-50/50 dark:bg-white/2 border border-border/50 space-y-4">
								<div className="flex justify-between items-center mb-2">
									<Skeleton className="h-3 w-20 rounded-md bg-slate-100 dark:bg-white/5" />
									<Skeleton className="h-2 w-16 rounded-md bg-slate-100 dark:bg-white/5" />
								</div>
								<div className="flex justify-between items-end">
									<Skeleton className="h-3 w-24 rounded-md bg-slate-100 dark:bg-white/5" />
									<Skeleton className="h-4 w-12 rounded-md bg-slate-100 dark:bg-white/5" />
								</div>
								<div className="flex justify-between items-end">
									<Skeleton className="h-3 w-16 rounded-md bg-slate-100 dark:bg-white/5" />
									<Skeleton className="h-4 w-28 rounded-md bg-slate-100 dark:bg-white/5" />
								</div>
								<div className="flex justify-between items-end pt-3 border-t border-border/50">
									<Skeleton className="h-3 w-20 rounded-md bg-slate-100 dark:bg-white/5" />
									<Skeleton className="h-5 w-12 rounded-md bg-slate-100 dark:bg-white/5" />
								</div>
							</div>

							{/* Zone D: Action Button */}
							<div className="mt-4 pt-4 border-t border-border/50">
								<Skeleton className="w-full h-10 rounded-xl bg-slate-100 dark:bg-white/5" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
