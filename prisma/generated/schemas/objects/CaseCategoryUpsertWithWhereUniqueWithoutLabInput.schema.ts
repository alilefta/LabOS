import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateWithoutLabInputObjectSchema as CaseCategoryUpdateWithoutLabInputObjectSchema } from './CaseCategoryUpdateWithoutLabInput.schema';
import { CaseCategoryUncheckedUpdateWithoutLabInputObjectSchema as CaseCategoryUncheckedUpdateWithoutLabInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutLabInput.schema';
import { CaseCategoryCreateWithoutLabInputObjectSchema as CaseCategoryCreateWithoutLabInputObjectSchema } from './CaseCategoryCreateWithoutLabInput.schema';
import { CaseCategoryUncheckedCreateWithoutLabInputObjectSchema as CaseCategoryUncheckedCreateWithoutLabInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseCategoryUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseCategoryUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpsertWithWhereUniqueWithoutLabInput>;
export const CaseCategoryUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
