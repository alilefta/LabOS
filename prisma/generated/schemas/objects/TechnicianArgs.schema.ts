import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { TechnicianSelectObjectSchema as TechnicianSelectObjectSchema } from './TechnicianSelect.schema';
import { TechnicianIncludeObjectSchema as TechnicianIncludeObjectSchema } from './TechnicianInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => TechnicianSelectObjectSchema).optional(),
  include: z.lazy(() => TechnicianIncludeObjectSchema).optional()
}).strict();
export const TechnicianArgsObjectSchema = makeSchema();
export const TechnicianArgsObjectZodSchema = makeSchema();
