import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateOrConnectWithoutCaseWorkItemsInput.schema';
import { WorkTypeUpsertWithoutCaseWorkItemsInputObjectSchema as WorkTypeUpsertWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUpsertWithoutCaseWorkItemsInput.schema';
import { WorkTypeWhereInputObjectSchema as WorkTypeWhereInputObjectSchema } from './WorkTypeWhereInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema as WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInput.schema';
import { WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUpdateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => WorkTypeUpsertWithoutCaseWorkItemsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => WorkTypeWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => WorkTypeWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => WorkTypeUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)]).optional()
}).strict();
export const WorkTypeUpdateOneWithoutCaseWorkItemsNestedInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateOneWithoutCaseWorkItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateOneWithoutCaseWorkItemsNestedInput>;
export const WorkTypeUpdateOneWithoutCaseWorkItemsNestedInputObjectZodSchema = makeSchema();
