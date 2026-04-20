import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutCaseActivityLogsInputObjectSchema as CaseUpdateWithoutCaseActivityLogsInputObjectSchema } from './CaseUpdateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseActivityLogsInput.schema';
import { CaseCreateWithoutCaseActivityLogsInputObjectSchema as CaseCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseCreateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedCreateWithoutCaseActivityLogsInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutCaseActivityLogsInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutCaseActivityLogsInput>;
export const CaseUpsertWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
