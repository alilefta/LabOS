"use server";

import { ERRORS } from "@/lib/errors";
import { normalizeDentist } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateDentistInputSchema } from "@/schema/composed/dentist.details";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";

export const createDentistAction = actionClientWithLab
	.metadata({
		actionName: "Create-Dentist-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateDentistInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, name, email, phoneNumber, speciality, licenseNumber, avatarUrl, isOwner, isDefault, notes } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			// ── Ownership verification ────────────────────────────────────────────────
			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true, type: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			// ── Business rules ────────────────────────────────────────────────────────
			// Block adding dentists to SOLO clinics
			if (clinic.type === "SOLO") throw ERRORS.OPERATION_NOT_ALLOWED;

			// ── Transaction ───────────────────────────────────────────────────────────
			// If isDefault or isOwner, unset all others first then create atomically
			const dentist = await prisma.$transaction(async (tx) => {
				if (isDefault) {
					await tx.dentist.updateMany({
						where: { clinicId, labId, isDefault: true },
						data: { isDefault: false },
					});
				}

				if (isOwner) {
					await tx.dentist.updateMany({
						where: { clinicId, labId, isOwner: true },
						data: { isOwner: false },
					});
				}

				return tx.dentist.create({
					data: {
						clinicId,
						labId,
						name,
						email: email || null,
						phoneNumber: phoneNumber || null,
						specialty: speciality || null,
						licenseNumber: licenseNumber || null,
						avatarUrl: avatarUrl || null,
						isOwner,
						isDefault,
						notes: notes || null,
						isActive: true,
					},
				});
			});

			revalidatePath(`/clinics/${clinicId}`);

			return { dentist: normalizeDentist(dentist) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Dentist-Action] Error", e.message);
			}
			throw e;
		}
	});
