import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { generalPrisma } from './prisma'
import { LabUserBase } from '@/schema/base/lab-user.base'
import { SuperUserBase } from '@/schema/base/super-user.base'
import { nextCookies } from 'better-auth/next-js'
import { organization } from 'better-auth/plugins'
import { organizationAccess } from '@/platform/auth/organization-access'
import { authUserAdminPlugin } from '@/platform/auth/admin-plugin'
import {
	cleanupStaffInvitationIntent,
	processAcceptedStaffInvitation,
} from '@/lib/staff-invitation/accept-staff-invitation.service'

export const auth = betterAuth({
	database: prismaAdapter(generalPrisma, {
		provider: 'postgresql',
	}),
	secret: process.env.BETTER_AUTH_SECRET,
	baseURL: process.env.BETTER_AUTH_URL,

	emailAndPassword: {
		enabled: true,
	},
	user: {
		modelName: 'AuthUser',
		// proposed move to user instead of session to be able to access it when user have multiple sessions (logged in from different browsers)
		additionalFields: {
			labId: {
				type: 'string',
				required: false,
				// Legacy compatibility field: readable until schema removal, but no
				// Better Auth sign-up/update input may write it.
				input: false,
			},
			role: {
				type: ['LAB_USER', 'SYSTEM_USER'],
				defaultValue: 'LAB_USER',
				required: true,
			},
		},
	},
	onAPIError: {
		throw: true,
		onError(error) {
			// Authentication errors may contain request or identity details. Keep
			// default telemetry deliberately coarse until the tracing adapter lands.
			console.error('[BetterAuth] API request failed', {
				errorName: error instanceof Error ? error.name : 'UnknownError',
			})
		},
	},

	plugins: [
		authUserAdminPlugin,
		organization({
			...organizationAccess,
			invitationExpiresIn: 60 * 60 * 48,
			cancelPendingInvitationsOnReInvite: true,
			organizationHooks: {
				async afterAcceptInvitation({ invitation, member }) {
					try {
						await processAcceptedStaffInvitation({
							invitationId: invitation.id,
							organizationId: invitation.organizationId,
							memberId: member.id,
						})
					} catch (error) {
						// Membership is already committed by Better Auth. Keep the intent
						// for retry/reconciliation and never log invitation email or token.
						console.error('[StaffInvitation] post-accept link pending', {
							invitationId: invitation.id,
							organizationId: invitation.organizationId,
							errorCode:
								error instanceof Error && 'code' in error
									? error.code
									: 'STAFF_INVITATION_ACCEPTANCE_LINK_FAILED',
						})
					}
				},
				async afterCancelInvitation({ invitation }) {
					try {
						await cleanupStaffInvitationIntent(invitation.id)
					} catch {
						console.warn('[StaffInvitation] canceled intent cleanup pending', {
							invitationId: invitation.id,
						})
					}
				},
				async afterRejectInvitation({ invitation }) {
					try {
						await cleanupStaffInvitationIntent(invitation.id)
					} catch {
						console.warn('[StaffInvitation] rejected intent cleanup pending', {
							invitationId: invitation.id,
						})
					}
				},
			},
		}),
		nextCookies(),
	],
})

export type AuthUser = typeof auth.$Infer.Session.user & {
	labUser: LabUserBase | undefined
	superUser: SuperUserBase | undefined
}
// type SessionX = typeof auth.$Infer.Session.session;
export type Session = typeof auth.$Infer.Session
