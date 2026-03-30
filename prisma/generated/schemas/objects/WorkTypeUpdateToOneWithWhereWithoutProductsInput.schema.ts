import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema';
import { WorkTypeUpdateWithoutProductsInputObjectSchema as WorkTypeUpdateWithoutProductsInputObjectSchema } from './WorkTypeUpdateWithoutProductsInput.schema';
import { WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema as WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => WorkTypeUpdateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema)])
}).strict();
export const WorkTypeUpdateToOneWithWhereWithoutProductsInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateToOneWithWhereWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateToOneWithWhereWithoutProductsInput>;
export const WorkTypeUpdateToOneWithWhereWithoutProductsInputObjectZodSchema = makeSchema();
