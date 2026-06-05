import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSupportedCurrencyFilterObjectSchema as NestedEnumSupportedCurrencyFilterObjectSchema } from './NestedEnumSupportedCurrencyFilter.schema'

const nestedenumsupportedcurrencywithaggregatesfilterSchema = z.object({
  equals: SupportedCurrencySchema.optional(),
  in: SupportedCurrencySchema.array().optional(),
  notIn: SupportedCurrencySchema.array().optional(),
  not: z.union([SupportedCurrencySchema, z.lazy(() => NestedEnumSupportedCurrencyWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSupportedCurrencyFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSupportedCurrencyFilterObjectSchema).optional()
}).strict();
export const NestedEnumSupportedCurrencyWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSupportedCurrencyWithAggregatesFilter> = nestedenumsupportedcurrencywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSupportedCurrencyWithAggregatesFilter>;
export const NestedEnumSupportedCurrencyWithAggregatesFilterObjectZodSchema = nestedenumsupportedcurrencywithaggregatesfilterSchema;
