import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutOriginalCaseInputObjectSchema as CaseUpdateWithoutOriginalCaseInputObjectSchema } from './CaseUpdateWithoutOriginalCaseInput.schema';
import { CaseUncheckedUpdateWithoutOriginalCaseInputObjectSchema as CaseUncheckedUpdateWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedUpdateWithoutOriginalCaseInput.schema';
import { CaseCreateWithoutOriginalCaseInputObjectSchema as CaseCreateWithoutOriginalCaseInputObjectSchema } from './CaseCreateWithoutOriginalCaseInput.schema';
import { CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema as CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedCreateWithoutOriginalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseUpdateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutOriginalCaseInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutOriginalCaseInputObjectSchema)])
}).strict();
export const CaseUpsertWithWhereUniqueWithoutOriginalCaseInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutOriginalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithWhereUniqueWithoutOriginalCaseInput>;
export const CaseUpsertWithWhereUniqueWithoutOriginalCaseInputObjectZodSchema = makeSchema();
