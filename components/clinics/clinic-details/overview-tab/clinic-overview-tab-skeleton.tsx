import { Skeleton } from "@/components/ui/skeleton";

export function ClinicOverviewTabSkeleton() {
	return (
		<div className="flex flex-col gap-6 animate-in fade-in duration-500">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5" />
				<Skeleton className="h-80 rounded-4xl bg-slate-100 dark:bg-white/5" />
			</div>
			<Skeleton className="h-75 w-full rounded-4xl bg-slate-100 dark:bg-white/5" />
			<Skeleton className="h-50 w-full rounded-4xl bg-slate-100 dark:bg-white/5" />
		</div>
	);
}
