import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema as LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUpdateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseWorkItemAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInput>;
export const LabUpdateToOneWithWhereWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
