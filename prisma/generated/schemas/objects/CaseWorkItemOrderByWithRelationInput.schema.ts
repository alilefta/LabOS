import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema';
import { CasePricingPlanOrderByWithRelationInputObjectSchema as CasePricingPlanOrderByWithRelationInputObjectSchema } from './CasePricingPlanOrderByWithRelationInput.schema';
import { SelectedToothOrderByRelationAggregateInputObjectSchema as SelectedToothOrderByRelationAggregateInputObjectSchema } from './SelectedToothOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  dentalCaseId: SortOrderSchema.optional(),
  casePricingPlanId: SortOrderSchema.optional(),
  totalPrice: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  additionalToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPriceThreshold: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  jawType: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  Lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  dentalCase: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional(),
  casePricingPlan: z.lazy(() => CasePricingPlanOrderByWithRelationInputObjectSchema).optional(),
  selectedTeeth: z.lazy(() => SelectedToothOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CaseWorkItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseWorkItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemOrderByWithRelationInput>;
export const CaseWorkItemOrderByWithRelationInputObjectZodSchema = makeSchema();
