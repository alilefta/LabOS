import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema as NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema } from './NestedEnumCaseFileAuthorizationOutcomeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseFileAuthorizationOutcomeSchema.optional(),
  in: CaseFileAuthorizationOutcomeSchema.array().optional(),
  notIn: CaseFileAuthorizationOutcomeSchema.array().optional(),
  not: z.union([CaseFileAuthorizationOutcomeSchema, z.lazy(() => NestedEnumCaseFileAuthorizationOutcomeFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseFileAuthorizationOutcomeFilterObjectSchema: z.ZodType<Prisma.EnumCaseFileAuthorizationOutcomeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileAuthorizationOutcomeFilter>;
export const EnumCaseFileAuthorizationOutcomeFilterObjectZodSchema = makeSchema();
