import { describe, expect, it } from 'vitest'

import {
	LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES,
	LABOS_MEMBERSHIP_OPERATION_BOUNDARY_IDS,
	LabOSMembershipOperationBoundaryError,
	projectLabOSMembershipOperationBoundary,
} from '@/modules/labos-authorization/membership-operation-boundaries'
import {
	InviteOrganizationMemberInputSchema,
	MembershipTargetInputSchema,
	UpdateMembershipRoleInputSchema,
} from '@/schema/composed/team/membership-administration.schema'

const memberId = '1690baa7-467a-4143-97dc-1e557022f788'
const betterAuthMemberId = 'Mbr_7YpQ2xL9aBcD4eFgH6jK8n'

describe('trusted membership operation boundaries', () => {
	it('registers the new non-legacy membership command family', () => {
		expect(LABOS_MEMBERSHIP_OPERATION_BOUNDARY_IDS).toEqual([
			'M-001',
			'M-002',
			'M-003',
			'M-004',
		])
	})

	it('projects a Member-only invitation with no Staff target or tenant metadata', () => {
		const input = InviteOrganizationMemberInputSchema.parse({
			email: '  NEW.MEMBER@example.test ',
			role: 'staff',
		})

		expect(projectLabOSMembershipOperationBoundary('M-004', input)).toEqual({
			boundaryId: 'M-004',
			boundaryName: 'Invite-Organization-Member',
			permission: 'membership.invite',
			operation: {
				kind: 'membership.invite',
				requestedRole: 'staff',
				recipientEmail: 'new.member@example.test',
			},
		})
	})

	it('projects Member read and removal to identifier-only targets', () => {
		const input = MembershipTargetInputSchema.parse({ memberId })

		expect(projectLabOSMembershipOperationBoundary('M-001', input)).toEqual({
			boundaryId: 'M-001',
			boundaryName: 'Read-Organization-Member',
			permission: 'membership.read',
			target: { type: 'member', id: memberId },
		})
		expect(projectLabOSMembershipOperationBoundary('M-003', input)).toEqual({
			boundaryId: 'M-003',
			boundaryName: 'Remove-Organization-Member',
			permission: 'membership.remove',
			target: { type: 'member', id: memberId },
		})
	})

	it('accepts Better Auth opaque Member IDs without assuming UUID encoding', () => {
		expect(
			MembershipTargetInputSchema.parse({ memberId: betterAuthMemberId }),
		).toEqual({ memberId: betterAuthMemberId })
		expect(
			UpdateMembershipRoleInputSchema.parse({
				memberId: betterAuthMemberId,
				roles: ['staff'],
			}),
		).toEqual({ memberId: betterAuthMemberId, roles: ['staff'] })
	})

	it('projects only the validated requested roles for role update', () => {
		const input = UpdateMembershipRoleInputSchema.parse({
			memberId,
			roles: ['manager', 'staff'],
		})

		expect(projectLabOSMembershipOperationBoundary('M-002', input)).toEqual({
			boundaryId: 'M-002',
			boundaryName: 'Update-Organization-Member-Role',
			permission: 'membership.role.update',
			target: { type: 'member', id: memberId },
			operation: {
				kind: 'membership.role.update',
				requestedRoles: ['manager', 'staff'],
			},
		})
	})

	it.each([
		{ memberId, roles: [] },
		{ memberId, roles: ['owner', 'owner'] },
		{ memberId, roles: ['unknown'] },
		{ memberId, roles: ['staff'], permission: 'membership.remove' },
	])('rejects malformed or caller-owned metadata: %j', (input) => {
		expect(() => UpdateMembershipRoleInputSchema.parse(input)).toThrow()
	})

	it.each([
		{ email: 'not-an-email', role: 'staff' },
		{ email: 'member@example.test', role: 'owner' },
		{ email: 'member@example.test', role: 'unknown' },
		{ email: 'member@example.test', role: 'staff', staffId: 'forbidden' },
	])('rejects malformed or Staff-linked invitation input: %j', (input) => {
		expect(() => InviteOrganizationMemberInputSchema.parse(input)).toThrow()
	})

	it.each([
		'',
		' member-with-padding',
		'member with whitespace',
		'member\nwith-control',
		'x'.repeat(129),
	])('rejects malformed opaque Member ID %j', (invalidMemberId) => {
		expect(() =>
			MembershipTargetInputSchema.parse({ memberId: invalidMemberId }),
		).toThrow()
	})

	it('fails closed for an unknown boundary', () => {
		expect(() =>
			projectLabOSMembershipOperationBoundary(
				'M-999' as 'M-001',
				{ memberId },
			),
		).toThrowError(
			expect.objectContaining<Partial<LabOSMembershipOperationBoundaryError>>({
				code: LABOS_MEMBERSHIP_OPERATION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
			}),
		)
	})
})
