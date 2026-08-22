import { headers } from 'next/headers'
import { auth } from './auth'
import { cache } from 'react'
import { isAPIError } from 'better-auth/api'

export const getServerSession = cache(async () => {
	try {
		const session = await auth.api.getSession({ headers: await headers() })
		return session
	} catch (e) {
		if (isAPIError(e)) {
			console.log('Better Auth Error++++', e)
			return null
		}
	}
})
