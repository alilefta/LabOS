import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { NestedEnumCaseAssetStorageModeFilterObjectSchema as NestedEnumCaseAssetStorageModeFilterObjectSchema } from './NestedEnumCaseAssetStorageModeFilter.schema'

const makeSchema = () => z.object({
  equals: CaseAssetStorageModeSchema.optional(),
  in: CaseAssetStorageModeSchema.array().optional(),
  notIn: CaseAssetStorageModeSchema.array().optional(),
  not: z.union([CaseAssetStorageModeSchema, z.lazy(() => NestedEnumCaseAssetStorageModeFilterObjectSchema)]).optional()
}).strict();
export const EnumCaseAssetStorageModeFilterObjectSchema: z.ZodType<Prisma.EnumCaseAssetStorageModeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumCaseAssetStorageModeFilter>;
export const EnumCaseAssetStorageModeFilterObjectZodSchema = makeSchema();
