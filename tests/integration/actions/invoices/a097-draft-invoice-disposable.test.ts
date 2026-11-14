import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Prisma } from '@/generated/prisma/client'

vi.mock('@/lib/safe-action', () => ({
	actionClientWithAuthorization: () => ({ action: (handler: unknown) => handler }),
}))
vi.mock('@/lib/prisma', () => ({ tenantPrisma: vi.fn() }))

import { tenantPrisma } from '@/lib/prisma'
import { updateDraftInvoiceAction } from '@/actions/invoices/update-draft-invoice'

const url = process.env.LABOS_A097_TEST_DATABASE_URL
const describeDisposable = url ? describe : describe.skip
type Input = {
	invoiceId: string
	clinicId: string
	caseIds: string[]
	status: 'DRAFT' | 'SENT'
	billingTerms: 'RECEIPT'
	discountPercentage: number
	discountReason?: string
	notes?: string
}
const handler = updateDraftInvoiceAction as unknown as (args: {
	parsedInput: Input
	ctx: { labId: string }
}) => Promise<unknown>

describeDisposable('A-097 disposable PostgreSQL transaction', () => {
	let db: PrismaClient
	beforeAll(() => {
		if (!url?.includes('127.0.0.1:')) throw new Error('A-097 test requires a local disposable PostgreSQL URL')
		db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
		vi.mocked(tenantPrisma).mockImplementation(async () => db as never)
	})
	afterAll(async () => { await db?.$disconnect() })

	async function fixture() {
		const lab = await db.lab.create({ data: { title: 'A097 disposable lab', settings: { create: { currency: 'AED' } } } })
		const clinic = await db.clinic.create({ data: {
			labId: lab.id, name: 'A097 clinic', city: 'Test', address1: 'Test',
			email: 'test@example.invalid', phoneNumber: '000',
		} })
		const otherClinic = await db.clinic.create({ data: {
			labId: lab.id, name: 'Other clinic', city: 'Test', address1: 'Test',
			email: 'other@example.invalid', phoneNumber: '001',
		} })
		const patient = await db.patient.create({ data: { labId: lab.id, name: 'Test patient' } })
		const makeCase = (clinicId: string, caseNumber: string, total: string) => db.case.create({ data: {
			labId: lab.id, clinicId, patientId: patient.id, caseNumber,
			status: 'COMPLETED', grandTotal: new Prisma.Decimal(total),
		} })
		const first = await makeCase(clinic.id, 'A097-1', '10.01')
		const second = await makeCase(clinic.id, 'A097-2', '20.02')
		const foreignClinicCase = await makeCase(otherClinic.id, 'A097-3', '99.00')
		const invoice = await db.invoice.create({ data: {
			labId: lab.id, clinicId: clinic.id, invoiceNumber: 'A097-INV',
			subtotal: 10.01, total: 10.01, amountDue: 10.01,
			cases: { create: { labId: lab.id, caseId: first.id, caseTotal: 10.01 } },
		} })
		const input = (overrides: Partial<Input> = {}): Input => ({
			invoiceId: invoice.id, clinicId: clinic.id, caseIds: [first.id],
			status: 'DRAFT', billingTerms: 'RECEIPT', discountPercentage: 0,
			...overrides,
		})
		const run = (value: Input) => handler({ parsedInput: value, ctx: { labId: lab.id } })
		return { lab, clinic, otherClinic, first, second, foreignClinicCase, invoice, input, run }
	}

	it('keeps DRAFT, reconciles links, and calculates decimal totals from transaction facts', async () => {
		const f = await fixture()
		const result = await f.run(f.input({ caseIds: [f.second.id], discountPercentage: 10, discountReason: 'Test' })) as { invoice: { amountDue: string } }
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id }, include: { cases: true } })
		expect(invoice.status).toBe('DRAFT')
		expect(invoice.cases.map(c => c.caseId)).toEqual([f.second.id])
		expect(invoice.subtotal.toString()).toBe('20.02')
		expect(invoice.discountAmount.toString()).toBe('2')
		expect(invoice.total.toString()).toBe('18.02')
		expect(invoice.total.equals(invoice.subtotal.minus(invoice.discountAmount))).toBe(true)
		expect(result.invoice.amountDue).toBe(invoice.amountDue.toString())
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0')
	})

	it('sends once and rejects a repeated send without duplicate credit', async () => {
		const f = await fixture()
		await f.run(f.input({ status: 'SENT' }))
		await expect(f.run(f.input({ status: 'SENT' }))).rejects.toBeDefined()
		expect((await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })).status).toBe('SENT')
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('10.01')
	})

	it('rejects a different Clinic, foreign Clinic Case, and post-authorization status change', async () => {
		const f = await fixture()
		await expect(f.run(f.input({ clinicId: f.otherClinic.id }))).rejects.toBeDefined()
		await expect(f.run(f.input({ caseIds: [f.foreignClinicCase.id] }))).rejects.toBeDefined()
		await db.invoice.update({ where: { id: f.invoice.id }, data: { status: 'SENT' } })
		await expect(f.run(f.input())).rejects.toBeDefined()
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0')
	})

	it('rejects a changed Invoice Clinic and a foreign Lab Invoice without mutation', async () => {
		const f = await fixture()
		await db.invoice.update({ where: { id: f.invoice.id }, data: { clinicId: f.otherClinic.id } })
		await expect(f.run(f.input())).rejects.toBeDefined()
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0')
		const otherLab = await db.lab.create({ data: { title: 'A097 foreign lab' } })
		await expect(handler({ parsedInput: f.input(), ctx: { labId: otherLab.id } })).rejects.toBeDefined()
		expect((await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })).status).toBe('DRAFT')
	})

	it('rechecks Case eligibility, price, billing ownership, and duplicate IDs inside the transaction', async () => {
		const f = await fixture()
		await expect(f.run(f.input({ caseIds: [f.first.id, f.first.id] }))).rejects.toBeDefined()
		await db.case.update({ where: { id: f.second.id }, data: { status: 'PROCESSING' } })
		await expect(f.run(f.input({ caseIds: [f.second.id] }))).rejects.toBeDefined()
		await db.case.update({ where: { id: f.second.id }, data: { status: 'COMPLETED', grandTotal: '21.03' } })
		await f.run(f.input({ caseIds: [f.second.id] }))
		expect((await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })).total.toString()).toBe('21.03')
		const otherInvoice = await db.invoice.create({ data: {
			labId: f.lab.id, clinicId: f.clinic.id, invoiceNumber: 'A097-OTHER',
			subtotal: 0, total: 0, amountDue: 0,
			cases: { create: { labId: f.lab.id, caseId: f.first.id, caseTotal: 10.01 } },
		} })
		expect(otherInvoice.id).toBeDefined()
		await expect(f.run(f.input({ caseIds: [f.first.id] }))).rejects.toBeDefined()
	})

	it('uses database storage scale for fractional-cent discount arithmetic', async () => {
		const f = await fixture()
		await db.case.update({ where: { id: f.first.id }, data: { grandTotal: '0.05' } })
		await f.run(f.input({ discountPercentage: 10, discountReason: 'Test' }))
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })
		expect(invoice.subtotal.toString()).toBe('0.05')
		expect(invoice.discountAmount.toString()).toBe('0.01')
		expect(invoice.total.toString()).toBe('0.04')
		expect(invoice.total.equals(invoice.subtotal.minus(invoice.discountAmount))).toBe(true)
	})

	it('rolls back Invoice and junction updates when Clinic credit fails', async () => {
		const f = await fixture()
		await db.clinic.update({ where: { id: f.clinic.id }, data: { currentBalance: '99999999.99' } })
		await expect(f.run(f.input({ status: 'SENT', caseIds: [f.second.id] }))).rejects.toBeDefined()
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id }, include: { cases: true } })
		expect(invoice.status).toBe('DRAFT')
		expect(invoice.cases.map(c => c.caseId)).toEqual([f.first.id])
		expect(invoice.total.toString()).toBe('10.01')
	})

	it('allows at most one overlapping DRAFT-to-SENT transition', async () => {
		const f = await fixture()
		await db.$executeRawUnsafe(`CREATE OR REPLACE FUNCTION a097_pause_invoice_update() RETURNS trigger AS $$ BEGIN PERFORM pg_sleep(0.35); RETURN NEW; END; $$ LANGUAGE plpgsql`)
		await db.$executeRawUnsafe(`CREATE TRIGGER a097_pause_before_invoice_update BEFORE UPDATE ON "Invoice" FOR EACH ROW WHEN (NEW.status = 'SENT') EXECUTE FUNCTION a097_pause_invoice_update()`)
		try {
			const results = await Promise.allSettled([f.run(f.input({ status: 'SENT' })), f.run(f.input({ status: 'SENT' }))])
			expect(results.filter(r => r.status === 'fulfilled')).toHaveLength(1)
			expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('10.01')
		} finally {
			await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS a097_pause_before_invoice_update ON "Invoice"`)
			await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS a097_pause_invoice_update()`)
		}
	}, 20000)
})
