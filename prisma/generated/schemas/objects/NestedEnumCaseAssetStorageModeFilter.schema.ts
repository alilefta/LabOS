import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema'

const nestedenumcaseassetstoragemodefilterSchema = z.object({
  equals: CaseAssetStorageModeSchema.optional(),
  in: CaseAssetStorageModeSchema.array().optional(),
  notIn: CaseAssetStorageModeSchema.array().optional(),
  not: z.union([CaseAssetStorageModeSchema, z.lazy(() => NestedEnumCaseAssetStorageModeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumCaseAssetStorageModeFilterObjectSchema: z.ZodType<Prisma.NestedEnumCaseAssetStorageModeFilter> = nestedenumcaseassetstoragemodefilterSchema as unknown as z.ZodType<Prisma.NestedEnumCaseAssetStorageModeFilter>;
export const NestedEnumCaseAssetStorageModeFilterObjectZodSchema = nestedenumcaseassetstoragemodefilterSchema;
