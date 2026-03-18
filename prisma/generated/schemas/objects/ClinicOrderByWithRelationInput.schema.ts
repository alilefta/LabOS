import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseOrderByRelationAggregateInputObjectSchema as CaseOrderByRelationAggregateInputObjectSchema } from './CaseOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  city: SortOrderSchema.optional(),
  zipcode: SortOrderSchema.optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  Lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ClinicOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ClinicOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicOrderByWithRelationInput>;
export const ClinicOrderByWithRelationInputObjectZodSchema = makeSchema();
