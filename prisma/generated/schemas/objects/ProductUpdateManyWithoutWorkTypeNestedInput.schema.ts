import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutWorkTypeInputObjectSchema as ProductCreateWithoutWorkTypeInputObjectSchema } from './ProductCreateWithoutWorkTypeInput.schema';
import { ProductUncheckedCreateWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateWithoutWorkTypeInput.schema';
import { ProductCreateOrConnectWithoutWorkTypeInputObjectSchema as ProductCreateOrConnectWithoutWorkTypeInputObjectSchema } from './ProductCreateOrConnectWithoutWorkTypeInput.schema';
import { ProductUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema as ProductUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema } from './ProductUpsertWithWhereUniqueWithoutWorkTypeInput.schema';
import { ProductCreateManyWorkTypeInputEnvelopeObjectSchema as ProductCreateManyWorkTypeInputEnvelopeObjectSchema } from './ProductCreateManyWorkTypeInputEnvelope.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema as ProductUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema } from './ProductUpdateWithWhereUniqueWithoutWorkTypeInput.schema';
import { ProductUpdateManyWithWhereWithoutWorkTypeInputObjectSchema as ProductUpdateManyWithWhereWithoutWorkTypeInputObjectSchema } from './ProductUpdateManyWithWhereWithoutWorkTypeInput.schema';
import { ProductScalarWhereInputObjectSchema as ProductScalarWhereInputObjectSchema } from './ProductScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductCreateWithoutWorkTypeInputObjectSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWorkTypeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductCreateOrConnectWithoutWorkTypeInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUpsertWithWhereUniqueWithoutWorkTypeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyWorkTypeInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUpdateWithWhereUniqueWithoutWorkTypeInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductUpdateManyWithWhereWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUpdateManyWithWhereWithoutWorkTypeInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductScalarWhereInputObjectSchema), z.lazy(() => ProductScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductUpdateManyWithoutWorkTypeNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateManyWithoutWorkTypeNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateManyWithoutWorkTypeNestedInput>;
export const ProductUpdateManyWithoutWorkTypeNestedInputObjectZodSchema = makeSchema();
