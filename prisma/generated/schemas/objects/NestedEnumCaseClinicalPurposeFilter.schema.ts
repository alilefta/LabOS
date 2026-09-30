import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema'

const nestedenumcaseclinicalpurposefilterSchema = z.object({
  equals: CaseClinicalPurposeSchema.optional(),
  in: CaseClinicalPurposeSchema.array().optional(),
  notIn: CaseClinicalPurposeSchema.array().optional(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseClinicalPurposeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalPurposeFilter> = nestedenumcaseclinicalpurposefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalPurposeFilter>;
export const NestedEnumCaseClinicalPurposeFilterObjectZodSchema = nestedenumcaseclinicalpurposefilterSchema;
