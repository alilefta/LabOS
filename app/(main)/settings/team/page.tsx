"use client";

import { Users, UserPlus, MoreHorizontal, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock Data based on your Prisma `LabUser` and `UserRole` enum
const teamMembers = [
	{ id: "1", name: "Sarah Jenkins", email: "sarah@dentafusion.com", role: "LAB_ADMIN", status: "Active", avatar: "https://i.pravatar.cc/150?img=11" },
	{ id: "2", name: "Marcus Chen", email: "marcus@dentafusion.com", role: "LAB_MANAGER", status: "Active", avatar: "https://i.pravatar.cc/150?img=32" },
	{ id: "3", name: "Elena Rodriguez", email: "elena@dentafusion.com", role: "LAB_STAFF", status: "Active", avatar: "https://i.pravatar.cc/150?img=44" },
	{ id: "4", name: "David Kim", email: "david@dentafusion.com", role: "LAB_STAFF", status: "Invited", avatar: "" },
];

const roleConfig: Record<string, { label: string; classes: string }> = {
	LAB_ADMIN: { label: "Administrator", classes: "bg-ai/10 text-ai border-ai/20" },
	LAB_MANAGER: { label: "Manager", classes: "bg-primary/10 text-primary border-primary/20" },
	LAB_STAFF: { label: "Staff / Tech", classes: "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-zinc-300 border-border" },
};

export default function TeamSettingsPage() {
	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
				<div>
					<h2 className="text-2xl font-bold text-foreground tracking-tight">Team & Roles</h2>
					<p className="text-sm text-muted-foreground mt-1">Manage who has access to this workspace and their permissions.</p>
				</div>
				<Button className="rounded-xl shadow-premium bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-10 px-4">
					<UserPlus className="w-4 h-4 mr-2" />
					Invite Member
				</Button>
			</div>

			<div className="lab-card overflow-hidden flex flex-col">
				<div className="px-8 py-6 border-b border-border bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-3">
					<div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
						<Users className="w-4 h-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold text-foreground tracking-tight">Active Members</h3>
						<p className="text-sm text-muted-foreground mt-0.5">You have 4 members out of 10 available on your plan.</p>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse whitespace-nowrap">
						<thead>
							<tr className="border-b border-border/50">
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Member</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Role</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
								<th className="px-8 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border/50">
							{teamMembers.map((member) => (
								<tr key={member.id} className="row-hover group">
									<td className="px-8 py-4">
										<div className="flex items-center gap-3">
											<Avatar className="w-9 h-9 border border-border">
												<AvatarImage src={member.avatar} />
												<AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="text-sm font-semibold text-foreground">{member.name}</span>
												<span className="text-[12px] text-muted-foreground">{member.email}</span>
											</div>
										</div>
									</td>
									<td className="px-8 py-4">
										<span className={cn("px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border", roleConfig[member.role].classes)}>
											{roleConfig[member.role].label}
										</span>
									</td>
									<td className="px-8 py-4">
										<div className="flex items-center gap-2">
											<div className={cn("w-2 h-2 rounded-full", member.status === "Active" ? "bg-emerald-500" : "bg-amber-500 animate-pulse")}></div>
											<span className="text-sm text-muted-foreground font-medium">{member.status}</span>
										</div>
									</td>
									<td className="px-8 py-4 text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground">
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end" className="w-48 rounded-xl border-border shadow-premium dark:bg-[#121214]">
												<DropdownMenuItem className="rounded-lg cursor-pointer">Edit Role</DropdownMenuItem>
												{member.status === "Invited" && <DropdownMenuItem className="rounded-lg cursor-pointer">Resend Invite</DropdownMenuItem>}
												<DropdownMenuSeparator className="bg-border" />
												<DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">Revoke Access</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
