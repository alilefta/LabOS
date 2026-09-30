import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStoredFileProviderFilterObjectSchema as NestedEnumStoredFileProviderFilterObjectSchema } from './NestedEnumStoredFileProviderFilter.schema'

const nestedenumstoredfileproviderwithaggregatesfilterSchema = z.object({
  equals: StoredFileProviderSchema.optional(),
  in: StoredFileProviderSchema.array().optional(),
  notIn: StoredFileProviderSchema.array().optional(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStoredFileProviderFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStoredFileProviderFilterObjectSchema).optional()
}).strict();
export const NestedEnumStoredFileProviderWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumStoredFileProviderWithAggregatesFilter> = nestedenumstoredfileproviderwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumStoredFileProviderWithAggregatesFilter>;
export const NestedEnumStoredFileProviderWithAggregatesFilterObjectZodSchema = nestedenumstoredfileproviderwithaggregatesfilterSchema;
