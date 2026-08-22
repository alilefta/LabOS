import { ClinicSelectScalar } from "@/generated/prisma/models";
import { daError, daSuccess } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getDataTenantContext } from "@/lib/data-tenant-context";
import { normalizeClinic } from "@/lib/mappers";
import { composeClinicBase } from "@/lib/mappers/composers";
import { tenantPrisma } from "@/lib/prisma";
import { ClinicBase } from "@/schema/base/clinic.base";
import { cache } from "react";

export const getClinicDetailsById = cache(async function getClinicDetailsById(clinicId: string) {
	const tenantResult = await getDataTenantContext();
	if (!tenantResult.success) return daError(tenantResult.error);
	const { labId } = tenantResult.data;

	if (!clinicId) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	const prisma = await tenantPrisma(labId);

	const clinic = await prisma.clinic.findUnique({
		where: { id: clinicId, labId },
		select: {
			id: true,
			name: true,
			type: true,
			status: true,
			city: true,
			address1: true,
			address2: true,
			zipcode: true,
			email: true,
			phoneNumber: true,
			billingEmail: true,
			billingPhoneNumber: true,
			taxNumber: true,
			website: true,
			description: true,
			notes: true,
			currentBalance: true,
			creditLimit: true,
			discount: true,
			createdAt: true,
			updatedAt: true,
			labId: true,
		},
	});

	if (!clinic) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	return daSuccess<ClinicBase | null>(normalizeClinic(clinic));
});

export async function getClinicById(clinicId: string) {
	const tenantResult = await getDataTenantContext();
	if (!tenantResult.success) return daError(tenantResult.error);
	const { labId } = tenantResult.data;

	if (!clinicId) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	const prisma = await tenantPrisma(labId);

	const clinic = await prisma.clinic.findUnique({
		where: {
			id: clinicId,
			labId: labId,
		},
	});

	if (!clinic) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	return daSuccess<ClinicBase | null>(composeClinicBase(clinic));
}

export async function getClinicSelectiveFieldById(clinicId: string, fields: ClinicSelectScalar) {
	const tenantResult = await getDataTenantContext();
	if (!tenantResult.success) return daError(tenantResult.error);
	const { labId } = tenantResult.data;

	if (!clinicId) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	const prisma = await tenantPrisma(labId);

	const clinic = await prisma.clinic.findUnique({
		where: {
			id: clinicId,
			labId: labId,
		},
		select: fields,
	});

	if (!clinic) {
		return daError(ERRORS.NOT_FOUND.toJSON());
	}

	return daSuccess<ClinicBase | null>(composeClinicBase(clinic));
}
