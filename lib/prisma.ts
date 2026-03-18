import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;

const prismaClientSingleton = () => {
	const adapter = new PrismaPg({ connectionString });
	return new PrismaClient({ adapter });
};

declare global {
	var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

const tenantPrisma = (labId: string) =>
	prisma.$extends({
		query: {
			$allModels: {
				async $allOperations({ model, operation, args, query }) {
					if (model === "Lab" || model === "SuperUser") {
						return query(args);
					}
					if (operation !== "create" && operation !== "createMany" && operation !== "createManyAndReturn") {
						args.where = {
							...args.where,
							labId,
						};
						return query(args);
					}

					if (operation === "create") {
						if ("Lab" in args.data) {
							// If relation is used → don't inject labId
							return query(args);
						}
						args.data = {
							...args.data,
							labId,
						};
						return query(args);
					}

					if (operation === "createMany" || operation === "createManyAndReturn") {
						if (Array.isArray(args.data)) {
							args.data = args.data.map((item) => ({ ...item, labId }));
						} else {
							args.data = { ...args.data, labId };
						}
						return query(args);
					}
				},
			},
		},
	});

export default tenantPrisma;

// cache in development
if (process.env.NODE_ENV !== "production") {
	globalThis.prismaGlobal = prisma;
}

export type TenantPrisma = ReturnType<typeof tenantPrisma>;
