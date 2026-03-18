import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ClinicSelectObjectSchema as ClinicSelectObjectSchema } from './ClinicSelect.schema';
import { ClinicIncludeObjectSchema as ClinicIncludeObjectSchema } from './ClinicInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ClinicSelectObjectSchema).optional(),
  include: z.lazy(() => ClinicIncludeObjectSchema).optional()
}).strict();
export const ClinicArgsObjectSchema = makeSchema();
export const ClinicArgsObjectZodSchema = makeSchema();
