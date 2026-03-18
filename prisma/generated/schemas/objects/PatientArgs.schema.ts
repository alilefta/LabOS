import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { PatientSelectObjectSchema as PatientSelectObjectSchema } from './PatientSelect.schema';
import { PatientIncludeObjectSchema as PatientIncludeObjectSchema } from './PatientInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PatientSelectObjectSchema).optional(),
  include: z.lazy(() => PatientIncludeObjectSchema).optional()
}).strict();
export const PatientArgsObjectSchema = makeSchema();
export const PatientArgsObjectZodSchema = makeSchema();
