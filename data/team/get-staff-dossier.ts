import { z } from 'zod'

import { daError, daSuccess, toDAError, type DAResult } from '@/lib/data-access-errors'
import { getDataTenantContext } from '@/lib/data-tenant-context'
import { ERRORS } from '@/lib/errors'
import { tenantPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService } from '@/modules/labos-authorization/service'
import {
	createStaffDossierLoader,
	StaffDossierAuthorizationError,
} from '@/modules/labos-staff/staff-dossier.loader'
import type {
	StaffDossierDTO,
	StaffHeaderDTO,
	StaffMetadataDTO,
} from '@/schema/composed/team/staff-dossier.dtos'
import type { TenantContext } from '@/platform/organizations/tenant-context'

import { prismaStaffDossierRepository } from './staff-dossier.repository'

const InputSchema = z.string().uuid('Invalid Staff ID format')

const loadStaffDossier = createStaffDossierLoader(
	labosAuthorizationService,
	prismaStaffDossierRepository,
)

async function canReadStaff(
	tenant: TenantContext,
	staffId: string,
): Promise<boolean> {
	const decision = await labosAuthorizationService.can({
		actor: createLabOSAuthorizationActor(tenant),
		permission: 'staff.read',
		target: { type: 'staff', id: staffId },
	})
	return decision.allowed
}

/**
 * Resolves and validates the active tenant before loading the split A-118 DTO.
 * The loader owns all section-level authorization and the repositories own
 * tenant-scoped minimal projections.
 */
export async function getStaffDossierData(
	staffId: string,
): Promise<DAResult<StaffDossierDTO>> {
	try {
		const tenantResult = await getDataTenantContext()
		if (!tenantResult.success) return daError(tenantResult.error)

		const parsedStaffId = InputSchema.safeParse(staffId)
		if (!parsedStaffId.success) return daError(ERRORS.INVALID_INPUT.toJSON())

		const tenant = tenantResult.data
		const dossier = await loadStaffDossier({
			actor: createLabOSAuthorizationActor(tenant),
			labId: tenant.labId,
			staffId: parsedStaffId.data,
		})

		if (!dossier) return daError(ERRORS.NOT_FOUND.toJSON())
		return daSuccess(dossier)
	} catch (error) {
		if (error instanceof StaffDossierAuthorizationError) {
			return daError(ERRORS.MISSING_PERMISSIONS.toJSON())
		}
		return toDAError(error)
	}
}

/** Lean tenant-scoped identity used only for metadata generation. */
export async function getStaffMetadata(
	staffId: string,
): Promise<DAResult<StaffMetadataDTO>> {
	try {
		const tenantResult = await getDataTenantContext()
		if (!tenantResult.success) return daError(tenantResult.error)
		const { labId } = tenantResult.data

		const parsedStaffId = InputSchema.safeParse(staffId)
		if (!parsedStaffId.success) return daError(ERRORS.INVALID_INPUT.toJSON())
		if (!(await canReadStaff(tenantResult.data, parsedStaffId.data))) {
			return daError(ERRORS.MISSING_PERMISSIONS.toJSON())
		}

		const prisma = await tenantPrisma(labId)
		const staff = await prisma.labStaff.findUnique({
			where: { id: parsedStaffId.data, labId },
			select: { id: true, firstName: true, lastName: true },
		})

		return staff ? daSuccess(staff) : daError(ERRORS.NOT_FOUND.toJSON())
	} catch (error) {
		return toDAError(error)
	}
}

/**
 * Loads operational header identity only. Membership and invitation state are
 * deliberately absent because the Staff page header is an ordinary read.
 */
export async function getStaffHeaderData(
	staffId: string,
): Promise<DAResult<StaffHeaderDTO>> {
	try {
		const tenantResult = await getDataTenantContext()
		if (!tenantResult.success) return daError(tenantResult.error)
		const { labId } = tenantResult.data

		const parsedStaffId = InputSchema.safeParse(staffId)
		if (!parsedStaffId.success) return daError(ERRORS.INVALID_INPUT.toJSON())
		if (!(await canReadStaff(tenantResult.data, parsedStaffId.data))) {
			return daError(ERRORS.MISSING_PERMISSIONS.toJSON())
		}

		const actor = createLabOSAuthorizationActor(tenantResult.data)
		const contactDecision = await labosAuthorizationService.can({
			actor,
			permission: 'staff.contact.read',
			target: { type: 'staff', id: parsedStaffId.data },
		})
		const prisma = await tenantPrisma(labId)
		const staff = await prisma.labStaff.findUnique({
			where: { id: parsedStaffId.data, labId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				avatarUrl: true,
				roleCategory: true,
				jobTitle: true,
				specialization: true,
				isActive: true,
			},
		})

		if (!staff) return daError(ERRORS.NOT_FOUND.toJSON())
		if (!contactDecision.allowed) return daSuccess(staff)
		const contact = await prisma.labStaff.findUnique({
			where: { id: parsedStaffId.data, labId },
			select: { phoneNumber: true },
		})
		return daSuccess({ ...staff, ...(contact && { phoneNumber: contact.phoneNumber }) })
	} catch (error) {
		return toDAError(error)
	}
}
