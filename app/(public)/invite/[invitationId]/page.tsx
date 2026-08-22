import { headers } from 'next/headers'

import { AcceptOrganizationInvitationCard } from '@/components/auth/accept-organization-invitation-card'
import { auth } from '@/lib/auth'
import { getServerSession } from '@/lib/get-session'

type Props = { params: Promise<{ invitationId: string }> }

export default async function OrganizationInvitationPage({ params }: Props) {
	const { invitationId } = await params
	const callbackUrl = `/invite/${encodeURIComponent(invitationId)}`
	const session = await getServerSession()

	if (!session) {
		return (
			<main className="mx-auto flex min-h-screen max-w-md items-center p-6">
				<AcceptOrganizationInvitationCard
					mode="authenticate"
					callbackUrl={callbackUrl}
				/>
			</main>
		)
	}

	let invitation = null
	try {
		invitation = await auth.api.getInvitation({
			query: { id: invitationId },
			headers: await headers(),
		})
	} catch {
		// Keep invalid, expired, and wrong-recipient failures indistinguishable.
	}

	if (!invitation) {
		return (
			<main className="mx-auto flex min-h-screen max-w-md items-center p-6">
				<AcceptOrganizationInvitationCard mode="invalid" />
			</main>
		)
	}

	return (
		<main className="mx-auto flex min-h-screen max-w-md items-center p-6">
			<AcceptOrganizationInvitationCard
				mode="accept"
				invitationId={invitation.id}
				organizationName={invitation.organizationName}
				role={invitation.role}
			/>
		</main>
	)
}
