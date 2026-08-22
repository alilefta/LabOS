'use server'

import { headers } from 'next/headers'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { createStaffOrganizationInvitation } from '@/lib/staff-invitation'
import { normalizeLabStaff } from '@/lib/mappers'
import { CreateLabStaffInputSchema } from '@/schema/composed/team/staff.schema'

/**
 * Creates the operational LabStaff identity and optionally provisions Better
 * Auth Organization invitation intent. If invitation provisioning fails, the
 * brand-new unreferenced staff row is compensated so the existing UI retains
 * its all-or-nothing behavior.
 */
export const createLabStaffAction = actionClientWithLab
	.metadata({
		actionName: 'Register-New-Lab-Staff-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(CreateLabStaffInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			grantAccess,
			email,
			systemRole,
			commissionValue,
			...staffInput
		} = parsedInput
		const prisma = await tenantPrisma(ctx.labId)

		const staff = await prisma.labStaff.create({
			data: {
				...staffInput,
				address1: staffInput.address1 || 'N/A',
				address2: staffInput.address2 || null,
				city: staffInput.city || 'N/A',
				zipcode: staffInput.zipcode || null,
				avatarUrl: staffInput.avatarUrl || null,
				specialization: staffInput.specialization || null,
				jobTitle: staffInput.jobTitle || null,
				commissionValue:
					commissionValue !== undefined ? Number(commissionValue) : null,
				labId: ctx.labId,
			},
		})

		let invitation = null
		if (grantAccess && email) {
			try {
				const result = await createStaffOrganizationInvitation({
					tenant: {
						organizationId: ctx.organizationId,
						labId: ctx.labId,
					},
					staffId: staff.id,
					email,
					role: systemRole,
					requestHeaders: await headers(),
				})
				invitation = result.invitation
			} catch (error) {
				// The row is new and cannot yet have assignments. Tenant scoping plus
				// its primary key makes this compensation narrow and deterministic.
				await prisma.labStaff.deleteMany({
					where: { id: staff.id, labId: ctx.labId },
				})
				throw error
			}
		}

		return {
			staff: {
				...normalizeLabStaff(staff),
				labInvitation: null,
			},
			invitation: invitation
				? { token: invitation.id, email: invitation.email }
				: null,
		}
	})
