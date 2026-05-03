"use server";

import { ERRORS } from "@/lib/errors";
import { normalizeClinic } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { UpdateClinicInputSchema } from "@/schema/composed/clinic.details";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";

export const updateClinicAction = actionClientWithLab
	.metadata({
		actionName: "Update-Clinic-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(UpdateClinicInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { clinicId, name, description, website, notes, status, type, city, zipcode, address1, address2, email, phoneNumber, billingEmail, billingPhoneNumber, taxNumber, discount, creditLimit } =
			parsedInput;
		const { labId } = ctx;
		try {
			const prisma = await tenantPrisma(labId);

			// ── Ownership + existence ─────────────────────────────────────────────
			const existing = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: {
					id: true,
					type: true,
					dentists: {
						select: {
							id: true,
							isOwner: true,
							isDefault: true,
							_count: { select: { cases: true } },
						},
					},
				},
			});

			if (!existing) throw ERRORS.CLIENT_NOT_FOUND;

			// ── SOLO type change guard ────────────────────────────────────────────
			const isDowngradingToSolo = existing.type !== "SOLO" && type === "SOLO";

			if (isDowngradingToSolo) {
				// Non-primary = not isOwner AND not isDefault
				const blockedDentists = existing.dentists.filter((d) => !d.isOwner && !d.isDefault && d._count.cases > 0);

				if (blockedDentists.length > 0) {
					throw ERRORS.CLINIC_DOWNGRADE_BLOCKED;
				}
			}

			// ── Duplicate name check (excluding self) ─────────────────────────────
			const duplicate = await prisma.clinic.findFirst({
				where: {
					name: { equals: name, mode: "insensitive" },
					labId,
					NOT: { id: clinicId },
				},
				select: { id: true },
			});

			if (duplicate) throw ERRORS.CLIENT_ALREADY_EXISTS;

			// ── Update ────────────────────────────────────────────────────────────
			const updated = await prisma.clinic.update({
				where: { id: clinicId, labId },
				data: {
					name,
					description: description ?? null,
					website: website ?? null,
					notes: notes ?? null,
					status,
					type,
					city,
					zipcode: zipcode ?? null,
					address1,
					address2: address2 ?? null,
					email,
					phoneNumber,
					billingEmail: billingEmail ?? null,
					billingPhoneNumber: billingPhoneNumber ?? null,
					taxNumber: taxNumber ?? null,
					discount: discount ?? null,
					creditLimit: creditLimit ?? null,
				},
			});

			revalidatePath(`/clinics/${clinicId}`);
			revalidatePath("/clinics");

			return { clinic: normalizeClinic(updated) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Quick-Clinic-Action] Error", e.message);
			}
			throw e;
		}
	});
