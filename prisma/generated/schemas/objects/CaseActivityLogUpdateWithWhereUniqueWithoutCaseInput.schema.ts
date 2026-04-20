import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutCaseInputObjectSchema as CaseActivityLogUpdateWithoutCaseInputObjectSchema } from './CaseActivityLogUpdateWithoutCaseInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutCaseInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutCaseInput>;
export const CaseActivityLogUpdateWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
