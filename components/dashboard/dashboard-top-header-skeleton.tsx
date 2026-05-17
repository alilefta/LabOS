import { Skeleton } from "@/components/ui/skeleton";

export function DashboardTopHeaderSkeleton() {
	return (
		<header className="h-16 shrink-0 flex items-center justify-between px-4 sm:px-8 border-b border-border bg-background/70 backdrop-blur-xl sticky top-0 z-30">
			{/* Left side: Context (Breadcrumbs) */}
			<div className="flex items-center gap-4">
				{/* Mobile Hamburger Placeholder */}
				<Skeleton className="lg:hidden w-8 h-8 rounded-lg" />

				{/* Desktop Breadcrumbs Placeholder */}
				<div className="hidden sm:flex items-center gap-2">
					<Skeleton className="h-4 w-16" />
					<Skeleton className="h-4 w-2 rounded-full" /> {/* slash */}
					<Skeleton className="h-4 w-24" />
				</div>
			</div>

			{/* Center: The AI Command Palette Trigger */}
			<div className="flex-1 max-w-md mx-4 hidden md:block">
				<Skeleton className="w-full h-10 rounded-xl" />
			</div>

			{/* Right side: Global Actions */}
			<div className="flex items-center gap-2 sm:gap-4">
				{/* Notification Bell */}
				<Skeleton className="w-9 h-9 rounded-xl" />

				{/* Primary Action Button ("New Case") */}
				<Skeleton className="h-9 w-28 rounded-xl" />
			</div>
		</header>
	);
}
