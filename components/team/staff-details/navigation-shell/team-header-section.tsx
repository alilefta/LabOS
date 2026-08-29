// components/team/team-details/navigation-shell/team-header-section.tsx

import Link from 'next/link'
import {
	ChevronLeft,
	Edit3,
	MoreVertical,
	Phone,
	ShieldAlert,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getStaffHeaderData } from '@/data/team/get-staff-dossier'
import { cn } from '@/lib/utils'

interface Props {
	staffId: string
}

export async function TeamHeaderSection({ staffId }: Props) {
	// Fetch the absolute truth on the server
	const result = await getStaffHeaderData(staffId)

	if (!result.success || !result.data) {
		return null // The parent page will handle 404s, this is just a safe guard
	}

	const staff = result.data
	const isInactive = !staff.isActive

	const initials =
		`${staff.firstName[0] || ''}${staff.lastName[0] || ''}`.toUpperCase()

	return (
		<div className="px-6 lg:px-8 w-full max-w-500 mx-auto">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
				{/* LEFT: Identity, Avatar & Access Status */}
				<div className="flex items-start gap-4">
					<Link
						href="/team"
						className="inline-flex items-center justify-center rounded-xl border border-border bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 shadow-sm h-10 w-10 mt-1"
					>
						<ChevronLeft className="w-5 h-5 text-muted-foreground" />
						<span className="sr-only">Back to Production Team Page</span>
					</Link>

					<div className="flex items-start gap-4">
						{/* Avatar with dynamic ring glow based on operational status */}
						<Avatar
							className={cn(
								'w-12 h-12 border-2 border-background shadow-md ring-1 ring-border',
								isInactive ? 'opacity-50 grayscale' : 'ring-primary/20',
							)}
						>
							<AvatarImage
								src={
									staff.avatarUrl ||
									`https://api.dicebear.com/7.x/notionists/svg?seed=${staff.id}`
								}
							/>
							<AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
								{initials}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col min-w-0">
							<div className="flex items-center gap-3">
								<h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">
									{staff.firstName} {staff.lastName}
								</h1>

								{/* Operational status only; access state is permission-controlled. */}
								<span
									className={cn(
										'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border shadow-sm',
										isInactive
											? 'bg-destructive/10 text-destructive border-destructive/20 animate-pulse'
										: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
									)}
								>
									{isInactive
										? 'Deactivated'
										: 'Active Staff'}
								</span>
							</div>

							{/* Specialty Subtext */}
							<p className="text-xs font-bold text-primary/80 uppercase tracking-wider mt-1">
								{staff.jobTitle || staff.roleCategory.replace('_', ' ')}
								{staff.specialization && (
									<span className="text-muted-foreground font-medium lowercase">
										{' '}
										• {staff.specialization}
									</span>
								)}
							</p>

							{/* Contact Details */}
							<div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-muted-foreground mt-3">
								<span className="flex items-center gap-1.5">
									<Phone className="w-3.5 h-3.5" />{' '}
									<span className="font-mono">{staff.phoneNumber}</span>
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* RIGHT: Operational Actions */}
				<div className="flex items-center gap-2">
					{/* Action Buttons to edit/revoke (We'll wire these triggers in Phase 2) */}
					<Button className="rounded-xl bg-primary text-primary-foreground h-10 px-6 shadow-premium font-bold hover:bg-primary/90">
						<Edit3 className="w-4 h-4 mr-2" /> Edit Profile
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-xl border border-transparent hover:border-border h-10 w-10"
					>
						<MoreVertical className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Render Alert if Deactivated directly under header */}
			{isInactive && (
				<div className="mt-6 ml-16 p-3 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 max-w-xl">
					<ShieldAlert className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
					<div>
						<h4 className="text-[12px] font-bold text-destructive">
							Account Deactivated
						</h4>
						<p className="text-[11px] text-destructive/80 font-medium leading-snug mt-0.5">
							This employee was manually deactivated. They can no longer log in
							or be assigned to active cases. Historical logs and commissions
							remain preserved.
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
