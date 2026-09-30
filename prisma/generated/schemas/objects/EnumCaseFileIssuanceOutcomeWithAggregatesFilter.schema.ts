import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema';
import { NestedEnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema as NestedEnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema } from './NestedEnumCaseFileIssuanceOutcomeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema as NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema } from './NestedEnumCaseFileIssuanceOutcomeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseFileIssuanceOutcomeSchema.optional(),
  in: CaseFileIssuanceOutcomeSchema.array().optional(),
  notIn: CaseFileIssuanceOutcomeSchema.array().optional(),
  not: z.union([CaseFileIssuanceOutcomeSchema, z.lazy(() => NestedEnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema).optional()
}).strict();
export const EnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumCaseFileIssuanceOutcomeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileIssuanceOutcomeWithAggregatesFilter>;
export const EnumCaseFileIssuanceOutcomeWithAggregatesFilterObjectZodSchema = makeSchema();
