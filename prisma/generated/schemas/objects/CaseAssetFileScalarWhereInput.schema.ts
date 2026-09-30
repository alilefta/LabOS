import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumAssetFileTypeFilterObjectSchema as EnumAssetFileTypeFilterObjectSchema } from './EnumAssetFileTypeFilter.schema';
import { AssetFileTypeSchema } from '../enums/AssetFileType.schema';
import { EnumCaseAssetStorageModeFilterObjectSchema as EnumCaseAssetStorageModeFilterObjectSchema } from './EnumCaseAssetStorageModeFilter.schema';
import { CaseAssetStorageModeSchema } from '../enums/CaseAssetStorageMode.schema';
import { EnumCaseClinicalPurposeNullableFilterObjectSchema as EnumCaseClinicalPurposeNullableFilterObjectSchema } from './EnumCaseClinicalPurposeNullableFilter.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const caseassetfilescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema), z.lazy(() => CaseAssetFileScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  dentalCaseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  documentUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  assetFileType: z.union([z.lazy(() => EnumAssetFileTypeFilterObjectSchema), AssetFileTypeSchema]).optional(),
  fileExtension: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  storageMode: z.union([z.lazy(() => EnumCaseAssetStorageModeFilterObjectSchema), CaseAssetStorageModeSchema]).optional(),
  clinicalPurpose: z.union([z.lazy(() => EnumCaseClinicalPurposeNullableFilterObjectSchema), CaseClinicalPurposeSchema]).optional().nullable(),
  currentVersionId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseAssetFileScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseAssetFileScalarWhereInput> = caseassetfilescalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileScalarWhereInput>;
export const CaseAssetFileScalarWhereInputObjectZodSchema = caseassetfilescalarwhereinputSchema;
