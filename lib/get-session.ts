import { headers } from 'next/headers'
import { cache } from 'react'
import { isAPIError } from 'better-auth/api'
import {
	projectApplicationSession,
	type ApplicationSession,
	type ProjectableSession,
} from './application-session'

export const getServerSession = cache(async (): Promise<ApplicationSession | null> => {
	try {
		const requestHeaders = await headers()
		const configuredBaseUrl = process.env.BETTER_AUTH_URL
		if (!configuredBaseUrl && process.env.NODE_ENV === 'production') {
			throw new Error('BETTER_AUTH_URL is required in production')
		}
		const baseUrl =
			configuredBaseUrl ??
			`${requestHeaders.get('x-forwarded-proto') ?? 'http'}://${requestHeaders.get('host') ?? 'localhost:3000'}`

		// Keep Better Auth's internal provider promises outside the React Server
		// Component render context. React 19 development builds serialize async
		// debug values into Flight; executing the provider handler in-process can expose
		// Better Auth's intermediate credential-bearing session even when our
		// final return value is projected correctly.
		const sessionHeaders = new Headers({ accept: 'application/json' })
		const cookie = requestHeaders.get('cookie')
		if (cookie) sessionHeaders.set('cookie', cookie)
		const response = await fetch(
			`${baseUrl.replace(/\/$/, '')}/api/auth/get-session`,
			{
				method: 'GET',
				headers: sessionHeaders,
				cache: 'no-store',
				redirect: 'error',
			},
		)

		if (!response.ok) return null
		const session = (await response.json()) as ProjectableSession | null
		return session ? projectApplicationSession(session) : null
	} catch (e) {
		if (isAPIError(e)) {
			console.warn('Better Auth session lookup failed', {
				status: e.status,
				statusCode: e.statusCode,
			})
			return null
		}

		throw e
	}
})
