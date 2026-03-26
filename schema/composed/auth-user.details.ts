import z from "zod";
import { AuthUserBaseSchema } from "../base/auth.base";

// I have to create the schemas below
export const AuthUserDetailsSchema = AuthUserBaseSchema.extend({
	// sessions: z.array(z.unknown()),
	// accounts: z.array(z.unknown()),
	// labUser: z.unknown().nullable(),
	// superUser: z.unknown().nullable(),
});

export type AuthUserDetails = z.infer<typeof AuthUserDetailsSchema>;
