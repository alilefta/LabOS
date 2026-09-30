import * as z from 'zod';

export const CaseClinicalUploadEvidenceScalarFieldEnumSchema = z.enum(['uploadGrantId', 'organizationId', 'labId', 'caseId', 'provider', 'providerObjectKey', 'clinicalPurpose', 'verifiedFormat', 'validatedSuffix', 'measuredSizeBytes', 'width', 'height', 'contentSha256', 'validationProfile', 'validatedAt'])

export type CaseClinicalUploadEvidenceScalarFieldEnum = z.infer<typeof CaseClinicalUploadEvidenceScalarFieldEnumSchema>;