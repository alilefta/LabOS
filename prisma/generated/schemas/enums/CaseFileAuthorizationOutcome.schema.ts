import * as z from 'zod';

export const CaseFileAuthorizationOutcomeSchema = z.enum(['ALLOWED', 'DENIED'])

export type CaseFileAuthorizationOutcome = z.infer<typeof CaseFileAuthorizationOutcomeSchema>;