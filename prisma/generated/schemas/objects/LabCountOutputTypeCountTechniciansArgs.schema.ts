import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianWhereInputObjectSchema as TechnicianWhereInputObjectSchema } from './TechnicianWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => TechnicianWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountTechniciansArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountTechniciansArgsObjectZodSchema = makeSchema();
