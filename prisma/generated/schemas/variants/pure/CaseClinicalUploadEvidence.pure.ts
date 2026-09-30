import * as z from 'zod';
import { StoredFileProviderSchema } from '../../enums/StoredFileProvider.schema';
import { CaseClinicalPurposeSchema } from '../../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../../enums/CaseClinicalValidatedSuffix.schema';
// prettier-ignore
export const CaseClinicalUploadEvidenceModelSchema = z.object({
    uploadGrantId: z.string(),
    organizationId: z.string(),
    labId: z.string(),
    caseId: z.string(),
    provider: StoredFileProviderSchema,
    providerObjectKey: z.string(),
    clinicalPurpose: CaseClinicalPurposeSchema,
    verifiedFormat: CaseClinicalVerifiedFormatSchema,
    validatedSuffix: CaseClinicalValidatedSuffixSchema,
    measuredSizeBytes: z.bigint(),
    width: z.number().int(),
    height: z.number().int(),
    contentSha256: z.string(),
    validationProfile: z.string(),
    validatedAt: z.date(),
    uploadGrant: z.unknown(),
    organization: z.unknown(),
    lab: z.unknown(),
    dentalCase: z.unknown()
}).strict();

export type CaseClinicalUploadEvidencePureType = z.infer<typeof CaseClinicalUploadEvidenceModelSchema>;
