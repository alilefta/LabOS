import { daError, daSuccess } from "@/lib/data-access-errors";
import { ERRORS } from "@/lib/errors";
import { getServerSession } from "@/lib/get-session";
import { composeClinicBase } from "@/lib/mappers/composers";
import { tenantPrisma } from "@/lib/prisma";
import { ClinicBase } from "@/schema/base/clinic.base";

export async function getClinicById(clinicId: string) {
	const session = await getServerSession();

	if (!session) {
		return daError(ERRORS.UNAUTHORIZED.toJSON());
	}

	const labId = session.user.labId;

	if (!labId) {
		return daError(ERRORS.LAB_NOT_FOUND.toJSON());
	}

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
