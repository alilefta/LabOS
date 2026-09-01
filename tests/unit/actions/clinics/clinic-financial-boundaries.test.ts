import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const readSource = (...segments: string[]) =>
	readFileSync(join(process.cwd(), ...segments), 'utf8')

describe('clinic financial boundaries', () => {
	it('authorizes aggregate clinic revenue before opening Prisma', () => {
		const source = readSource('actions', 'clinics', 'get-clinics.ts')
		const actionIndex = source.indexOf('export const getClinicsRevenueAction')
		const authorizationIndex = source.indexOf(
			'permission: "clinic.financials.list"',
			actionIndex,
		)
		const prismaIndex = source.indexOf(
			'const prisma = await tenantPrisma',
			authorizationIndex,
		)

		expect(actionIndex).toBeGreaterThan(-1)
		expect(authorizationIndex).toBeGreaterThan(actionIndex)
		expect(prismaIndex).toBeGreaterThan(authorizationIndex)
		expect(source.slice(authorizationIndex, prismaIndex)).toContain(
			'throw ERRORS.MISSING_PERMISSIONS',
		)
	})

	it('does not prefetch aggregate revenue for a denied role', () => {
		const source = readSource('app', '(main)', 'clinics', 'page.tsx')

		expect(source).toContain('permission: "clinic.financials.list"')
		expect(source).toMatch(
			/if \(revenueDecision\.allowed\) \{[\s\S]*?getClinicsRevenueAction/,
		)
	})

	it('redacts Case list totals and skips the Case revenue prefetch for Staff', () => {
		const action = readSource('actions', 'cases', 'get-cases.ts')
		const reader = readSource('data', 'cases', 'get-cases.ts')
		const page = readSource('app', '(main)', 'cases', 'page.tsx')
		const strip = readSource('components', 'cases', 'owner-strip', 'owner-strip.tsx')

		expect(action).toContain("permission: 'case.financials.list'")
		expect(action).toContain("Get-Cases-Pulse-Action', requiredLabRole: 'STAFF'")
		expect(reader).toContain('includeFinancials: boolean')
		expect(reader).toContain('...(includeFinancials && { grandTotal: true })')
		expect(page).toMatch(
			/if \(revenueDecision\.allowed\) \{[\s\S]*?getCasesRevenueAction/,
		)
		expect(strip).toContain('if (!canViewFinancials) return null')
	})

	it('keeps pricing writes behind the management legacy boundary', () => {
		for (const file of ['create-plan.ts', 'update-plan.ts']) {
			const source = readSource(
				'actions',
				'case-item-pricing-plans',
				file,
			)
			expect(source).toContain("requiredLabRole: 'ADMIN'")
		}
	})

	it('redacts list and Quick View financial DTO fields after denial', () => {
		const listAction = readSource('actions', 'clinics', 'get-clinics.ts')
		const quickViewAction = readSource('actions', 'clinics', 'get-clinic.ts')
		const composers = readSource('lib', 'mappers', 'composers.ts')

		expect(listAction).toContain('requestedFinancialFilter')
		expect(listAction).toContain(
			'composeClinicListDTO(c, uninvoicedCount, score, trendBuckets, financialDecision.allowed)',
		)
		expect(quickViewAction).toContain(
			'composeClinicQuickOverviewDTO(clinic, uninvoicedCount, financialDecision.allowed)',
		)
		expect(composers).toContain('includeFinancials = true')
		expect(composers).toContain('...(includeFinancials')
	})

	it('queries financial pulse values only after authorization', () => {
		const source = readSource('actions', 'clinics', 'get-clinics.ts')
		const pulseIndex = source.indexOf('export const getClinicsPulseAction')
		const financialGate = source.indexOf(
			'if (financialDecision.allowed)',
			pulseIndex,
		)
		const financialQuery = source.indexOf(
			'potentialCreditRisks',
			financialGate,
		)

		expect(financialGate).toBeGreaterThan(pulseIndex)
		expect(financialQuery).toBeGreaterThan(financialGate)
	})

	it('guards direct new-case navigation and creation on the server', () => {
		const layout = readSource('app', '(main)', 'cases', 'new-case', 'layout.tsx')
		const action = readSource('actions', 'cases', 'create-case.ts')

		expect(layout).toContain('permission: "case.create"')
		expect(layout).toContain('if (!decision.allowed) redirect("/cases")')
		expect(action).toContain("permission: 'case.create'")
		expect(action).toContain(
			'if (!createDecision.allowed) throw ERRORS.MISSING_PERMISSIONS',
		)
	})

	it('hides financial and creation controls from Staff UI', () => {
		const pulse = readSource(
			'components',
			'clinics',
			'clinics-list',
			'pulse-strip',
			'clinics-pulse-strip.tsx',
		)
		const columns = readSource(
			'components',
			'clinics',
			'clinics-list',
			'clinics-table',
			'columns.tsx',
		)

		expect(pulse).toContain('canViewFinancials ||')
		expect(columns).toContain('canCreateCases &&')
		expect(columns).toContain('canManageFinancials &&')
	})

	it('omits historical Case totals when Case financial listing is denied', () => {
		const source = readSource('actions', 'clinics', 'get-clinic.ts')
		const actionIndex = source.indexOf(
			'export const getClinicHistoricalCasesAction',
		)
		const permissionIndex = source.indexOf(
			'permission: "case.financials.list"',
			actionIndex,
		)
		const projectionIndex = source.indexOf(
			'...(financialDecision.allowed',
			permissionIndex,
		)

		expect(permissionIndex).toBeGreaterThan(actionIndex)
		expect(projectionIndex).toBeGreaterThan(permissionIndex)
	})
})
