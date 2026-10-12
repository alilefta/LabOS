import * as z from 'zod';

export const CaseClinicalUploadEvidenceScalarFieldEnumSchema = z.enum(['uploadGrantId', 'organizationId', 'labId', 'caseId', 'provider', 'providerObjectKey', 'clinicalPurpose', 'verifiedFormat', 'validatedSuffix', 'measuredSizeBytes', 'width', 'height', 'contentSha256', 'validationProfile', 'validatorVersion', 'codecBackend', 'codecPackageVersion', 'codecLibraryVersion', 'codecRuntimeSha256', 'sourceComponents', 'isProgressive', 'validatedAt'])

export type CaseClinicalUploadEvidenceScalarFieldEnum = z.infer<typeof CaseClinicalUploadEvidenceScalarFieldEnumSchema>;