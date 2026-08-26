import { admin } from 'better-auth/plugins'
import { adminAc, userAc } from 'better-auth/plugins/admin/access'

/**
 * AuthUser.role is a legacy application-level enum, separate from Organization
 * membership roles. Better Auth's Admin plugin writes its default user role
 * during every account creation, so its values must stay compatible with the
 * Prisma AuthUserRole enum until that legacy column is removed.
 */
export const authUserAdminPlugin = admin({
	defaultRole: 'LAB_USER',
	adminRoles: ['SYSTEM_USER'],
	roles: {
		LAB_USER: userAc,
		SYSTEM_USER: adminAc,
	},
})
