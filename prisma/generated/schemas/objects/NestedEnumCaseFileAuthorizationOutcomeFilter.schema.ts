import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema'

const nestedenumcasefileauthorizationoutcomefilterSchema = z.object({
  equals: CaseFileAuthorizationOutcomeSchema.optional(),
  in: CaseFileAuthorizationOutcomeSchema.array().optional(),
  notIn: CaseFileAuthorizationOutcomeSchema.array().optional(),
  not: z.union([CaseFileAuthorizationOutcomeSchema, z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseFileAuthorizationOutcomeFilter> = nestedenumcasefileauthorizationoutcomefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseFileAuthorizationOutcomeFilter>;
export const NestedEnumCaseFileAuthorizationOutcomeFilterObjectZodSchema = nestedenumcasefileauthorizationoutcomefilterSchema;
