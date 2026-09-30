import * as z from 'zod';

export const CaseClinicalVerifiedFormatSchema = z.enum(['JPEG'])

export type CaseClinicalVerifiedFormat = z.infer<typeof CaseClinicalVerifiedFormatSchema>;