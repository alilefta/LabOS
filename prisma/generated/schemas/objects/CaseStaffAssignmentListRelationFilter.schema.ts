import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereInputObjectSchema as CaseStaffAssignmentWhereInputObjectSchema } from './CaseStaffAssignmentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).optional()
}).strict();
export const CaseStaffAssignmentListRelationFilterObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentListRelationFilter>;
export const CaseStaffAssignmentListRelationFilterObjectZodSchema = makeSchema();
