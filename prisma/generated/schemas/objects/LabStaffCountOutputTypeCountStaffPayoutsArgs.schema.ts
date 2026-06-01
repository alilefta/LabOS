import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional()
}).strict();
export const LabStaffCountOutputTypeCountStaffPayoutsArgsObjectSchema = makeSchema();
export const LabStaffCountOutputTypeCountStaffPayoutsArgsObjectZodSchema = makeSchema();
