import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema'

const nestedenumcaseclinicalpurposenullablefilterSchema = z.object({
  equals: CaseClinicalPurposeSchema.optional().nullable(),
  in: CaseClinicalPurposeSchema.array().optional().nullable(),
  notIn: CaseClinicalPurposeSchema.array().optional().nullable(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumCaseClinicalPurposeNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseClinicalPurposeNullableFilter> = nestedenumcaseclinicalpurposenullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseClinicalPurposeNullableFilter>;
export const NestedEnumCaseClinicalPurposeNullableFilterObjectZodSchema = nestedenumcaseclinicalpurposenullablefilterSchema;
