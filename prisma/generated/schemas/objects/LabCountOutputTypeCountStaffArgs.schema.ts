import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffWhereInputObjectSchema as LabStaffWhereInputObjectSchema } from './LabStaffWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabStaffWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountStaffArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountStaffArgsObjectZodSchema = makeSchema();
