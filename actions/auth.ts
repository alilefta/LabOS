"use server";

import { auth } from "@/lib/auth";
import { SIGN_IN_CALLBACK_URL, SIGN_UP_CALLBACK_URL } from "@/lib/urls";
import { actionClient } from "@/lib/safe-action";
import { SignInUserInputSchema, SignUpUserInputSchema } from "@/schema/base/auth.base";
import { APIError } from "better-auth";

export const signInAction = actionClient
	.metadata({
		actionName: "Sign-In-Action",
	})
	.inputSchema(SignInUserInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { email, password, rememberMe } = parsedInput;
		try {
			const result = await auth.api.signInEmail({
				body: {
					email,
					password,
					rememberMe,
					callbackURL: SIGN_IN_CALLBACK_URL,
				},
			});

			return { result };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Sign-Up-Action] Error", e.message);
			}
			throw e;
		}
	});

export const signUpAction = actionClient
	.metadata({
		actionName: "Sign-Up-Action",
	})
	.inputSchema(SignUpUserInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { email, password, rememberMe, name } = parsedInput;

		try {
			const result = await auth.api.signUpEmail({
				body: {
					name,
					email,
					password,
					rememberMe,
					callbackURL: SIGN_UP_CALLBACK_URL,
				},
			});

			return { result };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Sign-Up-Action] Error", e.message);
			}
			throw e;
		}
	});
