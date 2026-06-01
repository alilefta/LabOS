import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutCountOutputTypeCountCaseAssignmentsArgsObjectSchema as StaffPayoutCountOutputTypeCountCaseAssignmentsArgsObjectSchema } from './StaffPayoutCountOutputTypeCountCaseAssignmentsArgs.schema'

const makeSchema = () => z.object({
  caseAssignments: z.union([z.boolean(), z.lazy(() => StaffPayoutCountOutputTypeCountCaseAssignmentsArgsObjectSchema)]).optional()
}).strict();
export const StaffPayoutCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.StaffPayoutCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.StaffPayoutCountOutputTypeSelect>;
export const StaffPayoutCountOutputTypeSelectObjectZodSchema = makeSchema();
