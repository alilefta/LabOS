import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { NestedEnumCaseClinicalPurposeFilterObjectSchema as NestedEnumCaseClinicalPurposeFilterObjectSchema } from './NestedEnumCaseClinicalPurposeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseClinicalPurposeSchema.optional(),
  in: CaseClinicalPurposeSchema.array().optional(),
  notIn: CaseClinicalPurposeSchema.array().optional(),
  not: z.union([CaseClinicalPurposeSchema, z.lazy(() => NestedEnumCaseClinicalPurposeFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseClinicalPurposeFilterObjectSchema: z.ZodType<Prisma.EnumCaseClinicalPurposeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseClinicalPurposeFilter>;
export const EnumCaseClinicalPurposeFilterObjectZodSchema = makeSchema();
