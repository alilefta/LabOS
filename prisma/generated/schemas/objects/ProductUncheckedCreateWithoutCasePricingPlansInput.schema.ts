import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  labId: z.string(),
  workTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductUncheckedCreateWithoutCasePricingPlansInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutCasePricingPlansInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateWithoutCasePricingPlansInput>;
export const ProductUncheckedCreateWithoutCasePricingPlansInputObjectZodSchema = makeSchema();
