import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

describe('proxy session boundary', () => {
	it('projects the middleware session before routing decisions use it', () => {
		const source = fs.readFileSync(
			path.join(process.cwd(), 'proxy.ts'),
			'utf8',
		)

		expect(source).toContain('projectApplicationSession(authSession)')
		expect(source).toContain('headers: new Headers(request.headers)')
		expect(source).not.toContain('auth.api.getSession')
		expect(source).not.toContain('headers: await headers()')
	})
})
