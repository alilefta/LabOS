import { describe, expect, it } from 'vitest'

import {
	managerOrganizationRole,
	staffOrganizationRole,
} from '@/platform/auth/organization-access'

describe('Better Auth Organization role boundary', () => {
	it('lets managers administer invitations and members without deleting organizations', () => {
		expect(
			managerOrganizationRole.authorize({ invitation: ['create', 'cancel'] }),
		).toMatchObject({ success: true })
		expect(
			managerOrganizationRole.authorize({ member: ['create', 'update', 'delete'] }),
		).toMatchObject({ success: true })
		expect(
			managerOrganizationRole.authorize({ organization: ['delete'] }),
		).toMatchObject({ success: false })
	})

	it('does not let staff create invitations or manage memberships', () => {
		expect(
			staffOrganizationRole.authorize({ invitation: ['create'] }),
		).toMatchObject({ success: false })
		expect(
			staffOrganizationRole.authorize({ member: ['delete'] }),
		).toMatchObject({ success: false })
	})
})
