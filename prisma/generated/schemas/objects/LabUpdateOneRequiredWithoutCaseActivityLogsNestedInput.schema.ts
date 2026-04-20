import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseActivityLogsInputObjectSchema as LabCreateWithoutCaseActivityLogsInputObjectSchema } from './LabCreateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedCreateWithoutCaseActivityLogsInput.schema';
import { LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema as LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema } from './LabCreateOrConnectWithoutCaseActivityLogsInput.schema';
import { LabUpsertWithoutCaseActivityLogsInputObjectSchema as LabUpsertWithoutCaseActivityLogsInputObjectSchema } from './LabUpsertWithoutCaseActivityLogsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema as LabUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCaseActivityLogsInput.schema';
import { LabUpdateWithoutCaseActivityLogsInputObjectSchema as LabUpdateWithoutCaseActivityLogsInputObjectSchema } from './LabUpdateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedUpdateWithoutCaseActivityLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCaseActivityLogsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUpdateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseActivityLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseActivityLogsNestedInput>;
export const LabUpdateOneRequiredWithoutCaseActivityLogsNestedInputObjectZodSchema = makeSchema();
