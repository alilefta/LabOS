import { NextRequest, NextResponse } from 'next/server'
import {
	projectApplicationSession,
	type ProjectableSession,
} from './lib/application-session'

export default async function proxy(request: NextRequest) {
	console.log('Recieved call to Proxy')
	const { pathname } = request.nextUrl

	// route groups
	// Route groups
	const exactPublicRoutes = ['/', '/pricing', '/about', '/contact']
	const dynamicPublicRoutes = ['/statement', '/paystub', '/invite']

	const authRoutes = ['/sign-in', '/sign-up']
	const tenantBootstrapRoutes = ['/auth/continue', '/select-organization']
	const organizationCreationRoute = '/organizations/new'
	const onboardingRoute = '/onboarding'
	const dashboardRoute = '/dashboard'
	const protectedRoutes = [
		'/clinics',
		'/settings',
		'/cases',
		'/invoices',
		'/team',

		'/catalog',
	]

	// 1. FAST PUBLIC CHECK (Allows /statement/12345 to pass)
	const isExactPublic = exactPublicRoutes.includes(pathname)
	const isDynamicPublic = dynamicPublicRoutes.some((route) =>
		pathname.startsWith(route),
	)

	if (isExactPublic || isDynamicPublic) {
		return NextResponse.next()
	}

	// allow public routes immediately
	console.log('Pathname: ', pathname)
	if (isExactPublic || isDynamicPublic) {
		return NextResponse.next()
	}
	// fast check (no DB call) so it saves a db call
	// const sessionCookie = getSessionCookie(request);

	// if (!sessionCookie) {
	// 	if (authRoutes.some((r) => pathname.startsWith(r))) {
	// 		return NextResponse.next();
	// 	}

	// 	return NextResponse.redirect(new URL("/sign-in", request.url));
	// }

	// Consume the redacted custom-session endpoint instead of calling
	// Better Auth's low-level session API from middleware. The
	// latter returns the provider-shaped session model and is too easy to
	// accidentally carry into a request/rendering context.
	const sessionResponse = await fetch(
		new URL('/api/auth/get-session', request.url),
		{
			method: 'GET',
			headers: new Headers(request.headers),
			cache: 'no-store',
		},
	)
	const authSession = sessionResponse.ok
		? ((await sessionResponse.json()) as ProjectableSession | null)
		: null
	const session = authSession ? projectApplicationSession(authSession) : null

	const hasSession = !!session
	// This is only a routing hint. Protected layouts and request handlers still
	// perform authoritative membership + Organization-to-Lab validation.
	const hasOnboarded = Boolean(session?.session.activeOrganizationId)
	const isTenantBootstrapRoute = tenantBootstrapRoutes.includes(pathname)
	const isOrganizationCreationRoute = pathname === organizationCreationRoute

	// -------------------------
	// NOT AUTHENTICATED
	// -------------------------
	if (!hasSession) {
		if (authRoutes.some((route) => pathname.startsWith(route))) {
			return NextResponse.next()
		}
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	// These authenticated routes repair/select active Organization state or open
	// the server-owned Organization + Lab provisioning form. Better Auth still
	// validates every listed/selected Organization, while provisioning derives
	// the caller identity and headers from the authenticated server session.
	if (isTenantBootstrapRoute || isOrganizationCreationRoute) {
		return NextResponse.next()
	}

	// -------------------------
	// AUTH BUT NOT ONBOARDED
	// -------------------------
	if (!hasOnboarded) {
		if (pathname.startsWith(onboardingRoute)) {
			return NextResponse.next()
		}
		return NextResponse.redirect(new URL('/onboarding', request.url))
	}

	// -------------------------
	// FULLY AUTHENTICATED
	// -------------------------
	if (pathname.startsWith(dashboardRoute)) {
		return NextResponse.next()
	}

	if (protectedRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.next()
	}

	// Fallback for authenticated users trying to access an unknown route
	return NextResponse.redirect(new URL('/dashboard', request.url))
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
