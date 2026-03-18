import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicCountOutputTypeSelectObjectSchema as ClinicCountOutputTypeSelectObjectSchema } from './ClinicCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ClinicCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ClinicCountOutputTypeArgsObjectSchema = makeSchema();
export const ClinicCountOutputTypeArgsObjectZodSchema = makeSchema();
