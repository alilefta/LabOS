import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryScalarWhereInputObjectSchema as CaseCategoryScalarWhereInputObjectSchema } from './CaseCategoryScalarWhereInput.schema';
import { CaseCategoryUpdateManyMutationInputObjectSchema as CaseCategoryUpdateManyMutationInputObjectSchema } from './CaseCategoryUpdateManyMutationInput.schema';
import { CaseCategoryUncheckedUpdateManyWithoutCasesInputObjectSchema as CaseCategoryUncheckedUpdateManyWithoutCasesInputObjectSchema } from './CaseCategoryUncheckedUpdateManyWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseCategoryUpdateManyMutationInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateManyWithoutCasesInputObjectSchema)])
}).strict();
export const CaseCategoryUpdateManyWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateManyWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateManyWithWhereWithoutCasesInput>;
export const CaseCategoryUpdateManyWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
