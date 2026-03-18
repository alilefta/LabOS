import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientCountOutputTypeSelectObjectSchema as PatientCountOutputTypeSelectObjectSchema } from './PatientCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PatientCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const PatientCountOutputTypeArgsObjectSchema = makeSchema();
export const PatientCountOutputTypeArgsObjectZodSchema = makeSchema();
