import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCountOutputTypeSelectObjectSchema as WorkTypeCountOutputTypeSelectObjectSchema } from './WorkTypeCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WorkTypeCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const WorkTypeCountOutputTypeArgsObjectSchema = makeSchema();
export const WorkTypeCountOutputTypeArgsObjectZodSchema = makeSchema();
