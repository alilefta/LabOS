import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeCreateWithoutCaseWorkItemsInput.schema';
import { WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)])
}).strict();
export const WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutCaseWorkItemsInput>;
export const WorkTypeCreateOrConnectWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
