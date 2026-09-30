import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema';
import { NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema as NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema } from './NestedEnumCaseFileIssuanceOutcomeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseFileIssuanceOutcomeSchema.optional(),
  in: CaseFileIssuanceOutcomeSchema.array().optional(),
  notIn: CaseFileIssuanceOutcomeSchema.array().optional(),
  not: z.union([CaseFileIssuanceOutcomeSchema, z.lazy(() => NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseFileIssuanceOutcomeFilterObjectSchema: z.ZodType<Prisma.EnumCaseFileIssuanceOutcomeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileIssuanceOutcomeFilter>;
export const EnumCaseFileIssuanceOutcomeFilterObjectZodSchema = makeSchema();
