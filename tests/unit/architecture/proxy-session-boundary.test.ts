import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import proxy from '../../../proxy'

describe('proxy session boundary', () => {
	it('projects the middleware session before routing decisions use it', () => {
		const source = fs.readFileSync(
			path.join(process.cwd(), 'proxy.ts'),
			'utf8',
		)

		expect(source).toContain('projectApplicationSession(authSession)')
		expect(source).toContain("request.headers.get('cookie')")
		expect(source).toContain('headers: sessionHeaders')
		expect(source).not.toContain('new Headers(request.headers)')
		expect(source).not.toContain('auth.api.getSession')
		expect(source).not.toContain('headers: await headers()')
	})

	it('forwards only cookies to the session lookup for Server Action requests', async () => {
		const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(null))
		try {
			const request = new NextRequest('https://example.test/onboarding', {
				method: 'POST',
				headers: {
					cookie: 'better-auth.session_token=synthetic',
					'transfer-encoding': 'chunked',
					'content-type': 'text/x-component',
				},
			})
			await proxy(request)
			const init = fetchMock.mock.calls[0]?.[1]
			const forwarded = new Headers(init?.headers)
			expect(forwarded.get('cookie')).toBe('better-auth.session_token=synthetic')
			expect(forwarded.get('accept')).toBe('application/json')
			expect(forwarded.has('transfer-encoding')).toBe(false)
			expect(forwarded.has('content-type')).toBe(false)
		} finally {
			fetchMock.mockRestore()
		}
	})
})
