import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  labId: z.boolean().optional(),
  actorMemberId: z.boolean().optional(),
  caseId: z.boolean().optional(),
  caseAssetFileId: z.boolean().optional(),
  authorizationOutcome: z.boolean().optional(),
  issuanceOutcome: z.boolean().optional(),
  reason: z.boolean().optional(),
  correlationId: z.boolean().optional(),
  issuedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const CaseFileAccessAuditSelectObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditSelect>;
export const CaseFileAccessAuditSelectObjectZodSchema = makeSchema();
