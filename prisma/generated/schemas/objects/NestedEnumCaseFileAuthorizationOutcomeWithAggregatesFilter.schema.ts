import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema as NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema } from './NestedEnumCaseFileAuthorizationOutcomeFilter.schema'

const nestedenumcasefileauthorizationoutcomewithaggregatesfilterSchema = z.object({
  equals: CaseFileAuthorizationOutcomeSchema.optional(),
  in: CaseFileAuthorizationOutcomeSchema.array().optional(),
  notIn: CaseFileAuthorizationOutcomeSchema.array().optional(),
  not: z.union([CaseFileAuthorizationOutcomeSchema, z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilter> = nestedenumcasefileauthorizationoutcomewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilter>;
export const NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectZodSchema = nestedenumcasefileauthorizationoutcomewithaggregatesfilterSchema;
