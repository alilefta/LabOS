import Link from 'next/link'
import { redirect } from 'next/navigation'

import { OnboardingForm } from '@/components/onboarding/onboarding-form'
import { Button } from '@/components/ui/button'
import { getPlatformSession } from '@/platform/auth/session'

/**
 * Authenticated entry point for provisioning an additional Organization + Lab.
 * The form still submits through the server-owned onboarding action, which
 * derives the caller identity and request headers from the session.
 */
export default async function NewOrganizationPage() {
	const session = await getPlatformSession()
	if (!session) redirect('/sign-in?callbackUrl=%2Forganizations%2Fnew')

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-background p-6">
			<div className="w-full max-w-xl">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-widest text-primary">
							Workspace management
						</p>
						<h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
							Create another workspace
						</h1>
					</div>
					<Button asChild variant="ghost">
						<Link href="/select-organization">Cancel</Link>
					</Button>
				</div>
				<OnboardingForm mode="additional" />
			</div>
		</div>
	)
}

