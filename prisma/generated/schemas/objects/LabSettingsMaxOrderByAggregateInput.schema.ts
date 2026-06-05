import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

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
  updatedAt: SortOrderSchema.optional()
}).strict();
export const LabSettingsMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.LabSettingsMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsMaxOrderByAggregateInput>;
export const LabSettingsMaxOrderByAggregateInputObjectZodSchema = makeSchema();
