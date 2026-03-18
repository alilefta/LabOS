import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema as CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './CaseCreateNestedManyWithoutCaseCategoryInput.schema';
import { LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema as LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema } from './LabCreateNestedOneWithoutCaseCategoriesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional(),
  Lab: z.lazy(() => LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema)
}).strict();
export const CaseCategoryCreateWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateWithoutWorkTypesInput>;
export const CaseCategoryCreateWithoutWorkTypesInputObjectZodSchema = makeSchema();
