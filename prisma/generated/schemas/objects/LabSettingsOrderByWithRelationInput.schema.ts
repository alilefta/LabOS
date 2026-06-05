import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { LabOrderByWithRelationInputObjectSchema as LabOrderByWithRelationInputObjectSchema } from './LabOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  language: SortOrderSchema.optional(),
  timezone: SortOrderSchema.optional(),
  taxRatePercentage: SortOrderSchema.optional(),
  invoicePrefix: SortOrderSchema.optional(),
  requirePaymentToDeliver: SortOrderSchema.optional(),
  autoSendWhatsAppOnCompletion: SortOrderSchema.optional(),
  autoEmailInvoices: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  lab: z.lazy(() => LabOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const LabSettingsOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.LabSettingsOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsOrderByWithRelationInput>;
export const LabSettingsOrderByWithRelationInputObjectZodSchema = makeSchema();
