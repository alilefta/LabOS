import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function DashboardSidebarSkeleton({ isCollapsed = false }: { isCollapsed?: boolean }) {
	return (
		<div className={cn("flex flex-col h-full bg-card dark:bg-[#09090B] border-r border-border transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
			{/* --- WORKSPACE SWITCHER (TOP) SKELETON --- */}
			<div className={cn("h-16 flex items-center border-b border-border shrink-0", isCollapsed ? "justify-center" : "px-6 justify-between")}>
				<div className="flex items-center gap-3">
					<Skeleton className="w-8 h-8 rounded-lg shrink-0" />
					{!isCollapsed && (
						<div className="flex flex-col gap-1.5 w-32">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-3 w-2/3" />
						</div>
					)}
				</div>
				{!isCollapsed && <Skeleton className="w-4 h-4 rounded-full" />}
			</div>

			{/* --- NAVIGATION LINKS SKELETON --- */}
			<div className="flex-1 py-8 px-4 space-y-10">
				{/* Main Menu Group */}
				<div className="space-y-4">
					{!isCollapsed ? (
						<Skeleton className="h-3 w-20 ml-2 mb-4" /> // "Main Menu" text
					) : (
						<div className="w-full flex justify-center mb-4">
							<Skeleton className="w-4 h-1 rounded-full" />
						</div>
					)}
					<div className="space-y-3">
						{[1, 2, 3, 4, 5].map((i) => (
							<div key={i} className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
								<Skeleton className="w-5 h-5 rounded-md shrink-0" />
								{!isCollapsed && <Skeleton className={cn("h-4", i % 2 === 0 ? "w-24" : "w-32")} />}
							</div>
						))}
					</div>
				</div>

				{/* Smart Views Group */}
				<div className="space-y-4">
					{!isCollapsed ? (
						<Skeleton className="h-3 w-24 ml-2 mb-4" /> // "Smart Views" text
					) : (
						<div className="w-full flex justify-center mb-4">
							<Skeleton className="w-4 h-1 rounded-full" />
						</div>
					)}
					<div className="space-y-3">
						{[1, 2].map((i) => (
							<div key={`smart-${i}`} className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
								<Skeleton className="w-5 h-5 rounded-md shrink-0" />
								{!isCollapsed && <Skeleton className={cn("h-4", i === 1 ? "w-28" : "w-36")} />}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* --- USER PROFILE (BOTTOM) SKELETON --- */}
			<div className={cn("p-4 border-t border-border mt-auto shrink-0 flex items-center", isCollapsed ? "justify-center" : "gap-3 px-6")}>
				<Skeleton className="w-9 h-9 rounded-full shrink-0" />
				{!isCollapsed && (
					<div className="flex flex-col gap-1.5 w-32">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-3 w-2/3" />
					</div>
				)}
			</div>
		</div>
	);
}
