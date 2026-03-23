import * as z from "zod";

export const JawTypeSchema = z.enum(["UPPER", "LOWER", "OTHER"]);

export type JawType = z.infer<typeof JawTypeSchema>;
