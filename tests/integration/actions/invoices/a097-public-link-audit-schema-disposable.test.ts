import { afterAll, describe, expect, it } from 'vitest'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

const url = process.env.LABOS_A097_TEST_DATABASE_URL
const describeDisposable = url ? describe : describe.skip

describeDisposable('A-097 public-link audit schema on disposable PostgreSQL', () => {
	const clients: PrismaClient[] = []
	function db(zone = 'UTC') {
		if (!url?.includes('127.0.0.1:')) throw new Error('A-097 requires a local disposable PostgreSQL URL')
		const client = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, options: `-c TimeZone=${zone}` }) })
		clients.push(client)
		return client
	}
	afterAll(async () => { await Promise.all(clients.map(client => client.$disconnect())) })

	it('preserves pre-migration Invoice values and removes the client CUID default', async () => {
		const client = db()
		const old = await client.invoice.findUniqueOrThrow({ where: { id: 'a097-invoice-a' } })
		expect(old.publicToken).toBe('11111111-1111-4111-8111-111111111111')
		expect(old.publicLinkExpiresAt?.toISOString()).toBe('2027-01-02T03:04:05.123Z')
		const created = await client.invoice.create({ data: {
			labId: 'a097-lab-a', clinicId: 'a097-clinic-a', invoiceNumber: `A097-RAW-${crypto.randomUUID()}`,
			status: 'DRAFT', subtotal: 0, total: 0, amountDue: 0,
		} })
		expect(created.publicToken).toBeNull()
		expect(created.publicLinkExpiresAt).toBeNull()
	})

	it('has only the intended columns, indexes, and foreign keys', async () => {
		const client = db()
		const columns = await client.$queryRawUnsafe<Array<{ column_name: string; data_type: string }>>(
			`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='InvoicePublicLinkAudit' ORDER BY column_name`,
		)
		expect(columns.map(c => c.column_name).sort()).toEqual([
			'actorMemberId', 'correlationId', 'createdAt', 'event', 'expiresAt',
			'id', 'invoiceId', 'labId', 'organizationId',
		])
		expect(columns.find(c => c.column_name === 'expiresAt')?.data_type).toBe('timestamp with time zone')
		const indexes = await client.$queryRawUnsafe<Array<{ indexname: string }>>(
			`SELECT indexname FROM pg_indexes WHERE schemaname='public' AND tablename='InvoicePublicLinkAudit'`,
		)
		expect(indexes.map(i => i.indexname).sort()).toEqual([
			'InvoicePublicLinkAudit_actorMemberId_createdAt_idx',
			'InvoicePublicLinkAudit_correlationId_event_key',
			'InvoicePublicLinkAudit_invoiceId_createdAt_idx',
			'InvoicePublicLinkAudit_organizationId_labId_createdAt_idx',
			'InvoicePublicLinkAudit_pkey',
		])
		const foreignKeys = await client.$queryRawUnsafe<Array<{ conname: string; confdeltype: string }>>(
			`SELECT conname, confdeltype::text FROM pg_constraint WHERE conrelid='"InvoicePublicLinkAudit"'::regclass AND contype='f' ORDER BY conname`,
		)
		expect(foreignKeys.map(f => f.conname)).toEqual([
			'InvoicePublicLinkAudit_invoiceId_labId_fkey',
			'InvoicePublicLinkAudit_labId_organizationId_fkey',
			'InvoicePublicLinkAudit_organizationId_fkey',
		])
		expect(foreignKeys.every(f => f.confdeltype === 'r')).toBe(true)
	})

	it('enforces tenant composite identity and permits two distinct events per correlation', async () => {
		const client = db()
		const base = {
			organizationId: 'a097-org-a', labId: 'a097-lab-a', invoiceId: 'a097-invoice-a',
			actorMemberId: 'removed-member-snapshot', correlationId: crypto.randomUUID(),
			expiresAt: new Date('2027-01-02T03:04:05.123Z'),
		} as const
		await expect(client.invoicePublicLinkAudit.create({ data: {
			...base, organizationId: 'a097-org-b', event: 'ISSUED',
		} })).rejects.toBeDefined()
		await expect(client.invoicePublicLinkAudit.create({ data: {
			...base, labId: 'a097-lab-b', event: 'ISSUED',
		} })).rejects.toBeDefined()
		await client.invoicePublicLinkAudit.create({ data: { ...base, event: 'ISSUED' } })
		await client.invoicePublicLinkAudit.create({ data: { ...base, event: 'DISCLOSED' } })
		await expect(client.invoicePublicLinkAudit.create({ data: { ...base, event: 'DISCLOSED' } })).rejects.toBeDefined()
		expect(await client.invoicePublicLinkAudit.count({ where: { correlationId: base.correlationId } })).toBe(2)
	})

	it('preserves expiry epoch under a non-UTC session using the required SQL projection', async () => {
		const client = db('Asia/Baghdad')
		const id = crypto.randomUUID()
		await client.$executeRawUnsafe(
			`INSERT INTO "InvoicePublicLinkAudit" ("id","organizationId","labId","invoiceId","actorMemberId","correlationId","event","expiresAt")
			 SELECT $1, l."organizationId", i."labId", i."id", 'member-snapshot', $2, 'DISCLOSED'::"InvoicePublicLinkAuditEvent", i."publicLinkExpiresAt" AT TIME ZONE 'UTC'
			 FROM "Invoice" i JOIN "Lab" l ON l."id"=i."labId" WHERE i."id"='a097-invoice-a'`,
			id, crypto.randomUUID(),
		)
		const epoch = await client.$queryRawUnsafe<Array<{ epoch_ms: bigint }>>(
			`SELECT (extract(epoch FROM "expiresAt") * 1000)::bigint AS epoch_ms FROM "InvoicePublicLinkAudit" WHERE "id"=$1`, id,
		)
		expect(Number(epoch[0].epoch_ms)).toBe(new Date('2027-01-02T03:04:05.123Z').getTime())
	})

	it('restricts deletion of audited Invoice, Lab, and Organization', async () => {
		const client = db()
		await expect(client.invoice.delete({ where: { id: 'a097-invoice-a' } })).rejects.toBeDefined()
		await expect(client.lab.delete({ where: { id: 'a097-lab-a' } })).rejects.toBeDefined()
		await expect(client.organization.delete({ where: { id: 'a097-org-a' } })).rejects.toBeDefined()
		expect(await client.invoice.count({ where: { id: 'a097-invoice-a' } })).toBe(1)
	})
})
