import * as z from 'zod';
export const FileUploadGrantFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  organizationId: z.string(),
  organization: z.unknown(),
  labId: z.string(),
  lab: z.unknown(),
  createdByMemberId: z.string().optional(),
  createdByMember: z.unknown().optional(),
  boundaryId: z.string(),
  purpose: z.string(),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
  status: z.unknown(),
  provider: z.unknown().optional(),
  providerFileKey: z.string().optional(),
  providerFileUrl: z.string().optional(),
  correlationId: z.string(),
  expiresAt: z.date(),
  uploadedAt: z.date().optional(),
  consumedAt: z.date().optional(),
  expiredAt: z.date().optional(),
  failedAt: z.date().optional(),
  failureCode: z.string().optional(),
  providerDeletedAt: z.date().optional(),
  cleanupAttemptCount: z.number().int(),
  lastCleanupAttemptAt: z.date().optional(),
  cleanupFailureCode: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  storedFile: z.unknown().optional(),
  clinicalUploadEvidence: z.unknown().optional()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});