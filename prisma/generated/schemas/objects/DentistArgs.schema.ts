import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { DentistSelectObjectSchema as DentistSelectObjectSchema } from './DentistSelect.schema';
import { DentistIncludeObjectSchema as DentistIncludeObjectSchema } from './DentistInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => DentistSelectObjectSchema).optional(),
  include: z.lazy(() => DentistIncludeObjectSchema).optional()
}).strict();
export const DentistArgsObjectSchema = makeSchema();
export const DentistArgsObjectZodSchema = makeSchema();
