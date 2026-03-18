import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CaseWorkItemOrderByWithRelationInputObjectSchema as CaseWorkItemOrderByWithRelationInputObjectSchema } from './CaseWorkItemOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  toothPosition: SortOrderSchema.optional(),
  caseWorkItemId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  caseWorkItem: z.lazy(() => CaseWorkItemOrderByWithRelationInputObjectSchema).optional(),
  Lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const SelectedToothOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.SelectedToothOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.SelectedToothOrderByWithRelationInput>;
export const SelectedToothOrderByWithRelationInputObjectZodSchema = makeSchema();
