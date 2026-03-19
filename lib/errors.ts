// /lib/errors.ts
export class ActionError extends Error {
	constructor(
		message: string,
		public code?: string,
		public statusCode?: number,
	) {
		super(message);
		this.name = "ActionError";
	}
}

export const STATUS_CODES = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
} as const;

// Common errors
export const ERRORS = {
	BAD_REQUEST: new ActionError("Bad request", "BAD_REQUEST", STATUS_CODES.BAD_REQUEST),
	UNAUTHORIZED: new ActionError("You must be logged in", "UNAUTHORIZED", STATUS_CODES.UNAUTHORIZED),
	FORBIDDEN: new ActionError("You don't have permission", "FORBIDDEN", STATUS_CODES.FORBIDDEN),
	NOT_FOUND: new ActionError("Resource not found", "NOT_FOUND", STATUS_CODES.NOT_FOUND),
	NOT_MEMBER: new ActionError("You are not a member of this server", "NOT_MEMBER", STATUS_CODES.FORBIDDEN),
	CHANNEL_NOT_FOUND: new ActionError("Channel not found", "CHANNEL_NOT_FOUND", STATUS_CODES.NOT_FOUND),
	INVALID_INPUT: new ActionError("Invalid input", "INVALID_INPUT", STATUS_CODES.BAD_REQUEST),
	CHANNEL_NAME_MUST_NOT_BE_GENERAL: new ActionError("Channel name cannot be 'general'", "INVALID_NAME", STATUS_CODES.BAD_REQUEST),
	UNAUTHORIZE_ONLY_ADMINS_OR_MODERATORS: new ActionError("Unauthorized: Only Admins or Moderators can create channels", "UNAUTHORIZED", STATUS_CODES.UNAUTHORIZED),
	UNABLE_TO_REMOVE_DEFAULT_GENERAL_CHANNEL: new ActionError("Invalid Operation: Unable to remove the default server channel.", "INVALID_OPERATION", STATUS_CODES.BAD_REQUEST),

	// Additional app-specific errors
	CHANNEL_ALREADY_EXISTS: new ActionError("Channel already exists", "CHANNEL_ALREADY_EXISTS", STATUS_CODES.CONFLICT),
	SERVER_ALREADY_EXISTS: new ActionError("Server already exists", "SERVER_ALREADY_EXISTS", STATUS_CODES.CONFLICT),
	MEMBER_ALREADY_EXISTS: new ActionError("Member already exists in this server", "MEMBER_ALREADY_EXISTS", STATUS_CODES.CONFLICT),
	ROLE_NOT_FOUND: new ActionError("Role not found", "ROLE_NOT_FOUND", STATUS_CODES.NOT_FOUND),
	MISSING_PERMISSIONS: new ActionError("Missing permissions to perform this action", "MISSING_PERMISSIONS", STATUS_CODES.FORBIDDEN),
	INVALID_CHANNEL_TYPE: new ActionError("Invalid channel type", "INVALID_CHANNEL_TYPE", STATUS_CODES.BAD_REQUEST),
	MESSAGE_TOO_LONG: new ActionError("Message exceeds allowed length", "MESSAGE_TOO_LONG", STATUS_CODES.BAD_REQUEST),
	INVITE_EXPIRED: new ActionError("Invite has expired", "INVITE_EXPIRED", STATUS_CODES.BAD_REQUEST),
	TOO_MANY_MEMBERS: new ActionError("Server has reached its member limit", "TOO_MANY_MEMBERS", STATUS_CODES.TOO_MANY_REQUESTS),
	OPERATION_NOT_ALLOWED: new ActionError("Operation not allowed", "OPERATION_NOT_ALLOWED", STATUS_CODES.FORBIDDEN),
	INTERNAL_SERVER_ERROR: new ActionError("Internal server error", "INTERNAL_SERVER_ERROR", STATUS_CODES.INTERNAL_SERVER_ERROR),
} as const;
