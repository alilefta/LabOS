import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

vi.mock('@/lib/safe-action', () => ({
	actionClientWithAuthorization: () => ({ action: (handler: unknown) => handler }),
}))
vi.mock('@/lib/prisma', () => ({ tenantPrisma: vi.fn() }))

import { tenantPrisma } from '@/lib/prisma'
import { createInvoiceAction } from '@/actions/invoices/create-invoice'

const url = process.env.LABOS_A089_TEST_DATABASE_URL
const disposable = url ? describe : describe.skip
type Input = {
	clinicId: string
	caseIds: string[]
	status: 'DRAFT' | 'SENT'
	billingTerms: 'RECEIPT'
	discountPercentage: number
	discountReason?: string
}
const handler = createInvoiceAction as unknown as (args: {
	parsedInput: Input
	ctx: { labId: string }
}) => Promise<{ invoice: { id: string; invoiceNumber: string; amountDue: string; currency: string } }>

disposable('A-089 disposable PostgreSQL creation', () => {
	let db: PrismaClient
	beforeAll(() => {
		if (!url || !/^postgresql:\/\/[^@]+@127\.0\.0\.1:\d+\/labos_a089(?:\?|$)/.test(url)) {
			throw new Error('A-089 requires the run-owned local disposable database')
		}
		db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
		vi.mocked(tenantPrisma).mockImplementation(async () => db as never)
	})
	afterAll(async () => { await db?.$disconnect() })

	async function fixture(prices: string[] = ['10.01', '20.02']) {
		const marker = crypto.randomUUID()
		const lab = await db.lab.create({ data: {
			title: `A089 ${marker}`, settings: { create: { currency: 'EUR' } },
		} })
		const clinic = await db.clinic.create({ data: {
			labId: lab.id, name: 'A089 Clinic', city: 'Test', address1: 'Test',
			email: `${marker}@clinic.invalid`, phoneNumber: '000',
		} })
		const otherClinic = await db.clinic.create({ data: {
			labId: lab.id, name: 'Other Clinic', city: 'Test', address1: 'Test',
			email: `${marker}@other.invalid`, phoneNumber: '001',
		} })
		const patient = await db.patient.create({ data: { labId: lab.id, name: 'A089 patient' } })
		const cases = await Promise.all(prices.map((price, index) => db.case.create({ data: {
			labId: lab.id, clinicId: clinic.id, patientId: patient.id,
			caseNumber: `A089-${marker}-${index}`, status: 'COMPLETED', grandTotal: price,
		} })))
		const input = (overrides: Partial<Input> = {}): Input => ({
			clinicId: clinic.id, caseIds: cases.map(c => c.id), status: 'SENT',
			billingTerms: 'RECEIPT', discountPercentage: 0, ...overrides,
		})
		const run = (value: Input = input()) => handler({ parsedInput: value, ctx: { labId: lab.id } })
		return { lab, clinic, otherClinic, patient, cases, input, run }
	}

	it('creates DRAFT without Clinic credit or public capability', async () => {
		const f = await fixture()
		const result = await f.run(f.input({ status: 'DRAFT' }))
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: result.invoice.id }, include: { cases: true } })
		expect(invoice.status).toBe('DRAFT')
		expect(invoice.total.toString()).toBe('30.03')
		expect(invoice.cases).toHaveLength(2)
		expect(invoice.publicToken).toBeNull()
		expect(result.invoice).toEqual({ id: invoice.id, invoiceNumber: invoice.invoiceNumber, amountDue: invoice.amountDue.toString(), currency: 'EUR' })
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0')
		expect((await db.lab.findUniqueOrThrow({ where: { id: f.lab.id } })).nextInvoiceNumber).toBe(1)
	})

	it('creates SENT with one authoritative balance credit and rounded identity', async () => {
		const f = await fixture(['0.05'])
		const result = await f.run(f.input({ discountPercentage: 10, discountReason: 'Test' }))
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: result.invoice.id }, include: { cases: true } })
		expect(invoice.status).toBe('SENT')
		expect(invoice.subtotal.toString()).toBe('0.05')
		expect(invoice.discountAmount.toString()).toBe('0.01')
		expect(invoice.total.toString()).toBe('0.04')
		expect(invoice.total.equals(invoice.subtotal.minus(invoice.discountAmount))).toBe(true)
		expect(invoice.amountDue.equals(invoice.total)).toBe(true)
		expect(invoice.amountPaid.toString()).toBe('0')
		expect(invoice.cases[0].caseTotal.toString()).toBe('0.05')
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0.04')
		expect(result.invoice.amountDue).toBe('0.04')
		expect(result.invoice).not.toHaveProperty('publicToken')
		await expect(f.run()).rejects.toBeDefined()
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0.04')
	})

	it('preserves zero and full discount accounting', async () => {
		for (const discountPercentage of [0, 100]) {
			const f = await fixture(['12.34'])
			const result = await f.run(f.input({ discountPercentage, discountReason: discountPercentage ? 'Full discount' : undefined }))
			const invoice = await db.invoice.findUniqueOrThrow({ where: { id: result.invoice.id } })
			expect(invoice.subtotal.toString()).toBe('12.34')
			expect(invoice.discountAmount.toString()).toBe(discountPercentage ? '12.34' : '0')
			expect(invoice.total.toString()).toBe(discountPercentage ? '0' : '12.34')
			expect(invoice.total.equals(invoice.subtotal.minus(invoice.discountAmount))).toBe(true)
			expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.equals(invoice.total)).toBe(true)
		}
	})

	it('rejects foreign Clinic, foreign Case, malformed and duplicate Case IDs without sequence use', async () => {
		const f = await fixture()
		const foreignLab = await db.lab.create({ data: { title: 'A089 foreign Lab' } })
		const foreignClinic = await db.clinic.create({ data: {
			labId: foreignLab.id, name: 'Foreign', city: 'Test', address1: 'Test',
			email: `${crypto.randomUUID()}@foreign.invalid`, phoneNumber: '000',
		} })
		const foreignPatient = await db.patient.create({ data: { labId: foreignLab.id, name: 'Foreign patient' } })
		const foreignCase = await db.case.create({ data: {
			labId: foreignLab.id, clinicId: foreignClinic.id, patientId: foreignPatient.id,
			caseNumber: `A089-${crypto.randomUUID()}`, status: 'COMPLETED', grandTotal: '99.00',
		} })
		const otherCase = await db.case.create({ data: {
			labId: f.lab.id, clinicId: f.otherClinic.id, patientId: f.patient.id,
			caseNumber: `A089-${crypto.randomUUID()}`, status: 'COMPLETED', grandTotal: '9.00',
		} })
		for (const badInput of [
			f.input({ clinicId: foreignClinic.id }),
			f.input({ caseIds: [foreignCase.id] }),
			f.input({ clinicId: f.otherClinic.id }),
			f.input({ caseIds: [otherCase.id] }),
			f.input({ caseIds: ['bad'] }),
			f.input({ caseIds: [f.cases[0].id, f.cases[0].id] }),
		]) await expect(f.run(badInput)).rejects.toBeDefined()
		expect((await db.lab.findUniqueOrThrow({ where: { id: f.lab.id } })).nextInvoiceNumber).toBe(0)
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('0')
		expect(await db.invoice.count({ where: { labId: f.lab.id } })).toBe(0)
	})

	it('revalidates status, price, and existing billing claim at mutation time', async () => {
		const f = await fixture()
		await db.case.update({ where: { id: f.cases[0].id }, data: { status: 'PROCESSING' } })
		await expect(f.run()).rejects.toBeDefined()
		await db.case.update({ where: { id: f.cases[0].id }, data: { status: 'COMPLETED', grandTotal: '15.55' } })
		const first = await f.run(f.input({ caseIds: [f.cases[0].id] }))
		const invoice = await db.invoice.findUniqueOrThrow({ where: { id: first.invoice.id }, include: { cases: true } })
		expect(invoice.cases[0].caseTotal.toString()).toBe('15.55')
		expect(invoice.total.toString()).toBe('15.55')
		await expect(f.run()).rejects.toBeDefined()
		expect(await db.invoice.count({ where: { labId: f.lab.id } })).toBe(1)
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('15.55')
	})

	it('rolls back Invoice, links, balance and Lab sequence when Clinic credit overflows', async () => {
		const f = await fixture(['10.01'])
		await db.clinic.update({ where: { id: f.clinic.id }, data: { currentBalance: '99999999.99' } })
		await expect(f.run()).rejects.toBeDefined()
		expect(await db.invoice.count({ where: { labId: f.lab.id } })).toBe(0)
		expect(await db.invoiceCase.count({ where: { labId: f.lab.id } })).toBe(0)
		expect((await db.lab.findUniqueOrThrow({ where: { id: f.lab.id } })).nextInvoiceNumber).toBe(0)
		expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('99999999.99')
	})

	it('permits one winner for real overlapping claims of the same Case', async () => {
		const f = await fixture(['10.01'])
		await db.$executeRawUnsafe(`CREATE OR REPLACE FUNCTION a089_pause_case_claim() RETURNS trigger AS $$ BEGIN PERFORM pg_sleep(0.45); RETURN NEW; END; $$ LANGUAGE plpgsql`)
		await db.$executeRawUnsafe(`CREATE TRIGGER a089_pause_before_case_claim BEFORE INSERT ON "InvoiceCase" FOR EACH ROW EXECUTE FUNCTION a089_pause_case_claim()`)
		try {
			const attempts = [f.run(), f.run()]
			let observedLock = false
			for (let poll = 0; poll < 15 && !observedLock; poll++) {
				await new Promise(resolve => setTimeout(resolve, 50))
				const rows = await db.$queryRawUnsafe<Array<{ waiting: bigint }>>(`SELECT count(*) FILTER (WHERE wait_event_type = 'Lock') AS waiting FROM pg_stat_activity WHERE datname = current_database() AND pid <> pg_backend_pid()`)
				observedLock = Number(rows[0].waiting) > 0
			}
			const results = await Promise.allSettled(attempts)
			expect(observedLock).toBe(true)
			expect(results.filter(result => result.status === 'fulfilled')).toHaveLength(1)
			expect(await db.invoice.count({ where: { labId: f.lab.id } })).toBe(1)
			expect(await db.invoiceCase.count({ where: { caseId: f.cases[0].id } })).toBe(1)
			expect((await db.clinic.findUniqueOrThrow({ where: { id: f.clinic.id } })).currentBalance.toString()).toBe('10.01')
		expect((await db.lab.findUniqueOrThrow({ where: { id: f.lab.id } })).nextInvoiceNumber).toBe(1)
		} finally {
			await db.$executeRawUnsafe(`DROP TRIGGER IF EXISTS a089_pause_before_case_claim ON "InvoiceCase"`)
			await db.$executeRawUnsafe(`DROP FUNCTION IF EXISTS a089_pause_case_claim()`)
		}
	})
})
