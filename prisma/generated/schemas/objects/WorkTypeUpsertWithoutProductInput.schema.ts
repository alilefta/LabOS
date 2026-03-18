import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeUpdateWithoutProductInputObjectSchema as WorkTypeUpdateWithoutProductInputObjectSchema } from './WorkTypeUpdateWithoutProductInput.schema';
import { WorkTypeUncheckedUpdateWithoutProductInputObjectSchema as WorkTypeUncheckedUpdateWithoutProductInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutProductInput.schema';
import { WorkTypeCreateWithoutProductInputObjectSchema as WorkTypeCreateWithoutProductInputObjectSchema } from './WorkTypeCreateWithoutProductInput.schema';
import { WorkTypeUncheckedCreateWithoutProductInputObjectSchema as WorkTypeUncheckedCreateWithoutProductInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => WorkTypeUpdateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductInputObjectSchema)]),
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeUpsertWithoutProductInputObjectSchema: z.ZodType<Prisma.WorkTypeUpsertWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpsertWithoutProductInput>;
export const WorkTypeUpsertWithoutProductInputObjectZodSchema = makeSchema();
