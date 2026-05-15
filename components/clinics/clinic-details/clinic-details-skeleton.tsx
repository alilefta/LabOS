import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClinicDetailsSkeleton() {
	return (
		<div className="flex flex-col h-full bg-background relative overflow-hidden">
			{/* Ambient Lighting Placeholder (Matches the Terminal Shell) */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 bg-primary/5 dark:bg-primary/10" />

			{/* --- STICKY HEADER & TABS SKELETON --- */}
			<div className="relative z-30 bg-background/80 backdrop-blur-xl border-b border-border pt-6 flex flex-col gap-4 shadow-sm">
				{/* 1. Vitals Header Skeleton */}
				<div className="px-6 lg:px-8 w-full max-w-[1600px] mx-auto">
					<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
						{/* LEFT: Identity */}
						<div className="flex items-start gap-4">
							<Button variant="outline" size="icon" disabled className="mt-1 rounded-xl border-border bg-slate-50 dark:bg-white/5 h-10 w-10">
								<ChevronLeft className="w-5 h-5 text-muted-foreground opacity-50" />
							</Button>

							<div>
								<div className="flex items-center gap-3 mb-2">
									<Skeleton className="w-10 h-10 rounded-xl" />
									<Skeleton className="h-8 w-48 sm:w-64" />
									<Skeleton className="h-6 w-24 rounded-md" />
								</div>
								{/* Contact Meta */}
								<div className="flex items-center gap-4 ml-14">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-4 w-32" />
									<Skeleton className="h-4 w-40" />
								</div>
							</div>
						</div>

						{/* RIGHT: Quick Actions */}
						<div className="flex items-center gap-2 mt-2 md:mt-0">
							<Skeleton className="h-10 w-32 rounded-xl" />
							<Skeleton className="h-10 w-32 rounded-xl" />
							<Skeleton className="h-10 w-10 rounded-xl" />
						</div>
					</div>
				</div>

				{/* 2. Tabs Skeleton */}
				<div className="w-full max-w-[1600px] mx-auto px-6 lg:px-8 mt-2">
					<div className="flex items-center gap-8 border-b border-border/50 ml-14 pb-3">
						<Skeleton className="h-4 w-32 rounded-sm" />
						<Skeleton className="h-4 w-32 rounded-sm opacity-60" />
						<Skeleton className="h-4 w-32 rounded-sm opacity-40" />
						<Skeleton className="h-4 w-32 rounded-sm opacity-20" />
					</div>
				</div>
			</div>

			{/* --- DYNAMIC TAB CONTENT AREA SKELETON (Defaults to Overview) --- */}
			<div className="flex-1 overflow-hidden relative z-10 w-full">
				<div className="w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
					<div className="flex flex-col gap-6">
						{/* Section Header */}
						<div className="flex items-center justify-between mb-2">
							<Skeleton className="h-6 w-48" />
							<Skeleton className="h-8 w-48 rounded-xl" /> {/* Timeframe Filter */}
						</div>

						{/* TOP ROW: 3 Pillars */}
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{/* Health Ring */}
							<div className="lab-card h-[320px] p-6 flex flex-col justify-between">
								<Skeleton className="w-8 h-8 rounded-full self-end" />
								<Skeleton className="w-40 h-40 rounded-full mx-auto" />
								<Skeleton className="h-8 w-full mt-auto" />
							</div>

							{/* Product Donut */}
							<div className="lab-card h-[320px] p-6 flex flex-col">
								<div className="flex items-center gap-3 mb-4">
									<Skeleton className="w-10 h-10 rounded-xl" />
									<div className="space-y-2">
										<Skeleton className="h-3 w-20" />
										<Skeleton className="h-4 w-32" />
									</div>
								</div>
								<Skeleton className="w-32 h-32 rounded-full mx-auto mt-4" />
								<div className="mt-auto space-y-2">
									<Skeleton className="h-3 w-full" />
									<Skeleton className="h-3 w-full" />
								</div>
							</div>

							{/* Financial Vitals */}
							<div className="lab-card h-[320px] p-6 flex flex-col">
								<div className="flex items-center justify-between mb-8">
									<div className="flex items-center gap-3">
										<Skeleton className="w-10 h-10 rounded-xl" />
										<div className="space-y-2">
											<Skeleton className="h-3 w-24" />
											<Skeleton className="h-3 w-16" />
										</div>
									</div>
								</div>
								<div className="space-y-2 mb-auto">
									<Skeleton className="h-3 w-32" />
									<Skeleton className="h-10 w-48" />
								</div>
								<div className="space-y-3 mt-8">
									<Skeleton className="h-3 w-full" />
									<Skeleton className="h-2 w-full rounded-full" />
								</div>
							</div>
						</div>

						{/* MIDDLE ROW: The Rhythm Heatmap */}
						<div className="w-full">
							<div className="lab-card h-[280px] p-6 flex flex-col">
								<div className="flex justify-between items-center mb-6">
									<div className="space-y-2">
										<Skeleton className="h-4 w-48" />
										<Skeleton className="h-3 w-64" />
									</div>
									<Skeleton className="h-4 w-32" />
								</div>
								<Skeleton className="flex-1 w-full rounded-md" />
							</div>
						</div>

						{/* BOTTOM ROW: The Brains */}
						<div className="w-full">
							<Skeleton className="h-[200px] w-full rounded-[32px]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
