import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicWhereInputObjectSchema as ClinicWhereInputObjectSchema } from './ClinicWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ClinicWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountClinicsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountClinicsArgsObjectZodSchema = makeSchema();
