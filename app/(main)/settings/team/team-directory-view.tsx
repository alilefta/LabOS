import { ShieldCheck, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'
import type {
	OrganizationMemberDirectoryItemDTO,
	OrganizationMemberDirectoryPageDTO,
} from '@/modules/labos-membership/member-directory.dto'
import type { MembershipAdministrationViewer } from '@/modules/labos-membership/membership-administration.ui-policy'

import { TeamMemberAdministrationControls } from './team-member-administration-controls'
import { TeamMemberInvitationControl } from './team-member-invitation-control'

const ROLE_PRESENTATION = Object.freeze({
	owner: {
		label: 'Owner',
		classes:
			'border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300',
	},
	admin: {
		label: 'Administrator',
		classes: 'border-ai/20 bg-ai/10 text-ai',
	},
	manager: {
		label: 'Manager',
		classes: 'border-primary/20 bg-primary/10 text-primary',
	},
	staff: {
		label: 'Staff',
		classes:
			'border-border bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-zinc-300',
	},
} as const satisfies Record<
	LabOSOrganizationRole,
	{ label: string; classes: string }
>)

function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean)
	if (parts.length === 0) return '??'
	return parts
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join('')
}

function StaffIdentity({
	member,
}: {
	member: OrganizationMemberDirectoryItemDTO
}) {
	if (!member.staff) {
		return (
			<span className="text-[11px] text-muted-foreground">
				No operational Staff profile
			</span>
		)
	}

	return (
		<span className="text-[11px] text-muted-foreground">
			Staff: {member.staff.firstName} {member.staff.lastName}
			{member.staff.jobTitle ? ` · ${member.staff.jobTitle}` : ''}
		</span>
	)
}

/** Read-only presentation for the safe Member-directory DTO. */
export function TeamDirectoryView({
	directory,
	viewer,
}: {
	directory: OrganizationMemberDirectoryPageDTO
	viewer: MembershipAdministrationViewer
}) {
	const visibleCount = directory.items.length

	return (
		<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
			<div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-foreground">
						Team &amp; Roles
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Organization members with access to this workspace.
					</p>
				</div>
				<TeamMemberInvitationControl viewer={viewer} />
			</div>

			<div className="lab-card flex flex-col overflow-hidden">
				<div className="flex items-center gap-3 border-b border-border bg-slate-50/50 px-8 py-6 dark:bg-white/2">
					<div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Users className="size-4" />
					</div>
					<div>
						<h3 className="text-lg font-bold tracking-tight text-foreground">
							Active Members
						</h3>
						<p className="mt-0.5 text-sm text-muted-foreground">
							Showing {visibleCount} member{visibleCount === 1 ? '' : 's'}
							{directory.nextOffset !== null ? ' on this page' : ''}.
						</p>
					</div>
				</div>

				{visibleCount === 0 ? (
					<div className="flex flex-col items-center justify-center px-8 py-16 text-center">
						<Users className="mb-3 size-8 text-muted-foreground/60" />
						<h3 className="font-semibold text-foreground">No members found</h3>
						<p className="mt-1 max-w-sm text-sm text-muted-foreground">
							This Organization has no visible membership.
						</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full border-collapse whitespace-nowrap text-left">
							<thead>
								<tr className="border-b border-border/50">
									{['Member', 'Organization role', 'Access', 'Administration'].map((heading) => (
										<th
											key={heading}
											className="px-8 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground"
										>
											{heading}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-border/50">
								{directory.items.map((member) => (
									<tr key={member.memberId} className="row-hover group">
										<td className="px-8 py-4">
											<div className="flex items-center gap-3">
												<Avatar className="size-9 border border-border">
													{member.account.imageUrl ? (
														<AvatarImage src={member.account.imageUrl} alt="" />
													) : null}
													<AvatarFallback className="text-xs font-medium">
														{initials(member.account.name)}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col">
													<span className="text-sm font-semibold text-foreground">
														{member.account.name}
													</span>
													<span className="text-xs text-muted-foreground">
														{member.account.email}
													</span>
													<StaffIdentity member={member} />
												</div>
											</div>
										</td>
										<td className="px-8 py-4">
											<div className="flex flex-wrap gap-1.5">
												{member.roles.map((role) => (
													<span
														key={role}
														className={cn(
															'rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide',
															ROLE_PRESENTATION[role].classes,
														)}
													>
														{ROLE_PRESENTATION[role].label}
													</span>
												))}
												{member.roles.length === 0 ? (
													<span className="rounded-md border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-[10px] font-bold uppercase text-destructive">
														Role unavailable
													</span>
												) : null}
												{member.unknownRoleCount > 0 ? (
													<span className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700 dark:text-amber-300">
														Needs review
													</span>
												) : null}
											</div>
										</td>
										<td className="px-8 py-4">
											<div className="flex items-center gap-2">
												<ShieldCheck className="size-4 text-emerald-600" />
												<span className="text-sm font-medium text-foreground">
													Active
												</span>
											</div>
											<span className="mt-0.5 block text-[11px] text-muted-foreground">
												{member.account.emailVerified
													? 'Email verified'
													: 'Email verification pending'}
											</span>
										</td>
										<td className="px-8 py-4">
											<TeamMemberAdministrationControls
												key={`${member.memberId}:${member.roles.join(',')}`}
												member={member}
												viewer={viewer}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}
