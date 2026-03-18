import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutWorkTypeInputObjectSchema as ProductCreateWithoutWorkTypeInputObjectSchema } from './ProductCreateWithoutWorkTypeInput.schema';
import { ProductUncheckedCreateWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateWithoutWorkTypeInput.schema';
import { ProductCreateOrConnectWithoutWorkTypeInputObjectSchema as ProductCreateOrConnectWithoutWorkTypeInputObjectSchema } from './ProductCreateOrConnectWithoutWorkTypeInput.schema';
import { ProductCreateManyWorkTypeInputEnvelopeObjectSchema as ProductCreateManyWorkTypeInputEnvelopeObjectSchema } from './ProductCreateManyWorkTypeInputEnvelope.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductCreateWithoutWorkTypeInputObjectSchema).array(), z.lazy(() => ProductUncheckedCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWorkTypeInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCreateOrConnectWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductCreateOrConnectWithoutWorkTypeInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCreateManyWorkTypeInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductWhereUniqueInputObjectSchema), z.lazy(() => ProductWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutWorkTypeInput>;
export const ProductUncheckedCreateNestedManyWithoutWorkTypeInputObjectZodSchema = makeSchema();
