import { z } from "zod";

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
