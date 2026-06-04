import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateWithoutLabInputObjectSchema as ProductAddonUpdateWithoutLabInputObjectSchema } from './ProductAddonUpdateWithoutLabInput.schema';
import { ProductAddonUncheckedUpdateWithoutLabInputObjectSchema as ProductAddonUncheckedUpdateWithoutLabInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutLabInput.schema';
import { ProductAddonCreateWithoutLabInputObjectSchema as ProductAddonCreateWithoutLabInputObjectSchema } from './ProductAddonCreateWithoutLabInput.schema';
import { ProductAddonUncheckedCreateWithoutLabInputObjectSchema as ProductAddonUncheckedCreateWithoutLabInputObjectSchema } from './ProductAddonUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductAddonUpdateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductAddonCreateWithoutLabInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const ProductAddonUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.ProductAddonUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpsertWithWhereUniqueWithoutLabInput>;
export const ProductAddonUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
