import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseWorkItemsInputObjectSchema as LabCreateWithoutCaseWorkItemsInputObjectSchema } from './LabCreateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema as LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema } from './LabCreateOrConnectWithoutCaseWorkItemsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseWorkItemsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCaseWorkItemsInput>;
export const LabCreateNestedOneWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
