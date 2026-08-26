'use client'

import { Building2, Check, ChevronsUpDown, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { betterAuthPostAuthOrganizationGateway } from '@/lib/post-auth-organization-client'
import { cn } from '@/lib/utils'
import type { PostAuthOrganization } from '@/platform/auth/post-auth-organization'

type DashboardWorkspaceSwitcherProps = Readonly<{
	collapsed?: boolean
	mobile?: boolean
}>

function organizationInitials(name: string): string {
	const initials = name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join('')
	return initials || 'WS'
}

/**
 * Membership-aware application-shell tenant switcher.
 *
 * Better Auth supplies both the authoritative Organization list and the active
 * Organization mutation. A completed switch performs a full navigation to the
 * dashboard so request-scoped tenant context and client caches are rebuilt for
 * the new Lab before any tenant resource route is rendered.
 */
export function DashboardWorkspaceSwitcher({
	collapsed = false,
	mobile = false,
}: DashboardWorkspaceSwitcherProps) {
	const [organizations, setOrganizations] = useState<
		readonly PostAuthOrganization[]
	>([])
	const [activeOrganizationId, setActiveOrganizationId] = useState<
		string | null
	>(null)
	const [pendingId, setPendingId] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [failed, setFailed] = useState(false)

	async function loadOrganizations() {
		setLoading(true)
		setFailed(false)
		try {
			const [activeId, items] = await Promise.all([
				betterAuthPostAuthOrganizationGateway.getActiveOrganizationId(),
				betterAuthPostAuthOrganizationGateway.listOrganizations(),
			])
			setOrganizations(items)
			setActiveOrganizationId(activeId)
		} catch {
			setFailed(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		let mounted = true
		Promise.all([
			betterAuthPostAuthOrganizationGateway.getActiveOrganizationId(),
			betterAuthPostAuthOrganizationGateway.listOrganizations(),
		])
			.then(([activeId, items]) => {
				if (!mounted) return
				setOrganizations(items)
				setActiveOrganizationId(activeId)
			})
			.catch(() => {
				if (mounted) setFailed(true)
			})
			.finally(() => {
				if (mounted) setLoading(false)
			})
		return () => {
			mounted = false
		}
	}, [])

	const activeOrganization = organizations.find(
		(organization) => organization.id === activeOrganizationId,
	)

	async function switchOrganization(organizationId: string) {
		if (organizationId === activeOrganizationId || pendingId) return
		setPendingId(organizationId)
		setFailed(false)
		try {
			await betterAuthPostAuthOrganizationGateway.setActiveOrganization(
				organizationId,
			)
			window.location.assign('/dashboard')
		} catch {
			setFailed(true)
			setPendingId(null)
		}
	}

	const displayName = activeOrganization?.name ?? 'Select workspace'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				aria-label={`Current workspace: ${displayName}`}
				className={cn(
					'flex w-full items-center rounded-xl p-2 transition-all hover:bg-slate-50 focus:outline-none dark:hover:bg-white/5',
					collapsed ? 'justify-center' : 'justify-between',
				)}
			>
				<div className="flex min-w-0 items-center gap-3">
					<Avatar className="size-8 shrink-0 rounded-lg border border-border">
						<AvatarImage
							src={activeOrganization?.logo ?? undefined}
							alt=""
						/>
						<AvatarFallback className="rounded-lg bg-primary text-xs font-bold text-primary-foreground">
							{loading ? (
								<LoaderCircle className="size-4 animate-spin" />
							) : activeOrganization ? (
								organizationInitials(activeOrganization.name)
							) : (
								<Building2 className="size-4" />
							)}
						</AvatarFallback>
					</Avatar>
					{!collapsed ? (
						<div className="flex min-w-0 flex-col items-start text-sm">
							<span className="max-w-36 truncate font-bold text-foreground">
								{displayName}
							</span>
							<span className="text-[11px] font-medium text-muted-foreground">
								Lab workspace
							</span>
						</div>
					) : null}
				</div>
				{!collapsed ? (
					<ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
				) : null}
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align={collapsed ? 'start' : 'center'}
				sideOffset={12}
				className={cn(
					'rounded-xl border-border shadow-premium dark:bg-[#121214]',
					mobile ? 'ml-4 w-[calc(100vw-4rem)] sm:w-64' : 'w-64',
				)}
			>
				<DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
					Switch Lab
				</DropdownMenuLabel>
				{loading ? (
					<DropdownMenuItem disabled className="rounded-lg py-2">
						<LoaderCircle className="size-4 animate-spin" /> Loading workspaces
					</DropdownMenuItem>
				) : failed ? (
					<DropdownMenuItem
						className="cursor-pointer rounded-lg py-2 text-destructive"
						onSelect={() => void loadOrganizations()}
					>
						Could not load workspaces. Retry
					</DropdownMenuItem>
				) : (
					organizations.map((organization) => {
						const isActive = organization.id === activeOrganizationId
						const isPending = organization.id === pendingId
						return (
							<DropdownMenuItem
								key={organization.id}
								disabled={pendingId !== null}
								className="cursor-pointer rounded-lg py-2"
								onSelect={() => void switchOrganization(organization.id)}
							>
								{isPending ? (
									<LoaderCircle className="size-4 animate-spin" />
								) : (
									<Building2 className="size-4" />
								)}
								<span className="min-w-0 flex-1 truncate">
									{organization.name}
								</span>
								{isActive ? <Check className="size-4 text-primary" /> : null}
							</DropdownMenuItem>
						)
					})
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const dashboardWorkspaceSwitcherInternals = Object.freeze({
	organizationInitials,
})
