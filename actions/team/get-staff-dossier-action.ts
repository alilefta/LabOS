// actions/team/get-staff-dossier-action.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { getStaffDossierData } from "@/data/team/get-staff-dossier"; // Import our secure DAF
import { ERRORS } from "@/lib/errors";

const GetStaffDossierInputSchema = z.object({
	staffId: z.string().uuid("Invalid staff ID format."),
});

export const getStaffDataDossierAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Data-Dossier-Action",
		requiredLabRole: "STAFF", // Minimum requirement to view directories
	})
	.inputSchema(GetStaffDossierInputSchema)
	.action(async ({ parsedInput }) => {
		const { staffId } = parsedInput;

		// We execute the secure data-access function.
		// It will internally resolve the session and verify tenant isolation.
		const result = await getStaffDossierData(staffId);

		if (!result.success) {
			throw new Error(result.error?.message || "Failed to load staff dossier.");
		}

		return { staff: result.data };
	});
