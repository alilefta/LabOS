import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateWithoutProductInputObjectSchema as ProductAddonCreateWithoutProductInputObjectSchema } from './ProductAddonCreateWithoutProductInput.schema';
import { ProductAddonUncheckedCreateWithoutProductInputObjectSchema as ProductAddonUncheckedCreateWithoutProductInputObjectSchema } from './ProductAddonUncheckedCreateWithoutProductInput.schema';
import { ProductAddonCreateOrConnectWithoutProductInputObjectSchema as ProductAddonCreateOrConnectWithoutProductInputObjectSchema } from './ProductAddonCreateOrConnectWithoutProductInput.schema';
import { ProductAddonCreateManyProductInputEnvelopeObjectSchema as ProductAddonCreateManyProductInputEnvelopeObjectSchema } from './ProductAddonCreateManyProductInputEnvelope.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductAddonCreateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonCreateWithoutProductInputObjectSchema).array(), z.lazy(() => ProductAddonUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductAddonCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => ProductAddonCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductAddonCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductAddonUncheckedCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonUncheckedCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUncheckedCreateNestedManyWithoutProductInput>;
export const ProductAddonUncheckedCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
