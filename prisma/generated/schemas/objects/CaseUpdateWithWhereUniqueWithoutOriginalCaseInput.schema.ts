import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutOriginalCaseInputObjectSchema as CaseUpdateWithoutOriginalCaseInputObjectSchema } from './CaseUpdateWithoutOriginalCaseInput.schema';
import { CaseUncheckedUpdateWithoutOriginalCaseInputObjectSchema as CaseUncheckedUpdateWithoutOriginalCaseInputObjectSchema } from './CaseUncheckedUpdateWithoutOriginalCaseInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutOriginalCaseInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutOriginalCaseInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutOriginalCaseInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutOriginalCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutOriginalCaseInput>;
export const CaseUpdateWithWhereUniqueWithoutOriginalCaseInputObjectZodSchema = makeSchema();
