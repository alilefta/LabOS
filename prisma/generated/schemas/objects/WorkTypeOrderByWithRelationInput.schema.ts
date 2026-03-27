import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductOrderByRelationAggregateInputObjectSchema as ProductOrderByRelationAggregateInputObjectSchema } from './ProductOrderByRelationAggregateInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseCategoryOrderByWithRelationInputObjectSchema as CaseCategoryOrderByWithRelationInputObjectSchema } from './CaseCategoryOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  imageUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  labId: SortOrderSchema.optional(),
  caseCategoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  product: z.lazy(() => ProductOrderByRelationAggregateInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  caseCategory: z.lazy(() => CaseCategoryOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const WorkTypeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.WorkTypeOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeOrderByWithRelationInput>;
export const WorkTypeOrderByWithRelationInputObjectZodSchema = makeSchema();
