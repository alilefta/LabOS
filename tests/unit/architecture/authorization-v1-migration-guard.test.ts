import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

import { describe, expect, it } from 'vitest'

function listTypeScriptFiles(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name)
		if (entry.isDirectory()) return listTypeScriptFiles(path)
		return /\.tsx?$/.test(entry.name) ? [path] : []
	})
}

const actionsRoot = join(process.cwd(), 'actions')
const actionFiles = listTypeScriptFiles(actionsRoot)

describe('Authorization V1 migration guard', () => {
	it('prevents growth of legacy role gates and manual action authorization', () => {
		const sources = actionFiles.map((file) => readFileSync(file, 'utf8'))
		const legacyGateCount = sources.reduce(
			(count, source) =>
				count + (source.match(/requiredLabRole\s*:/g)?.length ?? 0),
			0,
		)
		const manualDecisionCount = sources.reduce(
			(count, source) =>
				count +
				(source.match(/labosAuthorizationService\.(?:can|require)\(/g)?.length ??
					0),
			0,
		)

		// Migration may only move these numbers down. The reviewed 131-row
		// baseline is preserved separately; three Staff-access actions and A-086
		// have now left direct legacy metadata.
		expect(legacyGateCount).toBeLessThanOrEqual(127)
		expect(manualDecisionCount).toBeLessThanOrEqual(35)
	})

	it('keeps registered action consumers free of legacy and manual gates', () => {
		const consumers = actionFiles
			.filter((file) =>
				readFileSync(file, 'utf8').includes(
					'actionClientWithAuthorization(',
				),
			)
			.map((file) => relative(process.cwd(), file).replaceAll('\\', '/'))
			.sort()

		expect(consumers).toEqual([
			'actions/invoices/admin-actions/sync-overdue-invoices-action.ts',
		])
		for (const consumer of consumers) {
			const source = readFileSync(join(process.cwd(), consumer), 'utf8')
			expect(source).not.toContain('requiredLabRole')
			expect(source).not.toContain('labosAuthorizationService.can')
			expect(source).not.toContain('labosAuthorizationService.require')
		}
	})

	it('keeps the migrated paystub out of public routing and behind N-002', () => {
		const proxySource = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8')
		const loaderSource = readFileSync(
			join(process.cwd(), 'modules/labos-payroll/paystub.loader.ts'),
			'utf8',
		)
		const dataSource = readFileSync(
			join(process.cwd(), 'data/team/get-staff-paystub.ts'),
			'utf8',
		)

		const publicRoutesDeclaration = proxySource.match(
			/const dynamicPublicRoutes\s*=\s*\[[^\]]*\]/,
		)?.[0]
		expect(publicRoutesDeclaration).toBeDefined()
		expect(publicRoutesDeclaration).not.toContain("'/paystub'")
		expect(proxySource).toMatch(
			/protectedRoutes\s*=\s*\[[\s\S]*?['"]\/paystub['"]/,
		)
		expect(loaderSource).toContain("boundaryId: input.projection.boundaryId")
		expect(loaderSource).toContain('authorization.require')
		expect(dataSource).not.toContain('generalPrisma')
	})

	it('keeps the Dentist detail API behind registered N-API-002 authorization', () => {
		const routeSource = readFileSync(
			join(process.cwd(), 'app/api/dentists/[dentistId]/route.ts'),
			'utf8',
		)
		const loaderSource = readFileSync(
			join(process.cwd(), 'modules/labos-dentists/dentist-detail.loader.ts'),
			'utf8',
		)

		expect(routeSource).toContain('createNApi002DentistDetailLoader')
		expect(routeSource).not.toMatch(/tenantPrisma|generalPrisma|normalizeDentist/)
		expect(loaderSource).toContain("boundaryId: input.projection.boundaryId")
		expect(loaderSource).toContain('authorization.require')
		expect(loaderSource).not.toMatch(/requiredLabRole|\.can\(/)
	})

	it('keeps UploadThing completion output free of actor and tenant identifiers', () => {
		const uploadRouterSource = readFileSync(
			join(process.cwd(), 'app/api/uploadthing/core.ts'),
			'utf8',
		)
		const completionSource = readFileSync(
			join(
				process.cwd(),
				'modules/labos-files/upload-completion.dto.ts',
			),
			'utf8',
		)

		expect(uploadRouterSource).toContain('createUploadCompletionDTO')
		expect(uploadRouterSource).not.toMatch(/uploadedBy\s*:/)
		expect(completionSource).not.toMatch(/userId|labId|uploadedBy/)
	})
})
