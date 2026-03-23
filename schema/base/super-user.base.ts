import { SuperUserModelSchema } from "@/prisma/generated/schemas";
import z from "zod";

export const SuperUserBaseSchema = SuperUserModelSchema.omit({
	authUser: true,
});

export type SuperUserBase = z.infer<typeof SuperUserBaseSchema>;
