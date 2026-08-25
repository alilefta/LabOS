// import { betterFetch } from "@better-fetch/fetch";
// import { Session } from "better-auth";
import { NextRequest, NextResponse } from 'next/server'
// import { getSessionCookie } from "better-auth/cookies";
import { headers } from 'next/headers'
import { auth } from './lib/auth'

export default async function proxy(request: NextRequest) {
	console.log('Recieved call to Proxy')
	const { pathname } = request.nextUrl

	// keep this block in case of failing getSession() at build time
	// // 1. Fetch the session from better-auth's API, passing the current cookies
	// const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
	// 	baseURL: request.nextUrl.origin,
	// 	headers: await headers(),
	// });

	// route groups
	// Route groups
	const exactPublicRoutes = ['/', '/pricing', '/about', '/contact']
	const dynamicPublicRoutes = ['/statement', '/paystub', '/invite']

	const authRoutes = ['/sign-in', '/sign-up']
	const tenantBootstrapRoutes = ['/auth/continue', '/select-organization']
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

	const session = await auth.api.getSession({
		headers: await headers(),
	})

	const hasSession = !!session
	// This is only a routing hint. Protected layouts and request handlers still
	// perform authoritative membership + Organization-to-Lab validation.
	const hasOnboarded = Boolean(session?.session.activeOrganizationId)
	const isTenantBootstrapRoute = tenantBootstrapRoutes.includes(pathname)

	// -------------------------
	// NOT AUTHENTICATED
	// -------------------------
	if (!hasSession) {
		if (authRoutes.some((route) => pathname.startsWith(route))) {
			return NextResponse.next()
		}
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	// These authenticated routes repair/select active Organization state. They
	// are not protected product routes and remain unable to grant membership;
	// Better Auth validates every listed/selected Organization.
	if (isTenantBootstrapRoute) {
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
