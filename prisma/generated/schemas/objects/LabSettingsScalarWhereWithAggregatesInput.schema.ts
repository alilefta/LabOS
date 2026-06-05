import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumSupportedCurrencyWithAggregatesFilterObjectSchema as EnumSupportedCurrencyWithAggregatesFilterObjectSchema } from './EnumSupportedCurrencyWithAggregatesFilter.schema';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { EnumSupportedLanguageWithAggregatesFilterObjectSchema as EnumSupportedLanguageWithAggregatesFilterObjectSchema } from './EnumSupportedLanguageWithAggregatesFilter.schema';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const labsettingsscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => LabSettingsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabSettingsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabSettingsScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabSettingsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => LabSettingsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  currency: z.union([z.lazy(() => EnumSupportedCurrencyWithAggregatesFilterObjectSchema), SupportedCurrencySchema]).optional(),
  language: z.union([z.lazy(() => EnumSupportedLanguageWithAggregatesFilterObjectSchema), SupportedLanguageSchema]).optional(),
  timezone: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  taxRatePercentage: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'taxRatePercentage' must be a Decimal",
})]).optional(),
  invoicePrefix: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  requirePaymentToDeliver: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  autoSendWhatsAppOnCompletion: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  autoEmailInvoices: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const LabSettingsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.LabSettingsScalarWhereWithAggregatesInput> = labsettingsscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.LabSettingsScalarWhereWithAggregatesInput>;
export const LabSettingsScalarWhereWithAggregatesInputObjectZodSchema = labsettingsscalarwherewithaggregatesinputSchema;
