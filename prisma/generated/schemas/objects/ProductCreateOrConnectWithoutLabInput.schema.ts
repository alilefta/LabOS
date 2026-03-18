import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutLabInputObjectSchema as ProductCreateWithoutLabInputObjectSchema } from './ProductCreateWithoutLabInput.schema';
import { ProductUncheckedCreateWithoutLabInputObjectSchema as ProductUncheckedCreateWithoutLabInputObjectSchema } from './ProductUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutLabInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutLabInput>;
export const ProductCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
