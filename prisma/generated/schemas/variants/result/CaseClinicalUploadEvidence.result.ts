import * as z from 'zod';
import { StoredFileProviderSchema } from '../../enums/StoredFileProvider.schema';
import { CaseClinicalPurposeSchema } from '../../enums/CaseClinicalPurpose.schema';
import { CaseClinicalVerifiedFormatSchema } from '../../enums/CaseClinicalVerifiedFormat.schema';
import { CaseClinicalValidatedSuffixSchema } from '../../enums/CaseClinicalValidatedSuffix.schema';
import { CaseClinicalCodecBackendSchema } from '../../enums/CaseClinicalCodecBackend.schema';
// prettier-ignore
export const CaseClinicalUploadEvidenceResultSchema = z.object({
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
    validatorVersion: z.string().nullable(),
    codecBackend: CaseClinicalCodecBackendSchema.nullable(),
    codecPackageVersion: z.string().nullable(),
    codecLibraryVersion: z.string().nullable(),
    codecRuntimeSha256: z.string().nullable(),
    sourceComponents: z.number().int().nullable(),
    isProgressive: z.boolean().nullable(),
    validatedAt: z.date(),
    uploadGrant: z.unknown(),
    organization: z.unknown(),
    lab: z.unknown(),
    dentalCase: z.unknown()
}).strict();

export type CaseClinicalUploadEvidenceResultType = z.infer<typeof CaseClinicalUploadEvidenceResultSchema>;
