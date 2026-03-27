import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { CaseOrderByRelationAggregateInputObjectSchema as CaseOrderByRelationAggregateInputObjectSchema } from './CaseOrderByRelationAggregateInput.schema';
import { DentistOrderByRelationAggregateInputObjectSchema as DentistOrderByRelationAggregateInputObjectSchema } from './DentistOrderByRelationAggregateInput.schema';
import { CasePricingPlanOrderByRelationAggregateInputObjectSchema as CasePricingPlanOrderByRelationAggregateInputObjectSchema } from './CasePricingPlanOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  website: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  zipcode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address1: SortOrderSchema.optional(),
  address2: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  email: SortOrderSchema.optional(),
  phoneNumber: SortOrderSchema.optional(),
  billingEmail: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  billingPhoneNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  taxNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  discount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  creditLimit: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  currentBalance: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  cases: z.lazy(() => CaseOrderByRelationAggregateInputObjectSchema).optional(),
  dentists: z.lazy(() => DentistOrderByRelationAggregateInputObjectSchema).optional(),
  casePricingPlans: z.lazy(() => CasePricingPlanOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ClinicOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ClinicOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ClinicOrderByWithRelationInput>;
export const ClinicOrderByWithRelationInputObjectZodSchema = makeSchema();
