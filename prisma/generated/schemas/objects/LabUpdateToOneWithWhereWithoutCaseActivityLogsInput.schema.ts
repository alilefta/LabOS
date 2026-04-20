import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCaseActivityLogsInputObjectSchema as LabUpdateWithoutCaseActivityLogsInputObjectSchema } from './LabUpdateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseActivityLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseActivityLogsInput>;
export const LabUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
