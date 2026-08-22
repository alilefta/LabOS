import { Prisma } from '@/generated/prisma/client'
import { createMiddleware, createSafeActionClient } from 'next-safe-action'
import z from 'zod/v4'
import { ActionError, ERRORS } from '@/lib/errors'
import { getServerSession } from './get-session'
import {
	fallbackPayload,
	sanitizeInput,
	toPayload,
} from './safe-action-helpers'
import { LabRole, LabRoleSchema } from '@/schema/base/enums.base'
import {
	requireTenantContext,
	resolveTenantActorCompatibility,
	TENANT_CONTEXT_ERROR_CODES,
	TenantContextError,
} from '@/platform/organizations'

// ----------------------------------------
// Base Client - For Auth only
// ----------------------------------------
// Public/pre-auth client — no lab or role concept exists yet
export const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
		})
	},
	handleServerError(e) {
		console.error('Action error:', e)

		// Known Prisma errors
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			switch (e.code) {
				case 'P2002':
					// Unique constraint — let domain actions throw specific ERRORS
					// (e.g. LAB_ALREADY_EXISTS) before it reaches here
					return toPayload(ERRORS.DUPLICATE_ENTRY)
				case 'P2025':
					return toPayload(ERRORS.NOT_FOUND)
				case 'P2003':
					// Foreign key constraint
					return toPayload(ERRORS.NOT_FOUND)
				case 'P2014':
					// Relation violation
					return toPayload(ERRORS.RECORD_IN_USE)
				default:
					return toPayload(ERRORS.DATABASE_ERROR)
			}
		}

		// Other Prisma errors
		if (
			e instanceof Prisma.PrismaClientInitializationError ||
			e instanceof Prisma.PrismaClientUnknownRequestError ||
			e instanceof Prisma.PrismaClientValidationError
		) {
			return toPayload(ERRORS.DATABASE_ERROR)
		}

		// Your custom ActionError — thrown intentionally in actions
		if (e instanceof ActionError) {
			return toPayload(e)
		}

		// Generic Error — don't leak internals in production
		if (e instanceof Error) {
			if (process.env.NODE_ENV === 'production') {
				return fallbackPayload()
			}
			return fallbackPayload(e.message)
		}

		return fallbackPayload()
	},
})

// ----------------------------------------
// Tenant Client for everything else
// ----------------------------------------
// Separate base for anything past requireTenantMiddleware.
export const tenantScopedClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
			requiredLabRole: LabRoleSchema.nullable(),
		})
	},
	handleServerError(e) {
		console.error('Action error:', e)

		// Known Prisma errors
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			switch (e.code) {
				case 'P2002':
					// Unique constraint — let domain actions throw specific ERRORS
					// (e.g. LAB_ALREADY_EXISTS) before it reaches here
					return toPayload(ERRORS.DUPLICATE_ENTRY)
				case 'P2025':
					return toPayload(ERRORS.NOT_FOUND)
				case 'P2003':
					// Foreign key constraint
					return toPayload(ERRORS.NOT_FOUND)
				case 'P2014':
					// Relation violation
					return toPayload(ERRORS.RECORD_IN_USE)
				default:
					return toPayload(ERRORS.DATABASE_ERROR)
			}
		}

		// Other Prisma errors
		if (
			e instanceof Prisma.PrismaClientInitializationError ||
			e instanceof Prisma.PrismaClientUnknownRequestError ||
			e instanceof Prisma.PrismaClientValidationError
		) {
			return toPayload(ERRORS.DATABASE_ERROR)
		}

		// Your custom ActionError — thrown intentionally in actions
		if (e instanceof ActionError) {
			return toPayload(e)
		}

		// Generic Error — don't leak internals in production
		if (e instanceof Error) {
			if (process.env.NODE_ENV === 'production') {
				return fallbackPayload()
			}
			return fallbackPayload(e.message)
		}

		return fallbackPayload()
	},
})

// ----------------------------------------
// Logging Middleware
// ----------------------------------------

export const loggingMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null }
}>().define(async ({ next, metadata, clientInput }) => {
	const start = performance.now()

	if (process.env.NODE_ENV === 'development') {
		console.info('▶️ Action started', {
			action: metadata.actionName,
			input: sanitizeInput(clientInput),
		})
	}

	try {
		const result = await next()
		const duration = Math.round(performance.now() - start)

		if (process.env.NODE_ENV === 'development') {
			console.info('✅ Action success', {
				action: metadata.actionName,
				durationMs: duration,
			})
		}

		return result
	} catch (error) {
		const duration = Math.round(performance.now() - start)

		console.error('❌ Action failed', {
			action: metadata.actionName,
			durationMs: duration,
			error,
		})

		throw error // re-throw so handleServerError catches it
	}
})

export const requireUserMiddleware = createMiddleware<{
	metadata: { actionName: string }
}>().define(async ({ next }) => {
	const session = await getServerSession()

	const user = session?.user

	// ✅ Throw error if no user
	if (!user) {
		throw ERRORS.UNAUTHORIZED
	}

	// ✅ TypeScript now knows user is NOT null here
	return next({
		ctx: { user }, // user is guaranteed to be non-null
	})
})

function mapTenantContextError(error: TenantContextError): never {
	switch (error.code) {
		case TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED:
			throw ERRORS.UNAUTHORIZED
		case TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED:
			throw ERRORS.NOT_MEMBER
		case TENANT_CONTEXT_ERROR_CODES.ORGANIZATION_NOT_FOUND:
		case TENANT_CONTEXT_ERROR_CODES.ACTIVE_ORGANIZATION_REQUIRED:
		case TENANT_CONTEXT_ERROR_CODES.LAB_NOT_LINKED:
			throw ERRORS.LAB_NOT_FOUND
	}
}

/**
 * Thin safe-action adapter around the canonical platform tenant resolver.
 * Tenancy is established exclusively by active Organization, verified Member,
 * and Organization-linked Lab. The optional legacy actor lookup exists only
 * for old audit foreign keys and never influences tenant authorization.
 */
export const requireTenantMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null }
}>().define(async ({ next, ctx }) => {
	const { user } = ctx as { user: { id: string; name: string } }

	let tenant
	try {
		tenant = await requireTenantContext()
	} catch (error) {
		if (error instanceof TenantContextError) mapTenantContextError(error)
		throw error
	}

	if (tenant.userId !== user.id) {
		console.error('[Security] tenant actor mismatch', {
			contextUserId: tenant.userId,
			actionUserId: user.id,
		})
		throw ERRORS.FORBIDDEN
	}

	const actor = await resolveTenantActorCompatibility({
		tenant,
		displayName: user.name,
	})

	return next({
		ctx: {
			...ctx,
			...tenant,
			actor,
			/**
			 * @deprecated Transitional alias for unmigrated actions. Its role is
			 * derived from Member; its nullable ID is only for the legacy audit FK.
			 */
			labUser: {
				id: actor.legacyLabUserId,
				labId: tenant.labId,
				role: actor.legacyRole,
				isActive: true,
			},
		},
	})
})

/** @deprecated Use `requireTenantMiddleware`. */
export const requireLabMiddleware = requireTenantMiddleware

// the shape of LabRole: type LabRole = "OWNER" | "MANAGER" | "ADMIN" | "STAFF"

const ROLE_HIERARCHY: Record<LabRole, number> = {
	OWNER: 4,
	MANAGER: 3,
	ADMIN: 2,
	STAFF: 1,
}

export const requireRoleMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null }
}>().define(async ({ next, ctx, metadata }) => {
	const { actor } = ctx as { actor: { legacyRole: LabRole } }

	if (!metadata.requiredLabRole) {
		return next({ ctx })
	}

	const userLevel = ROLE_HIERARCHY[actor.legacyRole]
	const requiredLevel = ROLE_HIERARCHY[metadata.requiredLabRole]

	if (userLevel < requiredLevel) {
		throw ERRORS.MISSING_PERMISSIONS
	}

	return next({ ctx })
})

// Requires valid session only (for onboarding actions)
export const actionClientWithSession = tenantScopedClient
	.use(loggingMiddleware)
	.use(requireUserMiddleware)

// Requires session + verified lab + optional role check
export const actionClientWithLab = tenantScopedClient
	.use(loggingMiddleware)
	.use(requireUserMiddleware)
	.use(requireTenantMiddleware)
	.use(requireRoleMiddleware)
