import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NestedEnumStoredFileProviderNullableWithAggregatesFilterObjectSchema as NestedEnumStoredFileProviderNullableWithAggregatesFilterObjectSchema } from './NestedEnumStoredFileProviderNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumStoredFileProviderNullableFilterObjectSchema as NestedEnumStoredFileProviderNullableFilterObjectSchema } from './NestedEnumStoredFileProviderNullableFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFileProviderSchema.optional().nullable(),
  in: StoredFileProviderSchema.array().optional().nullable(),
  notIn: StoredFileProviderSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStoredFileProviderNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStoredFileProviderNullableFilterObjectSchema).optional()
}).strict();
export const EnumStoredFileProviderNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderNullableWithAggregatesFilter>;
export const EnumStoredFileProviderNullableWithAggregatesFilterObjectZodSchema = makeSchema();
