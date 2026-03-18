import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCountOutputTypeSelectObjectSchema as LabCountOutputTypeSelectObjectSchema } from './LabCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const LabCountOutputTypeArgsObjectSchema = makeSchema();
export const LabCountOutputTypeArgsObjectZodSchema = makeSchema();
