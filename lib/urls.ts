export const SIGN_IN_CALLBACK_URL = '/dashboard'
export const SIGN_UP_CALLBACK_URL = '/onboarding'

/** Prevents open redirects by accepting only same-origin relative paths. */
export function safeRelativeCallbackUrl(value: unknown): string | null {
	return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
		? value
		: null
}
