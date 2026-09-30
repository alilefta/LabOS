import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema'

const nestedenumcasefileaccessreasonfilterSchema = z.object({
  equals: CaseFileAccessReasonSchema.optional(),
  in: CaseFileAccessReasonSchema.array().optional(),
  notIn: CaseFileAccessReasonSchema.array().optional(),
  not: z.union([CaseFileAccessReasonSchema, z.lazy(() => NestedEnumCaseFileAccessReasonFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseFileAccessReasonFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseFileAccessReasonFilter> = nestedenumcasefileaccessreasonfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseFileAccessReasonFilter>;
export const NestedEnumCaseFileAccessReasonFilterObjectZodSchema = nestedenumcasefileaccessreasonfilterSchema;
