// actions/team/staff-settings/update-staff-identity.ts
"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { UpdateStaffIdentityInputSchema } from "@/schema/composed/team/staff-settings.schema";
import { normalizeLabStaff } from "@/lib/mappers"; // Assuming this is your mapper utility

export const updateStaffIdentityAction = actionClientWithLab
	.metadata({
		actionName: "Update-Staff-Identity-Action",
		// Security: Enforced at the middleware level. No manual database queries needed [1].
		requiredLabRole: "MANAGER",
	})
	.inputSchema(UpdateStaffIdentityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, firstName, lastName, phoneNumber, jobTitle, specialization, roleCategory, isActive } = parsedInput;
		const { labId } = ctx; // Scoped securely by safe-action context

		try {
			const prisma = await tenantPrisma(labId);

			// ── ATOMIC TRANSACTION (DEACTIVATION & SESSION TERMINATION) ──────
			const updatedStaff = await prisma.$transaction(
				async (tx) => {
					// A. Business Rule: Block deactivation if they have active workload
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
							throw new Error(`Cannot deactivate. This employee still has ${activeCasesCount} active cases assigned on their bench. Reassign their workload first.`);
						}
					}

					// B. Perform the actual LabStaff update
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

					// C. SECURITY HANDSHAKE: Session Purging & Login Lockout [2]
					if (!isActive) {
						// 1. Locate their connected AuthUser ID via the LabUser relation [2]
						const linkedUser = await tx.labUser.findUnique({
							where: { labStaffId: staffId, labId },
							select: { authUserId: true },
						});

						if (linkedUser) {
							// 2. Deactivate their software login seat [2]
							await tx.labUser.update({
								where: { labStaffId: staffId },
								data: { isActive: false },
							});

							// 3. FORCE LOGOUT: Instantly delete all active sessions from the database [2]
							// This immediately revokes their JWT/Session tokens across all active devices.
							await tx.session.deleteMany({
								where: { userId: linkedUser.authUserId },
							});
						}
					}

					return staff;
				},
				{
					maxWait: 5000,
					timeout: 10000, // 10s timeout to handle session deletion joins safely
				},
			);

			return {
				success: true,
				staff: normalizeLabStaff(updatedStaff), // Returns the sanitized, pristine object [3]
			};
		} catch (error: any) {
			console.error("[Update-Staff-Identity-Action] Error:", error.message);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
