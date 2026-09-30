import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NestedEnumCaseClinicalPurposeNullableFilterObjectSchema as NestedEnumCaseClinicalPurposeNullableFilterObjectSchema } from './NestedEnumCaseClinicalPurposeNullableFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalPurposeSchema.optional().nullable(),
  in: CaseClinicalPurposeSchema.array().optional().nullable(),
  notIn: CaseClinicalPurposeSchema.array().optional().nullable(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumCaseClinicalPurposeNullableFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalPurposeNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalPurposeNullableFilter>;
export const EnumCaseClinicalPurposeNullableFilterObjectZodSchema = makeSchema();
