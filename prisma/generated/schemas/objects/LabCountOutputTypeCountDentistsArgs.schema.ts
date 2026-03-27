import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistWhereInputObjectSchema as DentistWhereInputObjectSchema } from './DentistWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => DentistWhereInputObjectSchema).optional()
}).strict();
export const LabCountOutputTypeCountDentistsArgsObjectSchema = makeSchema();
export const LabCountOutputTypeCountDentistsArgsObjectZodSchema = makeSchema();
