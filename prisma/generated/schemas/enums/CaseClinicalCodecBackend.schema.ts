import * as z from 'zod';

export const CaseClinicalCodecBackendSchema = z.enum(['JULUSIAN_TURBOJPEG', 'SHARP_LIBVIPS'])

export type CaseClinicalCodecBackend = z.infer<typeof CaseClinicalCodecBackendSchema>;