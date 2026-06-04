import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateWithoutProductInputObjectSchema as ProductAddonCreateWithoutProductInputObjectSchema } from './ProductAddonCreateWithoutProductInput.schema';
import { ProductAddonUncheckedCreateWithoutProductInputObjectSchema as ProductAddonUncheckedCreateWithoutProductInputObjectSchema } from './ProductAddonUncheckedCreateWithoutProductInput.schema';
import { ProductAddonCreateOrConnectWithoutProductInputObjectSchema as ProductAddonCreateOrConnectWithoutProductInputObjectSchema } from './ProductAddonCreateOrConnectWithoutProductInput.schema';
import { ProductAddonUpsertWithWhereUniqueWithoutProductInputObjectSchema as ProductAddonUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './ProductAddonUpsertWithWhereUniqueWithoutProductInput.schema';
import { ProductAddonCreateManyProductInputEnvelopeObjectSchema as ProductAddonCreateManyProductInputEnvelopeObjectSchema } from './ProductAddonCreateManyProductInputEnvelope.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateWithWhereUniqueWithoutProductInputObjectSchema as ProductAddonUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './ProductAddonUpdateWithWhereUniqueWithoutProductInput.schema';
import { ProductAddonUpdateManyWithWhereWithoutProductInputObjectSchema as ProductAddonUpdateManyWithWhereWithoutProductInputObjectSchema } from './ProductAddonUpdateManyWithWhereWithoutProductInput.schema';
import { ProductAddonScalarWhereInputObjectSchema as ProductAddonScalarWhereInputObjectSchema } from './ProductAddonScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductAddonCreateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonCreateWithoutProductInputObjectSchema).array(), z.lazy(() => ProductAddonUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductAddonCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => ProductAddonCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductAddonUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductAddonCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductAddonUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductAddonUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductAddonScalarWhereInputObjectSchema), z.lazy(() => ProductAddonScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductAddonUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.ProductAddonUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpdateManyWithoutProductNestedInput>;
export const ProductAddonUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
