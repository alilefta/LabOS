import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCountOutputTypeCountCaseAssignmentsArgsObjectSchema as LabStaffCountOutputTypeCountCaseAssignmentsArgsObjectSchema } from './LabStaffCountOutputTypeCountCaseAssignmentsArgs.schema'

const makeSchema = () => z.object({
  caseAssignments: z.union([z.boolean(), z.lazy(() => LabStaffCountOutputTypeCountCaseAssignmentsArgsObjectSchema)]).optional()
}).strict();
export const LabStaffCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.LabStaffCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCountOutputTypeSelect>;
export const LabStaffCountOutputTypeSelectObjectZodSchema = makeSchema();
