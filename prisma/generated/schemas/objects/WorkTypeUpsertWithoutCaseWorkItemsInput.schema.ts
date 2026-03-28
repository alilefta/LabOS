import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUpdateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutCaseWorkItemsInput.schema';
import { WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]),
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional()
}).strict();
export const WorkTypeUpsertWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.WorkTypeUpsertWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpsertWithoutCaseWorkItemsInput>;
export const WorkTypeUpsertWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
