import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseCreateWithoutCaseActivityLogsInputObjectSchema as CaseCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseActivityLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)])
}).strict();
export const CaseCreateOrConnectWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateOrConnectWithoutCaseActivityLogsInput>;
export const CaseCreateOrConnectWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
