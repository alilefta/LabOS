import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  actorMemberId: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  caseAssetFileId: z.literal(true).optional(),
  authorizationOutcome: z.literal(true).optional(),
  issuanceOutcome: z.literal(true).optional(),
  reason: z.literal(true).optional(),
  correlationId: z.literal(true).optional(),
  issuedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CaseFileAccessAuditMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditMinAggregateInputType>;
export const CaseFileAccessAuditMinAggregateInputObjectZodSchema = makeSchema();
