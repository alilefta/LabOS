// actions/team/update-staff-compensation.ts
"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { Decimal } from "@prisma/client/runtime/client";
import { UpdateStaffCompensationInputSchema } from "@/schema/composed/team/staff-settings.schema";

export const updateStaffCompensationAction = actionClientWithLab
	.metadata({
		actionName: "Update-Staff-Compensation-Action",
		requiredLabRole: "OWNER", // 🔥 SECURITY: Restricted to OWNER at the middleware level [1]
	})
	.inputSchema(UpdateStaffCompensationInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, commissionType, commissionValue } = parsedInput;
		const { labId, user } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			// ── 2. DEFENSE IN DEPTH: STRICT OWNER GUARD ──────────────────────────
			// We do a secondary, explicit check on the database level.
			// Only Lab OWNERS are allowed to view or mutate financial payroll configurations [1].
			const sessionUser = await prisma.labUser.findUnique({
				where: { authUserId: user.id, labId },
				select: { role: true },
			});

			if (!sessionUser || sessionUser.role !== "OWNER") {
				throw new Error("Unauthorized. Only the Lab Owner has permissions to read or write payroll structures.");
			}

			// ── 3. DATABASE MUTATION ──────────────────────────────────────────
			const updatedStaff = await prisma.labStaff.update({
				where: { id: staffId, labId },
				data: {
					commissionType,
					// Safely convert the JS float into a Prisma Decimal (or null)
					commissionValue: commissionValue !== undefined && commissionValue !== null ? new Decimal(commissionValue) : null,
				},
			});

			return {
				success: true,
				staff: {
					id: updatedStaff.id,
					commissionType: updatedStaff.commissionType,
					// Safely serialize the Decimal back to a number before shipping to client
					commissionValue: updatedStaff.commissionValue ? Number(updatedStaff.commissionValue) : null,
				},
			};
		} catch (error: any) {
			console.error("[Update-Staff-Compensation-Action] Error:", error.message);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
