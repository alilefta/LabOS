import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { NestedEnumAssetFileTypeWithAggregatesFilterObjectSchema as NestedEnumAssetFileTypeWithAggregatesFilterObjectSchema } from './NestedEnumAssetFileTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumAssetFileTypeFilterObjectSchema as NestedEnumAssetFileTypeFilterObjectSchema } from './NestedEnumAssetFileTypeFilter.schema'

const makeSchema = () => z.object({
  equals: AssetFileTypeSchema.optional(),
  in: AssetFileTypeSchema.array().optional(),
  notIn: AssetFileTypeSchema.array().optional(),
  not: z.union([AssetFileTypeSchema, z.lazy(() => NestedEnumAssetFileTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumAssetFileTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumAssetFileTypeFilterObjectSchema).optional()
}).strict();
export const EnumAssetFileTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumAssetFileTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAssetFileTypeWithAggregatesFilter>;
export const EnumAssetFileTypeWithAggregatesFilterObjectZodSchema = makeSchema();
