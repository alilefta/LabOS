import * as z from 'zod';

export const FileUploadGrantStatusSchema = z.enum(['PENDING', 'UPLOADED', 'CONSUMED', 'EXPIRED', 'FAILED', 'CLEANED'])

export type FileUploadGrantStatus = z.infer<typeof FileUploadGrantStatusSchema>;