import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCaseActivityLogsInputObjectSchema as LabUpdateWithoutCaseActivityLogsInputObjectSchema } from './LabUpdateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseActivityLogsInput.schema';
import { LabCreateWithoutCaseActivityLogsInputObjectSchema as LabCreateWithoutCaseActivityLogsInputObjectSchema } from './LabCreateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedCreateWithoutCaseActivityLogsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCaseActivityLogsInput>;
export const LabUpsertWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
