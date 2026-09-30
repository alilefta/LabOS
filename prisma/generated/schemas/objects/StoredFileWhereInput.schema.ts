import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStoredFileProviderFilterObjectSchema as EnumStoredFileProviderFilterObjectSchema } from './EnumStoredFileProviderFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumStoredFilePurposeFilterObjectSchema as EnumStoredFilePurposeFilterObjectSchema } from './EnumStoredFilePurposeFilter.schema';
import { StoredFilePurposeSchema } from '../enums/StoredFilePurpose.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { FileUploadGrantScalarRelationFilterObjectSchema as FileUploadGrantScalarRelationFilterObjectSchema } from './FileUploadGrantScalarRelationFilter.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema';
import { MemberNullableScalarRelationFilterObjectSchema as MemberNullableScalarRelationFilterObjectSchema } from './MemberNullableScalarRelationFilter.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { CaseAssetFileVersionNullableScalarRelationFilterObjectSchema as CaseAssetFileVersionNullableScalarRelationFilterObjectSchema } from './CaseAssetFileVersionNullableScalarRelationFilter.schema';
import { CaseAssetFileVersionWhereInputObjectSchema as CaseAssetFileVersionWhereInputObjectSchema } from './CaseAssetFileVersionWhereInput.schema'

const storedfilewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StoredFileWhereInputObjectSchema), z.lazy(() => StoredFileWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StoredFileWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StoredFileWhereInputObjectSchema), z.lazy(() => StoredFileWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sourceUploadGrantId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderFilterObjectSchema), StoredFileProviderSchema]).optional(),
  providerObjectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  purpose: z.union([z.lazy(() => EnumStoredFilePurposeFilterObjectSchema), StoredFilePurposeSchema]).optional(),
  detectedMimeType: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  sizeBytes: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  checksumAlgorithm: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(32)]).optional().nullable(),
  checksumValue: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(256)]).optional().nullable(),
  uploaderMemberId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  uploaderMemberIdSnapshot: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  sourceGrant: z.union([z.lazy(() => FileUploadGrantScalarRelationFilterObjectSchema), z.lazy(() => FileUploadGrantWhereInputObjectSchema)]).optional(),
  uploaderMember: z.union([z.lazy(() => MemberNullableScalarRelationFilterObjectSchema), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  caseVersion: z.union([z.lazy(() => CaseAssetFileVersionNullableScalarRelationFilterObjectSchema), z.lazy(() => CaseAssetFileVersionWhereInputObjectSchema)]).optional()
}).strict();
export const StoredFileWhereInputObjectSchema: z.ZodType<Prisma.StoredFileWhereInput> = storedfilewhereinputSchema as unknown as z.ZodType<Prisma.StoredFileWhereInput>;
export const StoredFileWhereInputObjectZodSchema = storedfilewhereinputSchema;
