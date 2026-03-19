import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountPatientsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountPatientsArgsObjectZodSchema = makeSchema();
