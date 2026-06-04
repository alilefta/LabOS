import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateWithoutLabInputObjectSchema as ProductAddonCreateWithoutLabInputObjectSchema } from './ProductAddonCreateWithoutLabInput.schema';
import { ProductAddonUncheckedCreateWithoutLabInputObjectSchema as ProductAddonUncheckedCreateWithoutLabInputObjectSchema } from './ProductAddonUncheckedCreateWithoutLabInput.schema';
import { ProductAddonCreateOrConnectWithoutLabInputObjectSchema as ProductAddonCreateOrConnectWithoutLabInputObjectSchema } from './ProductAddonCreateOrConnectWithoutLabInput.schema';
import { ProductAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema as ProductAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema } from './ProductAddonUpsertWithWhereUniqueWithoutLabInput.schema';
import { ProductAddonCreateManyLabInputEnvelopeObjectSchema as ProductAddonCreateManyLabInputEnvelopeObjectSchema } from './ProductAddonCreateManyLabInputEnvelope.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema as ProductAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema } from './ProductAddonUpdateWithWhereUniqueWithoutLabInput.schema';
import { ProductAddonUpdateManyWithWhereWithoutLabInputObjectSchema as ProductAddonUpdateManyWithWhereWithoutLabInputObjectSchema } from './ProductAddonUpdateManyWithWhereWithoutLabInput.schema';
import { ProductAddonScalarWhereInputObjectSchema as ProductAddonScalarWhereInputObjectSchema } from './ProductAddonScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductAddonCreateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonCreateWithoutLabInputObjectSchema).array(), z.lazy(() => ProductAddonUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductAddonCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => ProductAddonCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductAddonCreateManyLabInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUpdateWithWhereUniqueWithoutLabInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductAddonUpdateManyWithWhereWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUpdateManyWithWhereWithoutLabInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductAddonScalarWhereInputObjectSchema), z.lazy(() => ProductAddonScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductAddonUncheckedUpdateManyWithoutLabNestedInputObjectSchema: z.ZodType<Prisma.ProductAddonUncheckedUpdateManyWithoutLabNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUncheckedUpdateManyWithoutLabNestedInput>;
export const ProductAddonUncheckedUpdateManyWithoutLabNestedInputObjectZodSchema = makeSchema();
