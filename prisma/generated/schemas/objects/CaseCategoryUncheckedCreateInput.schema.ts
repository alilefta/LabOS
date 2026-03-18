import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInput.schema';
import { CaseUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema as CaseUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean().optional(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  workTypes: z.lazy(() => WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional()
}).strict();
export const CaseCategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CaseCategoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUncheckedCreateInput>;
export const CaseCategoryUncheckedCreateInputObjectZodSchema = makeSchema();
