import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityTypeSchema } from '../enums/CaseActivityType.schema'

const nestedenumcaseactivitytypefilterSchema = z.object({
  equals: CaseActivityTypeSchema.optional(),
  in: CaseActivityTypeSchema.array().optional(),
  notIn: CaseActivityTypeSchema.array().optional(),
  not: z.union([CaseActivityTypeSchema, z.lazy(() => NestedEnumCaseActivityTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseActivityTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseActivityTypeFilter> = nestedenumcaseactivitytypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseActivityTypeFilter>;
export const NestedEnumCaseActivityTypeFilterObjectZodSchema = nestedenumcaseactivitytypefilterSchema;
