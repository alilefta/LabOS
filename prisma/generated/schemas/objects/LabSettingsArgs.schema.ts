import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabSettingsSelectObjectSchema as LabSettingsSelectObjectSchema } from './LabSettingsSelect.schema';
import { LabSettingsIncludeObjectSchema as LabSettingsIncludeObjectSchema } from './LabSettingsInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabSettingsSelectObjectSchema).optional(),
  include: z.lazy(() => LabSettingsIncludeObjectSchema).optional()
}).strict();
export const LabSettingsArgsObjectSchema = makeSchema();
export const LabSettingsArgsObjectZodSchema = makeSchema();
