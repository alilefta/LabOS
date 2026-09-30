import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema as NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema } from './NestedEnumCaseClinicalVerifiedFormatFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalVerifiedFormatSchema.optional(),
  in: CaseClinicalVerifiedFormatSchema.array().optional(),
  notIn: CaseClinicalVerifiedFormatSchema.array().optional(),
  not: z.union([CaseClinicalVerifiedFormatSchema, z.lazy(() => NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseClinicalVerifiedFormatFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalVerifiedFormatFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalVerifiedFormatFilter>;
export const EnumCaseClinicalVerifiedFormatFilterObjectZodSchema = makeSchema();
