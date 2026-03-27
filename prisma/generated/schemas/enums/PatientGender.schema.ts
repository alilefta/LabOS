import * as z from 'zod';

export const PatientGenderSchema = z.enum(['MALE', 'FEMALE', 'OTHER'])

export type PatientGender = z.infer<typeof PatientGenderSchema>;