import * as z from 'zod';

export const CaseClinicalValidatedSuffixSchema = z.enum(['JPG', 'JPEG', 'PNG', 'WEBP'])

export type CaseClinicalValidatedSuffix = z.infer<typeof CaseClinicalValidatedSuffixSchema>;