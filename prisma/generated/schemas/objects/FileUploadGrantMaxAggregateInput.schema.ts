import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  createdByMemberId: z.literal(true).optional(),
  boundaryId: z.literal(true).optional(),
  purpose: z.literal(true).optional(),
  targetType: z.literal(true).optional(),
  targetId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  providerFileKey: z.literal(true).optional(),
  providerFileUrl: z.literal(true).optional(),
  correlationId: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  uploadedAt: z.literal(true).optional(),
  consumedAt: z.literal(true).optional(),
  expiredAt: z.literal(true).optional(),
  failedAt: z.literal(true).optional(),
  failureCode: z.literal(true).optional(),
  providerDeletedAt: z.literal(true).optional(),
  cleanupAttemptCount: z.literal(true).optional(),
  lastCleanupAttemptAt: z.literal(true).optional(),
  cleanupFailureCode: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const FileUploadGrantMaxAggregateInputObjectSchema: z.ZodType<Prisma.FileUploadGrantMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FileUploadGrantMaxAggregateInputType>;
export const FileUploadGrantMaxAggregateInputObjectZodSchema = makeSchema();
