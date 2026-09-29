"use server";

import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { actionClientWithLab } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { APIError } from "better-auth";
import { normalizeDentist } from "@/lib/mappers";
import { UpdateDentistInputSchema } from "@/schema/composed/dentist.details";
import { executeDentistAvatarUpdate } from "@/modules/labos-files/dentist-avatar-command";

export const updateDentistAction = actionClientWithLab
	.metadata({
		actionName: "Update-Dentist-Action",
		requiredLabRole: null,
	})
	.inputSchema(UpdateDentistInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { dentistId, clinicId, name, email, phoneNumber, speciality, licenseNumber, imageUploadGrantId, isOwner, isDefault, notes } = parsedInput;
		const updated = await executeDentistAvatarUpdate(ctx, {
			dentistId, clinicId, name, email, phoneNumber, speciality, licenseNumber,
			imageUploadGrantId, isOwner, isDefault, notes,
		});

		revalidatePath(`/clinics/${clinicId}`);

		return { dentist: normalizeDentist(updated) };
	});

export const toggleDentistActiveStatusAction = actionClientWithLab
	.metadata({
		actionName: "Toggle-Dentist-Active-Status-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(
		z.object({
			clinicId: z.uuid(),
			dentistId: z.uuid(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, dentistId } = parsedInput;

		try {
			const prisma = await tenantPrisma(labId);

			// ── Ownership verification ────────────────────────────────────────────────
			// Verify clinic exists and belongs to this lab
			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			// Verify dentist exists, belongs to this lab AND this clinic
			const dentist = await prisma.dentist.findUnique({
				where: { id: dentistId, labId, clinicId },
				select: { id: true, isActive: true, isDefault: true, isOwner: true },
			});
			if (!dentist) throw ERRORS.NOT_FOUND;

			// ── Business rules ────────────────────────────────────────────────────────
			// Block deactivating the default or owner dentist —
			// a clinic must always have one operable primary contact
			if (dentist.isActive && (dentist.isDefault || dentist.isOwner)) {
				throw ERRORS.OPERATION_NOT_ALLOWED;
			}

			const updated = await prisma.dentist.update({
				where: { id: dentistId, labId, clinicId },
				data: { isActive: !dentist.isActive },
				select: { id: true, isActive: true },
			});

			revalidatePath(`/clinics/${clinicId}`);

			return { dentistId: updated.id, isActive: updated.isActive };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Toggle-Dentist-Active-Status-Action] Error", e.message);
			}
			throw e;
		}
	});

export const setDentistAsDefaultAction = actionClientWithLab
	.metadata({
		actionName: "Set-Dentist-As-Default-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(
		z.object({
			clinicId: z.uuid(),
			dentistId: z.uuid(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, dentistId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			// ── Ownership verification ────────────────────────────────────────────────
			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			const dentist = await prisma.dentist.findUnique({
				where: { id: dentistId, labId, clinicId },
				select: { id: true, isActive: true, isDefault: true },
			});
			if (!dentist) throw ERRORS.NOT_FOUND;

			// ── Business rules ────────────────────────────────────────────────────────
			// Can't set an inactive dentist as default
			if (!dentist.isActive) throw ERRORS.OPERATION_NOT_ALLOWED;

			// Already default — no-op
			if (dentist.isDefault) return { dentistId, isDefault: true };

			// ── Transaction: unset current default, set new one ───────────────────────
			// Must be atomic — we never want zero or two default dentists
			await prisma.$transaction([
				prisma.dentist.updateMany({
					where: { clinicId, labId, isDefault: true },
					data: { isDefault: false },
				}),
				prisma.dentist.update({
					where: { id: dentistId, labId, clinicId },
					data: { isDefault: true },
				}),
			]);

			revalidatePath(`/clinics/${clinicId}`);

			return { dentistId, isDefault: true };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Set-Dentist-As-Default-Action] Error", e.message);
			}
			throw e;
		}
	});
