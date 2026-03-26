import * as z from "zod";

export const LabRoleSchema = z.enum(["MANAGER", "ADMIN", "STAFF"]);

export type LabRole = z.infer<typeof LabRoleSchema>;
