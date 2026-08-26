import { NextRequest, NextResponse } from 'next/server'
import { toNextJsHandler } from 'better-auth/next-js'

import { auth } from '@/lib/auth'
import { evaluateOrganizationHttpRoute } from '@/platform/auth/organization-http-route-policy'

const betterAuthHandlers = toNextJsHandler(auth)

/**
 * Blocks direct Better Auth Organization product operations. Trusted LabOS
 * wrappers call `auth.api` in-process and therefore retain Better Auth as the
 * second authority without reopening a public HTTP bypass.
 */
async function dispatchBetterAuthRequest(request: NextRequest) {
	const decision = evaluateOrganizationHttpRoute({
		pathname: request.nextUrl.pathname,
		method: request.method,
	})

	if (!decision.allowed) {
		console.error('platform.auth.organization_route_blocked', {
			event: 'platform.auth.organization_route_blocked',
			boundaryId: decision.boundaryId ?? 'UNKNOWN_ORGANIZATION_ROUTE',
			reason: decision.reason,
			severity: 'high',
		})
		return NextResponse.json(
			{ code: 'ORGANIZATION_ROUTE_REQUIRES_PRODUCT_BOUNDARY' },
			{ status: 403 },
		)
	}

	return request.method === 'GET'
		? betterAuthHandlers.GET(request)
		: betterAuthHandlers.POST(request)
}

export async function GET(request: NextRequest) {
	return dispatchBetterAuthRequest(request)
}

export async function POST(request: NextRequest) {
	return dispatchBetterAuthRequest(request)
}
