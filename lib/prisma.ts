import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = process.env.DATABASE_URL!

const createPrismaAdapter = () => {
	const caCertificate = process.env.LABOS_DATABASE_CA_CERT
	if (!caCertificate) {
		if (process.env.VERCEL === '1') {
			throw new Error('LABOS_DATABASE_CA_CERT is required on Vercel')
		}
		return new PrismaPg({ connectionString })
	}

	let url: URL
	try {
		url = new URL(connectionString)
	} catch {
		throw new Error('DATABASE_URL is not a valid database URL')
	}
	if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname) {
		throw new Error('DATABASE_URL must identify a PostgreSQL host')
	}

	const ca = caCertificate.replace(/\\n/g, '\n').trim()
	if (
		!ca.includes('-----BEGIN CERTIFICATE-----') ||
		!ca.includes('-----END CERTIFICATE-----') ||
		ca.includes('PRIVATE KEY')
	) {
		throw new Error('LABOS_DATABASE_CA_CERT must contain a CA certificate')
	}

	// pg connection-string options override PoolConfig.ssl, so remove any URI
	// TLS options before installing the verified CA and exact-host policy.
	for (const option of [
		'ssl',
		'sslmode',
		'sslrootcert',
		'sslcert',
		'sslkey',
		'uselibpqcompat',
	]) {
		url.searchParams.delete(option)
	}

	return new PrismaPg({
		connectionString: url.toString(),
		ssl: { ca, rejectUnauthorized: true, servername: url.hostname },
	})
}

const prismaClientSingleton = () => {
	const adapter = createPrismaAdapter()
	return new PrismaClient({ adapter }) // , log: ['query'] for logging
}

declare global {
	var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

const tenantPrismaCache = new Map<
	string,
	ReturnType<typeof createTenantPrisma>
>()

const createTenantPrisma = async (labId: string) =>
	prisma.$extends({
		query: {
			$allModels: {
				async $allOperations({ model, operation, args, query }) {
					if (model === 'Lab' || model === 'SuperUser') {
						return query(args)
					}
					if (
						operation !== 'create' &&
						operation !== 'createMany' &&
						operation !== 'createManyAndReturn'
					) {
						args.where = {
							...args.where,
							labId,
						}
						return query(args)
					}

					if (operation === 'create') {
						if ('lab' in args.data) {
							// If relation is used → don't inject labId
							return query(args)
						}
						args.data = {
							...args.data,
							labId,
						}
						return query(args)
					}

					if (
						operation === 'createMany' ||
						operation === 'createManyAndReturn'
					) {
						if (Array.isArray(args.data)) {
							args.data = args.data.map((item) => ({ ...item, labId }))
						} else {
							args.data = { ...args.data, labId }
						}
						return query(args)
					}
				},
			},
		},
	})

const tenantPrisma = (labId: string) => {
	if (!tenantPrismaCache.has(labId)) {
		tenantPrismaCache.set(labId, createTenantPrisma(labId))
	}
	return tenantPrismaCache.get(labId)!
}

export { tenantPrisma, prisma as generalPrisma }

// cache in development
if (process.env.NODE_ENV !== 'production') {
	globalThis.prismaGlobal = prisma
}
export type TenantPrisma = typeof tenantPrisma
export type TenantPrismaRReturnType = ReturnType<typeof tenantPrisma>
