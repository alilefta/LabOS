import { afterAll, describe, expect, it } from 'vitest'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

const url = process.env.LABOS_A097_TEST_DATABASE_URL
const describeDisposable = url ? describe : describe.skip

describeDisposable('A-097 Invoice expiry representation on disposable PostgreSQL', () => {
	const clients: PrismaClient[] = []
	afterAll(async () => { await Promise.all(clients.map(client => client.$disconnect())) })

	it.each(['UTC', 'Asia/Baghdad'])('preserves the Invoice expiry instant in %s session', async (zone) => {
		if (!url?.includes('127.0.0.1:')) throw new Error('A-097 requires a local disposable PostgreSQL URL')
		const client = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, options: `-c TimeZone=${zone}` }) })
		clients.push(client)
		const timeZone = await client.$queryRawUnsafe<Array<{ TimeZone: string }>>('SHOW TimeZone')
		expect(timeZone[0].TimeZone).toBe(zone)

		const lab = await client.lab.create({ data: { title: `A097 expiry ${zone}` } })
		const clinic = await client.clinic.create({ data: {
			labId: lab.id, name: 'Test', city: 'Test', address1: 'Test',
			email: 'expiry@example.invalid', phoneNumber: '000',
		} })
		const expiry = new Date('2026-11-08T01:02:03.123Z')
		const sessionOffsetMs = zone === 'Asia/Baghdad' ? 3 * 60 * 60 * 1000 : 0
		const invoice = await client.invoice.create({ data: {
			labId: lab.id, clinicId: clinic.id, invoiceNumber: 'EXPIRY-1',
			status: 'SENT', subtotal: 1, total: 1, amountDue: 1,
			publicToken: crypto.randomUUID(), publicLinkExpiresAt: expiry,
		} })
		expect(invoice.publicLinkExpiresAt?.toISOString()).toBe(expiry.toISOString())
		const row = await client.$queryRawUnsafe<Array<{ wall: string }>>(
			'SELECT to_char("publicLinkExpiresAt", \'YYYY-MM-DD HH24:MI:SS.MS\') AS wall FROM "Invoice" WHERE "id" = $1',
			invoice.id,
		)
		expect(row[0].wall).toBe('2026-11-08 01:02:03.123')
		const validAtBoundary = await client.invoice.count({ where: { id: invoice.id, publicLinkExpiresAt: { gte: expiry } } })
		const invalidAfterBoundary = await client.invoice.count({ where: { id: invoice.id, publicLinkExpiresAt: { gte: new Date(expiry.getTime() + 1) } } })
		expect(validAtBoundary).toBe(1)
		expect(invalidAfterBoundary).toBe(0)
		const otherZone = zone === 'UTC' ? 'Asia/Baghdad' : 'UTC'
		const otherClient = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, options: `-c TimeZone=${otherZone}` }) })
		clients.push(otherClient)
		const otherRead = await otherClient.invoice.findUniqueOrThrow({ where: { id: invoice.id } })
		expect(otherRead.publicLinkExpiresAt?.toISOString()).toBe(expiry.toISOString())
		const oneHourAfterOriginal = new Date(expiry.getTime() + 60 * 60 * 1000)
		const otherZoneEligible = await otherClient.invoice.count({ where: { id: invoice.id, publicLinkExpiresAt: { gte: oneHourAfterOriginal } } })
		expect(otherZoneEligible).toBe(0)

		await client.$transaction(async tx => {
			await tx.$executeRawUnsafe('CREATE TEMP TABLE a097_expiry_probe (kind text NOT NULL, expires_at timestamptz(6) NOT NULL) ON COMMIT DROP')
			await tx.$executeRawUnsafe('INSERT INTO a097_expiry_probe (kind, expires_at) VALUES (\'direct\', $1)', invoice.publicLinkExpiresAt)
			await tx.$executeRawUnsafe('INSERT INTO a097_expiry_probe (kind, expires_at) SELECT \'utc_projection\', "publicLinkExpiresAt" AT TIME ZONE \'UTC\' FROM "Invoice" WHERE "id" = $1', invoice.id)
			const snapshot = await tx.$queryRawUnsafe<Array<{ kind: string; epoch_ms: bigint }>>('SELECT kind, (extract(epoch FROM expires_at) * 1000)::bigint AS epoch_ms FROM a097_expiry_probe ORDER BY kind')
			const byKind = Object.fromEntries(snapshot.map(row => [row.kind, Number(row.epoch_ms)]))
			expect(byKind.utc_projection).toBe(expiry.getTime())
			expect(byKind.direct).toBe(expiry.getTime() - sessionOffsetMs)
		})
	})
})
