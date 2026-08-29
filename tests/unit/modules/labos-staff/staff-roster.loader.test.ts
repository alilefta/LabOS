import { describe, expect, it, vi } from 'vitest'

import type { AuthorizationActor } from '@/platform/authorization'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import {
	createStaffRosterLoader,
	StaffRosterAuthorizationError,
	type StaffRosterRepository,
} from '@/modules/labos-staff/staff-roster.loader'
import { DEFAULT_TEAM_FILTERS } from '@/schema/composed/team/team-filters'

function actor(role: string): AuthorizationActor {
	return { userId: 'user-1', memberId: 'member-1', organizationId: 'org-1', memberRoles: [role] }
}

function authorization(): LabOSAuthorizationService {
	return {
		can: vi.fn(async (request) => {
			const role = request.actor.memberRoles[0]
			const matrix: Record<string, readonly string[]> = {
				'staff.list': ['owner', 'admin', 'manager', 'staff'],
				'staff.analytics.list': ['owner', 'admin', 'manager', 'staff'],
				'staff.contact.list': ['owner', 'admin', 'manager'],
				'staff.compensation.list': ['owner', 'admin', 'manager'],
				'membership.list': ['owner', 'admin'],
			}
			const allowed = matrix[request.permission]?.includes(role) ?? false
			return { allowed, reason: allowed ? 'ROLE_PERMISSION' : 'AUTHZ_PERMISSION_NOT_GRANTED' }
		}),
		require: vi.fn(),
		roleCapabilities: vi.fn(),
	} as unknown as LabOSAuthorizationService
}

function repository(): StaffRosterRepository & Record<
	'findBase' | 'findAnalytics' | 'findContacts' | 'findCompensation' | 'findAccess',
	ReturnType<typeof vi.fn>
> {
	return {
		findBase: vi.fn().mockResolvedValue([{ id: 'staff-1', firstName: 'Ali', lastName: 'Sameer', avatarUrl: null, roleCategory: 'TECHNICIAN', jobTitle: 'Technician', isActive: true }]),
		findAnalytics: vi.fn().mockResolvedValue([{ id: 'staff-1', activeCaseCount: 2, capacityBand: 'AVAILABLE', qualityBand: 'EXCELLENT', remakeRate: 0 }]),
		findContacts: vi.fn().mockResolvedValue([{ id: 'staff-1', phoneNumber: '07000000000' }]),
		findCompensation: vi.fn().mockResolvedValue([{ id: 'staff-1', commissionType: 'PERCENTAGE', commissionValue: 20 }]),
		findAccess: vi.fn().mockResolvedValue([{ id: 'staff-1', accessState: 'ACTIVE_USER', systemRole: 'STAFF', inviteEmail: null }]),
	}
}

describe('Staff roster disclosure loader', () => {
	it.each([
		['owner', true, true, true],
		['admin', true, true, true],
		['manager', true, true, false],
		['staff', false, false, false],
	] as const)('queries and returns only authorized fields for %s', async (role, contactAllowed, compensationAllowed, accessAllowed) => {
		const repo = repository()
		const load = createStaffRosterLoader(authorization(), repo)
		const result = await load({ actor: actor(role), labId: 'lab-1', filters: DEFAULT_TEAM_FILTERS })
		const row = result.staff[0]

		expect('phoneNumber' in row).toBe(contactAllowed)
		expect('commissionType' in row).toBe(compensationAllowed)
		expect('commissionValue' in row).toBe(compensationAllowed)
		expect('accessState' in row).toBe(accessAllowed)
		expect('systemRole' in row).toBe(accessAllowed)
		expect('inviteEmail' in row).toBe(accessAllowed)
		expect(repo.findContacts).toHaveBeenCalledTimes(contactAllowed ? 1 : 0)
		expect(repo.findCompensation).toHaveBeenCalledTimes(compensationAllowed ? 1 : 0)
		expect(repo.findAccess).toHaveBeenCalledTimes(accessAllowed ? 1 : 0)
	})

	it('rejects hidden access filters before any roster query executes', async () => {
		const repo = repository()
		const load = createStaffRosterLoader(authorization(), repo)
		await expect(load({
			actor: actor('staff'),
			labId: 'lab-1',
			filters: { ...DEFAULT_TEAM_FILTERS, accessStates: ['ACTIVE_USER'] },
		})).rejects.toBeInstanceOf(StaffRosterAuthorizationError)
		expect(repo.findBase).not.toHaveBeenCalled()
		expect(repo.findAccess).not.toHaveBeenCalled()
	})

	it('denies unknown roles before any roster query executes', async () => {
		const repo = repository()
		const load = createStaffRosterLoader(authorization(), repo)
		await expect(load({ actor: actor('unknown'), labId: 'lab-1', filters: DEFAULT_TEAM_FILTERS })).rejects.toBeInstanceOf(StaffRosterAuthorizationError)
		expect(repo.findBase).not.toHaveBeenCalled()
	})
})
