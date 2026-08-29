import { createAuthClient } from 'better-auth/react'
import {
	adminClient,
	customSessionClient,
	organizationClient,
} from 'better-auth/client/plugins'
import { organizationAccess } from '@/platform/auth/organization-access'
import type { auth } from '@/lib/auth'

export const authClient = createAuthClient({
	plugins: [
		adminClient(),
		organizationClient(organizationAccess),
		customSessionClient<typeof auth>(),
	],
})

export const { signIn, signUp, signOut, useSession } = authClient
