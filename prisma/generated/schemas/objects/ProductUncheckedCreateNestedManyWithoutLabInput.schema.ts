import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutLabInputObjectSchema as ProductCreateWithoutLabInputObjectSchema } from './ProductCreateWithoutLabInput.schema';
import { ProductUncheckedCreateWithoutLabInputObjectSchema as ProductUncheckedCreateWithoutLabInputObjectSchema } from './ProductUncheckedCreateWithoutLabInput.schema';
import { ProductCreateOrConnectWithoutLabInputObjectSchema as ProductCreateOrConnectWithoutLabInputObjectSchema } from './ProductCreateOrConnectWithoutLabInput.schema';
import { ProductCreateManyLabInputEnvelopeObjectSchema as ProductCreateManyLabInputEnvelopeObjectSchema } from './ProductCreateManyLabInputEnvelope.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutLabInputObjectSchema), z.lazy(() => ProductCreateWithoutLabInputObjectSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => ProductCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutLabInput>;
export const ProductUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
