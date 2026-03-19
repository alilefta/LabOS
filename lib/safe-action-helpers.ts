import { toast } from "sonner";

export const VALIDATION_ERROR_MESSAGE = "An error occured while validating your input.";
export const DATABASE_ERROR_MESSAGE = "An error occured with our database.";

import type { InferSafeActionFnResult, SafeActionFn } from "next-safe-action";
import { ZodObject } from "zod";

/**
 * A helper function to show toast messages on errors
 * @type pass the <typeof serverActionName>
 * @param error 
 *  { 
 * 		serverError?: InferSafeActionFnResult<T>["serverError"] | undefined;
    	validationErrors?: InferSafeActionFnResult<T>["validationErrors"];
    	thrownError?: Error | undefined;
	}
 */
export function handleSafeActionError<T extends SafeActionFn<string, ZodObject | undefined, [], unknown, unknown>>(error: {
	serverError?: InferSafeActionFnResult<T>["serverError"];
	validationErrors?: InferSafeActionFnResult<T>["validationErrors"];
	thrownError?: Error | undefined;
}) {
	if (error.validationErrors) {
		toast.error("An error occurred while processing your input.");
		console.log(error.validationErrors);
	}

	if (error.serverError) {
		toast.error(`An error occurred: ${error.serverError}`);
	}

	if (error.thrownError) {
		toast.error(`An error occured: ${error.thrownError.message}`);
	}
}
