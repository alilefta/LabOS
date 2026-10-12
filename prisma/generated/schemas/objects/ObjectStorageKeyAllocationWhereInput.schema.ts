import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const objectstoragekeyallocationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ObjectStorageKeyAllocationWhereInputObjectSchema), z.lazy(() => ObjectStorageKeyAllocationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ObjectStorageKeyAllocationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ObjectStorageKeyAllocationWhereInputObjectSchema), z.lazy(() => ObjectStorageKeyAllocationWhereInputObjectSchema).array()]).optional(),
  objectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sourceUploadGrantId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  latestWriteCapabilityExpiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  allocatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ObjectStorageKeyAllocationWhereInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationWhereInput> = objectstoragekeyallocationwhereinputSchema as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationWhereInput>;
export const ObjectStorageKeyAllocationWhereInputObjectZodSchema = objectstoragekeyallocationwhereinputSchema;
