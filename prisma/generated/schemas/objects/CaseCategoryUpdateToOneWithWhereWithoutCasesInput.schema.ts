import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema';
import { CaseCategoryUpdateWithoutCasesInputObjectSchema as CaseCategoryUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUpdateWithoutCasesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseCategoryUpdateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const CaseCategoryUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateToOneWithWhereWithoutCasesInput>;
export const CaseCategoryUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
