import * as z from "zod";
import { LabRoleSchema } from "./enums.base";

export const LabUserBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	authUserId: z.string(),
	labStaffId: z.string().nullable(),
	role: LabRoleSchema,
	isActive: z.boolean(),
	lastTimeActive: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LabUserBase = z.infer<typeof LabUserBaseSchema>;
