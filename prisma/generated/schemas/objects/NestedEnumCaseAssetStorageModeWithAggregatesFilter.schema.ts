import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumCaseAssetStorageModeFilterObjectSchema as NestedEnumCaseAssetStorageModeFilterObjectSchema } from './NestedEnumCaseAssetStorageModeFilter.schema'

const nestedenumcaseassetstoragemodewithaggregatesfilterSchema = z.object({
  equals: CaseAssetStorageModeSchema.optional(),
  in: CaseAssetStorageModeSchema.array().optional(),
  notIn: CaseAssetStorageModeSchema.array().optional(),
  not: z.union([CaseAssetStorageModeSchema, z.lazy(() => NestedEnumCaseAssetStorageModeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumCaseAssetStorageModeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumCaseAssetStorageModeFilterObjectSchema).optional()
}).strict();
export const NestedEnumCaseAssetStorageModeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseAssetStorageModeWithAggregatesFilter> = nestedenumcaseassetstoragemodewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseAssetStorageModeWithAggregatesFilter>;
export const NestedEnumCaseAssetStorageModeWithAggregatesFilterObjectZodSchema = nestedenumcaseassetstoragemodewithaggregatesfilterSchema;
