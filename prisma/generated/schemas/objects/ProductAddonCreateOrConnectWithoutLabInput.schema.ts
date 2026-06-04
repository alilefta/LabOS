import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonCreateWithoutLabInputObjectSchema as ProductAddonCreateWithoutLabInputObjectSchema } from './ProductAddonCreateWithoutLabInput.schema';
import { ProductAddonUncheckedCreateWithoutLabInputObjectSchema as ProductAddonUncheckedCreateWithoutLabInputObjectSchema } from './ProductAddonUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductAddonCreateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const ProductAddonCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductAddonCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonCreateOrConnectWithoutLabInput>;
export const ProductAddonCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
