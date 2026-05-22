import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema';
import { ClinicOrderByWithRelationInputObjectSchema as ClinicOrderByWithRelationInputObjectSchema } from './ClinicOrderByWithRelationInput.schema';
import { InvoiceCaseOrderByRelationAggregateInputObjectSchema as InvoiceCaseOrderByRelationAggregateInputObjectSchema } from './InvoiceCaseOrderByRelationAggregateInput.schema';
import { InvoicePaymentOrderByRelationAggregateInputObjectSchema as InvoicePaymentOrderByRelationAggregateInputObjectSchema } from './InvoicePaymentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  clinicId: SortOrderSchema.optional(),
  invoiceNumber: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  subtotal: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  appliedDiscountPercentage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  discountReason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  total: SortOrderSchema.optional(),
  amountPaid: SortOrderSchema.optional(),
  amountDue: SortOrderSchema.optional(),
  issuedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dueDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  publicToken: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  publicLinkExpiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional(),
  clinic: z.lazy(() => ClinicOrderByWithRelationInputObjectSchema).optional(),
  cases: z.lazy(() => InvoiceCaseOrderByRelationAggregateInputObjectSchema).optional(),
  payments: z.lazy(() => InvoicePaymentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const InvoiceOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.InvoiceOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.InvoiceOrderByWithRelationInput>;
export const InvoiceOrderByWithRelationInputObjectZodSchema = makeSchema();
