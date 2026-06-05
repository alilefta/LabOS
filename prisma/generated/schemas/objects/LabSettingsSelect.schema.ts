import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  currency: z.boolean().optional(),
  language: z.boolean().optional(),
  timezone: z.boolean().optional(),
  taxRatePercentage: z.boolean().optional(),
  invoicePrefix: z.boolean().optional(),
  requirePaymentToDeliver: z.boolean().optional(),
  autoSendWhatsAppOnCompletion: z.boolean().optional(),
  autoEmailInvoices: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const LabSettingsSelectObjectSchema: z.ZodType<Prisma.LabSettingsSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsSelect>;
export const LabSettingsSelectObjectZodSchema = makeSchema();
