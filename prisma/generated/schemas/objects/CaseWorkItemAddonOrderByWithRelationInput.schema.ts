import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CaseWorkItemOrderByWithRelationInputObjectSchema as CaseWorkItemOrderByWithRelationInputObjectSchema } from './CaseWorkItemOrderByWithRelationInput.schema';
import { ProductAddonOrderByWithRelationInputObjectSchema as ProductAddonOrderByWithRelationInputObjectSchema } from './ProductAddonOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseWorkItemId: SortOrderSchema.optional(),
  addonId: SortOrderSchema.optional(),
  priceSnapshot: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemOrderByWithRelationInputObjectSchema).optional(),
  addon: z.lazy(() => ProductAddonOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseWorkItemAddonOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonOrderByWithRelationInput>;
export const CaseWorkItemAddonOrderByWithRelationInputObjectZodSchema = makeSchema();
