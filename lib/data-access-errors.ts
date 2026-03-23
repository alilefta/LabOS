// /lib/data-access.ts

import { ActionErrorPayload, ERROR_CODES, ErrorCode, ERRORS, StatusCode } from "@/lib/errors";

// ----------------------------------------
// Result Type
// ----------------------------------------

export type DAResult<T> = { success: true; data: T } | { success: false; error: ActionErrorPayload };

// ----------------------------------------
// Helpers
// ----------------------------------------

export function daSuccess<T>(data: T): DAResult<T> {
	return { success: true, data };
}

export function daError<T>(error: ActionErrorPayload): DAResult<T> {
	return { success: false, error };
}

export function toDAError<T>(e: unknown): DAResult<T> {
	if (e instanceof Error) {
		console.error("[DataAccess]", e.message);
	}
	return daError<T>(ERRORS.INTERNAL_SERVER_ERROR.toJSON());
}
