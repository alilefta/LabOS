import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema as LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUpdateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseWorkItemAddonsInput.schema';
import { LabCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema as LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema } from './LabUncheckedCreateWithoutCaseWorkItemAddonsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseWorkItemAddonsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCaseWorkItemAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseWorkItemAddonsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCaseWorkItemAddonsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCaseWorkItemAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCaseWorkItemAddonsInput>;
export const LabUpsertWithoutCaseWorkItemAddonsInputObjectZodSchema = makeSchema();
