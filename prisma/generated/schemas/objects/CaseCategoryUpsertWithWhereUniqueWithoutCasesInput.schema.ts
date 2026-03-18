import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateWithoutCasesInputObjectSchema as CaseCategoryUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUpdateWithoutCasesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutCasesInput.schema';
import { CaseCategoryCreateWithoutCasesInputObjectSchema as CaseCategoryCreateWithoutCasesInputObjectSchema } from './CaseCategoryCreateWithoutCasesInput.schema';
import { CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema as CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseCategoryUpdateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutCasesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema)])
}).strict();
export const CaseCategoryUpsertWithWhereUniqueWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpsertWithWhereUniqueWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpsertWithWhereUniqueWithoutCasesInput>;
export const CaseCategoryUpsertWithWhereUniqueWithoutCasesInputObjectZodSchema = makeSchema();
