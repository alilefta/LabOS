import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

vi.mock('@/lib/safe-action', () => ({
	actionClientWithAuthorization: () => ({ action: (handler: unknown) => handler }),
}))
vi.mock('@/lib/prisma', () => ({ tenantPrisma: vi.fn() }))

import { tenantPrisma } from '@/lib/prisma'
import { createInvoiceAction } from '@/actions/invoices/create-invoice'

const url = process.env.LABOS_A097_TEST_DATABASE_URL
const disposable = url ? describe : describe.skip
const handler = createInvoiceAction as unknown as (args: {
	parsedInput: {
		clinicId: string; caseIds: string[]; status: 'SENT' | 'DRAFT';
		billingTerms: 'RECEIPT'; discountPercentage: number;
	}
	ctx: { labId: string; userId: string; memberId: string; organizationId: string; memberRole: string }
}) => Promise<{ invoice: { id: string; invoiceNumber: string; amountDue: string; currency: string } }>

disposable('ordinary Invoice creation handoff', () => {
	let db: PrismaClient
	beforeAll(() => {
		if (!url?.includes('127.0.0.1:')) throw new Error('A-097 requires local disposable PostgreSQL')
		db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
		vi.mocked(tenantPrisma).mockImplementation(async () => db as never)
	})
	afterAll(async () => { await db?.$disconnect() })

	it.each(['DRAFT', 'SENT'] as const)('creates %s without issuing or returning a public token', async status => {
		const lab = await db.lab.create({ data: { title: 'A097 create handoff', settings: { create: { currency: 'EUR' } } } })
		const clinic = await db.clinic.create({ data: {
			labId: lab.id, name: 'Test', city: 'Test', address1: 'Test',
			email: `${crypto.randomUUID()}@example.invalid`, phoneNumber: '000',
		} })
		const patient = await db.patient.create({ data: { labId: lab.id, name: 'A097 patient' } })
		const dentalCase = await db.case.create({ data: {
			labId: lab.id, clinicId: clinic.id, patientId: patient.id,
			caseNumber: `A097-${crypto.randomUUID()}`, status: 'COMPLETED', grandTotal: '12.34',
		} })
		const result = await handler({
			parsedInput: { clinicId: clinic.id, caseIds: [dentalCase.id], status, billingTerms: 'RECEIPT', discountPercentage: 0 },
			ctx: { labId: lab.id, userId: 'user', memberId: 'member', organizationId: 'org', memberRole: 'owner' },
		})
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: result.invoice.id } })
		expect(invoice.status).toBe(status)
		expect(invoice.publicToken).toBeNull()
		expect(invoice.publicLinkExpiresAt).toBeNull()
		expect(result.invoice.amountDue).toBe(invoice.amountDue.toString())
		expect(result.invoice.currency).toBe('EUR')
		expect(result.invoice).not.toHaveProperty('publicToken')
		expect(result.invoice).not.toHaveProperty('publicLinkExpiresAt')
	})
})
