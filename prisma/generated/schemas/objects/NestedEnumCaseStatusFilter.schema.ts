import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema'

const nestedenumcasestatusfilterSchema = z.object({
  equals: CaseStatusSchema.optional(),
  in: CaseStatusSchema.array().optional(),
  notIn: CaseStatusSchema.array().optional(),
  not: z.union([CaseStatusSchema, z.lazy(() => NestedEnumCaseStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseStatusFilter> = nestedenumcasestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseStatusFilter>;
export const NestedEnumCaseStatusFilterObjectZodSchema = nestedenumcasestatusfilterSchema;
