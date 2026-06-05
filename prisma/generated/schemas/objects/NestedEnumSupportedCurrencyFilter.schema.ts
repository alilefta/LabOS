import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema'

const nestedenumsupportedcurrencyfilterSchema = z.object({
  equals: SupportedCurrencySchema.optional(),
  in: SupportedCurrencySchema.array().optional(),
  notIn: SupportedCurrencySchema.array().optional(),
  not: z.union([SupportedCurrencySchema, z.lazy(() => NestedEnumSupportedCurrencyFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSupportedCurrencyFilterObjectSchema: z.ZodType<Prisma.NestedEnumSupportedCurrencyFilter> = nestedenumsupportedcurrencyfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSupportedCurrencyFilter>;
export const NestedEnumSupportedCurrencyFilterObjectZodSchema = nestedenumsupportedcurrencyfilterSchema;
