import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryUpdateWithoutWorkTypesInputObjectSchema as CaseCategoryUpdateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUpdateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutWorkTypesInput.schema';
import { CaseCategoryCreateWithoutWorkTypesInputObjectSchema as CaseCategoryCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryCreateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedCreateWithoutWorkTypesInput.schema';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseCategoryUpdateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCategoryCreateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema)]),
  where: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional()
}).strict();
export const CaseCategoryUpsertWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpsertWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpsertWithoutWorkTypesInput>;
export const CaseCategoryUpsertWithoutWorkTypesInputObjectZodSchema = makeSchema();
