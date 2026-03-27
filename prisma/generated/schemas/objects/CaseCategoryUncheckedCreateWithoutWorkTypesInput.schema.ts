import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema as CaseUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './CaseUncheckedCreateNestedManyWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional()
}).strict();
export const CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUncheckedCreateWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUncheckedCreateWithoutWorkTypesInput>;
export const CaseCategoryUncheckedCreateWithoutWorkTypesInputObjectZodSchema = makeSchema();
