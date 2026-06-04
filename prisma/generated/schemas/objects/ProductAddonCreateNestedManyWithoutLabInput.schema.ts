import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonCreateWithoutLabInputObjectSchema as ProductAddonCreateWithoutLabInputObjectSchema } from './ProductAddonCreateWithoutLabInput.schema';
import { ProductAddonUncheckedCreateWithoutLabInputObjectSchema as ProductAddonUncheckedCreateWithoutLabInputObjectSchema } from './ProductAddonUncheckedCreateWithoutLabInput.schema';
import { ProductAddonCreateOrConnectWithoutLabInputObjectSchema as ProductAddonCreateOrConnectWithoutLabInputObjectSchema } from './ProductAddonCreateOrConnectWithoutLabInput.schema';
import { ProductAddonCreateManyLabInputEnvelopeObjectSchema as ProductAddonCreateManyLabInputEnvelopeObjectSchema } from './ProductAddonCreateManyLabInputEnvelope.schema';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductAddonCreateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonCreateWithoutLabInputObjectSchema).array(), z.lazy(() => ProductAddonUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductAddonCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => ProductAddonCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductAddonCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductAddonWhereUniqueInputObjectSchema), z.lazy(() => ProductAddonWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductAddonCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateNestedManyWithoutLabInput>;
export const ProductAddonCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
