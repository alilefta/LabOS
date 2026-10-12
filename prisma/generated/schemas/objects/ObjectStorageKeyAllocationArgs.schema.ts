import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { ObjectStorageKeyAllocationSelectObjectSchema as ObjectStorageKeyAllocationSelectObjectSchema } from './ObjectStorageKeyAllocationSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ObjectStorageKeyAllocationSelectObjectSchema).optional()
}).strict();
export const ObjectStorageKeyAllocationArgsObjectSchema = makeSchema();
export const ObjectStorageKeyAllocationArgsObjectZodSchema = makeSchema();
