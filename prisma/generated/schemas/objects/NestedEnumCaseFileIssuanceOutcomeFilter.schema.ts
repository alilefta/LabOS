import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema'

const nestedenumcasefileissuanceoutcomefilterSchema = z.object({
  equals: CaseFileIssuanceOutcomeSchema.optional(),
  in: CaseFileIssuanceOutcomeSchema.array().optional(),
  notIn: CaseFileIssuanceOutcomeSchema.array().optional(),
  not: z.union([CaseFileIssuanceOutcomeSchema, z.lazy(() => NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseFileIssuanceOutcomeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseFileIssuanceOutcomeFilter> = nestedenumcasefileissuanceoutcomefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseFileIssuanceOutcomeFilter>;
export const NestedEnumCaseFileIssuanceOutcomeFilterObjectZodSchema = nestedenumcasefileissuanceoutcomefilterSchema;
