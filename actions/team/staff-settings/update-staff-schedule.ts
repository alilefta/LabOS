// actions/team/staff-settings/update-staff-schedule.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";

// Strict API-level validation mirroring your Postgres Weekday enum [3]
const WeekdaySchema = z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]);

const UpdateStaffScheduleInputSchema = z.object({
	staffId: z.string().uuid("Invalid staff ID format."),
	workingDays: z.array(WeekdaySchema).min(1, "At least one working day is required."),
});

export const updateStaffScheduleAction = actionClientWithLab
	.metadata({
		actionName: "Update-Staff-Schedule-Action",
		// Security: Only managers and owners can alter employee operational schedules [1]
		requiredLabRole: "MANAGER",
	})
	.inputSchema(UpdateStaffScheduleInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, workingDays } = parsedInput;
		const { labId } = ctx; // Resolved securely by safe-action middleware [1]

		try {
			const prisma = await tenantPrisma(labId);

			// ── 1. TENANT ISOLATION CHECK ────────────────────────────────────
			// Verify this staff member exists and belongs to this lab tenant [2]
			const staffExists = await prisma.labStaff.findUnique({
				where: { id: staffId, labId },
				select: { id: true },
			});

			if (!staffExists) {
				throw new Error("Employee not found or unauthorized access.");
			}

			// ── 2. DATABASE MUTATION ─────────────────────────────────────────
			const updatedStaff = await prisma.labStaff.update({
				where: { id: staffId },
				data: {
					workingDays,
				},
				select: {
					id: true,
					workingDays: true,
				},
			});

			return {
				success: true,
				workingDays: updatedStaff.workingDays,
			};
		} catch (error: any) {
			console.error("[Update-Staff-Schedule-Action] Error:", error.message);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
