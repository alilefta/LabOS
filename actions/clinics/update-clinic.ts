"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ClinicTypeSchema } from "@/schema/base/enums.base";
import { APIError } from "better-auth";

export const updateClinicTypeAction = actionClientWithLab
	.metadata({
		actionName: "Update-Clinic-Type-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(
		z.object({
			clinicId: z.string().uuid(),
			type: ClinicTypeSchema,
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, type } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: {
					id: true,
					type: true,
					dentists: {
						where: { isActive: true },
						select: {
							id: true,
							isOwner: true,
							isDefault: true,
							_count: { select: { cases: true } },
						},
					},
				},
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			// No-op
			if (clinic.type === type) return { clinicId, type };

			// ── SOLO downgrade guard ──────────────────────────────────────────────────
			if (type === "SOLO") {
				const nonPrimary = clinic.dentists.filter((d) => !d.isOwner && !d.isDefault);
				const blocked = nonPrimary.filter((d) => d._count.cases > 0);
				if (blocked.length > 0) throw ERRORS.CLINIC_DOWNGRADE_BLOCKED;
			}

			const updated = await prisma.clinic.update({
				where: { id: clinicId, labId },
				data: { type },
				select: { id: true, type: true },
			});

			revalidatePath(`/clinics/${clinicId}`);

			return { clinicId: updated.id, type: updated.type };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Update-Clinic-Type-Action] Error", e.message);
			}
			throw e;
		}
	});
