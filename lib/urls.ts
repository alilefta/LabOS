export const SIGN_IN_CALLBACK_URL = "http://localhost:3000/dashboard";
export const SIGN_UP_CALLBACK_URL = "http://localhost:3000/onboarding";

/** Prevents open redirects by accepting only same-origin relative paths. */
export function safeRelativeCallbackUrl(value: unknown): string | null {
	return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
		? value
		: null
}
