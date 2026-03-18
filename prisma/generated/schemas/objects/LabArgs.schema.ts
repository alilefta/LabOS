import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSelectObjectSchema as LabSelectObjectSchema } from './LabSelect.schema';
import { LabIncludeObjectSchema as LabIncludeObjectSchema } from './LabInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabSelectObjectSchema).optional(),
  include: z.lazy(() => LabIncludeObjectSchema).optional()
}).strict();
export const LabArgsObjectSchema = makeSchema();
export const LabArgsObjectZodSchema = makeSchema();
