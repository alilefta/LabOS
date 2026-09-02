import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const readSource = (...segments: string[]) =>
	readFileSync(join(process.cwd(), ...segments), 'utf8')

function expectAuthorizationBeforePrisma(
	source: string,
	permission: string,
	actionMarker = '',
) {
	const start = actionMarker ? source.indexOf(actionMarker) : 0
	const permissionIndex = source.indexOf(`permission: "${permission}"`, start)
	const denialIndex = source.indexOf(
		'decision.allowed',
		permissionIndex,
	)
	const prismaIndex = source.indexOf('tenantPrisma(', permissionIndex)

	expect(start).toBeGreaterThanOrEqual(0)
	expect(permissionIndex).toBeGreaterThan(start)
	expect(denialIndex).toBeGreaterThan(permissionIndex)
	expect(prismaIndex).toBeGreaterThan(denialIndex)
}

describe('invoice read boundaries', () => {
	it('authorizes the global Invoice list before opening Prisma', () => {
		expectAuthorizationBeforePrisma(
			readSource('actions', 'invoices', 'get-invoices.ts'),
			'invoice.list',
			'export const getInvoicesListAction',
		)
	})

	it('authorizes Clinic Invoice history before opening Prisma', () => {
		expectAuthorizationBeforePrisma(
			readSource('actions', 'clinics', 'invoices', 'get-invoices.ts'),
			'invoice.list',
			'export const getClinicInvoicesAction',
		)
	})

	it('authorizes both Invoice dossier readers with the Invoice target', () => {
		for (const segments of [
			['actions', 'invoices', 'get-invoice-dossier-action.ts'],
			['data', 'invoices', 'get-invoice-dossier.ts'],
		]) {
			const source = readSource(...segments)
			expect(source).toContain('permission: "invoice.read"')
			expect(source).toContain('target: { type: "invoice", id:')
			expectAuthorizationBeforePrisma(source, 'invoice.read')
		}
	})

	it('authorizes Invoice analytics and risk readers before Prisma', () => {
		for (const segments of [
			['actions', 'invoices', 'get-ar-vitals.invoices.ts'],
			['actions', 'invoices', 'get-risk-clinics.ts'],
			['data', 'invoices', 'get-invoices.ts'],
		]) {
			expectAuthorizationBeforePrisma(
				readSource(...segments),
				'invoice.analytics.read',
			)
		}
	})

	it('protects Invoice pages before loader/prefetch work and hides Clinic Ledger for Staff', () => {
		const dashboard = readSource('app', '(main)', 'invoices', 'page.tsx')
		const dossier = readSource('app', '(main)', 'invoices', '[invoiceId]', 'page.tsx')
		const create = readSource('app', '(main)', 'invoices', 'new-invoice', 'page.tsx')
		const edit = readSource('app', '(main)', 'invoices', '[invoiceId]', 'edit', 'page.tsx')
		const nav = readSource('components', 'clinics', 'clinic-details', 'navigation-shell', 'clinic-tab-navigation.tsx')
		const router = readSource('components', 'clinics', 'clinic-details', 'clinic-tab-router.tsx')

		expect(dashboard).toContain('if (!readDecision.allowed) redirect("/dashboard")')
		expect(dossier).toContain('if (!readDecision.allowed) redirect("/invoices")')
		expect(create).toContain('permission: "invoice.create"')
		expect(create).toContain('if (!createDecision.allowed) redirect("/invoices")')
		expect(edit).toContain('permission: "invoice.read"')
		expect(edit).toContain('if (!readDecision.allowed) redirect("/invoices")')
		expect(nav).toContain('TABS.filter((tab) => tab.id !== "ledger")')
		expect(router).toContain('if (activeTab === "ledger")')
		expect(router).toContain('redirect(`/clinics/${clinicId}?tab=overview`)')
	})
})
