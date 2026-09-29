import type { AuthorizationRequest } from '@/platform/authorization'

import type { LabOSPermission } from './permissions'
import type { LabOSResourceType } from './resource-types'
import type { LabOSOrganizationRole } from './roles'

/**
 * Exact operation inputs that policies may inspect in addition to authoritative
 * database facts. This is deliberately a closed permission map, not an
 * extensible attributes bag. Values still receive runtime validation because
 * TypeScript types do not protect JavaScript or stale callers.
 */
export type LabOSAuthorizationOperationMap = {
	'catalog.create':
		| Readonly<{
				kind: 'catalog.category.image.create.stage'
		  }>
		| Readonly<{
				kind: 'catalog.category.image.create.commit'
		  }>
		| Readonly<{
				kind: 'catalog.worktype.image.create.stage'
		  }>
		| Readonly<{
				kind: 'catalog.worktype.image.create.commit'
		  }>
	'catalog.update':
		| Readonly<{
				kind: 'catalog.category.image.update.stage'
		  }>
		| Readonly<{
				kind: 'catalog.category.image.update.commit'
		  }>
		| Readonly<{
				kind: 'catalog.worktype.image.update.stage'
		  }>
		| Readonly<{
				kind: 'catalog.worktype.image.update.commit'
		  }>
	'dentist.read': Readonly<{
		kind: 'dentist.detail.read'
		routeClinicId: string
	}>
	'case.financials.update': Readonly<{
		kind: 'case.financials.recalculate'
	}>
	'membership.invite': Readonly<{
		kind: 'membership.invite'
		requestedRole: Exclude<LabOSOrganizationRole, 'owner'>
		recipientEmail: string
	}>
	'staff.access.invite': Readonly<{
		kind: 'staff.access.invite'
		requestedRole: LabOSOrganizationRole
		recipientEmail: string
	}>
	'membership.role.update': Readonly<{
		kind: 'membership.role.update'
		requestedRoles: readonly LabOSOrganizationRole[]
	}>
	'staff.compensation.update': Readonly<{
		kind: 'staff.compensation.update'
	}>
	'invoice.update':
		| Readonly<{
				kind: 'invoice.draft.update'
				clinicId: string
				caseIds: readonly string[]
		  }>
		| Readonly<{
				kind: 'invoice.live.update'
				changeSet: readonly ('due_date' | 'discount' | 'notes')[]
		  }>
	'invoice.cancel': Readonly<{
		kind: 'invoice.unpaid.cancel'
	}>
	'invoice.payment.record': Readonly<{
		kind: 'invoice.payment.record'
	}>
	'payout.read': Readonly<{
		kind: 'payout.paystub.read'
		routeStaffId: string
	}>
	'payout.self.read': Readonly<{
		kind: 'payout.paystub.read'
		routeStaffId: string
	}>
	'payout.issue': Readonly<{
		kind: 'payout.issue'
		assignmentIds: readonly string[]
	}>
	'payout.void': Readonly<{
		kind: 'payout.void'
	}>
}

export type LabOSAuthorizationRequest<Permission extends LabOSPermission> =
	AuthorizationRequest<
		Permission,
		LabOSResourceType,
		LabOSAuthorizationOperationMap
	>
