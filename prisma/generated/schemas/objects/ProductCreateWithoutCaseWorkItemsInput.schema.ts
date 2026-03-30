import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateNestedOneWithoutProductsInputObjectSchema as LabCreateNestedOneWithoutProductsInputObjectSchema } from './LabCreateNestedOneWithoutProductsInput.schema';
import { WorkTypeCreateNestedOneWithoutProductsInputObjectSchema as WorkTypeCreateNestedOneWithoutProductsInputObjectSchema } from './WorkTypeCreateNestedOneWithoutProductsInput.schema';
import { CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema as CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema } from './CasePricingPlanCreateNestedManyWithoutProductInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutProductsInputObjectSchema),
  workType: z.lazy(() => WorkTypeCreateNestedOneWithoutProductsInputObjectSchema),
  casePricingPlans: z.lazy(() => CasePricingPlanCreateNestedManyWithoutProductInputObjectSchema).optional()
}).strict();
export const ProductCreateWithoutCaseWorkItemsInputObjectSchema: z.ZodType<Prisma.ProductCreateWithoutCaseWorkItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateWithoutCaseWorkItemsInput>;
export const ProductCreateWithoutCaseWorkItemsInputObjectZodSchema = makeSchema();
