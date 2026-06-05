import * as z from 'zod';
import { Prisma } from '../../../../generated/prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { EnumSupportedCurrencyFieldUpdateOperationsInputObjectSchema as EnumSupportedCurrencyFieldUpdateOperationsInputObjectSchema } from './EnumSupportedCurrencyFieldUpdateOperationsInput.schema';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { EnumSupportedLanguageFieldUpdateOperationsInputObjectSchema as EnumSupportedLanguageFieldUpdateOperationsInputObjectSchema } from './EnumSupportedLanguageFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  labId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  currency: z.union([SupportedCurrencySchema, z.lazy(() => EnumSupportedCurrencyFieldUpdateOperationsInputObjectSchema)]).optional(),
  language: z.union([SupportedLanguageSchema, z.lazy(() => EnumSupportedLanguageFieldUpdateOperationsInputObjectSchema)]).optional(),
  timezone: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  taxRatePercentage: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'taxRatePercentage' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  invoicePrefix: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  requirePaymentToDeliver: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  autoSendWhatsAppOnCompletion: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  autoEmailInvoices: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const LabSettingsUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.LabSettingsUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabSettingsUncheckedUpdateInput>;
export const LabSettingsUncheckedUpdateInputObjectZodSchema = makeSchema();
