import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { WorkTypeOrderByRelationAggregateInputObjectSchema as WorkTypeOrderByRelationAggregateInputObjectSchema } from './WorkTypeOrderByRelationAggregateInput.schema';
import { CaseOrderByRelationAggregateInputObjectSchema as CaseOrderByRelationAggregateInputObjectSchema } from './CaseOrderByRelationAggregateInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  workTypes: z.lazy(() => WorkTypeOrderByRelationAggregateInputObjectSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputObjectSchema).optional(),
  Lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseCategoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseCategoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCategoryOrderByWithRelationInput>;
export const CaseCategoryOrderByWithRelationInputObjectZodSchema = makeSchema();
