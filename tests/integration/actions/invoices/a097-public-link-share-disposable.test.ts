import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Prisma } from '@/generated/prisma/client'

const state = vi.hoisted(() => ({ db: null as PrismaClient | null }))
vi.mock('@/lib/safe-action', () => ({
	actionClientWithAuthorization: () => ({ action: (handler: unknown) => handler }),
}))
vi.mock('@/lib/prisma', () => ({ get generalPrisma() { return state.db } }))

import { shareInvoicePublicLinkAction } from '@/actions/invoices/share-invoice-public-link'

const url = process.env.LABOS_A097_TEST_DATABASE_URL
const disposable = url ? describe : describe.skip
const handler = shareInvoicePublicLinkAction as unknown as (args: {
	parsedInput: { invoiceId: string }
	ctx: { labId: string; organizationId: string; memberId: string; userId: string; memberRole: string }
}) => Promise<{ invoiceId: string; token: string; expiresAt: Date }>

disposable('A-097 public-link share on disposable PostgreSQL', () => {
	let db: PrismaClient
	beforeAll(() => {
		if (!url?.includes('127.0.0.1:')) throw new Error('A-097 requires local disposable PostgreSQL')
		db = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
		state.db = db
	})
	afterAll(async () => { await db?.$disconnect() })

	async function fixture(status: 'DRAFT' | 'SENT' | 'CANCELLED' = 'SENT') {
		const id = crypto.randomUUID()
		const organization = await db.organization.create({ data: {
			id, name: 'A097 organization', slug: `a097-${id}`, createdAt: new Date(),
		} })
		const user = await db.authUser.create({ data: {
			id: crypto.randomUUID(), name: 'A097 actor', email: `${id}@example.invalid`,
		} })
		const member = await db.member.create({ data: {
			id: crypto.randomUUID(), organizationId: organization.id, userId: user.id,
			role: 'owner', createdAt: new Date(),
		} })
		const lab = await db.lab.create({ data: { title: 'A097 lab', organizationId: organization.id } })
		const clinic = await db.clinic.create({ data: {
			labId: lab.id, name: 'A097 clinic', city: 'Test', address1: 'Test',
			email: `${id}@clinic.invalid`, phoneNumber: '000',
		} })
		const invoice = await db.invoice.create({ data: {
			labId: lab.id, clinicId: clinic.id, invoiceNumber: `A097-${id}`,
			status, subtotal: 10, total: 10, amountDue: 10,
		} })
		const ctx = { labId: lab.id, organizationId: organization.id, memberId: member.id, userId: user.id, memberRole: member.role }
		const run = () => handler({ parsedInput: { invoiceId: invoice.id }, ctx })
		return { organization, user, member, lab, clinic, invoice, ctx, run }
	}

	it('issues once, audits issuance and disclosure, then reuses the same link', async () => {
		const f = await fixture()
		const expectedExpiry = new Date()
		expectedExpiry.setHours(0, 0, 0, 0)
		expectedExpiry.setDate(expectedExpiry.getDate() + 90)
		const first = await f.run()
		expect(first.token).toMatch(/^[0-9a-f-]{36}$/i)
		expect(first.expiresAt.toISOString()).toBe(expectedExpiry.toISOString())
		const second = await f.run()
		expect(second.token).toBe(first.token)
		const stored = await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })
		expect(stored.publicToken).toBe(first.token)
		const audits = await db.invoicePublicLinkAudit.findMany({ where: { invoiceId: f.invoice.id }, orderBy: { createdAt: 'asc' } })
		expect(audits.map(a => a.event).sort()).toEqual(['DISCLOSED', 'DISCLOSED', 'ISSUED'])
		expect(audits.filter(a => a.event === 'ISSUED')).toHaveLength(1)
		expect(audits.every(a => a.actorMemberId === f.member.id && a.organizationId === f.organization.id)).toBe(true)
	})

	it('discloses a valid legacy UUID without rotating or extending it', async () => {
		const f = await fixture()
		const token = crypto.randomUUID()
		const expiry = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
		await db.invoice.update({ where: { id: f.invoice.id }, data: { publicToken: token, publicLinkExpiresAt: expiry } })
		const result = await f.run()
		expect(result.token).toBe(token)
		expect(result.expiresAt.toISOString()).toBe(expiry.toISOString())
		expect((await db.invoicePublicLinkAudit.findMany({ where: { invoiceId: f.invoice.id } })).map(a => a.event)).toEqual(['DISCLOSED'])
	})

	it('denies ineligible, expired, malformed, mismatched, and foreign facts without audit', async () => {
		const draft = await fixture('DRAFT')
		await expect(draft.run()).rejects.toBeDefined()
		const cancelled = await fixture('CANCELLED')
		await expect(cancelled.run()).rejects.toBeDefined()
		const inactive = await fixture()
		await db.invoice.update({ where: { id: inactive.invoice.id }, data: { isActive: false } })
		await expect(inactive.run()).rejects.toBeDefined()
		const f = await fixture()
		await db.invoice.update({ where: { id: f.invoice.id }, data: { publicToken: crypto.randomUUID(), publicLinkExpiresAt: new Date('2020-01-01') } })
		await expect(f.run()).rejects.toBeDefined()
		await db.invoice.update({ where: { id: f.invoice.id }, data: { publicToken: 'legacy-cuid', publicLinkExpiresAt: new Date('2027-01-01') } })
		await expect(f.run()).rejects.toBeDefined()
		await db.invoice.update({ where: { id: f.invoice.id }, data: { publicToken: null } })
		await expect(f.run()).rejects.toBeDefined()
		await db.invoice.update({ where: { id: f.invoice.id }, data: { publicToken: crypto.randomUUID(), publicLinkExpiresAt: null } })
		await expect(f.run()).rejects.toBeDefined()
		await expect(handler({ parsedInput: { invoiceId: f.invoice.id }, ctx: { ...f.ctx, labId: cancelled.lab.id } })).rejects.toBeDefined()
		await expect(handler({ parsedInput: { invoiceId: f.invoice.id }, ctx: { ...f.ctx, memberId: cancelled.member.id } })).rejects.toBeDefined()
		await db.member.update({ where: { id: f.member.id }, data: { role: 'staff' } })
		await expect(f.run()).rejects.toBeDefined()
		expect(await db.invoicePublicLinkAudit.count({ where: { invoiceId: f.invoice.id } })).toBe(0)
	})

	it('rolls back a new token and withholds bearer material when auditing fails', async () => {
		const f = await fixture()
		await db.$executeRawUnsafe(`CREATE FUNCTION a097_test_audit_failure() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'test audit failure'; END $$`)
		await db.$executeRawUnsafe(`CREATE TRIGGER a097_test_audit_failure BEFORE INSERT ON "InvoicePublicLinkAudit" FOR EACH ROW EXECUTE FUNCTION a097_test_audit_failure()`)
		try {
			await expect(f.run()).rejects.toBeDefined()
			const invoice = await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })
			expect(invoice.publicToken).toBeNull()
			expect(invoice.publicLinkExpiresAt).toBeNull()
			expect(await db.invoicePublicLinkAudit.count({ where: { invoiceId: f.invoice.id } })).toBe(0)
		} finally {
			await db.$executeRawUnsafe(`DROP TRIGGER a097_test_audit_failure ON "InvoicePublicLinkAudit"`)
			await db.$executeRawUnsafe(`DROP FUNCTION a097_test_audit_failure()`)
		}
	})

	it('withholds an existing valid bearer when disclosure auditing fails', async () => {
		const f = await fixture()
		const token = crypto.randomUUID()
		await db.invoice.update({ where: { id: f.invoice.id }, data: {
			publicToken: token, publicLinkExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
		} })
		await db.$executeRawUnsafe(`CREATE FUNCTION a097_test_audit_failure() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'test audit failure'; END $$`)
		await db.$executeRawUnsafe(`CREATE TRIGGER a097_test_audit_failure BEFORE INSERT ON "InvoicePublicLinkAudit" FOR EACH ROW EXECUTE FUNCTION a097_test_audit_failure()`)
		try {
			await expect(f.run()).rejects.toBeDefined()
			expect((await db.invoice.findUniqueOrThrow({ where: { id: f.invoice.id } })).publicToken).toBe(token)
			expect(await db.invoicePublicLinkAudit.count({ where: { invoiceId: f.invoice.id } })).toBe(0)
		} finally {
			await db.$executeRawUnsafe(`DROP TRIGGER a097_test_audit_failure ON "InvoicePublicLinkAudit"`)
			await db.$executeRawUnsafe(`DROP FUNCTION a097_test_audit_failure()`)
		}
	})

	it('uses the same absolute expiry instant in an Asia/Baghdad session', async () => {
		const f = await fixture()
		const zoned = new PrismaClient({ adapter: new PrismaPg({ connectionString: url!, options: '-c TimeZone=Asia/Baghdad' }) })
		state.db = zoned
		try {
			const result = await f.run()
			const rows = await zoned.$queryRaw<Array<{ epoch_ms: bigint }>>`
				SELECT (extract(epoch FROM "expiresAt") * 1000)::bigint AS epoch_ms
				FROM "InvoicePublicLinkAudit" WHERE "invoiceId" = ${f.invoice.id} LIMIT 1`
			expect(Number(rows[0].epoch_ms)).toBe(result.expiresAt.getTime())
		} finally {
			state.db = db
			await zoned.$disconnect()
		}
	})

	it('serializes overlapping first-share requests to one token and one ISSUED event', async () => {
		const f = await fixture()
		let release!: () => void
		const barrier = new Promise<void>(resolve => { release = resolve })
		let locked!: () => void
		const lockedSignal = new Promise<void>(resolve => { locked = resolve })
		const holder = db.$transaction(async tx => {
			await tx.$queryRaw`SELECT "id" FROM "Invoice" WHERE "id" = ${f.invoice.id} FOR UPDATE`
			locked()
			await barrier
		})
		await lockedSignal
		const first = f.run()
		const second = f.run()
		try {
			let waitingCount = 0
			for (let attempt = 0; attempt < 40 && waitingCount < 2; attempt++) {
				const waiting = await db.$queryRaw<Array<{ count: bigint }>>`
					SELECT count(*)::bigint AS count FROM pg_stat_activity
					WHERE datname = current_database() AND wait_event_type = 'Lock' AND query LIKE '%FOR UPDATE%'`
				waitingCount = Number(waiting[0].count)
				if (waitingCount < 2) await new Promise(resolve => setTimeout(resolve, 25))
			}
			expect(waitingCount).toBeGreaterThanOrEqual(2)
		} finally {
			release()
			await holder
		}
		const [a, b] = await Promise.all([first, second])
		expect(a.token).toBe(b.token)
		expect(await db.invoicePublicLinkAudit.count({ where: { invoiceId: f.invoice.id, event: 'ISSUED' } })).toBe(1)
		expect(await db.invoicePublicLinkAudit.count({ where: { invoiceId: f.invoice.id, event: 'DISCLOSED' } })).toBe(2)
	})

	it('retries a narrowly recognized serialization abort with fresh transaction facts', async () => {
		const f = await fixture()
		let calls = 0
		state.db = { $transaction: (...args: Parameters<PrismaClient['$transaction']>) => {
			calls++
			if (calls === 1) throw new Prisma.PrismaClientKnownRequestError('serialization', { code: 'P2034', clientVersion: 'test' })
			return (db.$transaction as (...values: typeof args) => unknown)(...args)
		} } as unknown as PrismaClient
		try {
			const result = await f.run()
			expect(result.token).toBeDefined()
			expect(calls).toBe(2)
		} finally { state.db = db }
	})
})
