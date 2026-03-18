import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema';
import { WorkTypeUpdateWithoutProductInputObjectSchema as WorkTypeUpdateWithoutProductInputObjectSchema } from './WorkTypeUpdateWithoutProductInput.schema';
import { WorkTypeUncheckedUpdateWithoutProductInputObjectSchema as WorkTypeUncheckedUpdateWithoutProductInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => WorkTypeUpdateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const WorkTypeUpdateToOneWithWhereWithoutProductInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateToOneWithWhereWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateToOneWithWhereWithoutProductInput>;
export const WorkTypeUpdateToOneWithWhereWithoutProductInputObjectZodSchema = makeSchema();
