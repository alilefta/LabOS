'use client'

import { Check, Copy, LoaderCircle, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

import { inviteOrganizationMemberAction } from '@/actions/settings/team/invite-organization-member'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { handleSafeActionError } from '@/lib/safe-action-helpers'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'
import type { MembershipAdministrationViewer } from '@/modules/labos-membership/membership-administration.ui-policy'
import { InviteOrganizationMemberInputSchema } from '@/schema/composed/team/membership-administration.schema'

type InvitationRole = Exclude<LabOSOrganizationRole, 'owner'>

const ROLE_LABELS = Object.freeze({
	admin: 'Administrator',
	manager: 'Manager',
	staff: 'Staff',
} as const satisfies Record<InvitationRole, string>)

/**
 * Convenience UI for M-004 Member-only invitations. The fixed role choices
 * mirror the reviewed ceiling, while the action and command service enforce it
 * authoritatively before Better Auth creates or resends an invitation.
 */
export function TeamMemberInvitationControl({
	viewer,
}: Readonly<{ viewer: MembershipAdministrationViewer }>) {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [email, setEmail] = useState('')
	const [emailTouched, setEmailTouched] = useState(false)
	const [role, setRole] = useState<InvitationRole>('staff')
	const [developmentInviteUrl, setDevelopmentInviteUrl] = useState<string | null>(null)
	const [copied, setCopied] = useState(false)
	const roleOptions: readonly InvitationRole[] = viewer.roles.includes('owner')
		? ['admin', 'manager', 'staff']
		: viewer.roles.includes('admin')
			? ['staff']
			: []
	const parsedInvitation = useMemo(
		() => InviteOrganizationMemberInputSchema.safeParse({ email, role }),
		[email, role],
	)
	const showEmailFeedback = emailTouched || email.length > 0
	const emailError =
		showEmailFeedback && !parsedInvitation.success
			? parsedInvitation.error.flatten().fieldErrors.email?.[0] ??
				'Please enter a valid email address.'
			: null
	const normalizedEmail = parsedInvitation.success
		? parsedInvitation.data.email
		: null
	const emailWasNormalized =
		normalizedEmail !== null && normalizedEmail !== email

	const { executeAsync, isExecuting } = useAction(
		inviteOrganizationMemberAction,
		{
			onSuccess: ({ data }) => {
				const token = data.developmentInviteToken
				if (token && typeof window !== 'undefined') {
					setDevelopmentInviteUrl(
						`${window.location.origin}/invite/${encodeURIComponent(token)}`,
					)
				} else {
					setOpen(false)
					setEmail('')
					setEmailTouched(false)
					setRole('staff')
				}
				toast.success('Organization invitation sent.')
				router.refresh()
			},
			onError: ({ error }) => handleSafeActionError(error),
		},
	)

	if (roleOptions.length === 0) return null

	const canSubmit =
		parsedInvitation.success && roleOptions.includes(role) && !isExecuting

	async function submitInvitation() {
		setEmailTouched(true)
		if (!canSubmit || !parsedInvitation.success) return
		await executeAsync(parsedInvitation.data)
	}

	async function copyDevelopmentInviteUrl() {
		if (!developmentInviteUrl) return
		await navigator.clipboard.writeText(developmentInviteUrl)
		setCopied(true)
		toast.success('Invitation link copied.')
		setTimeout(() => setCopied(false), 2000)
	}

	function closeDialog() {
		if (isExecuting) return
		setOpen(false)
		setDevelopmentInviteUrl(null)
		setCopied(false)
		setEmail('')
		setEmailTouched(false)
		setRole('staff')
	}

	return (
		<>
			<Button
				type="button"
				className="h-10 rounded-xl px-4 font-semibold shadow-premium"
				onClick={() => setOpen(true)}
			>
				<UserPlus className="mr-2 size-4" />
				Invite Member
			</Button>

			<Dialog
				open={open}
				onOpenChange={(next) => (next ? setOpen(true) : closeDialog())}
			>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Invite an Organization member</DialogTitle>
						<DialogDescription>
							This grants workspace access without creating or linking an
							operational Staff profile.
						</DialogDescription>
					</DialogHeader>

					{developmentInviteUrl ? (
						<div className="grid gap-2 py-2">
							<Label htmlFor="development-member-invite-url">
								Development invitation link
							</Label>
							<div className="flex gap-2">
								<Input
									id="development-member-invite-url"
									readOnly
									value={developmentInviteUrl}
									className="font-mono text-xs"
								/>
								<Button
									type="button"
									variant="outline"
									onClick={() => void copyDevelopmentInviteUrl()}
								>
									{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
									<span className="sr-only">Copy invitation link</span>
								</Button>
							</div>
							<p className="text-xs text-muted-foreground">
								This link is shown only in development because email delivery is
								not configured. Share it only with the intended recipient.
							</p>
						</div>
					) : (
						<div className="grid gap-5 py-2">
							<div className="grid gap-2">
								<Label htmlFor="member-invitation-email">Email address</Label>
								<Input
									id="member-invitation-email"
									type="email"
									autoComplete="email"
									value={email}
									disabled={isExecuting}
									aria-invalid={Boolean(emailError)}
									aria-describedby="member-invitation-email-feedback"
									onBlur={() => setEmailTouched(true)}
									onChange={(event) => setEmail(event.target.value)}
									placeholder="member@example.com"
								/>
								<div
									id="member-invitation-email-feedback"
									aria-live="polite"
									className="min-h-4 text-xs"
								>
									{emailError ? (
										<p className="text-destructive">{emailError}</p>
									) : emailWasNormalized ? (
										<p className="text-muted-foreground">
											Invitation will be sent to{' '}
											<span className="font-medium text-foreground">
												{normalizedEmail}
											</span>
										</p>
									) : null}
								</div>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="member-invitation-role">
									Organization role
								</Label>
								<Select
									value={role}
									disabled={isExecuting}
									onValueChange={(value) => setRole(value as InvitationRole)}
								>
									<SelectTrigger id="member-invitation-role">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{roleOptions.map((option) => (
											<SelectItem key={option} value={option}>
												{ROLE_LABELS[option]}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					)}

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							disabled={isExecuting}
							onClick={closeDialog}
						>
							{developmentInviteUrl ? 'Close' : 'Cancel'}
						</Button>
						{developmentInviteUrl ? null : (
							<Button
								type="button"
								disabled={!canSubmit}
								onClick={() => void submitInvitation()}
							>
								{isExecuting ? (
									<LoaderCircle className="size-4 animate-spin" />
								) : null}
								Send invitation
							</Button>
						)}
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
