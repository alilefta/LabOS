import { SuperUserModelSchema } from "@/prisma/generated/schemas";
import z from "zod";

export const SuperUserBaseSchema = SuperUserModelSchema;

export type SuperUserBase = z.infer<typeof SuperUserBaseSchema>;
