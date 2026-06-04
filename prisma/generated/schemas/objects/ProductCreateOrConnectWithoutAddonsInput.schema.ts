import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutAddonsInputObjectSchema as ProductCreateWithoutAddonsInputObjectSchema } from './ProductCreateWithoutAddonsInput.schema';
import { ProductUncheckedCreateWithoutAddonsInputObjectSchema as ProductUncheckedCreateWithoutAddonsInputObjectSchema } from './ProductUncheckedCreateWithoutAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutAddonsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutAddonsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutAddonsInput>;
export const ProductCreateOrConnectWithoutAddonsInputObjectZodSchema = makeSchema();
