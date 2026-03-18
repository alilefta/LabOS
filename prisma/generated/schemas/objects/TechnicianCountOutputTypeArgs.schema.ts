import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianCountOutputTypeSelectObjectSchema as TechnicianCountOutputTypeSelectObjectSchema } from './TechnicianCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TechnicianCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const TechnicianCountOutputTypeArgsObjectSchema = makeSchema();
export const TechnicianCountOutputTypeArgsObjectZodSchema = makeSchema();
