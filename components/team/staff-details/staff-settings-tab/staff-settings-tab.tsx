// components/team/team-details/settings-tab/staff-settings-tab.tsx

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SlidersHorizontal, ShieldAlert } from "lucide-react";

// Server-side Authentication & Role Access
import { getServerSession } from "@/lib/get-session";
import { getCurrentLabUserRoleByAuthUserId } from "@/data/lab";

// Skeletons & Content
import { Skeleton } from "@/components/ui/skeleton";
import { StaffSettingsTabContent } from "./staff-settings-tab-content"; // This is the Client integration component we built in the previous turn

interface Props {
	staffId: string;
}

export async function StaffSettingsTab({ staffId }: Props) {
	// ── 1. STRICT IT SECURITY GUARD ─────────────────────────────────────
	// Even though the router protects navigation, we do a secondary server-check
	// to prevent a standard employee from injecting their ID into the URL to edit files [2].
	const session = await getServerSession();
	if (!session) redirect("/sign-in");

	const labUser = await getCurrentLabUserRoleByAuthUserId();
	if (!labUser) redirect("/onboarding");

	const userRole = labUser.role; // e.g. "OWNER" | "MANAGER" | "STAFF"
	const canManageSettings = userRole === "OWNER" || userRole === "MANAGER";

	if (!canManageSettings) {
		return (
			<div className="w-full h-80 rounded-[32px] border-2 border-dashed border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
				<div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse">
					<ShieldAlert className="w-6 h-6" />
				</div>
				<h3 className="text-sm font-bold text-destructive uppercase tracking-widest">Unauthorized Access</h3>
				<p className="text-xs text-destructive/85 max-w-sm mt-1 leading-relaxed">
					You do not have the required administrative permissions to modify employee system access, default compensation plans, or operating schedules.
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 animate-in fade-in duration-500">
			{/* --- SUB-HEADER --- */}
			<div className="flex items-center gap-3 mb-4 px-1">
				<div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
					<SlidersHorizontal className="w-4 h-4" />
				</div>
				<div>
					<h2 className="text-lg font-bold tracking-tight text-foreground">Work Settings</h2>
					<p className="text-xs text-muted-foreground mt-0.5">Manage employee system permissions, payroll defaults, and active working schedules.</p>
				</div>
			</div>

			{/* ── SUSPENSE BOUNDARY ────────────────────────────────────────── */}
			{/* The client-side useQuery will mount and fetch the data on-demand inside the boundary */}
			<Suspense fallback={<StaffSettingsTabSkeleton />}>
				<StaffSettingsTabContent staffId={staffId} currentUserRole={userRole} />
			</Suspense>
		</div>
	);
}

// ── 3. THE SKELETON LOADER (Double Column Matching the 30/30 Grid) ──────────
function StaffSettingsTabSkeleton() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
			{/* Column 1: Identity & Availability Skeletons */}
			<div className="flex flex-col gap-6">
				<Skeleton className="h-[450px] w-full rounded-[24px] bg-slate-100 dark:bg-white/5 border border-border" />
				<Skeleton className="h-[220px] w-full rounded-[24px] bg-slate-100 dark:bg-white/5 border border-border" />
			</div>

			{/* Column 2: IT Security & Compensation Skeletons */}
			<div className="flex flex-col gap-6">
				<Skeleton className="h-[320px] w-full rounded-[24px] bg-slate-100 dark:bg-white/5 border border-border" />
				<Skeleton className="h-[280px] w-full rounded-[24px] bg-slate-100 dark:bg-white/5 border border-border" />
			</div>
		</div>
	);
}
