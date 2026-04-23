import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUserCountOutputTypeSelectObjectSchema as LabUserCountOutputTypeSelectObjectSchema } from './LabUserCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabUserCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const LabUserCountOutputTypeArgsObjectSchema = makeSchema();
export const LabUserCountOutputTypeArgsObjectZodSchema = makeSchema();
