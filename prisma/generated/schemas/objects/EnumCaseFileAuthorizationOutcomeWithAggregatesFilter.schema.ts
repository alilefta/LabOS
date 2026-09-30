import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema as NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema } from './NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema as NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema } from './NestedEnumCaseFileAuthorizationOutcomeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseFileAuthorizationOutcomeSchema.optional(),
  in: CaseFileAuthorizationOutcomeSchema.array().optional(),
  notIn: CaseFileAuthorizationOutcomeSchema.array().optional(),
  not: z.union([CaseFileAuthorizationOutcomeSchema, z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema).optional()
}).strict();
export const EnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseFileAuthorizationOutcomeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileAuthorizationOutcomeWithAggregatesFilter>;
export const EnumCaseFileAuthorizationOutcomeWithAggregatesFilterObjectZodSchema = makeSchema();
