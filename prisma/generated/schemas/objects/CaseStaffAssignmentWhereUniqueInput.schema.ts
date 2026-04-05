import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInputObjectSchema as CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInputObjectSchema } from './CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  caseId_staffId: z.lazy(() => CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const CaseStaffAssignmentWhereUniqueInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentWhereUniqueInput>;
export const CaseStaffAssignmentWhereUniqueInputObjectZodSchema = makeSchema();
