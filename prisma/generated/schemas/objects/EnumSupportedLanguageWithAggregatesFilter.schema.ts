import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { NestedEnumSupportedLanguageWithAggregatesFilterObjectSchema as NestedEnumSupportedLanguageWithAggregatesFilterObjectSchema } from './NestedEnumSupportedLanguageWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumSupportedLanguageFilterObjectSchema as NestedEnumSupportedLanguageFilterObjectSchema } from './NestedEnumSupportedLanguageFilter.schema'

const makeSchema = () => z.object({
  equals: SupportedLanguageSchema.optional(),
  in: SupportedLanguageSchema.array().optional(),
  notIn: SupportedLanguageSchema.array().optional(),
  not: z.union([SupportedLanguageSchema, z.lazy(() => NestedEnumSupportedLanguageWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumSupportedLanguageFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumSupportedLanguageFilterObjectSchema).optional()
}).strict();
export const EnumSupportedLanguageWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumSupportedLanguageWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSupportedLanguageWithAggregatesFilter>;
export const EnumSupportedLanguageWithAggregatesFilterObjectZodSchema = makeSchema();
