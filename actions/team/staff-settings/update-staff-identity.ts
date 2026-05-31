// actions/team/update-staff-identity.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { StaffRoleCategorySchema } from "@/schema/base/enums.base";
import { UpdateStaffIdentityInputSchema } from "@/schema/composed/team/staff-settings.schema";

export const updateStaffIdentityAction = actionClientWithLab
	.metadata({
		actionName: "Update-Staff-Identity-Action",
		// Standard safe-action middleware check
		requiredLabRole: "MANAGER",
	})
	.inputSchema(UpdateStaffIdentityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, firstName, lastName, phoneNumber, jobTitle, specialization, roleCategory, isActive } = parsedInput;
		const { labId, user } = ctx; // Scoped by safe-action context

		try {
			const prisma = await tenantPrisma(labId);

			// ── 2. SECURITY GUARD: ROLE CHECK ──────────────────────────────────
			// Even if a user bypassed the client-side middleware, we do a
			// database-level verification to ensure they are an OWNER or MANAGER.
			const sessionUser = await prisma.labUser.findUnique({
				where: { authUserId: user.id },
				select: { role: true },
			});

			if (!sessionUser || (sessionUser.role !== "OWNER" && sessionUser.role !== "MANAGER")) {
				throw new Error("Unauthorized. Only Lab Owners or Managers can alter employee profiles.");
			}

			// ── 3. ATOMIC TRANSACTION (DEACTIVATION LOGIC) ────────────────────
			const updatedStaff = await prisma.$transaction(async (tx) => {
				// A. Business Rule: Block deactivation if they have active cases
				if (!isActive) {
					const activeCasesCount = await tx.caseStaffAssignment.count({
						where: {
							staffId,
							dentalCase: {
								status: { in: ["ASSIGNED", "PROCESSING"] },
							},
						},
					});

					if (activeCasesCount > 0) {
						throw new Error(`Cannot deactivate. This employee still has ${activeCasesCount} active cases assigned to them. Reassign their workload first.`);
					}
				}

				// B. Perform the actual update
				const staff = await tx.labStaff.update({
					where: { id: staffId },
					data: {
						firstName,
						lastName,
						phoneNumber,
						jobTitle: jobTitle || null,
						specialization: specialization || null,
						roleCategory,
						isActive,
					},
				});

				// C. Safety Handshake: If we deactivated the staff,
				// also deactivate their corresponding login seat (LabUser) if one exists!
				if (!isActive) {
					await tx.labUser.updateMany({
						where: { labStaffId: staffId, labId },
						data: { isActive: false },
					});
				}

				return staff;
			});

			return { success: true, staff: updatedStaff };
		} catch (error: any) {
			console.error("[Update-Staff-Identity-Action] Error:", error.message);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
