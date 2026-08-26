'use client'

import { Building2, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { betterAuthPostAuthOrganizationGateway } from '@/lib/post-auth-organization-client'
import type { PostAuthOrganization } from '@/platform/auth/post-auth-organization'

export function OrganizationSelector({ callbackUrl }: { callbackUrl: string }) {
	const router = useRouter()
	const [organizations, setOrganizations] = useState<
		readonly PostAuthOrganization[] | null
	>(null)
	const [pendingId, setPendingId] = useState<string | null>(null)
	const [failed, setFailed] = useState(false)

	useEffect(() => {
		let active = true
		betterAuthPostAuthOrganizationGateway
			.listOrganizations()
			.then((items) => {
				if (!active) return
				if (items.length === 0) {
					router.replace('/onboarding')
					return
				}
				setOrganizations(items)
			})
			.catch(() => {
				if (active) setFailed(true)
			})
		return () => {
			active = false
		}
	}, [router])

	async function selectOrganization(organizationId: string) {
		setFailed(false)
		setPendingId(organizationId)
		try {
			await betterAuthPostAuthOrganizationGateway.setActiveOrganization(
				organizationId,
			)
			router.replace(callbackUrl)
		} catch {
			setFailed(true)
			setPendingId(null)
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-6">
			<div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-premium">
				<h1 className="text-2xl font-bold text-foreground">Choose a workspace</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Your account belongs to multiple Organizations. Select the workspace
					for this session.
				</p>

				{failed ? (
					<p className="mt-4 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
						LabOS could not select that workspace. Please try again.
					</p>
				) : null}

				<div className="mt-6 space-y-3">
					{organizations === null ? (
						<div className="flex items-center justify-center py-8">
							<LoaderCircle className="size-7 animate-spin text-primary" />
						</div>
					) : (
						organizations.map((organization) => (
							<Button
								key={organization.id}
								variant="outline"
								disabled={pendingId !== null}
								onClick={() => void selectOrganization(organization.id)}
								className="h-auto w-full justify-start gap-3 rounded-xl p-4 text-left"
							>
								{pendingId === organization.id ? (
									<LoaderCircle className="size-5 animate-spin" />
								) : (
									<Building2 className="size-5 text-primary" />
								)}
								<span className="flex flex-col items-start">
									<span className="font-semibold">{organization.name}</span>
									<span className="text-xs text-muted-foreground">
										{organization.slug}
									</span>
								</span>
							</Button>
						))
					)}
				</div>
			</div>
		</div>
	)
}
