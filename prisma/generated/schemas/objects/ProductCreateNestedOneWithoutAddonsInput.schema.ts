import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutAddonsInputObjectSchema as ProductCreateWithoutAddonsInputObjectSchema } from './ProductCreateWithoutAddonsInput.schema';
import { ProductUncheckedCreateWithoutAddonsInputObjectSchema as ProductUncheckedCreateWithoutAddonsInputObjectSchema } from './ProductUncheckedCreateWithoutAddonsInput.schema';
import { ProductCreateOrConnectWithoutAddonsInputObjectSchema as ProductCreateOrConnectWithoutAddonsInputObjectSchema } from './ProductCreateOrConnectWithoutAddonsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutAddonsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutAddonsInput>;
export const ProductCreateNestedOneWithoutAddonsInputObjectZodSchema = makeSchema();
