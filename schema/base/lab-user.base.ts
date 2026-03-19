import { LabUserModelSchema } from "@/prisma/generated/schemas";
import z from "zod";

export const LabUserBaseSchema = LabUserModelSchema.omit({
	lab: true,
	authUser: true,
});

export type LabUserBase = z.infer<typeof LabUserBaseSchema>;

export const CreateLabUserInputSchema = LabUserBaseSchema.pick({
	name: true,
	city: true,
	zipcode: true,
	address1: true,
	address2: true,
	avatarUrl: true,
	email: true,
	phoneNumber: true,
	authUserId: true,
	role: true,
	labId: true,
});

export type CreateLabUserInput = z.infer<typeof CreateLabUserInputSchema>;
