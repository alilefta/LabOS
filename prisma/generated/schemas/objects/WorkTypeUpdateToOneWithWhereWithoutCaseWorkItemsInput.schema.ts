import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema';
import { WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUpdateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)])
}).strict();
export const WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInput>;
export const WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
