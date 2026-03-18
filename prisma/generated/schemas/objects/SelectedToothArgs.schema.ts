import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SelectedToothSelectObjectSchema as SelectedToothSelectObjectSchema } from './SelectedToothSelect.schema';
import { SelectedToothIncludeObjectSchema as SelectedToothIncludeObjectSchema } from './SelectedToothInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SelectedToothSelectObjectSchema).optional(),
  include: z.lazy(() => SelectedToothIncludeObjectSchema).optional()
}).strict();
export const SelectedToothArgsObjectSchema = makeSchema();
export const SelectedToothArgsObjectZodSchema = makeSchema();
