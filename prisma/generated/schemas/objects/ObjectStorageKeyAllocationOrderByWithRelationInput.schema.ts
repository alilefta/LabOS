import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  objectKey: SortOrderSchema.optional(),
  sourceUploadGrantId: SortOrderSchema.optional(),
  latestWriteCapabilityExpiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  allocatedAt: SortOrderSchema.optional()
}).strict();
export const ObjectStorageKeyAllocationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationOrderByWithRelationInput>;
export const ObjectStorageKeyAllocationOrderByWithRelationInputObjectZodSchema = makeSchema();
