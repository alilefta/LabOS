import { createAuthClient } from 'better-auth/react'
import {
	adminClient,
	organizationClient,
} from 'better-auth/client/plugins'
import { organizationAccess } from '@/platform/auth/organization-access'

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	baseURL: 'http://localhost:3000',
	plugins: [adminClient(), organizationClient(organizationAccess)],
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()
