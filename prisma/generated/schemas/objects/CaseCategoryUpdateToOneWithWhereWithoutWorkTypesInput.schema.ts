import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryWhereInputObjectSchema as CaseCategoryWhereInputObjectSchema } from './CaseCategoryWhereInput.schema';
import { CaseCategoryUpdateWithoutWorkTypesInputObjectSchema as CaseCategoryUpdateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUpdateWithoutWorkTypesInput.schema';
import { CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema as CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema } from './CaseCategoryUncheckedUpdateWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CaseCategoryUpdateWithoutWorkTypesInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateWithoutWorkTypesInputObjectSchema)])
}).strict();
export const CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInput>;
export const CaseCategoryUpdateToOneWithWhereWithoutWorkTypesInputObjectZodSchema = makeSchema();
