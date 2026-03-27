import * as z from 'zod';

export const ClinicStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED'])

export type ClinicStatus = z.infer<typeof ClinicStatusSchema>;