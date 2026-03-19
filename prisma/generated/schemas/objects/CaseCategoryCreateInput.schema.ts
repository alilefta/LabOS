import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema as WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateNestedManyWithoutCaseCategoryInput.schema';
import { CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema as CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './CaseCreateNestedManyWithoutCaseCategoryInput.schema';
import { LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema as LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema } from './LabCreateNestedOneWithoutCaseCategoriesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  workTypes: z.lazy(() => WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutCaseCategoriesInputObjectSchema)
}).strict();
export const CaseCategoryCreateInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateInput>;
export const CaseCategoryCreateInputObjectZodSchema = makeSchema();
