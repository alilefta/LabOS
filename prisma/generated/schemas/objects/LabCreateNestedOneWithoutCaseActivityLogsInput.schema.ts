import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseActivityLogsInputObjectSchema as LabCreateWithoutCaseActivityLogsInputObjectSchema } from './LabCreateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedCreateWithoutCaseActivityLogsInput.schema';
import { LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema as LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema } from './LabCreateOrConnectWithoutCaseActivityLogsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutCaseActivityLogsInput>;
export const LabCreateNestedOneWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
