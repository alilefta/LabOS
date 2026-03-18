import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { NestedEnumAssetFileTypeFilterObjectSchema as NestedEnumAssetFileTypeFilterObjectSchema } from './NestedEnumAssetFileTypeFilter.schema'

const makeSchema = () => z.object({
  equals: AssetFileTypeSchema.optional(),
  in: AssetFileTypeSchema.array().optional(),
  notIn: AssetFileTypeSchema.array().optional(),
  not: z.union([AssetFileTypeSchema, z.lazy(() => NestedEnumAssetFileTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumAssetFileTypeFilterObjectSchema: z.ZodType<Prisma.EnumAssetFileTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumAssetFileTypeFilter>;
export const EnumAssetFileTypeFilterObjectZodSchema = makeSchema();
