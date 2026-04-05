import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabStaffCountOutputTypeSelectObjectSchema as LabStaffCountOutputTypeSelectObjectSchema } from './LabStaffCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => LabStaffCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const LabStaffCountOutputTypeArgsObjectSchema = makeSchema();
export const LabStaffCountOutputTypeArgsObjectZodSchema = makeSchema();
