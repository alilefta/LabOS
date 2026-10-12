import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  objectKey: z.string().optional(),
  sourceUploadGrantId: z.string().optional()
}).strict();
export const ObjectStorageKeyAllocationWhereUniqueInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationWhereUniqueInput>;
export const ObjectStorageKeyAllocationWhereUniqueInputObjectZodSchema = makeSchema();
