import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema as CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema } from './CaseWorkItemCreateNestedManyWithoutProductInput.schema';
import { LabCreateNestedOneWithoutProductsInputObjectSchema as LabCreateNestedOneWithoutProductsInputObjectSchema } from './LabCreateNestedOneWithoutProductsInput.schema';
import { WorkTypeCreateNestedOneWithoutProductsInputObjectSchema as WorkTypeCreateNestedOneWithoutProductsInputObjectSchema } from './WorkTypeCreateNestedOneWithoutProductsInput.schema';
import { CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema as CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema } from './CasePricingPlanCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemCreateNestedManyWithoutProductInputObjectSchema).optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutProductsInputObjectSchema),
  workType: z.lazy(() => WorkTypeCreateNestedOneWithoutProductsInputObjectSchema),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateInputObjectSchema: z.ZodType<Prisma.ProductCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateInput>;
export const ProductCreateInputObjectZodSchema = makeSchema();
