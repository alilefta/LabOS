import { Skeleton } from "@/components/ui/skeleton";

export function ClinicActiveCasesKanbanSkeleton() {
	return (
		<div className="space-y-6 flex flex-col h-full min-h-0 w-full animate-pulse">
			{/* Context Header Skeleton */}
			<div className="flex items-center justify-between shrink-0">
				<div className="space-y-2">
					<Skeleton className="h-5 w-48 rounded-md bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-3 w-64 rounded-md bg-slate-100 dark:bg-white/5" />
				</div>
			</div>

			{/* Kanban Board Skeleton */}
			<div className="flex-1 min-h-125 w-full grid grid-cols-1 xl:grid-cols-3 gap-6">
				{/* Map 3 Columns */}
				{[1, 2, 3].map((col) => (
					<div key={col} className="flex flex-col bg-slate-50/50 dark:bg-[#09090B] border border-border/50 rounded-3xl overflow-hidden">
						{/* Column Header */}
						<div className="p-4 border-b border-border/50 bg-card flex items-center justify-between">
							<div className="flex items-center gap-2.5">
								<Skeleton className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5" />
								<Skeleton className="w-24 h-4 rounded-md bg-slate-100 dark:bg-white/5" />
							</div>
							<Skeleton className="w-6 h-5 rounded-md bg-slate-100 dark:bg-white/5" />
						</div>

						{/* Column Body (Mocking 2 Cards per column) */}
						<div className="p-4 space-y-4">
							{[1, 2].map((card) => (
								<div key={card} className="bg-card border border-border/50 rounded-2xl p-4 space-y-4">
									{/* Top Row: ID & Avatar */}
									<div className="flex items-start justify-between">
										<div className="space-y-2">
											<Skeleton className="h-2.5 w-16 bg-slate-100 dark:bg-white/5" />
											<Skeleton className="h-4 w-32 bg-slate-100 dark:bg-white/5" />
										</div>
										<Skeleton className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5" />
									</div>

									{/* Middle Row: Pills */}
									<div className="flex gap-2">
										<Skeleton className="h-5 w-20 rounded-md bg-slate-100 dark:bg-white/5" />
										<Skeleton className="h-5 w-16 rounded-md bg-slate-100 dark:bg-white/5" />
									</div>

									{/* Bottom Row: Date */}
									<div className="pt-3 border-t border-border/50">
										<Skeleton className="h-3 w-24 bg-slate-100 dark:bg-white/5" />
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
