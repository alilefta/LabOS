import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderAccessSchema } from '../enums/StoredFileProviderAccess.schema';
import { NestedEnumStoredFileProviderAccessNullableWithAggregatesFilterObjectSchema as NestedEnumStoredFileProviderAccessNullableWithAggregatesFilterObjectSchema } from './NestedEnumStoredFileProviderAccessNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumStoredFileProviderAccessNullableFilterObjectSchema as NestedEnumStoredFileProviderAccessNullableFilterObjectSchema } from './NestedEnumStoredFileProviderAccessNullableFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFileProviderAccessSchema.optional().nullable(),
  in: StoredFileProviderAccessSchema.array().optional().nullable(),
  notIn: StoredFileProviderAccessSchema.array().optional().nullable(),
  not: z.union([StoredFileProviderAccessSchema, z.lazy(() => NestedEnumStoredFileProviderAccessNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStoredFileProviderAccessNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStoredFileProviderAccessNullableFilterObjectSchema).optional()
}).strict();
export const EnumStoredFileProviderAccessNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderAccessNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderAccessNullableWithAggregatesFilter>;
export const EnumStoredFileProviderAccessNullableWithAggregatesFilterObjectZodSchema = makeSchema();
