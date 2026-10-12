import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  objectKey: z.string(),
  sourceUploadGrantId: z.string(),
  latestWriteCapabilityExpiresAt: z.coerce.date().optional().nullable(),
  allocatedAt: z.coerce.date().optional()
}).strict();
export const ObjectStorageKeyAllocationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationUncheckedCreateInput>;
export const ObjectStorageKeyAllocationUncheckedCreateInputObjectZodSchema = makeSchema();
