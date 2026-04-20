import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseUpdateWithoutCaseActivityLogsInputObjectSchema as CaseUpdateWithoutCaseActivityLogsInputObjectSchema } from './CaseUpdateWithoutCaseActivityLogsInput.schema';
import { CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema as CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseActivityLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseUpdateWithoutCaseActivityLogsInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseActivityLogsInputObjectSchema)])
}).strict();
export const CaseUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectSchema: z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutCaseActivityLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateToOneWithWhereWithoutCaseActivityLogsInput>;
export const CaseUpdateToOneWithWhereWithoutCaseActivityLogsInputObjectZodSchema = makeSchema();
