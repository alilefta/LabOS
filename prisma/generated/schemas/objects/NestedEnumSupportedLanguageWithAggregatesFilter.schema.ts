import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSupportedLanguageFilterObjectSchema as NestedEnumSupportedLanguageFilterObjectSchema } from './NestedEnumSupportedLanguageFilter.schema'

const nestedenumsupportedlanguagewithaggregatesfilterSchema = z.object({
  equals: SupportedLanguageSchema.optional(),
  in: SupportedLanguageSchema.array().optional(),
  notIn: SupportedLanguageSchema.array().optional(),
  not: z.union([SupportedLanguageSchema, z.lazy(() => NestedEnumSupportedLanguageWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSupportedLanguageFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSupportedLanguageFilterObjectSchema).optional()
}).strict();
export const NestedEnumSupportedLanguageWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumSupportedLanguageWithAggregatesFilter> = nestedenumsupportedlanguagewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumSupportedLanguageWithAggregatesFilter>;
export const NestedEnumSupportedLanguageWithAggregatesFilterObjectZodSchema = nestedenumsupportedlanguagewithaggregatesfilterSchema;
