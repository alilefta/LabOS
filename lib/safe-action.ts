// import { getCurrentProfile } from "@/data/profile";
import { Prisma } from "@/generated/prisma/client";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import z from "zod/v4";
import { ActionError, ERRORS } from "@/lib/errors";
import { getServerSession } from "./get-session";
import { fallbackPayload, sanitizeInput, toPayload } from "./safe-action-helpers";
import { generalPrisma } from "./prisma";
import { AuthUserBaseSchema } from "@/schema/base/auth.base";
import { AuthUser } from "./auth";
import { LabRole, LabRoleSchema } from "@/schema/base/enums.base";

// ----------------------------------------
// Base Client
// ----------------------------------------
export const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
			requiredLabRole: LabRoleSchema.nullable(),
		});
	},
	handleServerError(e) {
		console.error("Action error:", e);

		// Known Prisma errors
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			switch (e.code) {
				case "P2002":
					// Unique constraint — let domain actions throw specific ERRORS
					// (e.g. LAB_ALREADY_EXISTS) before it reaches here
					return toPayload(ERRORS.DUPLICATE_ENTRY);
				case "P2025":
					return toPayload(ERRORS.NOT_FOUND);
				case "P2003":
					// Foreign key constraint
					return toPayload(ERRORS.NOT_FOUND);
				case "P2014":
					// Relation violation
					return toPayload(ERRORS.RECORD_IN_USE);
				default:
					return toPayload(ERRORS.DATABASE_ERROR);
			}
		}

		// Other Prisma errors
		if (e instanceof Prisma.PrismaClientInitializationError || e instanceof Prisma.PrismaClientUnknownRequestError || e instanceof Prisma.PrismaClientValidationError) {
			return toPayload(ERRORS.DATABASE_ERROR);
		}

		// Your custom ActionError — thrown intentionally in actions
		if (e instanceof ActionError) {
			return toPayload(e);
		}

		// Generic Error — don't leak internals in production
		if (e instanceof Error) {
			if (process.env.NODE_ENV === "production") {
				return fallbackPayload();
			}
			return fallbackPayload(e.message);
		}

		return fallbackPayload();
	},
});

// ----------------------------------------
// Logging Middleware
// ----------------------------------------

export const loggingMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null };
}>().define(async ({ next, metadata, clientInput }) => {
	const start = performance.now();

	if (process.env.NODE_ENV === "development") {
		console.info("▶️ Action started", {
			action: metadata.actionName,
			input: sanitizeInput(clientInput),
		});
	}

	try {
		const result = await next();
		const duration = Math.round(performance.now() - start);

		if (process.env.NODE_ENV === "development") {
			console.info("✅ Action success", {
				action: metadata.actionName,
				durationMs: duration,
			});
		}

		return result;
	} catch (error) {
		const duration = Math.round(performance.now() - start);

		console.error("❌ Action failed", {
			action: metadata.actionName,
			durationMs: duration,
			error,
		});

		throw error; // re-throw so handleServerError catches it
	}
});

export const requireUserMiddleware = createMiddleware<{ metadata: { actionName: string } }>().define(async ({ next }) => {
	const session = await getServerSession();

	const user = session?.user;

	// ✅ Throw error if no user
	if (!user) {
		throw ERRORS.UNAUTHORIZED;
	}

	// ✅ TypeScript now knows user is NOT null here
	return next({
		ctx: { user }, // user is guaranteed to be non-null
	});
});

export const requireLabMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null };
}>().define(async ({ next, ctx }) => {
	const { user } = ctx as { user: AuthUser };

	// 1. Session must have labId
	if (!user.labId) {
		throw ERRORS.UNAUTHORIZED;
	}

	// 2. Verify lab actually exists in DB — don't trust session alone
	const lab = await generalPrisma.lab.findUnique({
		where: { id: user.labId },
		select: { id: true, title: true, slug: true },
	});

	if (!lab) {
		throw ERRORS.LAB_NOT_FOUND;
	}

	// 3. Verify LabUser record exists and belongs to this lab
	const labUser = await generalPrisma.labUser.findUnique({
		where: { authUserId: user.id },
		select: { id: true, labId: true, role: true, isActive: true },
	});

	if (!labUser) {
		throw ERRORS.NOT_MEMBER;
	}

	// 4. Cross-check session labId matches DB labUser.labId
	// This is the tamper-proof check
	if (labUser.labId !== user.labId) {
		console.error("[Security] labId mismatch", {
			sessionLabId: user.labId,
			dbLabId: labUser.labId,
			userId: user.id,
		});
		throw ERRORS.FORBIDDEN;
	}

	// 5. Account must be active
	if (!labUser.isActive) {
		throw ERRORS.FORBIDDEN;
	}

	return next({
		ctx: {
			user,
			lab, // verified lab
			labUser, // verified lab membership with role
			labId: lab.id, // convenience shorthand
		},
	});
});

// the shape of LabRole: type LabRole = "OWNER" | "MANAGER" | "ADMIN" | "STAFF"

const ROLE_HIERARCHY: Record<LabRole, number> = {
	OWNER: 4,
	MANAGER: 3,
	ADMIN: 2,
	STAFF: 1,
};

export const requireRoleMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null };
}>().define(async ({ next, ctx, metadata }) => {
	const { labUser } = ctx as { labUser: { role: LabRole } };

	if (!metadata.requiredLabRole) {
		return next({ ctx });
	}

	const userLevel = ROLE_HIERARCHY[labUser.role];
	const requiredLevel = ROLE_HIERARCHY[metadata.requiredLabRole];

	if (userLevel < requiredLevel) {
		throw ERRORS.MISSING_PERMISSIONS;
	}

	return next({ ctx });
});

// Requires valid session only (for onboarding actions)
export const actionClientWithSession = actionClient.use(loggingMiddleware).use(requireUserMiddleware);

// Requires session + verified lab + optional role check
export const actionClientWithLab = actionClient.use(loggingMiddleware).use(requireUserMiddleware).use(requireLabMiddleware).use(requireRoleMiddleware);
