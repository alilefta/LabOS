import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCaseWorkItemsInputObjectSchema as LabUpdateWithoutCaseWorkItemsInputObjectSchema } from './LabUpdateWithoutCaseWorkItemsInput.schema';
import { LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema as LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseWorkItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCaseWorkItemsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseWorkItemsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseWorkItemsInput>;
export const LabUpdateToOneWithWhereWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
