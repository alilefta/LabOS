import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutWorkTypeInputObjectSchema as ProductCreateWithoutWorkTypeInputObjectSchema } from './ProductCreateWithoutWorkTypeInput.schema';
import { ProductUncheckedCreateWithoutWorkTypeInputObjectSchema as ProductUncheckedCreateWithoutWorkTypeInputObjectSchema } from './ProductUncheckedCreateWithoutWorkTypeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutWorkTypeInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutWorkTypeInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutWorkTypeInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutWorkTypeInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutWorkTypeInput>;
export const ProductCreateOrConnectWithoutWorkTypeInputObjectZodSchema = makeSchema();
