import 'server-only'

import { cache } from 'react'

import {
	getPlatformSession,
	type PlatformSession,
} from '@/platform/auth/session'
import {
	organizationService,
	type OrganizationService,
} from '@/platform/organizations/organization.service'
import {
	consoleTenantContextMonitor,
	type TenantContextMonitor,
} from '@/platform/organizations/tenant-context.monitor'

export const TENANT_CONTEXT_ERROR_CODES = {
	UNAUTHENTICATED: 'TENANT_UNAUTHENTICATED',
	ACTIVE_ORGANIZATION_REQUIRED: 'TENANT_ACTIVE_ORGANIZATION_REQUIRED',
	ORGANIZATION_NOT_FOUND: 'TENANT_ORGANIZATION_NOT_FOUND',
	MEMBERSHIP_REQUIRED: 'TENANT_MEMBERSHIP_REQUIRED',
	LAB_NOT_LINKED: 'TENANT_LAB_NOT_LINKED',
} as const

export type TenantContextErrorCode =
	(typeof TENANT_CONTEXT_ERROR_CODES)[keyof typeof TENANT_CONTEXT_ERROR_CODES]

export class TenantContextError extends Error {
	constructor(
		readonly code: TenantContextErrorCode,
		message: string,
	) {
		super(message)
		this.name = 'TenantContextError'
	}
}

/**
 * Recognizes tenant errors across server bundle/module boundaries while still
 * requiring a known stable code. This avoids relying solely on `instanceof`,
 * which can fail when the same server module is evaluated in separate chunks.
 */
export function isTenantContextError(
	error: unknown,
): error is TenantContextError {
	if (error instanceof TenantContextError) return true
	if (!(error instanceof Error) || error.name !== 'TenantContextError') return false
	const code = (error as { code?: unknown }).code
	return Object.values(TENANT_CONTEXT_ERROR_CODES).includes(
		code as TenantContextErrorCode,
	)
}

export type TenantContext = {
	userId: string
	memberId: string
	memberRole: string
	/** Active operational identity for this tenant, when the Member has one. */
	staffId: string | null
	organizationId: string
	labId: string
	lab: {
		id: string
		title: string
		slug: string | null
	}
}

/**
 * Resolves the active runtime tenant from an authenticated session.
 *
 * The active Organization is treated only as a candidate: membership is
 * verified from the database and the Organization must have a linked Lab.
 * There is deliberately no fallback to AuthUser.labId or LabUser.labId.
 */
export async function resolveTenantContext(
	session: PlatformSession | null | undefined,
	organizations: OrganizationService = organizationService,
): Promise<TenantContext> {
	if (!session) {
		throw new TenantContextError(
			TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED,
			'An authenticated session is required',
		)
	}

	const organizationId = session.session.activeOrganizationId

	if (!organizationId) {
		throw new TenantContextError(
			TENANT_CONTEXT_ERROR_CODES.ACTIVE_ORGANIZATION_REQUIRED,
			'An active organization must be selected',
		)
	}

	const resolved = await organizations.resolveTenant({
		userId: session.user.id,
		organizationId,
	})

	if (!resolved) {
		throw new TenantContextError(
			TENANT_CONTEXT_ERROR_CODES.ORGANIZATION_NOT_FOUND,
			'The active organization does not exist',
		)
	}

	if (!resolved.membership) {
		throw new TenantContextError(
			TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED,
			'The current user is not a member of the active organization',
		)
	}

	if (!resolved.lab) {
		throw new TenantContextError(
			TENANT_CONTEXT_ERROR_CODES.LAB_NOT_LINKED,
			'The active organization is not linked to a LabOS lab',
		)
	}

	// Defense in depth: even if a historical/manual write created a mismatched
	// relation, never expose a staff identity from another Lab or an inactive one.
	const linkedStaff = resolved.membership.labStaff
	const staffId =
		linkedStaff?.isActive && linkedStaff.labId === resolved.lab.id
			? linkedStaff.id
			: null

	return {
		userId: session.user.id,
		memberId: resolved.membership.id,
		memberRole: resolved.membership.role,
		staffId,
		organizationId,
		labId: resolved.lab.id,
		lab: {
			id: resolved.lab.id,
			title: resolved.lab.title,
			slug: resolved.lab.slug,
		},
	}
}

async function resolveRequestTenantContext(
	monitor: TenantContextMonitor,
): Promise<TenantContext> {
	const startedAt = performance.now()
	const session = await getPlatformSession()

	try {
		const tenant = await resolveTenantContext(session)
		monitor.record({
			event: 'platform.tenant_context',
			userId: tenant.userId,
			organizationId: tenant.organizationId,
			outcome: 'resolved',
			durationMs: Math.round(performance.now() - startedAt),
		})
		return tenant
	} catch (error) {
		monitor.record({
			event: 'platform.tenant_context',
			userId: session?.user.id,
			organizationId: session?.session.activeOrganizationId ?? undefined,
			outcome: 'rejected',
			reason:
				error instanceof TenantContextError
					? error.code
					: 'TENANT_CONTEXT_UNEXPECTED_FAILURE',
			durationMs: Math.round(performance.now() - startedAt),
		})
		throw error
	}
}

/**
 * Canonical request-scoped tenant resolver used by middleware, server pages,
 * route handlers, and data access. React cache deduplicates repeated calls in
 * the same server render/request graph.
 */
export const requireTenantContext = cache(() =>
	resolveRequestTenantContext(consoleTenantContextMonitor),
)

/** @deprecated Use `requireTenantContext` to make failure semantics explicit. */
export const getTenantContext = requireTenantContext
