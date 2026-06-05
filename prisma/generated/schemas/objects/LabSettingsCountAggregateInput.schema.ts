import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  currency: z.literal(true).optional(),
  language: z.literal(true).optional(),
  timezone: z.literal(true).optional(),
  taxRatePercentage: z.literal(true).optional(),
  invoicePrefix: z.literal(true).optional(),
  requirePaymentToDeliver: z.literal(true).optional(),
  autoSendWhatsAppOnCompletion: z.literal(true).optional(),
  autoEmailInvoices: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const LabSettingsCountAggregateInputObjectSchema: z.ZodType<Prisma.LabSettingsCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsCountAggregateInputType>;
export const LabSettingsCountAggregateInputObjectZodSchema = makeSchema();
