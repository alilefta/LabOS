import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateOrConnectWithoutCaseWorkItemsInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema).optional(),
  connect: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).optional()
}).strict();
export const WorkTypeCreateNestedOneWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateNestedOneWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateNestedOneWithoutCaseWorkItemsInput>;
export const WorkTypeCreateNestedOneWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
