// /lib/errors.ts

export class ActionError extends Error {
	readonly code: string;
	readonly statusCode: number;

	constructor(message: string, code: string, statusCode: number) {
		super(message);
		this.name = "ActionError";
		this.code = code;
		this.statusCode = statusCode;
	}

	toJSON(): ActionErrorPayload {
		return {
			message: this.message,
			code: this.code as ErrorCode,
			statusCode: this.statusCode as StatusCode,
		};
	}
}

// ----------------------------------------
// Types
// ----------------------------------------

export type StatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ActionErrorPayload {
	message: string;
	code: ErrorCode;
	statusCode: StatusCode;
}

// ----------------------------------------
// Status Codes
// ----------------------------------------

export const STATUS_CODES = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
} as const;

// ----------------------------------------
// Error Codes
// ----------------------------------------

export const ERROR_CODES = {
	// Generic
	BAD_REQUEST: "BAD_REQUEST",
	UNAUTHORIZED: "UNAUTHORIZED",
	UNAUTHORIZED_NO_SESSION: "UNAUTHORIZED_REQUIRE_LOGIN",
	FORBIDDEN: "FORBIDDEN",
	NOT_FOUND: "NOT_FOUND",
	CONFLICT: "CONFLICT",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
	INVALID_INPUT: "INVALID_INPUT",
	OPERATION_NOT_ALLOWED: "OPERATION_NOT_ALLOWED",
	MISSING_PERMISSIONS: "MISSING_PERMISSIONS",

	// Auth & Access
	NOT_MEMBER: "NOT_MEMBER",
	UNAUTHORIZED_ADMINS_OR_MODERATORS_ONLY: "UNAUTHORIZED_ADMINS_OR_MODERATORS_ONLY",

	// Lab
	LAB_NOT_FOUND: "LAB_NOT_FOUND",
	LAB_ALREADY_EXISTS: "LAB_ALREADY_EXISTS",
	LAB_SLUG_TAKEN: "LAB_SLUG_TAKEN",
	LAB_LIMIT_REACHED: "LAB_LIMIT_REACHED",

	// Lab Members
	MEMBER_ALREADY_EXISTS: "MEMBER_ALREADY_EXISTS",
	MEMBER_NOT_FOUND: "MEMBER_NOT_FOUND",
	TOO_MANY_MEMBERS: "TOO_MANY_MEMBERS",
	CANNOT_REMOVE_OWNER: "CANNOT_REMOVE_OWNER",

	// Roles & Permissions
	ROLE_NOT_FOUND: "ROLE_NOT_FOUND",
	ROLE_ALREADY_EXISTS: "ROLE_ALREADY_EXISTS",
	CANNOT_MODIFY_DEFAULT_ROLE: "CANNOT_MODIFY_DEFAULT_ROLE",

	// Invites
	INVITE_EXPIRED: "INVITE_EXPIRED",
	INVITE_NOT_FOUND: "INVITE_NOT_FOUND",
	INVITE_ALREADY_USED: "INVITE_ALREADY_USED",
	INVITE_LIMIT_REACHED: "INVITE_LIMIT_REACHED",

	// Cases (dental work orders)
	CASE_NOT_FOUND: "CASE_NOT_FOUND",
	CASE_ALREADY_COMPLETED: "CASE_ALREADY_COMPLETED",
	CASE_ALREADY_CANCELLED: "CASE_CANCELLED",
	CASE_CANNOT_BE_DELETED: "CASE_CANNOT_BE_DELETED",
	INVALID_CASE_STATUS_TRANSITION: "INVALID_CASE_STATUS_TRANSITION",

	// Clients (dentists/clinics)
	CLIENT_NOT_FOUND: "CLIENT_NOT_FOUND",
	CLIENT_ALREADY_EXISTS: "CLIENT_ALREADY_EXISTS",

	// Invoices & Billing
	INVOICE_NOT_FOUND: "INVOICE_NOT_FOUND",
	INVOICE_ALREADY_PAID: "INVOICE_ALREADY_PAID",
	INVOICE_CANNOT_BE_DELETED: "INVOICE_CANNOT_BE_DELETED",
	PAYMENT_FAILED: "PAYMENT_FAILED",
	SUBSCRIPTION_REQUIRED: "SUBSCRIPTION_REQUIRED",
	SUBSCRIPTION_LIMIT_REACHED: "SUBSCRIPTION_LIMIT_REACHED",

	// Clinics & Dentists
	CLINIC_INACTIVE: "CLINIC_IS_INACTIVE",

	// Files & Uploads
	FILE_NOT_FOUND: "FILE_NOT_FOUND",
	FILE_TOO_LARGE: "FILE_TOO_LARGE",
	FILE_TYPE_NOT_ALLOWED: "FILE_TYPE_NOT_ALLOWED",
	UPLOAD_FAILED: "UPLOAD_FAILED",

	// AI Features
	AI_UNAVAILABLE: "AI_UNAVAILABLE",
	AI_QUOTA_EXCEEDED: "AI_QUOTA_EXCEEDED",
	AI_INVALID_RESPONSE: "AI_INVALID_RESPONSE",

	// Notifications
	NOTIFICATION_NOT_FOUND: "NOTIFICATION_NOT_FOUND",

	// Database
	DATABASE_ERROR: "DATABASE_ERROR",
	DUPLICATE_ENTRY: "DUPLICATE_ENTRY",
	RECORD_IN_USE: "RECORD_IN_USE",
} as const;

// ----------------------------------------
// ERRORS map
// ----------------------------------------

export const ERRORS = {
	// Generic
	BAD_REQUEST: new ActionError("Bad request", ERROR_CODES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST),
	UNAUTHORIZED: new ActionError("You must be logged in", ERROR_CODES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED),
	FORBIDDEN: new ActionError("You don't have permission", ERROR_CODES.FORBIDDEN, STATUS_CODES.FORBIDDEN),
	NOT_FOUND: new ActionError("Resource not found", ERROR_CODES.NOT_FOUND, STATUS_CODES.NOT_FOUND),
	INVALID_INPUT: new ActionError("Invalid input provided", ERROR_CODES.INVALID_INPUT, STATUS_CODES.BAD_REQUEST),
	OPERATION_NOT_ALLOWED: new ActionError("Operation not allowed", ERROR_CODES.OPERATION_NOT_ALLOWED, STATUS_CODES.FORBIDDEN),
	MISSING_PERMISSIONS: new ActionError("Missing permissions to perform this action", ERROR_CODES.MISSING_PERMISSIONS, STATUS_CODES.FORBIDDEN),
	INTERNAL_SERVER_ERROR: new ActionError("Internal server error", ERROR_CODES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR),

	// Auth & Access
	NOT_MEMBER: new ActionError("You are not a member of this lab", ERROR_CODES.NOT_MEMBER, STATUS_CODES.FORBIDDEN),
	UNAUTHORIZED_ADMINS_OR_MODERATORS_ONLY: new ActionError("Only admins or moderators can perform this action", ERROR_CODES.UNAUTHORIZED_ADMINS_OR_MODERATORS_ONLY, STATUS_CODES.FORBIDDEN),

	// Lab
	LAB_NOT_FOUND: new ActionError("Lab not found", ERROR_CODES.LAB_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	LAB_ALREADY_EXISTS: new ActionError("A lab already exists for this account", ERROR_CODES.LAB_ALREADY_EXISTS, STATUS_CODES.CONFLICT),
	LAB_SLUG_TAKEN: new ActionError("This lab URL is already taken", ERROR_CODES.LAB_SLUG_TAKEN, STATUS_CODES.CONFLICT),
	LAB_LIMIT_REACHED: new ActionError("You have reached the maximum number of labs", ERROR_CODES.LAB_LIMIT_REACHED, STATUS_CODES.TOO_MANY_REQUESTS),

	// Lab Members
	MEMBER_ALREADY_EXISTS: new ActionError("This user is already a member of the lab", ERROR_CODES.MEMBER_ALREADY_EXISTS, STATUS_CODES.CONFLICT),
	MEMBER_NOT_FOUND: new ActionError("Member not found in this lab", ERROR_CODES.MEMBER_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	TOO_MANY_MEMBERS: new ActionError("Lab has reached its member limit", ERROR_CODES.TOO_MANY_MEMBERS, STATUS_CODES.TOO_MANY_REQUESTS),
	CANNOT_REMOVE_OWNER: new ActionError("The lab owner cannot be removed", ERROR_CODES.CANNOT_REMOVE_OWNER, STATUS_CODES.FORBIDDEN),

	// Roles & Permissions
	ROLE_NOT_FOUND: new ActionError("Role not found", ERROR_CODES.ROLE_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	ROLE_ALREADY_EXISTS: new ActionError("A role with this name already exists", ERROR_CODES.ROLE_ALREADY_EXISTS, STATUS_CODES.CONFLICT),
	CANNOT_MODIFY_DEFAULT_ROLE: new ActionError("Default roles cannot be modified", ERROR_CODES.CANNOT_MODIFY_DEFAULT_ROLE, STATUS_CODES.FORBIDDEN),

	// Invites
	INVITE_EXPIRED: new ActionError("This invite has expired", ERROR_CODES.INVITE_EXPIRED, STATUS_CODES.BAD_REQUEST),
	INVITE_NOT_FOUND: new ActionError("Invite not found or invalid", ERROR_CODES.INVITE_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	INVITE_ALREADY_USED: new ActionError("This invite has already been used", ERROR_CODES.INVITE_ALREADY_USED, STATUS_CODES.CONFLICT),
	INVITE_LIMIT_REACHED: new ActionError("Maximum number of active invites reached", ERROR_CODES.INVITE_LIMIT_REACHED, STATUS_CODES.TOO_MANY_REQUESTS),

	// Cases
	CASE_NOT_FOUND: new ActionError("Case not found", ERROR_CODES.CASE_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	CASE_ALREADY_COMPLETED: new ActionError("This case has already been completed", ERROR_CODES.CASE_ALREADY_COMPLETED, STATUS_CODES.CONFLICT),
	CASE_ALREADY_CANCELLED: new ActionError("This case has already been cancelled", ERROR_CODES.CASE_ALREADY_CANCELLED, STATUS_CODES.CONFLICT),
	CASE_CANNOT_BE_DELETED: new ActionError("This case cannot be deleted in its current state", ERROR_CODES.CASE_CANNOT_BE_DELETED, STATUS_CODES.FORBIDDEN),
	INVALID_CASE_STATUS_TRANSITION: new ActionError("Invalid case status transition", ERROR_CODES.INVALID_CASE_STATUS_TRANSITION, STATUS_CODES.BAD_REQUEST),

	// Clients
	CLIENT_NOT_FOUND: new ActionError("Client not found", ERROR_CODES.CLIENT_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	CLIENT_ALREADY_EXISTS: new ActionError("A client with this information already exists", ERROR_CODES.CLIENT_ALREADY_EXISTS, STATUS_CODES.CONFLICT),

	// Invoices & Billing
	INVOICE_NOT_FOUND: new ActionError("Invoice not found", ERROR_CODES.INVOICE_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	INVOICE_ALREADY_PAID: new ActionError("This invoice has already been paid", ERROR_CODES.INVOICE_ALREADY_PAID, STATUS_CODES.CONFLICT),
	INVOICE_CANNOT_BE_DELETED: new ActionError("This invoice cannot be deleted", ERROR_CODES.INVOICE_CANNOT_BE_DELETED, STATUS_CODES.FORBIDDEN),
	PAYMENT_FAILED: new ActionError("Payment processing failed", ERROR_CODES.PAYMENT_FAILED, STATUS_CODES.BAD_REQUEST),
	SUBSCRIPTION_REQUIRED: new ActionError("An active subscription is required for this feature", ERROR_CODES.SUBSCRIPTION_REQUIRED, STATUS_CODES.FORBIDDEN),
	SUBSCRIPTION_LIMIT_REACHED: new ActionError("You have reached your subscription plan limit", ERROR_CODES.SUBSCRIPTION_LIMIT_REACHED, STATUS_CODES.TOO_MANY_REQUESTS),

	// Clinics
	CLINIC_IS_INACTIVE: new ActionError("Selected Clinic is inactive or suspended.", ERROR_CODES.CLINIC_INACTIVE, STATUS_CODES.FORBIDDEN),

	// Files & Uploads
	FILE_NOT_FOUND: new ActionError("File not found", ERROR_CODES.FILE_NOT_FOUND, STATUS_CODES.NOT_FOUND),
	FILE_TOO_LARGE: new ActionError("File size exceeds the allowed limit", ERROR_CODES.FILE_TOO_LARGE, STATUS_CODES.BAD_REQUEST),
	FILE_TYPE_NOT_ALLOWED: new ActionError("This file type is not allowed", ERROR_CODES.FILE_TYPE_NOT_ALLOWED, STATUS_CODES.BAD_REQUEST),
	UPLOAD_FAILED: new ActionError("File upload failed, please try again", ERROR_CODES.UPLOAD_FAILED, STATUS_CODES.INTERNAL_SERVER_ERROR),

	// AI Features
	AI_UNAVAILABLE: new ActionError("AI service is currently unavailable", ERROR_CODES.AI_UNAVAILABLE, STATUS_CODES.INTERNAL_SERVER_ERROR),
	AI_QUOTA_EXCEEDED: new ActionError("AI usage quota exceeded for this billing period", ERROR_CODES.AI_QUOTA_EXCEEDED, STATUS_CODES.TOO_MANY_REQUESTS),
	AI_INVALID_RESPONSE: new ActionError("AI returned an invalid response", ERROR_CODES.AI_INVALID_RESPONSE, STATUS_CODES.INTERNAL_SERVER_ERROR),

	// Notifications
	NOTIFICATION_NOT_FOUND: new ActionError("Notification not found", ERROR_CODES.NOTIFICATION_NOT_FOUND, STATUS_CODES.NOT_FOUND),

	// Database
	DATABASE_ERROR: new ActionError("A database error occurred", ERROR_CODES.DATABASE_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR),
	DUPLICATE_ENTRY: new ActionError("A record with this value already exists", ERROR_CODES.DUPLICATE_ENTRY, STATUS_CODES.CONFLICT),
	RECORD_IN_USE: new ActionError("This record is in use and cannot be deleted", ERROR_CODES.RECORD_IN_USE, STATUS_CODES.CONFLICT),
} as const;
