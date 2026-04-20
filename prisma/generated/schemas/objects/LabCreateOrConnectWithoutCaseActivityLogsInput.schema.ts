import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutCaseActivityLogsInputObjectSchema as LabCreateWithoutCaseActivityLogsInputObjectSchema } from './LabCreateWithoutCaseActivityLogsInput.schema';
import { LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './LabUncheckedCreateWithoutCaseActivityLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutCaseActivityLogsInput>;
export const LabCreateOrConnectWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
