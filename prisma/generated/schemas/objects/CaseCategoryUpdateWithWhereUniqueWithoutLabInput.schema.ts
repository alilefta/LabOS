import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereUniqueInputObjectSchema as CaseCategoryWhereUniqueInputObjectSchema } from './CaseCategoryWhereUniqueInput.schema';
import { CaseCategoryUpdateWithoutLabInputObjectSchema as CaseCategoryUpdateWithoutLabInputObjectSchema } from './CaseCategoryUpdateWithoutLabInput.schema';
import { CaseCategoryUncheckedUpdateWithoutLabInputObjectSchema as CaseCategoryUncheckedUpdateWithoutLabInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseCategoryUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseCategoryUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateWithWhereUniqueWithoutLabInput>;
export const CaseCategoryUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
