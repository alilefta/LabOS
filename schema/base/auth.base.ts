import { z } from "zod";

export const AuthUserRoleSchema = z.enum(["SYSTEM_USER", "LAB_USER"]);

export type AuthUserRole = z.infer<typeof AuthUserRoleSchema>;

export const AuthUserBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
	role: AuthUserRoleSchema,
	// sessions: z.array(z.unknown()),
	// accounts: z.array(z.unknown()),
	// labUser: z.unknown().nullable(),
	// superUser: z.unknown().nullable(),
	labId: z.string().nullable(),
});

export type AuthUserBase = z.infer<typeof AuthUserBaseSchema>;

export const SignInUserInputSchema = z.object({
	email: z.string(),
	password: z.string(),
	rememberMe: z.boolean(),
});

export type SignInUserInput = z.infer<typeof SignInUserInputSchema>;

export const SignUpUserInputSchema = z.object({
	email: z.email(),
	password: z.string(),
	name: z.string(),
	rememberMe: z.boolean().default(false).optional(),
});

export type SignUpUserInput = z.infer<typeof SignUpUserInputSchema>;
