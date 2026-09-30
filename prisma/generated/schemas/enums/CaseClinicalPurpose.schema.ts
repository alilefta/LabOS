import * as z from 'zod';

export const CaseClinicalPurposeSchema = z.enum(['CLINICAL_REFERENCE_PHOTOGRAPH'])

export type CaseClinicalPurpose = z.infer<typeof CaseClinicalPurposeSchema>;