// import { getCurrentProfile } from "@/data/profile";
import { Prisma } from "@/generated/prisma/client";
import { createMiddleware, createSafeActionClient } from "next-safe-action";
import z from "zod/v4";
import { ActionError, ERRORS } from "@/lib/errors";
import { getServerSession } from "./get-session";
import { fallbackPayload, sanitizeInput, toPayload } from "./safe-action-helpers";

// ----------------------------------------
// Base Client
// ----------------------------------------
export const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
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
	metadata: { actionName: string };
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

// Optional: Add lab-specific auth
// export const requireLabMemberMiddleware = createMiddleware<{
// 	metadata: { actionName: string };
// }>().define(async ({ next, clientInput }) => {
// 	// const profile = await getCurrentProfile();

// 	if (!profile) {
// 		throw ERRORS.UNAUTHORIZED;
// 	}

// 	const labId = (clientInput as any).labId;

// 	if (!labId) {
// 		throw new ActionError("Server ID required");
// 	}

// 	const member = await prisma.member.findFirst({
// 		where: {
// 			profileId: profile.id,
// 			labId,
// 		},
// 	});

// 	if (!member) {
// 		throw ERRORS.NOT_MEMBER;
// 	}

// 	return next({
// 		ctx: {
// 			profile, // Non-null
// 			member, // Non-null
// 			labId,
// 		},
// 	});
// });

// auth action client
export const actionClientWithSession = actionClient.use(loggingMiddleware).use(requireUserMiddleware);
