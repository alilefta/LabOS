import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseClinicalPurposeSchema } from '../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../enums/CaseClinicalValidatedSuffix.schema';
import { OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema as OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema } from './OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInput.schema';
import { LabCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema as LabCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema } from './LabCreateNestedOneWithoutClinicalUploadEvidenceInput.schema';
import { CaseCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema as CaseCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema } from './CaseCreateNestedOneWithoutClinicalUploadEvidenceInput.schema'

const makeSchema = () => z.object({
  clinicalPurpose: CaseClinicalPurposeSchema,
  verifiedFormat: CaseClinicalVerifiedFormatSchema,
  validatedSuffix: CaseClinicalValidatedSuffixSchema,
  measuredSizeBytes: z.bigint(),
  width: z.number().int(),
  height: z.number().int(),
  contentSha256: z.string().max(64),
  validationProfile: z.string().max(64),
  validatedAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema),
  dentalCase: z.lazy(() => CaseCreateNestedOneWithoutClinicalUploadEvidenceInputObjectSchema)
}).strict();
export const CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateWithoutUploadGrantInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceCreateWithoutUploadGrantInput>;
export const CaseClinicalUploadEvidenceCreateWithoutUploadGrantInputObjectZodSchema = makeSchema();
