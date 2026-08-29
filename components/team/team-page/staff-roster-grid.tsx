"use client";

import { memo } from "react";
import { Users2, UserPlus } from "lucide-react";
import { StaffMemberCard } from "./staff-member-card";
import { Button } from "@/components/ui/button";
import { StaffMemberDTO } from "@/schema/composed/team/team.dtos";

interface StaffRosterGridProps {
	staff: StaffMemberDTO[];
	canViewFinancials: boolean;
	canManageTeam: boolean;
	onEdit: (id: string) => void;
	onToggleStatus: (id: string, current: boolean) => void;
	onInvite: (id: string) => void;
	onCreateNew: () => void;
}

export const StaffRosterGrid = memo(function StaffRosterGrid({ staff, canViewFinancials, canManageTeam, onEdit, onToggleStatus, onInvite, onCreateNew }: StaffRosterGridProps) {
	const isEmpty = staff.length === 0;

	return (
		<div className="flex flex-col gap-6 animate-in fade-in duration-500 w-full min-h-0">
			{/* --- THE ROSTER GRID --- */}
			{!isEmpty && (
				<div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 pb-12">
					{staff.map((member) => (
						<StaffMemberCard key={member.id} member={member} canViewFinancials={canViewFinancials} canManageTeam={canManageTeam} onEdit={onEdit} onToggleStatus={onToggleStatus} onInvite={onInvite} />
					))}
				</div>
			)}

			{/* --- THE EMPTY SEARCH / FILTER STATE --- */}
			{isEmpty && (
				<div className="w-full h-80 rounded-4xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 relative bg-slate-50/30 dark:bg-white/1">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

					<div className="relative z-10 max-w-sm flex flex-col items-center gap-4">
						<div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#121214] border border-border shadow-sm flex items-center justify-center text-slate-400 dark:text-zinc-500">
							<Users2 className="w-5 h-5" />
						</div>
						<div className="space-y-1.5">
							<h3 className="text-sm font-bold text-foreground uppercase tracking-widest">No team members found</h3>
							<p className="text-xs text-muted-foreground leading-relaxed">No employees match your current search queries.</p>
						</div>
						{isEmpty && (
							<Button
								type="button"
								onClick={onCreateNew}
								className="h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs px-6 shadow-premium mt-2 transition-all"
							>
								<UserPlus className="w-3.5 h-3.5 mr-1.5" /> Onboard First Member
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
});

StaffRosterGrid.displayName = "StaffRosterGrid";
