import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('A-074 Clinic pricing read boundary', () => {
	it('authorizes clinic financial disclosure before opening Prisma', () => {
		const source = readFileSync(
			join(process.cwd(), 'actions/clinics/get-pricings.ts'),
			'utf8',
		)
		const authorizationIndex = source.indexOf(
			"permission: 'clinic.financials.read'",
		)
		const prismaIndex = source.indexOf('const prisma = await tenantPrisma')

		expect(authorizationIndex).toBeGreaterThan(-1)
		expect(prismaIndex).toBeGreaterThan(authorizationIndex)
		expect(source.slice(authorizationIndex, prismaIndex)).toContain(
			'throw ERRORS.MISSING_PERMISSIONS',
		)
	})

	it('does not prefetch or render negotiated pricing after denial', () => {
		const source = readFileSync(
			join(
				process.cwd(),
				'components/clinics/clinic-details/finanical-tab/clinic-ledger-tab.tsx',
			),
			'utf8',
		)

		expect(source).toContain('if (pricingDecision.allowed)')
		expect(source).toMatch(
			/\{pricingDecision\.allowed && \([\s\S]*?<CustomPricingPlanList/,
		)
	})
})
