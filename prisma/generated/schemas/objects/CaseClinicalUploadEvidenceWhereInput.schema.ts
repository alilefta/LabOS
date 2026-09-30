import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStoredFileProviderFilterObjectSchema as EnumStoredFileProviderFilterObjectSchema } from './EnumStoredFileProviderFilter.schema';
import { StoredFileProviderSchema } from '../enums/StoredFileProvider.schema';
import { EnumCaseClinicalPurposeFilterObjectSchema as EnumCaseClinicalPurposeFilterObjectSchema } from './EnumCaseClinicalPurposeFilter.schema';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { EnumCaseClinicalVerifiedFormatFilterObjectSchema as EnumCaseClinicalVerifiedFormatFilterObjectSchema } from './EnumCaseClinicalVerifiedFormatFilter.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { EnumCaseClinicalValidatedSuffixFilterObjectSchema as EnumCaseClinicalValidatedSuffixFilterObjectSchema } from './EnumCaseClinicalValidatedSuffixFilter.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { FileUploadGrantScalarRelationFilterObjectSchema as FileUploadGrantScalarRelationFilterObjectSchema } from './FileUploadGrantScalarRelationFilter.schema';
import { FileUploadGrantWhereInputObjectSchema as FileUploadGrantWhereInputObjectSchema } from './FileUploadGrantWhereInput.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { LabScalarRelationFilterObjectSchema as LabScalarRelationFilterObjectSchema } from './LabScalarRelationFilter.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const caseclinicaluploadevidencewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema), z.lazy(() => CaseClinicalUploadEvidenceWhereInputObjectSchema).array()]).optional(),
  uploadGrantId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  organizationId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  labId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => EnumStoredFileProviderFilterObjectSchema), StoredFileProviderSchema]).optional(),
  providerObjectKey: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  clinicalPurpose: z.union([z.lazy(() => EnumCaseClinicalPurposeFilterObjectSchema), CaseClinicalPurposeSchema]).optional(),
  verifiedFormat: z.union([z.lazy(() => EnumCaseClinicalVerifiedFormatFilterObjectSchema), CaseClinicalVerifiedFormatSchema]).optional(),
  validatedSuffix: z.union([z.lazy(() => EnumCaseClinicalValidatedSuffixFilterObjectSchema), CaseClinicalValidatedSuffixSchema]).optional(),
  measuredSizeBytes: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  width: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  height: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  contentSha256: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(64)]).optional(),
  validationProfile: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(64)]).optional(),
  validatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  uploadGrant: z.union([z.lazy(() => FileUploadGrantScalarRelationFilterObjectSchema), z.lazy(() => FileUploadGrantWhereInputObjectSchema)]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional(),
  lab: z.union([z.lazy(() => LabScalarRelationFilterObjectSchema), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  dentalCase: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional()
}).strict();
export const CaseClinicalUploadEvidenceWhereInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceWhereInput> = caseclinicaluploadevidencewhereinputSchema as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceWhereInput>;
export const CaseClinicalUploadEvidenceWhereInputObjectZodSchema = caseclinicaluploadevidencewhereinputSchema;
