import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema as CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './CaseWorkItemUncheckedCreateNestedManyWithoutProductInput.schema';
import { CasePricingPlanUncheckedCreateNestedManyWithoutProductInputObjectSchema as CasePricingPlanUncheckedCreateNestedManyWithoutProductInputObjectSchema } from './CasePricingPlanUncheckedCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  labId: z.string(),
  workTypeId: z.string(),
  createdAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanUncheckedCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUncheckedCreateInput>;
export const ProductUncheckedCreateInputObjectZodSchema = makeSchema();
