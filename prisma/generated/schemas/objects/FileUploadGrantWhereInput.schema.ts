import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumFileUploadGrantStatusFilterObjectSchema as EnumFileUploadGrantStatusFilterObjectSchema } from './EnumFileUploadGrantStatusFilter.schema';
import { FileUploadGrantStatusSchema } from '../enums/FileUploadGrantStatus.schema';
import { EnumStoredFileProviderNullableFilterObjectSchema as EnumStoredFileProviderNullableFilterObjectSchema } from './EnumStoredFileProviderNullableFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { MemberNullableScalarRelationFilterObjectSchema as MemberNullableScalarRelationFilterObjectSchema } from './MemberNullableScalarRelationFilter.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema';
import { StoredFileNullableScalarRelationFilterObjectSchema as StoredFileNullableScalarRelationFilterObjectSchema } from './StoredFileNullableScalarRelationFilter.schema';
import { StoredFileWhereInputObjectSchema as StoredFileWhereInputObjectSchema } from './StoredFileWhereInput.schema';
import { CaseClinicalUploadEvidenceNullableScalarRelationFilterObjectSchema as CaseClinicalUploadEvidenceNullableScalarRelationFilterObjectSchema } from './CaseClinicalUploadEvidenceNullableScalarRelationFilter.schema';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './CaseClinicalUploadEvidenceWhereInput.schema'

const fileuploadgrantwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FileUploadGrantWhereInputObjectSchema), z.lazy(() => FileUploadGrantWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FileUploadGrantWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FileUploadGrantWhereInputObjectSchema), z.lazy(() => FileUploadGrantWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdByMemberId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  boundaryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  purpose: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  targetType: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  targetId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumFileUploadGrantStatusFilterObjectSchema), FileUploadGrantStatusSchema]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderNullableFilterObjectSchema), StoredFileProviderSchema]).optional().nullable(),
  providerFileKey: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  providerFileUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  correlationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  uploadedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  consumedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  expiredAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  failedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  failureCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  providerDeletedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cleanupAttemptCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  lastCleanupAttemptAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cleanupFailureCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  createdByMember: z.union([z.lazy(() => MemberNullableScalarRelationFilterObjectSchema), z.lazy(() => MemberWhereInputObjectSchema)]).optional(),
  storedFile: z.union([z.lazy(() => StoredFileNullableScalarRelationFilterObjectSchema), z.lazy(() => StoredFileWhereInputObjectSchema)]).optional(),
  clinicalUploadEvidence: z.union([z.lazy(() => CaseClinicalUploadEvidenceNullableScalarRelationFilterObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema)]).optional()
}).strict();
export const FileUploadGrantWhereInputObjectSchema: z.ZodType<Prisma.FileUploadGrantWhereInput> = fileuploadgrantwhereinputSchema as unknown as z.ZodType<Prisma.FileUploadGrantWhereInput>;
export const FileUploadGrantWhereInputObjectZodSchema = fileuploadgrantwhereinputSchema;
