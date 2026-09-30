import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { CaseClinicalUploadEvidenceIncludeObjectSchema as CaseClinicalUploadEvidenceIncludeObjectSchema } from './objects/CaseClinicalUploadEvidenceInclude.schema';
import { CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema as CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema } from './objects/CaseClinicalUploadEvidenceOrderByWithRelationInput.schema';
import { CaseClinicalUploadEvidenceWhereInputObjectSchema as CaseClinicalUploadEvidenceWhereInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereInput.schema';
import { CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema as CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema } from './objects/CaseClinicalUploadEvidenceWhereUniqueInput.schema';
import { CaseClinicalUploadEvidenceScalarFieldEnumSchema } from './enums/CaseClinicalUploadEvidenceScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CaseClinicalUploadEvidenceFindManySelectSchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceSelect> = z.object({
    uploadGrantId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    caseId: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerObjectKey: z.boolean().optional(),
    clinicalPurpose: z.boolean().optional(),
    verifiedFormat: z.boolean().optional(),
    validatedSuffix: z.boolean().optional(),
    measuredSizeBytes: z.boolean().optional(),
    width: z.boolean().optional(),
    height: z.boolean().optional(),
    contentSha256: z.boolean().optional(),
    validationProfile: z.boolean().optional(),
    validatedAt: z.boolean().optional(),
    uploadGrant: z.boolean().optional(),
    organization: z.boolean().optional(),
    lab: z.boolean().optional(),
    dentalCase: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceSelect>;

export const CaseClinicalUploadEvidenceFindManySelectZodSchema = z.object({
    uploadGrantId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    labId: z.boolean().optional(),
    caseId: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerObjectKey: z.boolean().optional(),
    clinicalPurpose: z.boolean().optional(),
    verifiedFormat: z.boolean().optional(),
    validatedSuffix: z.boolean().optional(),
    measuredSizeBytes: z.boolean().optional(),
    width: z.boolean().optional(),
    height: z.boolean().optional(),
    contentSha256: z.boolean().optional(),
    validationProfile: z.boolean().optional(),
    validatedAt: z.boolean().optional(),
    uploadGrant: z.boolean().optional(),
    organization: z.boolean().optional(),
    lab: z.boolean().optional(),
    dentalCase: z.boolean().optional()
  }).strict();

export const CaseClinicalUploadEvidenceFindManySchema: z.ZodType<Prisma.CaseClinicalUploadEvidenceFindManyArgs> = z.object({ select: CaseClinicalUploadEvidenceFindManySelectSchema.optional(), include: z.lazy(() => CaseClinicalUploadEvidenceIncludeObjectSchema.optional()), orderBy: z.union([CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema, CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional(), cursor: CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseClinicalUploadEvidenceScalarFieldEnumSchema, CaseClinicalUploadEvidenceScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CaseClinicalUploadEvidenceFindManyArgs>;

export const CaseClinicalUploadEvidenceFindManyZodSchema = z.object({ select: CaseClinicalUploadEvidenceFindManySelectSchema.optional(), include: z.lazy(() => CaseClinicalUploadEvidenceIncludeObjectSchema.optional()), orderBy: z.union([CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema, CaseClinicalUploadEvidenceOrderByWithRelationInputObjectSchema.array()]).optional(), where: CaseClinicalUploadEvidenceWhereInputObjectSchema.optional(), cursor: CaseClinicalUploadEvidenceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CaseClinicalUploadEvidenceScalarFieldEnumSchema, CaseClinicalUploadEvidenceScalarFieldEnumSchema.array()]).optional() }).strict();