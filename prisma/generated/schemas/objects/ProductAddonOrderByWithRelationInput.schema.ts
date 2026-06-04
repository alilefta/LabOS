import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseWorkItemAddonOrderByRelationAggregateInputObjectSchema as CaseWorkItemAddonOrderByRelationAggregateInputObjectSchema } from './CaseWorkItemAddonOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  isArchived: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  caseWorkItemAddons: z.lazy(() => CaseWorkItemAddonOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ProductAddonOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductAddonOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductAddonOrderByWithRelationInput>;
export const ProductAddonOrderByWithRelationInputObjectZodSchema = makeSchema();
