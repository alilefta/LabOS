import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema';
import { CaseUpdateWithoutCaseCategoryInputObjectSchema as CaseUpdateWithoutCaseCategoryInputObjectSchema } from './CaseUpdateWithoutCaseCategoryInput.schema';
import { CaseUncheckedUpdateWithoutCaseCategoryInputObjectSchema as CaseUncheckedUpdateWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedUpdateWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseUpdateWithoutCaseCategoryInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutCaseCategoryInputObjectSchema)])
}).strict();
export const CaseUpdateWithWhereUniqueWithoutCaseCategoryInputObjectSchema: z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutCaseCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpdateWithWhereUniqueWithoutCaseCategoryInput>;
export const CaseUpdateWithWhereUniqueWithoutCaseCategoryInputObjectZodSchema = makeSchema();
