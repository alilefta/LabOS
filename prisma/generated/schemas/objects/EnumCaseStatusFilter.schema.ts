import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStatusSchema } from '../enums/CaseStatus.schema';
import { NestedEnumCaseStatusFilterObjectSchema as NestedEnumCaseStatusFilterObjectSchema } from './NestedEnumCaseStatusFilter.schema'

const makeSchema = () => z.object({
  equals: CaseStatusSchema.optional(),
  in: CaseStatusSchema.array().optional(),
  notIn: CaseStatusSchema.array().optional(),
  not: z.union([CaseStatusSchema, z.lazy(() => NestedEnumCaseStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseStatusFilterObjectSchema: z.ZodType<Prisma.EnumCaseStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseStatusFilter>;
export const EnumCaseStatusFilterObjectZodSchema = makeSchema();
