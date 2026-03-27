import * as z from 'zod';

export const ClinicTypeSchema = z.enum(['SOLO', 'CLINIC', 'HOSPITAL', 'UNIVERSITY'])

export type ClinicType = z.infer<typeof ClinicTypeSchema>;