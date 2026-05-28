import z from "zod";
import { LabRoleSchema } from "./enums.base";
export const LabInvitationBaseSchema = z.object({
	id: z.string(),
	token: z.string(),
	email: z.string(),
	labId: z.string(),
	labStaffId: z.string().nullable(),
	roleToGrant: LabRoleSchema,
	expiresAt: z.date(),
	createdAt: z.date(),
});

export type LabInvitationBase = z.infer<typeof LabInvitationBaseSchema>;
