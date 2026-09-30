import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { NestedEnumStoredFilePurposeWithAggregatesFilterObjectSchema as NestedEnumStoredFilePurposeWithAggregatesFilterObjectSchema } from './NestedEnumStoredFilePurposeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumStoredFilePurposeFilterObjectSchema as NestedEnumStoredFilePurposeFilterObjectSchema } from './NestedEnumStoredFilePurposeFilter.schema'

const makeSchema = () => z.object({
  equals: StoredFilePurposeSchema.optional(),
  in: StoredFilePurposeSchema.array().optional(),
  notIn: StoredFilePurposeSchema.array().optional(),
  not: z.union([StoredFilePurposeSchema, z.lazy(() => NestedEnumStoredFilePurposeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumStoredFilePurposeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumStoredFilePurposeFilterObjectSchema).optional()
}).strict();
export const EnumStoredFilePurposeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumStoredFilePurposeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumStoredFilePurposeWithAggregatesFilter>;
export const EnumStoredFilePurposeWithAggregatesFilterObjectZodSchema = makeSchema();
