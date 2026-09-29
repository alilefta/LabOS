"use server";

import { normalizeDentist } from "@/lib/mappers";
import { actionClientWithLab } from "@/lib/safe-action";
import { executeDentistAvatarCreate } from "@/modules/labos-files/dentist-avatar-command";
import { CreateDentistInputSchema } from "@/schema/composed/dentist.details";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";

export const createDentistAction = actionClientWithLab
	.metadata({
		actionName: "Create-Dentist-Action",
		requiredLabRole: null,
	})
	.inputSchema(CreateDentistInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { clinicId, name, email, phoneNumber, speciality, licenseNumber, imageUploadGrantId, isOwner, isDefault, notes } = parsedInput;
		try {
			const dentist = await executeDentistAvatarCreate(ctx, {
				clinicId, name, email, phoneNumber, speciality, licenseNumber,
				imageUploadGrantId, isOwner, isDefault, notes,
			});

			revalidatePath(`/clinics/${clinicId}`);

			return { dentist: normalizeDentist(dentist) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Dentist-Action] Error", e.message);
			}
			throw e;
		}
	});
