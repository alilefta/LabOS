import { Prisma } from '@/generated/prisma/client'
import {
	createMiddleware,
	createSafeActionClient,
	createValidatedMiddleware,
} from 'next-safe-action'
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
import {
	getLabOSActionBoundaryMetadata,
	LABOS_ACTION_BOUNDARY_IDS,
	LABOS_ACTION_BOUNDARY_ERROR_CODES,
	LabOSActionBoundaryError,
	type LabOSActionBoundaryId,
} from '@/modules/labos-authorization/action-boundaries'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	authorizeLabOSActionInShadow,
	evaluateLegacyLabRole,
	executeLegacyAuthorizedShadowHandler,
} from '@/modules/labos-authorization/action-shadow-adapter'
import { recordLabOSShadowConfigurationFailure } from '@/modules/labos-authorization/shadow-evaluation'
import {
	GrantStaffSystemAccessInputSchema,
	RevokeStaffSystemAccessInputSchema,
} from '@/schema/composed/team/staff-settings.schema'

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

export const requireRoleMiddleware = createMiddleware<{
	metadata: { actionName: string; requiredLabRole: LabRole | null }
}>().define(async ({ next, ctx, metadata }) => {
	const { actor } = ctx as { actor: { legacyRole: LabRole } }

	if (!metadata.requiredLabRole) {
		return next({ ctx })
	}

	if (!evaluateLegacyLabRole(actor.legacyRole, metadata.requiredLabRole)) {
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

// ----------------------------------------
// Authorization V1 shadow client
// ----------------------------------------

type AuthorizationShadowMetadata = {
	actionName: string
	requiredLabRole: LabRole
	authorizationBoundaryId: LabOSActionBoundaryId
}

const authorizationShadowLoggingMiddleware = createMiddleware<{
	metadata: AuthorizationShadowMetadata
}>().define(async ({ next, metadata }) => {
	const startedAt = performance.now()
	if (process.env.NODE_ENV === 'development') {
		console.info('Authorization shadow action started', {
			action: metadata.actionName,
		})
	}
	try {
		const result = await next()
		if (process.env.NODE_ENV === 'development') {
			console.info('Authorization shadow action completed', {
				action: metadata.actionName,
				durationMs: Math.round(performance.now() - startedAt),
			})
		}
		return result
	} catch (error) {
		console.error('Authorization shadow action failed', {
			action: metadata.actionName,
			durationMs: Math.round(performance.now() - startedAt),
		})
		throw error
	}
})

const authorizationShadowScopedClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
			requiredLabRole: LabRoleSchema,
			authorizationBoundaryId: z.enum(LABOS_ACTION_BOUNDARY_IDS),
		})
	},
	handleServerError(e) {
		if (e instanceof ActionError) return toPayload(e)
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') return toPayload(ERRORS.DUPLICATE_ENTRY)
			if (e.code === 'P2025' || e.code === 'P2003') return toPayload(ERRORS.NOT_FOUND)
			if (e.code === 'P2014') return toPayload(ERRORS.RECORD_IN_USE)
			return toPayload(ERRORS.DATABASE_ERROR)
		}
		if (
			e instanceof Prisma.PrismaClientInitializationError ||
			e instanceof Prisma.PrismaClientUnknownRequestError ||
			e instanceof Prisma.PrismaClientValidationError
		) return toPayload(ERRORS.DATABASE_ERROR)
		return fallbackPayload()
	},
})

const buildAuthorizationActorMiddleware = createMiddleware<{
	metadata: AuthorizationShadowMetadata
}>().define(async ({ next, ctx }) => {
	const tenant = ctx as Parameters<typeof createLabOSAuthorizationActor>[0]
	return next({
		ctx: {
			...ctx,
			authorizationActor: createLabOSAuthorizationActor(tenant),
			authorizationCorrelationId: crypto.randomUUID(),
		},
	})
})

const authorizationShadowValidatedMiddleware = createValidatedMiddleware<{
	metadata: AuthorizationShadowMetadata
	parsedInput: unknown
	ctx: {
		authorizationActor: ReturnType<typeof createLabOSAuthorizationActor>
		authorizationCorrelationId: string
		actor: { legacyRole: LabRole }
	}
}>().define(async ({ next, ctx, metadata, parsedInput }) => {
	const result = await authorizeLabOSActionInShadow({
		boundaryId: metadata.authorizationBoundaryId,
		parsedInput,
		actor: ctx.authorizationActor,
		legacyActorRole: ctx.actor.legacyRole,
		correlationId: ctx.authorizationCorrelationId,
	})

	return executeLegacyAuthorizedShadowHandler({
		authorization: result,
		handler: () =>
			next({ ctx: { ...ctx, authorizationShadow: result } }),
		onDenied: () => {
			throw ERRORS.MISSING_PERMISSIONS
		},
	})
})

const authorizationShadowBaseClient = authorizationShadowScopedClient
	.use(authorizationShadowLoggingMiddleware)
	.use(requireUserMiddleware)
	.use(requireTenantMiddleware)
	.use(buildAuthorizationActorMiddleware)

const grantAccessBoundary = getLabOSActionBoundaryMetadata('A-124')
const revokeAccessBoundary = getLabOSActionBoundaryMetadata('A-125')

const AUTHORIZATION_SHADOW_ACTION_CLIENTS = Object.freeze({
	'A-124': authorizationShadowBaseClient
		.metadata({
			actionName: grantAccessBoundary.actionName,
			requiredLabRole: grantAccessBoundary.legacyRequiredRole,
			authorizationBoundaryId: grantAccessBoundary.boundaryId,
		})
		.inputSchema(GrantStaffSystemAccessInputSchema)
		.useValidated(authorizationShadowValidatedMiddleware),
	'A-125': authorizationShadowBaseClient
		.metadata({
			actionName: revokeAccessBoundary.actionName,
			requiredLabRole: revokeAccessBoundary.legacyRequiredRole,
			authorizationBoundaryId: revokeAccessBoundary.boundaryId,
		})
		.inputSchema(RevokeStaffSystemAccessInputSchema)
		.useValidated(authorizationShadowValidatedMiddleware),
})

/**
 * Selects an isolated, fully configured Authorization V1 shadow client.
 * Each stable boundary owns its schema and validated middleware, preventing
 * actions from pairing the wrong schema or omitting authorization evaluation.
 */
export function actionClientWithAuthorizationShadow(
	boundaryId: 'A-124',
): (typeof AUTHORIZATION_SHADOW_ACTION_CLIENTS)['A-124']
export function actionClientWithAuthorizationShadow(
	boundaryId: 'A-125',
): (typeof AUTHORIZATION_SHADOW_ACTION_CLIENTS)['A-125']
export function actionClientWithAuthorizationShadow(
	boundaryId: LabOSActionBoundaryId,
): (typeof AUTHORIZATION_SHADOW_ACTION_CLIENTS)[LabOSActionBoundaryId]
export function actionClientWithAuthorizationShadow(
	boundaryId: LabOSActionBoundaryId,
) {
	const client = (
		AUTHORIZATION_SHADOW_ACTION_CLIENTS as Partial<
			Record<LabOSActionBoundaryId, unknown>
		>
	)[boundaryId]
	if (client) return client

	const error = new LabOSActionBoundaryError(
		LABOS_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
	)
	recordLabOSShadowConfigurationFailure({
		boundaryId: String(boundaryId),
		correlationId: crypto.randomUUID(),
		failureReason: error.code,
	})
	throw error
}
