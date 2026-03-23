import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryUpdateWithoutCasesInputObjectSchema as CaseCategoryUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUpdateWithoutCasesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutCasesInput.schema';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseCategoryUpdateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional()
}).strict();
export const CaseCategoryUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpsertWithoutCasesInput>;
export const CaseCategoryUpsertWithoutCasesInputObjectZodSchema = makeSchema();
