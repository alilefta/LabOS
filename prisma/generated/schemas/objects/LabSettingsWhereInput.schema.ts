import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumSupportedCurrencyFilterObjectSchema as EnumSupportedCurrencyFilterObjectSchema } from './EnumSupportedCurrencyFilter.schema';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { EnumSupportedLanguageFilterObjectSchema as EnumSupportedLanguageFilterObjectSchema } from './EnumSupportedLanguageFilter.schema';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const labsettingswhereinputSchema = z.object({
  AND: z.union([z.lazy(() => LabSettingsWhereInputObjectSchema), z.lazy(() => LabSettingsWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => LabSettingsWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => LabSettingsWhereInputObjectSchema), z.lazy(() => LabSettingsWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  currency: z.union([z.lazy(() => EnumSupportedCurrencyFilterObjectSchema), SupportedCurrencySchema]).optional(),
  language: z.union([z.lazy(() => EnumSupportedLanguageFilterObjectSchema), SupportedLanguageSchema]).optional(),
  timezone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  taxRatePercentage: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'taxRatePercentage' must be a Decimal",
})]).optional(),
  invoicePrefix: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  requirePaymentToDeliver: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  autoSendWhatsAppOnCompletion: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  autoEmailInvoices: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional()
}).strict();
export const LabSettingsWhereInputObjectSchema: z.ZodType<Prisma.LabSettingsWhereInput> = labsettingswhereinputSchema as unknown as z.ZodType<Prisma.LabSettingsWhereInput>;
export const LabSettingsWhereInputObjectZodSchema = labsettingswhereinputSchema;
