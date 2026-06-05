import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { LabCreateNestedOneWithoutSettingsInputObjectSchema as LabCreateNestedOneWithoutSettingsInputObjectSchema } from './LabCreateNestedOneWithoutSettingsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  lab: z.lazy(() => LabCreateNestedOneWithoutSettingsInputObjectSchema)
}).strict();
export const LabSettingsCreateInputObjectSchema: z.ZodType<Prisma.LabSettingsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsCreateInput>;
export const LabSettingsCreateInputObjectZodSchema = makeSchema();
