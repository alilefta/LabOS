import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistCountOutputTypeSelectObjectSchema as DentistCountOutputTypeSelectObjectSchema } from './DentistCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DentistCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const DentistCountOutputTypeArgsObjectSchema = makeSchema();
export const DentistCountOutputTypeArgsObjectZodSchema = makeSchema();
