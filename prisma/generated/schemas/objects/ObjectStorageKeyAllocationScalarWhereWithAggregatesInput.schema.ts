import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const objectstoragekeyallocationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  objectKey: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  sourceUploadGrantId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  latestWriteCapabilityExpiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  allocatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ObjectStorageKeyAllocationScalarWhereWithAggregatesInput> = objectstoragekeyallocationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ObjectStorageKeyAllocationScalarWhereWithAggregatesInput>;
export const ObjectStorageKeyAllocationScalarWhereWithAggregatesInputObjectZodSchema = objectstoragekeyallocationscalarwherewithaggregatesinputSchema;
