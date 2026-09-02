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

	it('authorizes live Invoice adjustments before opening Prisma with a derived change set', () => {
		const source = readSource('actions', 'invoices', 'adjust-live-invoice-action.ts')
		const permissionIndex = source.indexOf('permission: "invoice.update"')
		const denialIndex = source.indexOf('decision.allowed', permissionIndex)
		const prismaIndex = source.indexOf('tenantPrisma(', permissionIndex)

		expect(permissionIndex).toBeGreaterThan(0)
		expect(denialIndex).toBeGreaterThan(permissionIndex)
		expect(prismaIndex).toBeGreaterThan(denialIndex)
		expect(source).toContain('target: { type: "invoice", id: invoiceId }')
		expect(source).toContain('kind: "invoice.live.update"')
		expect(source).toContain('changeSet')
		expect(source).toContain('createLabOSAuthorizationActor(ctx)')
	})

	it('revalidates Invoice and Clinic facts inside a serializable transaction', () => {
		const source = readSource('actions', 'invoices', 'adjust-live-invoice-action.ts')

		expect(source).toContain('const result = await prisma.$transaction(')
		expect(source).toContain('const invoice = await tx.invoice.findUnique')
		expect(source).toContain('const clinic = await tx.clinic.findUnique')
		expect(source).toContain('isolationLevel: Prisma.TransactionIsolationLevel.Serializable')
		expect(source).toContain('const balanceDelta = newTotal - Number(invoice.total)')
		expect(source).toContain('where: { id: clinic.id, labId }')
		expect(source).toContain('currentBalance: { increment: balanceDelta }')
		expect(source).not.toContain('balanceAdjustment > 0')
		expect(source).not.toContain('where: { id: invoice.clinicId }')
	})

	it('authorizes draft Invoice deletion before opening Prisma with the Invoice target', () => {
		const source = readSource('actions', 'invoices', 'admin-actions', 'delete-draft-invoice-action.ts')
		const permissionIndex = source.indexOf('permission: "invoice.delete_draft"')
		const denialIndex = source.indexOf('decision.allowed', permissionIndex)
		const prismaIndex = source.indexOf('tenantPrisma(', permissionIndex)

		expect(permissionIndex).toBeGreaterThan(0)
		expect(denialIndex).toBeGreaterThan(permissionIndex)
		expect(prismaIndex).toBeGreaterThan(denialIndex)
		expect(source).toContain('target: { type: "invoice", id: invoiceId }')
		expect(source).toContain('createLabOSAuthorizationActor(ctx)')
		expect(source).toContain('if (invoice.status !== "DRAFT")')
		expect(source).toContain('isolationLevel: Prisma.TransactionIsolationLevel.Serializable')
	})

	it('authorizes unpaid Invoice cancellation before opening Prisma with the Invoice target and operation intent', () => {
		const source = readSource('actions', 'invoices', 'cancel-invoice.ts')
		const permissionIndex = source.indexOf('permission: "invoice.cancel"')
		const denialIndex = source.indexOf('decision.allowed', permissionIndex)
		const prismaIndex = source.indexOf('tenantPrisma(', permissionIndex)

		expect(permissionIndex).toBeGreaterThan(0)
		expect(denialIndex).toBeGreaterThan(permissionIndex)
		expect(prismaIndex).toBeGreaterThan(denialIndex)
		expect(source).toContain('target: { type: "invoice", id: invoiceId }')
		expect(source).toContain('operation: { kind: "invoice.unpaid.cancel" }')
		expect(source).toContain('createLabOSAuthorizationActor(ctx)')
		expect(source).toContain('if (Number(invoice.amountPaid) > 0)')
		expect(source).toContain('await tx.invoiceCase.deleteMany')
		expect(source).toContain('requiredLabRole: "MANAGER"')
		expect(source).toContain('isolationLevel: Prisma.TransactionIsolationLevel.Serializable')
	})
})
