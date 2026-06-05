import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SupportedLanguageSchema } from '../enums/SupportedLanguage.schema'

const nestedenumsupportedlanguagefilterSchema = z.object({
  equals: SupportedLanguageSchema.optional(),
  in: SupportedLanguageSchema.array().optional(),
  notIn: SupportedLanguageSchema.array().optional(),
  not: z.union([SupportedLanguageSchema, z.lazy(() => NestedEnumSupportedLanguageFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumSupportedLanguageFilterObjectSchema: z.ZodType<Prisma.NestedEnumSupportedLanguageFilter> = nestedenumsupportedlanguagefilterSchema as unknown as z.ZodType<Prisma.NestedEnumSupportedLanguageFilter>;
export const NestedEnumSupportedLanguageFilterObjectZodSchema = nestedenumsupportedlanguagefilterSchema;
