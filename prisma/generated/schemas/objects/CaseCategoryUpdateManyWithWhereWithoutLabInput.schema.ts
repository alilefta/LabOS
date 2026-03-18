import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCategoryScalarWhereInputObjectSchema as CaseCategoryScalarWhereInputObjectSchema } from './CaseCategoryScalarWhereInput.schema';
import { CaseCategoryUpdateManyMutationInputObjectSchema as CaseCategoryUpdateManyMutationInputObjectSchema } from './CaseCategoryUpdateManyMutationInput.schema';
import { CaseCategoryUncheckedUpdateManyWithoutLabInputObjectSchema as CaseCategoryUncheckedUpdateManyWithoutLabInputObjectSchema } from './CaseCategoryUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseCategoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CaseCategoryUpdateManyMutationInputObjectSchema), z.lazy(() => CaseCategoryUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const CaseCategoryUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUpdateManyWithWhereWithoutLabInput>;
export const CaseCategoryUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
