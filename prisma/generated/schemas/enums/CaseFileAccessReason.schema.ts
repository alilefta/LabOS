import * as z from 'zod';

export const CaseFileAccessReasonSchema = z.enum(['AUTHORIZED', 'ACCESS_DENIED', 'RESOURCE_UNAVAILABLE', 'PROVIDER_FAILURE'])

export type CaseFileAccessReason = z.infer<typeof CaseFileAccessReasonSchema>;