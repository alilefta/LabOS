import * as z from 'zod';

export const CaseFileIssuanceOutcomeSchema = z.enum(['NOT_ATTEMPTED', 'ISSUED', 'FAILED'])

export type CaseFileIssuanceOutcome = z.infer<typeof CaseFileIssuanceOutcomeSchema>;