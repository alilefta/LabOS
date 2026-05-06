import * as z from 'zod';

export const FaultPartySchema = z.enum(['LAB', 'CLINIC'])

export type FaultParty = z.infer<typeof FaultPartySchema>;