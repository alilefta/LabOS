"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { ActionError, ERRORS } from "@/lib/errors";
import { TeamFiltersSchema } from "@/schema/composed/team/team-filters";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";
import { createStaffRosterLoader, StaffRosterAuthorizationError } from "@/modules/labos-staff/staff-roster.loader";
import { prismaStaffRosterRepository } from "@/data/team/staff-roster.repository";

const loadStaffRoster = createStaffRosterLoader(labosAuthorizationService, prismaStaffRosterRepository);

export const getStaffRosterAction = actionClientWithLab
	.metadata({ actionName: "Get-Staff-Roster-Action", requiredLabRole: "STAFF" })
	.inputSchema(
		z.object({
			searchQuery: z.string().optional(),
			filters: TeamFiltersSchema.default({
				roleCategories: [],
				accessStates: [],
				isActive: true,
				capacityBands: [],
				qualityBands: [],
				specializationSearch: null,
			}),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		try {
			return await loadStaffRoster({
				actor: createLabOSAuthorizationActor(ctx),
				labId: ctx.labId,
				searchQuery: parsedInput.searchQuery,
				filters: parsedInput.filters,
			});
		} catch (error) {
			if (error instanceof StaffRosterAuthorizationError) {
				throw new ActionError(
					ERRORS.MISSING_PERMISSIONS.message,
					ERRORS.MISSING_PERMISSIONS.code,
					ERRORS.MISSING_PERMISSIONS.statusCode,
				);
			}
			throw error;
		}
	});
