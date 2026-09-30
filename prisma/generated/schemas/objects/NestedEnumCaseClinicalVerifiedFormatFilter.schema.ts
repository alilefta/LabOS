import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema'

const nestedenumcaseclinicalverifiedformatfilterSchema = z.object({
  equals: CaseClinicalVerifiedFormatSchema.optional(),
  in: CaseClinicalVerifiedFormatSchema.array().optional(),
  notIn: CaseClinicalVerifiedFormatSchema.array().optional(),
  not: z.union([CaseClinicalVerifiedFormatSchema, z.lazy(() => NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseClinicalVerifiedFormatFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalVerifiedFormatFilter> = nestedenumcaseclinicalverifiedformatfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalVerifiedFormatFilter>;
export const NestedEnumCaseClinicalVerifiedFormatFilterObjectZodSchema = nestedenumcaseclinicalverifiedformatfilterSchema;
