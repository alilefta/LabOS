import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  labId: z.string(),
  currency: SupportedCurrencySchema.optional(),
  language: SupportedLanguageSchema.optional(),
  timezone: z.string().optional(),
  taxRatePercentage: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'taxRatePercentage' must be a Decimal",
}).optional(),
  invoicePrefix: z.string().optional(),
  requirePaymentToDeliver: z.boolean().optional(),
  autoSendWhatsAppOnCompletion: z.boolean().optional(),
  autoEmailInvoices: z.boolean().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const LabSettingsCreateManyInputObjectSchema: z.ZodType<Prisma.LabSettingsCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsCreateManyInput>;
export const LabSettingsCreateManyInputObjectZodSchema = makeSchema();
