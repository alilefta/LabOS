import * as z from 'zod';

export const CaseClinicalCodecBackendSchema = z.enum(['JULUSIAN_TURBOJPEG'])

export type CaseClinicalCodecBackend = z.infer<typeof CaseClinicalCodecBackendSchema>;