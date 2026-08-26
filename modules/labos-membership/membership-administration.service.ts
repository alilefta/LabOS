import 'server-only'

import type { TenantContext } from '@/platform/organizations'

import { authorizeLabOSMembershipOperation } from '@/modules/labos-authorization/membership-operation-authorization'
import {
	InviteOrganizationMemberInputSchema,
	MembershipTargetInputSchema,
	UpdateMembershipRoleInputSchema,
	type InviteOrganizationMemberInput,
	type MembershipTargetInput,
	type UpdateMembershipRoleInput,
} from '@/schema/composed/team/membership-administration.schema'

import {
	betterAuthMembershipAdministrationGateway,
	type MembershipAdministrationGateway,
} from './membership-administration.gateway'
import {
	structuredMembershipAdministrationMonitor,
	type MembershipAdministrationMonitor,
} from './membership-administration.telemetry'

export type MembershipAdministrationCommandContext = Readonly<{
	tenant: TenantContext
	requestHeaders: Headers
	correlationId?: string
}>

export type MembershipAdministrationServiceDependencies = Readonly<{
	authorize?: typeof authorizeLabOSMembershipOperation
	gateway?: MembershipAdministrationGateway
	monitor?: MembershipAdministrationMonitor
	generateCorrelationId?: () => string
	now?: () => number
}>

/**
 * Creates the dual-authority membership command service.
 *
 * Authorization V1 always runs first. Better Auth then independently checks
 * the same session and explicit Organization while performing the mutation.
 * Owner targets, self targets, unknown roles, foreign Members, and ungrantable
 * role requests fail in V1 before the provider is called. Provider errors are
 * never included in telemetry and no compensation weakens a denial.
 */
export function createMembershipAdministrationService(
	dependencies: MembershipAdministrationServiceDependencies = {},
) {
	const authorize =
		dependencies.authorize ?? authorizeLabOSMembershipOperation
	const gateway =
		dependencies.gateway ?? betterAuthMembershipAdministrationGateway
	const monitor =
		dependencies.monitor ?? structuredMembershipAdministrationMonitor
	const generateCorrelationId =
		dependencies.generateCorrelationId ?? (() => crypto.randomUUID())
	const now = dependencies.now ?? (() => performance.now())

	type RunInput =
		| Readonly<{
				boundaryId: 'M-004'
				permission: 'membership.invite'
				parsedInput: InviteOrganizationMemberInput
				context: MembershipAdministrationCommandContext
		  }>
		| Readonly<{
				boundaryId: 'M-002'
				permission: 'membership.role.update'
				parsedInput: UpdateMembershipRoleInput
				context: MembershipAdministrationCommandContext
		  }>
		| Readonly<{
				boundaryId: 'M-003'
				permission: 'membership.remove'
				parsedInput: MembershipTargetInput
				context: MembershipAdministrationCommandContext
		  }>

	async function run(input: RunInput) {
		const startedAt = now()
		const correlationId = input.context.correlationId ?? generateCorrelationId()
		const base = {
			event: 'labos.membership_administration' as const,
			boundaryId: input.boundaryId,
			permission: input.permission,
			organizationId: input.context.tenant.organizationId,
			correlationId,
		}
		monitor.record({ ...base, outcome: 'started' })

		try {
			await authorize({
				boundaryId: input.boundaryId,
				parsedInput: input.parsedInput,
				tenant: input.context.tenant,
				correlationId,
			})
		} catch (error) {
			monitor.record({
				...base,
				outcome: 'failed',
				phase: 'authorization',
				durationMs: Math.max(0, now() - startedAt),
			})
			throw error
		}

		let invitationId: string | null = null
		try {
			if (input.boundaryId === 'M-004') {
				const invitation = await gateway.invite({
					organizationId: input.context.tenant.organizationId,
					email: input.parsedInput.email,
					role: input.parsedInput.role,
					requestHeaders: input.context.requestHeaders,
				})
				invitationId = invitation.invitationId
			} else if (input.boundaryId === 'M-002') {
				await gateway.updateRole({
					organizationId: input.context.tenant.organizationId,
					memberId: input.parsedInput.memberId,
					roles: input.parsedInput.roles,
					requestHeaders: input.context.requestHeaders,
				})
			} else {
				await gateway.remove({
					organizationId: input.context.tenant.organizationId,
					memberId: input.parsedInput.memberId,
					requestHeaders: input.context.requestHeaders,
				})
			}
		} catch (error) {
			monitor.record({
				...base,
				outcome: 'failed',
				phase: 'provider',
				durationMs: Math.max(0, now() - startedAt),
			})
			throw error
		}

		monitor.record({
			...base,
			outcome: 'completed',
			phase: 'provider',
			durationMs: Math.max(0, now() - startedAt),
		})
		return invitationId
	}

	return Object.freeze({
		async invite(
			input: unknown,
			context: MembershipAdministrationCommandContext,
		) {
			const parsedInput = InviteOrganizationMemberInputSchema.parse(input)
			const invitationId = await run({
				boundaryId: 'M-004',
				permission: 'membership.invite',
				parsedInput,
				context,
			})
			if (!invitationId) {
				throw new Error('Membership provider returned no invitation identifier')
			}
			return Object.freeze({
				status: 'invitation_sent' as const,
				invitationId,
			})
		},

		async updateRole(
			input: unknown,
			context: MembershipAdministrationCommandContext,
		) {
			const parsedInput = UpdateMembershipRoleInputSchema.parse(input)
			await run({
				boundaryId: 'M-002',
				permission: 'membership.role.update',
				parsedInput,
				context,
			})
			return Object.freeze({ status: 'role_updated' as const })
		},

		async remove(
			input: unknown,
			context: MembershipAdministrationCommandContext,
		) {
			const parsedInput = MembershipTargetInputSchema.parse(input)
			await run({
				boundaryId: 'M-003',
				permission: 'membership.remove',
				parsedInput,
				context,
			})
			return Object.freeze({ status: 'membership_removed' as const })
		},
	})
}

/** Server-only command service; no route, action, or UI consumes it yet. */
export const membershipAdministrationService =
	createMembershipAdministrationService()
