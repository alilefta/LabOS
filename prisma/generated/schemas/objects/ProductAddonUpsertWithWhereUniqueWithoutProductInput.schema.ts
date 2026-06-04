import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductAddonWhereUniqueInputObjectSchema as ProductAddonWhereUniqueInputObjectSchema } from './ProductAddonWhereUniqueInput.schema';
import { ProductAddonUpdateWithoutProductInputObjectSchema as ProductAddonUpdateWithoutProductInputObjectSchema } from './ProductAddonUpdateWithoutProductInput.schema';
import { ProductAddonUncheckedUpdateWithoutProductInputObjectSchema as ProductAddonUncheckedUpdateWithoutProductInputObjectSchema } from './ProductAddonUncheckedUpdateWithoutProductInput.schema';
import { ProductAddonCreateWithoutProductInputObjectSchema as ProductAddonCreateWithoutProductInputObjectSchema } from './ProductAddonCreateWithoutProductInput.schema';
import { ProductAddonUncheckedCreateWithoutProductInputObjectSchema as ProductAddonUncheckedCreateWithoutProductInputObjectSchema } from './ProductAddonUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductAddonWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductAddonUpdateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductAddonCreateWithoutProductInputObjectSchema), z.lazy(() => ProductAddonUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const ProductAddonUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductAddonUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonUpsertWithWhereUniqueWithoutProductInput>;
export const ProductAddonUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
