import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  sourceUploadGrantId: z.literal(true).optional(),
  provider: z.literal(true).optional(),
  providerObjectKey: z.literal(true).optional(),
  purpose: z.literal(true).optional(),
  detectedMimeType: z.literal(true).optional(),
  sizeBytes: z.literal(true).optional(),
  checksumAlgorithm: z.literal(true).optional(),
  checksumValue: z.literal(true).optional(),
  uploaderMemberId: z.literal(true).optional(),
  uploaderMemberIdSnapshot: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const StoredFileCountAggregateInputObjectSchema: z.ZodType<Prisma.StoredFileCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.StoredFileCountAggregateInputType>;
export const StoredFileCountAggregateInputObjectZodSchema = makeSchema();
