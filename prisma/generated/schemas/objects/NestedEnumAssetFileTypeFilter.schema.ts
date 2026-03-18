import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema'

const nestedenumassetfiletypefilterSchema = z.object({
  equals: AssetFileTypeSchema.optional(),
  in: AssetFileTypeSchema.array().optional(),
  notIn: AssetFileTypeSchema.array().optional(),
  not: z.union([AssetFileTypeSchema, z.lazy(() => NestedEnumAssetFileTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumAssetFileTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumAssetFileTypeFilter> = nestedenumassetfiletypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumAssetFileTypeFilter>;
export const NestedEnumAssetFileTypeFilterObjectZodSchema = nestedenumassetfiletypefilterSchema;
