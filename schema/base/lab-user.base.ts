import * as z from "zod";
import { LabRoleSchema } from "./enums.base";

export const LabUserBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	city: z.string(),
	zipcode: z.string(),
	address1: z.string(),
	address2: z.string().nullable(),
	avatarUrl: z.string(),
	secondaryEmail: z.string().nullable(),
	phoneNumber: z.string(),
	role: LabRoleSchema,
	authUserId: z.string(),
	labId: z.string(),
	isActive: z.boolean(),
	lastTimeActive: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LabUserBase = z.infer<typeof LabUserBaseSchema>;
