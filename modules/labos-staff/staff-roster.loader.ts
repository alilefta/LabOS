import type { AuthorizationActor } from '@/platform/authorization'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import type { StaffMemberDTO } from '@/schema/composed/team/team.dtos'
import type { CapacityBand, QualityRiskBand, SystemAccessState, TeamFilters } from '@/schema/composed/team/team-filters'
import type { CommissionType, LabRole, StaffRoleCategory } from '@/schema/base/enums.base'

export type StaffRosterBaseRow = Readonly<{ id: string; firstName: string; lastName: string; avatarUrl: string | null; roleCategory: StaffRoleCategory; jobTitle: string | null; isActive: boolean }>
export type StaffRosterAnalyticsRow = Readonly<{ id: string; activeCaseCount: number; capacityBand: CapacityBand; qualityBand: QualityRiskBand; remakeRate: number }>
export type StaffRosterContactRow = Readonly<{ id: string; phoneNumber: string }>
export type StaffRosterCompensationRow = Readonly<{ id: string; commissionType: CommissionType; commissionValue: number | null }>
export type StaffRosterAccessRow = Readonly<{ id: string; accessState: SystemAccessState; systemRole: LabRole | null; inviteEmail: string | null }>

export type StaffRosterRepository = Readonly<{
	findBase(input: { labId: string; searchQuery?: string; filters: TeamFilters }): Promise<readonly StaffRosterBaseRow[]>
	findAnalytics(input: { labId: string; staffIds: readonly string[] }): Promise<readonly StaffRosterAnalyticsRow[]>
	findContacts(input: { labId: string; staffIds: readonly string[] }): Promise<readonly StaffRosterContactRow[]>
	findCompensation(input: { labId: string; staffIds: readonly string[] }): Promise<readonly StaffRosterCompensationRow[]>
	findAccess(input: { labId: string; staffIds: readonly string[] }): Promise<readonly StaffRosterAccessRow[]>
}>

export class StaffRosterAuthorizationError extends Error {
	constructor(message = 'Staff roster access denied') {
		super(message)
		this.name = 'StaffRosterAuthorizationError'
	}
}

type LoadStaffRosterInput = Readonly<{ actor: AuthorizationActor; labId: string; searchQuery?: string; filters: TeamFilters }>
const byId = <T extends { id: string }>(rows: readonly T[]) => new Map(rows.map((row) => [row.id, row]))

/** Protected repositories never execute after a denied permission decision. */
export function createStaffRosterLoader(authorization: LabOSAuthorizationService, repository: StaffRosterRepository) {
	return async function loadStaffRoster(input: LoadStaffRosterInput) {
		const [list, analytics, contacts, compensation, access] = await Promise.all([
			authorization.can({ actor: input.actor, permission: 'staff.list' }),
			authorization.can({ actor: input.actor, permission: 'staff.analytics.list' }),
			authorization.can({ actor: input.actor, permission: 'staff.contact.list' }),
			authorization.can({ actor: input.actor, permission: 'staff.compensation.list' }),
			authorization.can({ actor: input.actor, permission: 'membership.list' }),
		])

		if (!list.allowed) throw new StaffRosterAuthorizationError()
		if (!analytics.allowed && (input.filters.capacityBands.length || input.filters.qualityBands.length)) throw new StaffRosterAuthorizationError('Staff analytics filters are not permitted')
		if (!access.allowed && input.filters.accessStates.length) throw new StaffRosterAuthorizationError('Staff access filters are not permitted')

		const base = await repository.findBase({ labId: input.labId, searchQuery: input.searchQuery, filters: input.filters })
		const staffIds = base.map((staff) => staff.id)
		const [analyticsRows, contactRows, compensationRows, accessRows] = await Promise.all([
			analytics.allowed && staffIds.length ? repository.findAnalytics({ labId: input.labId, staffIds }) : Promise.resolve([]),
			contacts.allowed && staffIds.length ? repository.findContacts({ labId: input.labId, staffIds }) : Promise.resolve([]),
			compensation.allowed && staffIds.length ? repository.findCompensation({ labId: input.labId, staffIds }) : Promise.resolve([]),
			access.allowed && staffIds.length ? repository.findAccess({ labId: input.labId, staffIds }) : Promise.resolve([]),
		])

		const analyticsMap = byId(analyticsRows)
		const contactMap = byId(contactRows)
		const compensationMap = byId(compensationRows)
		const accessMap = byId(accessRows)
		let staff: StaffMemberDTO[] = base.map((identity) => {
			const analyticsData = analyticsMap.get(identity.id)
			const contact = contactMap.get(identity.id)
			const pay = compensationMap.get(identity.id)
			const systemAccess = accessMap.get(identity.id)
			return {
				...identity,
				...(analyticsData && { activeCaseCount: analyticsData.activeCaseCount, capacityBand: analyticsData.capacityBand, qualityBand: analyticsData.qualityBand, remakeRate: analyticsData.remakeRate }),
				...(contact && { phoneNumber: contact.phoneNumber }),
				...(pay && { commissionType: pay.commissionType, commissionValue: pay.commissionValue }),
				...(systemAccess && { accessState: systemAccess.accessState, systemRole: systemAccess.systemRole, inviteEmail: systemAccess.inviteEmail }),
			}
		})

		if (input.filters.accessStates.length) staff = staff.filter((row) => row.accessState && input.filters.accessStates.includes(row.accessState))
		if (input.filters.capacityBands.length) staff = staff.filter((row) => row.capacityBand && input.filters.capacityBands.includes(row.capacityBand))
		if (input.filters.qualityBands.length) staff = staff.filter((row) => row.qualityBand && input.filters.qualityBands.includes(row.qualityBand))
		return { staff, totalCount: staff.length }
	}
}
