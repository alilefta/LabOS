import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCaseWorkItemsInputObjectSchema as LabCreateWithoutCaseWorkItemsInputObjectSchema } from './LabCreateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCaseWorkItemsInput>;
export const LabCreateOrConnectWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
