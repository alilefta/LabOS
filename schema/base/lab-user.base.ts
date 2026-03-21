// used on server only

import { LabUserModelSchema } from "@/prisma/generated/schemas";
import z from "zod";

export const LabUserBaseSchema = LabUserModelSchema.omit({
	lab: true,
	authUser: true,
});

export type LabUserBase = z.infer<typeof LabUserBaseSchema>;
