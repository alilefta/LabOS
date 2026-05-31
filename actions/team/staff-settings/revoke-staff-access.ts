// actions/team/revoke-staff-access.ts
"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { RevokeStaffSystemAccessInputSchema } from "@/schema/composed/team/staff-settings.schema";

export const revokeStaffSystemAccessAction = actionClientWithLab
	.metadata({
		actionName: "Revoke-Staff-System-Access",
		requiredLabRole: "MANAGER", // Middleware scopes to OWNER/MANAGER minimum [1]
	})
	.inputSchema(RevokeStaffSystemAccessInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId } = parsedInput;
		const { labId, labUser, user } = ctx; // Destructured safely from middleware

		try {
			const prisma = await tenantPrisma(labId);

			// ── 2. DEFENSE IN DEPTH: ROLE VERIFICATION ──────────────────────────
			if (labUser.role !== "OWNER" && labUser.role !== "MANAGER") {
				throw new Error("Unauthorized. Only Lab Owners or Managers can revoke software credentials.");
			}

			// ── 3. ATOMIC DELETION TRANSACTION ────────────────────────────────
			await prisma.$transaction(async (tx) => {
				// A. Locate the linked LabUser record [1]
				const targetUser = await tx.labUser.findUnique({
					where: { labStaffId: staffId, labId },
					select: { id: true, authUserId: true, role: true },
				});

				if (!targetUser) {
					throw new Error("No system access record found for this employee.");
				}

				// B. SECURITY: Prevent Self-Lockout [2]
				// An Owner must never be allowed to delete their own credential seat
				if (targetUser.authUserId === user.id) {
					throw new Error("Self-lockout prevented. You cannot revoke your own system credentials. Have another administrator modify your profile.");
				}

				// C. SECURITY: Protect the Owner Seat
				// A Manager must never be allowed to revoke the Owner's system access
				if (targetUser.role === "OWNER" && labUser.role !== "OWNER") {
					throw new Error("Permission Denied. Only a Lab Owner can revoke another Owner's credentials.");
				}

				// D. THE ATOMIC CASCADE DELETE [3]
				// By deleting the AuthUser row, the Postgres foreign-key cascade:
				// 1. Deletes the linked LabUser [3]
				// 2. Deletes all active Sessions (instant force-logout) [3]
				// 3. Leaves LabStaff 100% intact [4]
				await tx.authUser.delete({
					where: { id: targetUser.authUserId },
				});
			});

			return { success: true };
		} catch (error: any) {
			console.error("[Revoke-Staff-System-Access-Action] Error:", error.message);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
