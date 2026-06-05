import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema';
import { NestedEnumSupportedLanguageFilterObjectSchema as NestedEnumSupportedLanguageFilterObjectSchema } from './NestedEnumSupportedLanguageFilter.schema'

const makeSchema = () => z.object({
  equals: SupportedLanguageSchema.optional(),
  in: SupportedLanguageSchema.array().optional(),
  notIn: SupportedLanguageSchema.array().optional(),
  not: z.union([SupportedLanguageSchema, z.lazy(() => NestedEnumSupportedLanguageFilterObjectSchema)]).optional()
}).strict();
export const EnumSupportedLanguageFilterObjectSchema: z.ZodType<Prisma.EnumSupportedLanguageFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumSupportedLanguageFilter>;
export const EnumSupportedLanguageFilterObjectZodSchema = makeSchema();
