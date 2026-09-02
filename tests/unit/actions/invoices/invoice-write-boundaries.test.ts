import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const readSource = (...segments: string[]) =>
	readFileSync(join(process.cwd(), ...segments), 'utf8')

describe('invoice write boundaries', () => {
	it('authorizes Invoice creation before opening Prisma', () => {
		const source = readSource('actions', 'invoices', 'create-invoice.ts')
		const permissionIndex = source.indexOf('permission: "invoice.create"')
		const denialIndex = source.indexOf('decision.allowed', permissionIndex)
		const prismaIndex = source.indexOf('tenantPrisma(', permissionIndex)

		expect(permissionIndex).toBeGreaterThan(0)
		expect(denialIndex).toBeGreaterThan(permissionIndex)
		expect(prismaIndex).toBeGreaterThan(denialIndex)
		expect(source).toContain('createLabOSAuthorizationActor(ctx)')
	})

	it('returns only the creation handoff fields, never the Prisma Invoice row', () => {
		const source = readSource('actions', 'invoices', 'create-invoice.ts')

		expect(source).toContain('id: invoice.id')
		expect(source).toContain('invoiceNumber: invoice.invoiceNumber')
		expect(source).not.toContain('return { success: true, invoice }')
	})

	it('authorizes draft Invoice updates before opening Prisma with the Invoice target and operation intent', () => {
		const source = readSource('actions', 'invoices', 'update-draft-invoice.ts')
		const permissionIndex = source.indexOf('permission: "invoice.update"')
		const denialIndex = source.indexOf('decision.allowed', permissionIndex)
		const prismaIndex = source.indexOf('tenantPrisma(', permissionIndex)

		expect(permissionIndex).toBeGreaterThan(0)
		expect(denialIndex).toBeGreaterThan(permissionIndex)
		expect(prismaIndex).toBeGreaterThan(denialIndex)
		expect(source).toContain('target: { type: "invoice", id: invoiceId }')
		expect(source).toContain('kind: "invoice.draft.update"')
		expect(source).toContain('clinicId,')
		expect(source).toContain('caseIds,')
		expect(source).toContain('createLabOSAuthorizationActor(ctx)')
	})
})
