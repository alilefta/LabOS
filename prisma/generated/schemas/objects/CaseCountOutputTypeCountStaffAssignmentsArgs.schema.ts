import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseStaffAssignmentWhereInputObjectSchema as CaseStaffAssignmentWhereInputObjectSchema } from './CaseStaffAssignmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseStaffAssignmentWhereInputObjectSchema).optional()
}).strict();
export const CaseCountOutputTypeCountStaffAssignmentsArgsObjectSchema = makeSchema();
export const CaseCountOutputTypeCountStaffAssignmentsArgsObjectZodSchema = makeSchema();
