import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'

import type { AuthorizationActor } from '@/platform/authorization'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import {
	createStaffDossierLoader,
	StaffDossierAuthorizationError,
	type StaffDossierRepository,
} from '@/modules/labos-staff/staff-dossier.loader'

const identity = {
	id: '1690baa7-467a-4143-97dc-1e557022f788',
	firstName: 'Ahmed',
	lastName: 'Sameer',
	avatarUrl: null,
	isActive: true,
	workingDays: ['MONDAY'] as const,
	roleCategory: 'TECHNICIAN' as const,
	jobTitle: 'Technician',
	specialization: null,
}

function actor(role: string): AuthorizationActor {
	return {
		userId: 'user-1',
		memberId: 'member-1',
		organizationId: 'organization-1',
		memberRoles: [role],
	}
}

function authorization(): LabOSAuthorizationService {
	return {
		can: vi.fn(async (request) => {
			const role = request.actor.memberRoles[0]
			const allowed =
				request.permission === 'staff.read'
					? ['owner', 'admin', 'manager', 'staff'].includes(role)
					: request.permission === 'staff.contact.read'
						? ['owner', 'admin', 'manager'].includes(role)
						: request.permission === 'staff.compensation.read'
						? ['owner', 'admin', 'manager'].includes(role)
						: request.permission === 'membership.list'
							? ['owner', 'admin'].includes(role)
							: false
			return { allowed, reason: allowed ? 'ROLE_PERMISSION' : 'AUTHZ_PERMISSION_NOT_GRANTED' }
		}),
		require: vi.fn(),
		roleCapabilities: vi.fn(),
	} as unknown as LabOSAuthorizationService
}

function repository(): StaffDossierRepository & {
	findIdentity: ReturnType<typeof vi.fn>
	findContact: ReturnType<typeof vi.fn>
	findCompensation: ReturnType<typeof vi.fn>
	findAccess: ReturnType<typeof vi.fn>
} {
	return {
		findIdentity: vi.fn().mockResolvedValue(identity),
		findContact: vi.fn().mockResolvedValue({ phoneNumber: '07000000000' }),
		findCompensation: vi.fn().mockResolvedValue({
			commissionType: 'PERCENTAGE',
			commissionValue: 20,
		}),
		findAccess: vi.fn().mockResolvedValue({
			accessState: 'ACTIVE_USER',
			systemRole: 'STAFF',
			inviteEmail: null,
		}),
	}
}

describe('A-118 Staff dossier loader', () => {
	it.each([
		['owner', true, true, true],
		['admin', true, true, true],
		['manager', true, true, false],
		['staff', false, false, false],
	] as const)(
		'returns only authorized sections for %s',
		async (role, contactAllowed, compensationAllowed, accessAllowed) => {
			const repo = repository()
			const load = createStaffDossierLoader(authorization(), repo)

			const result = await load({
				actor: actor(role),
				labId: 'lab-1',
				staffId: identity.id,
			})

			expect(result?.compensation !== null).toBe(compensationAllowed)
			expect(result?.access !== null).toBe(accessAllowed)
			expect(result && 'phoneNumber' in result).toBe(contactAllowed)
			expect(repo.findContact).toHaveBeenCalledTimes(contactAllowed ? 1 : 0)
			expect(repo.findCompensation).toHaveBeenCalledTimes(
				compensationAllowed ? 1 : 0,
			)
			expect(repo.findAccess).toHaveBeenCalledTimes(accessAllowed ? 1 : 0)
		},
	)

	it('denies unknown roles before any dossier repository executes', async () => {
		const repo = repository()
		const load = createStaffDossierLoader(authorization(), repo)

		await expect(
			load({ actor: actor('unknown'), labId: 'lab-1', staffId: identity.id }),
		).rejects.toBeInstanceOf(StaffDossierAuthorizationError)

		expect(repo.findIdentity).not.toHaveBeenCalled()
		expect(repo.findContact).not.toHaveBeenCalled()
		expect(repo.findCompensation).not.toHaveBeenCalled()
		expect(repo.findAccess).not.toHaveBeenCalled()
	})

	it('does not expose invitation bearer IDs from repository, DTO, or UI reads', () => {
		const files = [
			'data/team/staff-dossier.repository.ts',
			'data/team/get-staff-dossier.ts',
			'schema/composed/team/staff-dossier.dtos.ts',
			'actions/team/get-staff-overview-analytics-action.ts',
		]
		const violations = files.filter((file) =>
			/\binviteToken\b|invitation:\s*\{\s*select:\s*\{\s*id:/s.test(
				readFileSync(join(process.cwd(), file), 'utf8'),
			),
		)

		expect(violations).toEqual([])
	})

	it('keeps compensation out of the combined overview analytics payload', () => {
		const source = readFileSync(
			join(process.cwd(), 'actions/team/get-staff-overview-analytics-action.ts'),
			'utf8',
		)

		// Compensation is loaded through the separately authorized dossier section.
		// The analytics action must not select or serialize those fields.
		expect(source).not.toMatch(/commissionType|commissionValue/)
	})
})
