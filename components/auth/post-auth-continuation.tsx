'use client'

import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { announceActiveOrganizationChange } from '@/lib/active-organization-browser'
import { betterAuthPostAuthOrganizationGateway } from '@/lib/post-auth-organization-client'
import { resolvePostAuthOrganization } from '@/platform/auth/post-auth-organization'

export function PostAuthContinuation({ callbackUrl }: { callbackUrl: string }) {
	const router = useRouter()
	const [failed, setFailed] = useState(false)

	useEffect(() => {
		let active = true

		async function continueAuthentication() {
			try {
				// Invitation acceptance establishes membership and active tenancy, so
				// it must run before normal workspace resolution. Use a document-level
				// replacement so the invitation lookup sees the fresh authentication
				// cookie and cannot reuse the anonymous invitation render.
				if (callbackUrl.startsWith('/invite/')) {
					window.location.replace(callbackUrl)
					return
				}

				const resolution = await resolvePostAuthOrganization(
					betterAuthPostAuthOrganizationGateway,
				)
				if (!active) return

				if (resolution.status === 'onboarding_required') {
					router.replace('/onboarding')
					return
				}
				if (resolution.status === 'selection_required') {
					router.replace(
						`/select-organization?callbackUrl=${encodeURIComponent(callbackUrl)}`,
					)
					return
				}
				if (resolution.restored) announceActiveOrganizationChange()
				// Resolution may have selected/restored an Organization in the current
				// session. A document navigation guarantees the destination starts with
				// tenant-consistent server data and client caches.
				window.location.replace(callbackUrl)
			} catch {
				if (active) setFailed(true)
			}
		}

		void continueAuthentication()
		return () => {
			active = false
		}
	}, [callbackUrl, router])

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-6">
			<div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-premium">
				{failed ? (
					<>
						<h1 className="text-xl font-bold text-foreground">
							Workspace restoration failed
						</h1>
						<p className="mt-2 text-sm text-muted-foreground">
							Your account is signed in, but LabOS could not select a workspace.
						</p>
						<Button className="mt-6" onClick={() => window.location.reload()}>
							Try again
						</Button>
					</>
				) : (
					<>
						<LoaderCircle className="mx-auto size-8 animate-spin text-primary" />
						<h1 className="mt-4 text-xl font-bold text-foreground">
							Restoring your workspace
						</h1>
						<p className="mt-2 text-sm text-muted-foreground">
							Verifying Organization membership and active tenant…
						</p>
					</>
				)}
			</div>
		</div>
	)
}
