import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumStoredFileProviderNullableFilterObjectSchema as NestedEnumStoredFileProviderNullableFilterObjectSchema } from './NestedEnumStoredFileProviderNullableFilter.schema'

const nestedenumstoredfileprovidernullablewithaggregatesfilterSchema = z.object({
  equals: StoredFileProviderSchema.optional().nullable(),
  in: StoredFileProviderSchema.array().optional().nullable(),
  notIn: StoredFileProviderSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStoredFileProviderNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStoredFileProviderNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumStoredFileProviderNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumStoredFileProviderNullableWithAggregatesFilter> = nestedenumstoredfileprovidernullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumStoredFileProviderNullableWithAggregatesFilter>;
export const NestedEnumStoredFileProviderNullableWithAggregatesFilterObjectZodSchema = nestedenumstoredfileprovidernullablewithaggregatesfilterSchema;
