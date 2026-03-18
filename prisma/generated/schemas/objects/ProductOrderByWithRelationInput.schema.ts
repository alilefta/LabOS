import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CaseWorkItemOrderByRelationAggregateInputObjectSchema as CaseWorkItemOrderByRelationAggregateInputObjectSchema } from './CaseWorkItemOrderByRelationAggregateInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { WorkTypeOrderByWithRelationInputObjectSchema as WorkTypeOrderByWithRelationInputObjectSchema } from './WorkTypeOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  imageUrl: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  workTypeId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  caseWorkItems: z.lazy(() => CaseWorkItemOrderByRelationAggregateInputObjectSchema).optional(),
  Lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  workType: z.lazy(() => WorkTypeOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ProductOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOrderByWithRelationInput>;
export const ProductOrderByWithRelationInputObjectZodSchema = makeSchema();
