import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { NestedEnumStoredFileProviderWithAggregatesFilterObjectSchema as NestedEnumStoredFileProviderWithAggregatesFilterObjectSchema } from './NestedEnumStoredFileProviderWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStoredFileProviderFilterObjectSchema as NestedEnumStoredFileProviderFilterObjectSchema } from './NestedEnumStoredFileProviderFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFileProviderSchema.optional(),
  in: StoredFileProviderSchema.array().optional(),
  notIn: StoredFileProviderSchema.array().optional(),
  not: z.union([StoredFileProviderSchema, z.lazy(() => NestedEnumStoredFileProviderWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStoredFileProviderFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStoredFileProviderFilterObjectSchema).optional()
}).strict();
export const EnumStoredFileProviderWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumStoredFileProviderWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFileProviderWithAggregatesFilter>;
export const EnumStoredFileProviderWithAggregatesFilterObjectZodSchema = makeSchema();
