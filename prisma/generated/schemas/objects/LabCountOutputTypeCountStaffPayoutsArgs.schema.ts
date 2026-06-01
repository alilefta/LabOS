import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StaffPayoutWhereInputObjectSchema as StaffPayoutWhereInputObjectSchema } from './StaffPayoutWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffPayoutWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountStaffPayoutsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountStaffPayoutsArgsObjectZodSchema = makeSchema();
