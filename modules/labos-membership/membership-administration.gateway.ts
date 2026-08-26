import 'server-only'

import { auth } from '@/lib/auth'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'

export type MembershipProviderTarget = Readonly<{
	organizationId: string
	memberId: string
	requestHeaders: Headers
}>

export interface MembershipAdministrationGateway {
	invite(input: {
		organizationId: string
		email: string
		role: Exclude<LabOSOrganizationRole, 'owner'>
		requestHeaders: Headers
	}): Promise<Readonly<{ invitationId: string }>>
	updateRole(
		input: MembershipProviderTarget & {
			roles: readonly LabOSOrganizationRole[]
		},
	): Promise<void>
	remove(input: MembershipProviderTarget): Promise<void>
}

function assertProviderMemberIdentity(
	member: { id: string; organizationId: string } | null | undefined,
	expected: { memberId: string; organizationId: string },
) {
	if (
		!member ||
		member.id !== expected.memberId ||
		member.organizationId !== expected.organizationId
	) {
		throw new Error('Membership provider returned an unexpected target')
	}
}

/**
 * Better Auth gateway used only after authoritative LabOS V1 authorization.
 * The explicit Organization ID prevents ambient active-tenant drift, while
 * request headers let Better Auth independently authorize the same actor.
 */
export const betterAuthMembershipAdministrationGateway: MembershipAdministrationGateway =
	{
		async invite(input) {
			const invitation = await auth.api.createInvitation({
				body: {
					email: input.email,
					role: input.role,
					organizationId: input.organizationId,
					resend: true,
				},
				headers: input.requestHeaders,
			})
			if (
				!invitation ||
				invitation.organizationId !== input.organizationId ||
				invitation.email.trim().toLowerCase() !== input.email
			) {
				throw new Error('Membership provider returned an unexpected invitation')
			}
			return Object.freeze({ invitationId: invitation.id })
		},

		async updateRole(input) {
			const member = await auth.api.updateMemberRole({
				body: {
					memberId: input.memberId,
					organizationId: input.organizationId,
					role: [...input.roles],
				},
				headers: input.requestHeaders,
			})
			assertProviderMemberIdentity(member, input)
		},

		async remove(input) {
			const result = await auth.api.removeMember({
				body: {
					memberIdOrEmail: input.memberId,
					organizationId: input.organizationId,
				},
				headers: input.requestHeaders,
			})
			assertProviderMemberIdentity(result.member, input)
		},
	}
