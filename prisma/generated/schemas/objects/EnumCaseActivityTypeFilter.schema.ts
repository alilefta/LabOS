import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema';
import { NestedEnumCaseActivityTypeFilterObjectSchema as NestedEnumCaseActivityTypeFilterObjectSchema } from './NestedEnumCaseActivityTypeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseActivityTypeSchema.optional(),
  in: CaseActivityTypeSchema.array().optional(),
  notIn: CaseActivityTypeSchema.array().optional(),
  not: z.union([CaseActivityTypeSchema, z.lazy(() => NestedEnumCaseActivityTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseActivityTypeFilterObjectSchema: z.ZodType<Prisma.EnumCaseActivityTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseActivityTypeFilter>;
export const EnumCaseActivityTypeFilterObjectZodSchema = makeSchema();
