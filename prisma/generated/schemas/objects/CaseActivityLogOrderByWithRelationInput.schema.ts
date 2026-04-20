import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseOrderByWithRelationInputObjectSchema as CaseOrderByWithRelationInputObjectSchema } from './CaseOrderByWithRelationInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  actorId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  actorName: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  summary: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  dentalCase: z.lazy(() => CaseOrderByWithRelationInputObjectSchema).optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CaseActivityLogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseActivityLogOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogOrderByWithRelationInput>;
export const CaseActivityLogOrderByWithRelationInputObjectZodSchema = makeSchema();
