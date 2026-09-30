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
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseAssetFileVersionListRelationFilterObjectSchema as CaseAssetFileVersionListRelationFilterObjectSchema } from './CaseAssetFileVersionListRelationFilter.schema';
import { CaseAssetFileVersionNullableScalarRelationFilterObjectSchema as CaseAssetFileVersionNullableScalarRelationFilterObjectSchema } from './CaseAssetFileVersionNullableScalarRelationFilter.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const caseassetfilewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseAssetFileWhereInputObjectSchema), z.lazy(() => CaseAssetFileWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseAssetFileWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseAssetFileWhereInputObjectSchema), z.lazy(() => CaseAssetFileWhereInputObjectSchema).array()]).optional(),
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
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  dentalCase: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  versions: z.lazy(() => CaseAssetFileVersionListRelationFilterObjectSchema).optional(),
  currentVersion: z.union([z.lazy(() => CaseAssetFileVersionNullableScalarRelationFilterObjectSchema), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema)]).optional()
}).strict();
export const CaseAssetFileWhereInputObjectSchema: z.ZodType<Prisma.CaseAssetFileWhereInput> = caseassetfilewhereinputSchema as unknown as z.ZodType<Prisma.CaseAssetFileWhereInput>;
export const CaseAssetFileWhereInputObjectZodSchema = caseassetfilewhereinputSchema;
