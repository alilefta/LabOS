import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema as WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './WorkTypeCreateNestedManyWithoutCaseCategoryInput.schema';
import { CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema as CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './CaseCreateNestedManyWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workTypes: z.lazy(() => WorkTypeCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional(),
  cases: z.lazy(() => CaseCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional()
}).strict();
export const CaseCategoryCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseCategoryCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryCreateWithoutLabInput>;
export const CaseCategoryCreateWithoutLabInputObjectZodSchema = makeSchema();
