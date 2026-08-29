import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const root = process.cwd()

function source(file: string): string {
	return fs.readFileSync(path.join(root, file), 'utf8')
}

describe('server session disclosure boundary', () => {
	it('projects Better Auth get-session responses before app code receives them', () => {
		const authSource = source('lib/auth.ts')
		const sessionSource = source('lib/get-session.ts')

		expect(authSource).toContain(
			'customSession(async (session) => projectApplicationSession(session))',
		)
		expect(sessionSource).toContain('const response = await fetch(')
		expect(sessionSource).toContain('/api/auth/get-session')
		expect(sessionSource).toContain('projectApplicationSession(session)')
		expect(sessionSource).not.toContain('auth.api.getSession')
		expect(sessionSource).not.toContain('auth.handler(')
		expect(sessionSource).not.toContain('new Headers(requestHeaders)')
	})

	it('uses the configured browser auth client for session operations', () => {
		const clientSource = source('lib/auth-client.ts')

		expect(clientSource).toContain('customSessionClient<typeof auth>()')
		expect(clientSource).toContain(
			'export const { signIn, signUp, signOut, useSession } = authClient',
		)
		expect(clientSource).not.toMatch(
			/export const \{ signIn, signUp, signOut, useSession \} = createAuthClient\(\)/,
		)
	})
})
