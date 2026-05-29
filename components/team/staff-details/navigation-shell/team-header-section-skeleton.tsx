// components/team/team-details/navigation-shell/team-header-section-skeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export function TeamHeaderSectionSkeleton() {
	return (
		<div className="px-6 lg:px-8 w-full max-w-500 mx-auto animate-pulse">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
				<div className="flex items-start gap-4 w-full max-w-xl">
					{/* Back Button Skeleton */}
					<Skeleton className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0" />

					<div className="flex items-start gap-4 w-full">
						{/* Avatar Skeleton */}
						<Skeleton className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 shrink-0" />

						<div className="space-y-3 w-full">
							{/* Name & Badge Skeletons */}
							<div className="flex items-center gap-3">
								<Skeleton className="h-6 w-48 bg-slate-100 dark:bg-white/5" />
								<Skeleton className="h-5 w-20 bg-slate-100 dark:bg-white/5 rounded-md" />
							</div>
							{/* Job Title Skeleton */}
							<Skeleton className="h-4 w-32 bg-slate-100 dark:bg-white/5" />
							{/* Contact details Skeletons */}
							<div className="flex gap-4">
								<Skeleton className="h-3 w-24 bg-slate-100 dark:bg-white/5" />
								<Skeleton className="h-3 w-32 bg-slate-100 dark:bg-white/5" />
							</div>
						</div>
					</div>
				</div>

				{/* Right Actions Skeletons */}
				<div className="flex items-center gap-2 shrink-0">
					<Skeleton className="h-10 w-28 rounded-xl bg-slate-100 dark:bg-white/5" />
					<Skeleton className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5" />
				</div>
			</div>
		</div>
	);
}
