'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { Building2, LoaderCircle, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

import { acceptOrganizationInvitationAction } from '@/actions/invitations/accept-organization-invitation'
import { Button } from '@/components/ui/button'
import { handleSafeActionError } from '@/lib/safe-action-helpers'

type Props =
	| {
			mode: 'authenticate'
			callbackUrl: string
	  }
	| {
			mode: 'accept'
			invitationId: string
			organizationName: string
			role: string
	  }
	| { mode: 'invalid' }

/** User-facing acceptance card; all security checks remain server-side. */
export function AcceptOrganizationInvitationCard(props: Props) {
	const router = useRouter()
	const { executeAsync, isExecuting } = useAction(
		acceptOrganizationInvitationAction,
		{
			onSuccess: ({ data }) => {
				if (!data) return
				toast.success('Organization invitation accepted')
				router.replace('/dashboard')
				router.refresh()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	if (props.mode === 'invalid') {
		return (
			<div className="rounded-3xl border bg-card p-8 text-center shadow-premium">
				<h1 className="text-xl font-bold">Invitation unavailable</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					It may be expired, already used, or intended for another account.
				</p>
			</div>
		)
	}

	if (props.mode === 'authenticate') {
		const callback = encodeURIComponent(props.callbackUrl)
		return (
			<div className="rounded-3xl border bg-card p-8 text-center shadow-premium">
				<ShieldCheck className="mx-auto size-10 text-primary" />
				<h1 className="mt-4 text-xl font-bold">Authenticate to continue</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					Sign in with the invited email, or create its LabOS account.
				</p>
				<div className="mt-6 grid grid-cols-2 gap-3">
					<Button asChild variant="outline">
						<Link href={`/sign-in?callbackUrl=${callback}`}>Sign in</Link>
					</Button>
					<Button asChild>
						<Link href={`/sign-up?callbackUrl=${callback}`}>Create account</Link>
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="rounded-3xl border bg-card p-8 text-center shadow-premium">
			<Building2 className="mx-auto size-10 text-primary" />
			<h1 className="mt-4 text-xl font-bold">Join {props.organizationName}</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				You will join with the <strong>{props.role}</strong> Organization role.
			</p>
			<Button
				className="mt-6 w-full"
				disabled={isExecuting}
				onClick={() => executeAsync({ invitationId: props.invitationId })}
			>
				{isExecuting && <LoaderCircle className="mr-2 size-4 animate-spin" />}
				Accept invitation
			</Button>
		</div>
	)
}
