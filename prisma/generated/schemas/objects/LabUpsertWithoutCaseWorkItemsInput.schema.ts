import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCaseWorkItemsInputObjectSchema as LabUpdateWithoutCaseWorkItemsInputObjectSchema } from './LabUpdateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseWorkItemsInput.schema';
import { LabCreateWithoutCaseWorkItemsInputObjectSchema as LabCreateWithoutCaseWorkItemsInputObjectSchema } from './LabCreateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCaseWorkItemsInput>;
export const LabUpsertWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
