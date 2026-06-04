import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductCreateWithoutAddonsInputObjectSchema as ProductCreateWithoutAddonsInputObjectSchema } from './ProductCreateWithoutAddonsInput.schema';
import { ProductUncheckedCreateWithoutAddonsInputObjectSchema as ProductUncheckedCreateWithoutAddonsInputObjectSchema } from './ProductUncheckedCreateWithoutAddonsInput.schema';
import { ProductCreateOrConnectWithoutAddonsInputObjectSchema as ProductCreateOrConnectWithoutAddonsInputObjectSchema } from './ProductCreateOrConnectWithoutAddonsInput.schema';
import { ProductUpsertWithoutAddonsInputObjectSchema as ProductUpsertWithoutAddonsInputObjectSchema } from './ProductUpsertWithoutAddonsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutAddonsInputObjectSchema as ProductUpdateToOneWithWhereWithoutAddonsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutAddonsInput.schema';
import { ProductUpdateWithoutAddonsInputObjectSchema as ProductUpdateWithoutAddonsInputObjectSchema } from './ProductUpdateWithoutAddonsInput.schema';
import { ProductUncheckedUpdateWithoutAddonsInputObjectSchema as ProductUncheckedUpdateWithoutAddonsInputObjectSchema } from './ProductUncheckedUpdateWithoutAddonsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutAddonsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutAddonsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutAddonsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutAddonsInputObjectSchema), z.lazy(() => ProductUpdateWithoutAddonsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutAddonsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutAddonsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutAddonsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutAddonsNestedInput>;
export const ProductUpdateOneRequiredWithoutAddonsNestedInputObjectZodSchema = makeSchema();
