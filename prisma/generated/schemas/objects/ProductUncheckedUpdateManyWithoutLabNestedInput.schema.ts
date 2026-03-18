import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutLabInputObjectSchema as ProductCreateWithoutLabInputObjectSchema } from './ProductCreateWithoutLabInput.schema';
import { ProductUncheckedCreateWithoutLabInputObjectSchema as ProductUncheckedCreateWithoutLabInputObjectSchema } from './ProductUncheckedCreateWithoutLabInput.schema';
import { ProductCreateOrConnectWithoutLabInputObjectSchema as ProductCreateOrConnectWithoutLabInputObjectSchema } from './ProductCreateOrConnectWithoutLabInput.schema';
import { ProductUpsertWithWhereUniqueWithoutLabInputObjectSchema as ProductUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './ProductUpsertWithWhereUniqueWithoutLabInput.schema';
import { ProductCreateManyLabInputEnvelopeObjectSchema as ProductCreateManyLabInputEnvelopeObjectSchema } from './ProductCreateManyLabInputEnvelope.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithWhereUniqueWithoutLabInputObjectSchema as ProductUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './ProductUpdateWithWhereUniqueWithoutLabInput.schema';
import { ProductUpdateManyWithWhereWithoutLabInputObjectSchema as ProductUpdateManyWithWhereWithoutLabInputObjectSchema } from './ProductUpdateManyWithWhereWithoutLabInput.schema';
import { ProductScalarWhereInputObjectSchema as ProductScalarWhereInputObjectSchema } from './ProductScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutLabInputObjectSchema), z.lazy(() => ProductCreateWithoutLabInputObjectSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => ProductCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductScalarWhereInputObjectSchema), z.lazy(() => ProductScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutLabNestedInput>;
export const ProductUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
