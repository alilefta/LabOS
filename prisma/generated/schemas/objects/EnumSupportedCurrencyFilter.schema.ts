import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedCurrencySchema } from '../enums/SupportedCurrency.schema';
import { NestedEnumSupportedCurrencyFilterObjectSchema as NestedEnumSupportedCurrencyFilterObjectSchema } from './NestedEnumSupportedCurrencyFilter.schema'

const makeSchema = () => z.object({
  equals: SupportedCurrencySchema.optional(),
  in: SupportedCurrencySchema.array().optional(),
  notIn: SupportedCurrencySchema.array().optional(),
  not: z.union([SupportedCurrencySchema, z.lazy(() => NestedEnumSupportedCurrencyFilterObjectSchema)]).optional()
}).strict();
export const EnumSupportedCurrencyFilterObjectSchema: z.ZodType<Prisma.EnumSupportedCurrencyFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSupportedCurrencyFilter>;
export const EnumSupportedCurrencyFilterObjectZodSchema = makeSchema();
