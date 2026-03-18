import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientWhereInputObjectSchema as PatientWhereInputObjectSchema } from './PatientWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PatientWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountPatientArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountPatientArgsObjectZodSchema = makeSchema();
