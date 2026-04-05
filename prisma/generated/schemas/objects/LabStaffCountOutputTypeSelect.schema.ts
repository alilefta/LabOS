import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCountOutputTypeCountCasesArgsObjectSchema as LabStaffCountOutputTypeCountCasesArgsObjectSchema } from './LabStaffCountOutputTypeCountCasesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => LabStaffCountOutputTypeCountCasesArgsObjectSchema)]).optional()
}).strict();
export const LabStaffCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.LabStaffCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCountOutputTypeSelect>;
export const LabStaffCountOutputTypeSelectObjectZodSchema = makeSchema();
