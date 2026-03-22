import { toast } from "sonner";
import { ActionError, ERROR_CODES, ErrorCode, StatusCode, type ActionErrorPayload } from "@/lib/errors";
import { DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";

export const VALIDATION_ERROR_MESSAGE = "An error occurred while validating your input.";
export const DATABASE_ERROR_MESSAGE = "An error occurred with our database.";

export interface SafeActionError {
	serverError?: ActionErrorPayload;
	validationErrors?: unknown;
	thrownError?: Error;
}

/**
 * Generic fallback error handler for safe actions.
 * Call this AFTER you've handled your specific error codes.
 *
 * @example
 * onError: ({ error }) => {
 *   // 1. Handle specific cases first
 *   if (error.serverError?.code === "LAB_ALREADY_EXISTS") {
 *     router.push("/dashboard");
 *     return; // ← stop here, don't fall through
 *   }
 *
 *   // 2. Fall through to generic handler
 *   handleSafeActionError(error);
 * }
 */
export function handleSafeActionError(error: SafeActionError): void {
	if (error.validationErrors) {
		toast.error(VALIDATION_ERROR_MESSAGE);
		if (process.env.NODE_ENV === "development") {
			console.warn("[SafeAction] Validation errors:", error.validationErrors);
		}
		return;
	}

	if (error.serverError) {
		const { message, code, statusCode } = error.serverError;
		toast.error(message);
		if (process.env.NODE_ENV === "development") {
			console.error("[SafeAction] Server error:", { code, statusCode, message });
		}
		return;
	}

	if (error.thrownError) {
		toast.error("An unexpected error occurred, please try again.");
		if (process.env.NODE_ENV === "development") {
			console.error("[SafeAction] Thrown error:", error.thrownError);
		}
		return;
	}
}

// ----------------------------------------
// Helpers
// ----------------------------------------

export function sanitizeInput(input: unknown): unknown {
	if (!input || typeof input !== "object") return input;

	const sensitive = ["password", "token", "secret", "cardNumber", "cvv"];

	return Object.fromEntries(Object.entries(input as Record<string, unknown>).map(([key, value]) => [key, sensitive.some((s) => key.toLowerCase().includes(s)) ? "***" : value]));
}

export function toPayload(error: ActionError): ActionErrorPayload {
	return {
		message: error.message,
		code: error.code as ErrorCode,
		statusCode: error.statusCode as StatusCode,
	};
}

export function fallbackPayload(message: string = DEFAULT_SERVER_ERROR_MESSAGE): ActionErrorPayload {
	return {
		message,
		code: ERROR_CODES.INTERNAL_SERVER_ERROR,
		statusCode: 500,
	};
}
