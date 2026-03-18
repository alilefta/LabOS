import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateWithoutCasesInputObjectSchema as CaseCategoryUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUpdateWithoutCasesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseCategoryUpdateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const CaseCategoryUpdateWithWhereUniqueWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateWithWhereUniqueWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateWithWhereUniqueWithoutCasesInput>;
export const CaseCategoryUpdateWithWhereUniqueWithoutCasesInputObjectZodSchema = makeSchema();
