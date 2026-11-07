import * as z from 'zod';

export const CaseClinicalVerifiedFormatSchema = z.enum(['JPEG', 'PNG', 'WEBP'])

export type CaseClinicalVerifiedFormat = z.infer<typeof CaseClinicalVerifiedFormatSchema>;