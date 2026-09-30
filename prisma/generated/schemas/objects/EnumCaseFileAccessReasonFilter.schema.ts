import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema';
import { NestedEnumCaseFileAccessReasonFilterObjectSchema as NestedEnumCaseFileAccessReasonFilterObjectSchema } from './NestedEnumCaseFileAccessReasonFilter.schema'

const makeSchema = () => z.object({
  equals: CaseFileAccessReasonSchema.optional(),
  in: CaseFileAccessReasonSchema.array().optional(),
  notIn: CaseFileAccessReasonSchema.array().optional(),
  not: z.union([CaseFileAccessReasonSchema, z.lazy(() => NestedEnumCaseFileAccessReasonFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseFileAccessReasonFilterObjectSchema: z.ZodType<Prisma.EnumCaseFileAccessReasonFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseFileAccessReasonFilter>;
export const EnumCaseFileAccessReasonFilterObjectZodSchema = makeSchema();
