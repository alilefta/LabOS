import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseFileAccessReasonFilterObjectSchema as NestedEnumCaseFileAccessReasonFilterObjectSchema } from './NestedEnumCaseFileAccessReasonFilter.schema'

const nestedenumcasefileaccessreasonwithaggregatesfilterSchema = z.object({
  equals: CaseFileAccessReasonSchema.optional(),
  in: CaseFileAccessReasonSchema.array().optional(),
  notIn: CaseFileAccessReasonSchema.array().optional(),
  not: z.union([CaseFileAccessReasonSchema, z.lazy(() => NestedEnumCaseFileAccessReasonWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseFileAccessReasonFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseFileAccessReasonFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseFileAccessReasonWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseFileAccessReasonWithAggregatesFilter> = nestedenumcasefileaccessreasonwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseFileAccessReasonWithAggregatesFilter>;
export const NestedEnumCaseFileAccessReasonWithAggregatesFilterObjectZodSchema = nestedenumcasefileaccessreasonwithaggregatesfilterSchema;
