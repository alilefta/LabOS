"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateCompleteClinicInputSchema, CreateQuickClinicInputSchema } from "@/schema/composed/clinic.details";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";

export const createCompleteClinicAction = actionClientWithLab
	.metadata({
		actionName: "Create-Complete-Clinic-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(CreateCompleteClinicInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			name,
			description,
			website,
			notes,
			status,
			type,
			city,
			zipcode,
			address1,
			address2,
			email,
			phoneNumber,
			billingEmail,
			billingPhoneNumber,
			taxNumber,
			discount,
			creditLimit,
			currentBalance,
			primaryDentist,
			additionalDentists,
		} = parsedInput;
		const { labId } = ctx;
		try {
			const prisma = await tenantPrisma(labId);

			// ── Duplicate check ───────────────────────────────────────────────────
			// Warn if a clinic with the same name already exists in this lab.
			// Not a hard block (names aren't unique in schema) but worth surfacing.
			const duplicate = await prisma.clinic.findFirst({
				where: { name: { equals: name, mode: "insensitive" }, labId },
				select: { id: true },
			});

			if (duplicate) {
				throw ERRORS.CLIENT_ALREADY_EXISTS;
			}

			// ── Build dentists list ───────────────────────────────────────────────
			// Primary dentist is always isOwner + isDefault for SOLO type.
			// For other types, respect whatever the user set.
			const isSolo = type === "SOLO";

			const otherDentists = additionalDentists ? additionalDentists : [];

			const allDentists = [
				{
					name: primaryDentist.name,
					email: primaryDentist.email ?? null,
					phoneNumber: primaryDentist.phoneNumber ?? null,
					isOwner: isSolo ? true : (primaryDentist.isOwner ?? true),
					isDefault: isSolo ? true : (primaryDentist.isDefault ?? true),
					notes: primaryDentist.notes ?? null,
					labId,
				},

				...otherDentists.map((d) => ({
					name: d.name,
					email: d.email ?? null,
					phoneNumber: d.phoneNumber ?? null,
					isOwner: d.isOwner ?? false,
					isDefault: d.isDefault ?? false,
					notes: d.notes ?? null,
					labId,
				})),
			];

			// ── Constraint: only one isDefault dentist ────────────────────────────
			const defaultCount = allDentists.filter((d) => d.isDefault).length;
			if (defaultCount > 1) {
				throw ERRORS.INVALID_INPUT;
			}

			// ── Create ────────────────────────────────────────────────────────────
			const clinic = await prisma.clinic.create({
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
					currentBalance,
					dentists: {
						createMany: { data: allDentists },
					},
					labId,
				},
				select: {
					name: true,
					id: true,
				},
			});

			revalidatePath("/clinics");

			return {
				clinic: {
					id: clinic.id,
					name: clinic.name,
				},
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Complete-Clinic-Action] Error", e.message);
			}
			throw e;
		}
	});

// ===================== Create Quick Clinics for register-clinic-sheet ==========================
export const createQuickClinicAction = actionClientWithLab
	.metadata({
		actionName: "Create-Quick-Clinic-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateQuickClinicInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, address1, address2, city, description, email, phoneNumber, zipcode, currentBalance, primaryDentist, status, type } = parsedInput;
		const { labId } = ctx;

		try {
			const clinic = await (
				await tenantPrisma(labId)
			).clinic.create({
				data: {
					name,
					address1,
					city,
					email,
					phoneNumber,
					zipcode: zipcode ?? null,
					address2: address2 ?? null,
					description: description ?? null,
					labId: labId,
					currentBalance: currentBalance ?? 0,
					status: status ?? "ACTIVE",
					type: type ?? "CLINIC",
					dentists: {
						create: {
							name: primaryDentist.name,
							email: primaryDentist.email ?? null,
							phoneNumber: primaryDentist.phoneNumber ?? null,
							isOwner: primaryDentist.isOwner ?? true,
							isDefault: primaryDentist.isDefault ?? true,
							notes: primaryDentist.email ?? null,
							labId: labId,
						},
					},
				},
				include: {
					dentists: true,
					lab: true,
				},
			});

			return {
				clinic: {
					...clinic,
					currentBalance: Number(clinic.currentBalance),
					discount: clinic.discount === null ? null : Number(clinic.discount),
					creditLimit: clinic.creditLimit === null ? null : Number(clinic.creditLimit),
				},
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Quick-Clinic-Action] Error", e.message);
			}
			throw e;
		}
	});
