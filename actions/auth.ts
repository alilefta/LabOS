'use server'

import { auth } from '@/lib/auth'
import { SIGN_IN_CALLBACK_URL, SIGN_UP_CALLBACK_URL } from '@/lib/urls'
import { actionClient } from '@/lib/safe-action'
import {
	SignInUserInputSchema,
	SignUpUserInputSchema,
} from '@/schema/base/auth.base'
import { APIError, BetterAuthError } from 'better-auth'
import { isAPIError } from 'better-auth/api'
import { ActionError, ERROR_CODES, ERRORS } from '@/lib/errors'

export const signInAction = actionClient
	.metadata({
		actionName: 'Sign-In-Action',
	})
	.inputSchema(SignInUserInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { email, password, rememberMe } = parsedInput
		try {
			const result = await auth.api.signInEmail({
				body: {
					email,
					password,
					rememberMe: rememberMe ?? false,
					callbackURL: SIGN_IN_CALLBACK_URL,
				},
			})

			return { result }
		} catch (e) {
			// if (isAPIError(e)) {
			// 	console.log('API ERROR+++++1', e)
			// }

			if (isAPIError(e)) {
				console.error('[Sign-In-Action] Error', e.message)
				throw new ActionError(e.message, ERROR_CODES.INVALID_INPUT, 500)
			}
			if (
				e instanceof APIError ||
				e instanceof Error ||
				e instanceof BetterAuthError
			) {
				console.error('[Sign-In-Action] Error', e.message)
				throw ERRORS.INTERNAL_SERVER_ERROR
			}
		}
	})

export const signUpAction = actionClient
	.metadata({
		actionName: 'Sign-Up-Action',
	})
	.inputSchema(SignUpUserInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { email, password, rememberMe, name } = parsedInput

		try {
			const result = await auth.api.signUpEmail({
				body: {
					name,
					email,
					password,
					rememberMe: rememberMe ?? false,
					callbackURL: SIGN_UP_CALLBACK_URL,
				},
			})

			return { result }
		} catch (e) {
			if (isAPIError(e)) {
				console.error('[Sign-Up-Action] Error', e.message)
				throw new ActionError(e.message, ERROR_CODES.INVALID_INPUT, 500)
			}
			if (
				e instanceof APIError ||
				e instanceof Error ||
				e instanceof BetterAuthError
			) {
				console.error('[Sign-Up-Action] Error', e.message)
				throw ERRORS.INTERNAL_SERVER_ERROR
			}
		}
	})
