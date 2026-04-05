import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  caseId: z.string(),
  staffId: z.string()
}).strict();
export const CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInput>;
export const CaseStaffAssignmentCaseIdStaffIdCompoundUniqueInputObjectZodSchema = makeSchema();
