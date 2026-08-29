import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

describe('authentication Server Action response boundary', () => {
	it('does not return Better Auth sign-in/sign-up provider responses', () => {
		const source = fs.readFileSync(
			path.join(process.cwd(), 'actions/auth.ts'),
			'utf8',
		)

		expect(source).toContain('await auth.api.signInEmail')
		expect(source).toContain('await auth.api.signUpEmail')
		expect(source).toContain('return { success: true as const }')
		 expect(source).not.toContain('return { result }')
	})

	it('keeps browser auth and callbacks on the current origin', () => {
		const authClientSource = fs.readFileSync(
			path.join(process.cwd(), 'lib/auth-client.ts'),
			'utf8',
		)
		const urlsSource = fs.readFileSync(
			path.join(process.cwd(), 'lib/urls.ts'),
			'utf8',
		)

		expect(authClientSource).not.toContain('baseURL:')
		expect(authClientSource).not.toContain('localhost:3000')
		expect(urlsSource).toContain("SIGN_IN_CALLBACK_URL = '/dashboard'")
		expect(urlsSource).toContain("SIGN_UP_CALLBACK_URL = '/onboarding'")
		expect(urlsSource).not.toContain('localhost:3000')
	})
})
