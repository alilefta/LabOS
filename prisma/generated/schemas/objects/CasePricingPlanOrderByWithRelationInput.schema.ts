import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseWorkItemOrderByRelationAggregateInputObjectSchema as CaseWorkItemOrderByRelationAggregateInputObjectSchema } from './CaseWorkItemOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  pricingStrategy: SortOrderSchema.optional(),
  firstToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  additionalToothPrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  bulkPriceThreshold: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  Lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CasePricingPlanOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CasePricingPlanOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CasePricingPlanOrderByWithRelationInput>;
export const CasePricingPlanOrderByWithRelationInputObjectZodSchema = makeSchema();
