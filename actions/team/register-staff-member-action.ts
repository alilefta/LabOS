// actions/team/register-staff.ts
"use server";

import { addDays, startOfDay } from "date-fns";
import crypto from "crypto"; // Native Node.js cryptographic module
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ERRORS } from "@/lib/errors";
import { APIError } from "better-auth";
import { CreateLabStaffInputSchema } from "@/schema/composed/team/staff.schema";
import { normalizeLabStaff } from "@/lib/mappers";

export const createLabStaffAction = actionClientWithLab
	.metadata({
		actionName: "Register-New-Lab-Staff-Action",
		// Security: Only Admins or Owners can register staff members and issue licenses [1]
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateLabStaffInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			firstName,
			lastName,
			phoneNumber,
			roleCategory,
			specialization,
			jobTitle,
			isActive,
			avatarUrl,
			commissionType,
			commissionValue,
			address1,
			city,
			address2,
			zipcode,
			// New Access parameters [1]
			grantAccess,
			email,
			systemRole,
		} = parsedInput;
		const { labId } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			// ─────────────────────────────────────────────────────────────────
			// THE ATOMIC ONBOARDING TRANSACTION [1]
			// We guarantee the Human and the Invitation are created together.
			// ─────────────────────────────────────────────────────────────────
			const result = await prisma.$transaction(async (tx) => {
				// 1. Create the physical LabStaff (The Human) [1]
				const staff = await tx.labStaff.create({
					data: {
						firstName,
						lastName,
						phoneNumber,
						address1: address1 || "N/A",
						address2: address2 || null,
						city: city || "N/A",
						zipcode: zipcode || null,
						avatarUrl: avatarUrl || null,
						roleCategory,
						specialization: specialization || null,
						jobTitle: jobTitle || null,
						isActive,
						commissionType,
						commissionValue: commissionValue !== undefined ? Number(commissionValue) : null, // Coerce decimal [2]
						labId,
					},
				});

				let invitation = null;

				// 2. If Software Access is granted, generate the secure Invitation [1]
				if (grantAccess && email) {
					const today = startOfDay(new Date());
					const secureToken = crypto.randomUUID(); // High-entropy unique token [1]
					const expiresAt = addDays(today, 7); // Invites expire in 7 days for security [1]

					// Check if email is already invited or in use to prevent duplicate seats
					const existingInvite = await tx.labInvitation.findFirst({
						where: { email, labId },
					});

					if (existingInvite) {
						throw new Error("This email has already been invited to this lab.");
					}

					invitation = await tx.labInvitation.create({
						data: {
							labId,
							labStaffId: staff.id, // Bind the invitation directly to the human
							email,
							token: secureToken,
							roleToGrant: systemRole, // e.g. "STAFF" or "ADMIN"
							expiresAt,
						},
					});
				}

				return { staff, invitation };
			});

			return {
				// Normalize and return to the client
				staff: {
					...normalizeLabStaff(result.staff),
					labInvitation: result.invitation,
				},
				invitation: result.invitation
					? {
							token: result.invitation.token,
							email: result.invitation.email,
						}
					: null,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Lab-Staff-Action] Error:", e.message);
			}
			throw e;
		}
	});
