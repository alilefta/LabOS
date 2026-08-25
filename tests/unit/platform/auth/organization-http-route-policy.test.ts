import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import {
	BETTER_AUTH_ORGANIZATION_AUDIT_VERSION,
	evaluateOrganizationHttpRoute,
	ORGANIZATION_HTTP_ROUTE_POLICY,
} from '@/platform/auth/organization-http-route-policy'

describe('Better Auth Organization HTTP route policy', () => {
	it('is pinned to the installed audited Better Auth version', () => {
		const installed = JSON.parse(
			readFileSync(
				join(process.cwd(), 'node_modules/better-auth/package.json'),
				'utf8',
			),
		) as { version: string }

		expect(installed.version).toBe(BETTER_AUTH_ORGANIZATION_AUDIT_VERSION)
	})

	it('enumerates the 21 fixed endpoints enabled by the Organization plugin', () => {
		expect(ORGANIZATION_HTTP_ROUTE_POLICY).toHaveLength(21)
		expect(
			new Set(ORGANIZATION_HTTP_ROUTE_POLICY.map((entry) => entry.path)).size,
		).toBe(21)
		expect(Object.isFrozen(ORGANIZATION_HTTP_ROUTE_POLICY)).toBe(true)
	})

	it.each([
		['GET', '/api/auth/organization/list'],
		['POST', '/api/auth/organization/set-active'],
		['GET', '/api/auth/organization/get-invitation'],
		['GET', '/api/auth/organization/list-user-invitations'],
		['POST', '/api/auth/organization/accept-invitation'],
		['POST', '/api/auth/organization/reject-invitation'],
	])('allows the reviewed session lifecycle route %s %s', (method, pathname) => {
		expect(evaluateOrganizationHttpRoute({ method, pathname })).toMatchObject({
			isOrganizationRoute: true,
			allowed: true,
		})
	})

	it.each([
		'/api/auth/organization/invite-member',
		'/api/auth/organization/cancel-invitation',
		'/api/auth/organization/remove-member',
		'/api/auth/organization/update-member-role',
		'/api/auth/organization/leave',
		'/api/auth/organization/create',
		'/api/auth/organization/update',
		'/api/auth/organization/delete',
		'/api/auth/organization/has-permission',
	])('denies direct product or deferred mutation %s', (pathname) => {
		expect(
			evaluateOrganizationHttpRoute({ method: 'POST', pathname }),
		).toMatchObject({
			isOrganizationRoute: true,
			allowed: false,
		})
	})

	it.each([
		'/api/auth/organization/list-members',
		'/api/auth/organization/list-invitations',
		'/api/auth/organization/get-full-organization',
		'/api/auth/organization/get-active-member',
		'/api/auth/organization/get-active-member-role',
	])('denies direct product read boundary %s', (pathname) => {
		expect(
			evaluateOrganizationHttpRoute({ method: 'GET', pathname }),
		).toMatchObject({
			isOrganizationRoute: true,
			allowed: false,
			reason: 'product_read_boundary_required',
		})
	})

	it('denies unknown Organization endpoints and method mismatches', () => {
		expect(
			evaluateOrganizationHttpRoute({
				method: 'POST',
				pathname: '/api/auth/organization/new-upstream-mutation',
			}),
		).toMatchObject({
			allowed: false,
			boundaryId: null,
			reason: 'unknown_organization_route',
		})
		expect(
			evaluateOrganizationHttpRoute({
				method: 'GET',
				pathname: '/api/auth/organization/set-active',
			}),
		).toMatchObject({ allowed: false, reason: 'method_mismatch' })
	})

	it('does not interfere with non-Organization Better Auth endpoints', () => {
		expect(
			evaluateOrganizationHttpRoute({
				method: 'POST',
				pathname: '/api/auth/sign-in/email',
			}),
		).toEqual({
			isOrganizationRoute: false,
			allowed: true,
			boundaryId: null,
			reason: 'not_organization_route',
		})
	})
})
