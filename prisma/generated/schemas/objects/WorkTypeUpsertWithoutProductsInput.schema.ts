import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeUpdateWithoutProductsInputObjectSchema as WorkTypeUpdateWithoutProductsInputObjectSchema } from './WorkTypeUpdateWithoutProductsInput.schema';
import { WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema as WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutProductsInput.schema';
import { WorkTypeCreateWithoutProductsInputObjectSchema as WorkTypeCreateWithoutProductsInputObjectSchema } from './WorkTypeCreateWithoutProductsInput.schema';
import { WorkTypeUncheckedCreateWithoutProductsInputObjectSchema as WorkTypeUncheckedCreateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductsInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => WorkTypeUpdateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema)]),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductsInputObjectSchema)]),
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeUpsertWithoutProductsInputObjectSchema: z.ZodType<Prisma.WorkTypeUpsertWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpsertWithoutProductsInput>;
export const WorkTypeUpsertWithoutProductsInputObjectZodSchema = makeSchema();
