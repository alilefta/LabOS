import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClinicHeaderSectionSkeleton() {
	return (
		<div className="px-6 lg:px-8 w-full max-w-400 mx-auto">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
				{/* LEFT: Identity & Status Skeleton */}
				<div className="flex items-start gap-4 w-full">
					{/* Fake Back Button to hold the exact spatial alignment */}
					<Button variant="outline" size="icon" disabled className="rounded-xl border-border bg-slate-50 dark:bg-white/5 h-10 w-10 shrink-0">
						<ChevronLeft className="w-5 h-5 text-muted-foreground opacity-30" />
					</Button>

					<div className="flex flex-col w-full">
						<div className="flex items-center gap-3 mb-1.5">
							{/* Icon Box */}
							<Skeleton className="w-10 h-10 rounded-xl shrink-0 bg-slate-200/50 dark:bg-white/5" />
							{/* Title */}
							<Skeleton className="h-8 sm:h-9 w-48 sm:w-72 rounded-lg bg-slate-200/50 dark:bg-white/5" />
							{/* Status Badge */}
							<Skeleton className="h-6 w-24 rounded-md bg-slate-200/50 dark:bg-white/5 hidden sm:block" />
						</div>

						{/* Contact Meta */}
						<div className="flex flex-wrap items-center gap-4 mt-2 ml-14">
							{/* ID Badge */}
							<Skeleton className="h-5 w-20 rounded bg-slate-200/50 dark:bg-white/5" />
							{/* Phone */}
							<Skeleton className="h-4 w-28 rounded bg-slate-200/50 dark:bg-white/5" />
							{/* Email */}
							<Skeleton className="h-4 w-40 rounded bg-slate-200/50 dark:bg-white/5" />
						</div>
					</div>
				</div>

				{/* RIGHT: Quick Actions Skeleton */}
				<div className="flex items-center gap-2 mt-4 md:mt-0 shrink-0">
					<Skeleton className="h-10 w-28 rounded-xl bg-slate-200/50 dark:bg-white/5 hidden sm:block" />
					<Skeleton className="h-10 w-36 rounded-xl bg-slate-200/50 dark:bg-white/5" />
					<Skeleton className="h-10 w-10 rounded-xl bg-slate-200/50 dark:bg-white/5 shrink-0" />
				</div>
			</div>
		</div>
	);
}
