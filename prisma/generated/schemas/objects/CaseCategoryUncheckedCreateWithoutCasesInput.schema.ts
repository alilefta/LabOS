import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema as WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema } from './WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  labId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  workTypes: z.lazy(() => WorkTypeUncheckedCreateNestedManyWithoutCaseCategoryInputObjectSchema).optional()
}).strict();
export const CaseCategoryUncheckedCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.CaseCategoryUncheckedCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryUncheckedCreateWithoutCasesInput>;
export const CaseCategoryUncheckedCreateWithoutCasesInputObjectZodSchema = makeSchema();
