import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutCaseInputObjectSchema as CaseActivityLogUpdateWithoutCaseInputObjectSchema } from './CaseActivityLogUpdateWithoutCaseInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutCaseInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutCaseInput.schema';
import { CaseActivityLogCreateWithoutCaseInputObjectSchema as CaseActivityLogCreateWithoutCaseInputObjectSchema } from './CaseActivityLogCreateWithoutCaseInput.schema';
import { CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema as CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutCaseInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutCaseInputObjectSchema)])
}).strict();
export const CaseActivityLogUpsertWithWhereUniqueWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutCaseInput>;
export const CaseActivityLogUpsertWithWhereUniqueWithoutCaseInputObjectZodSchema = makeSchema();
