import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseFileAuthorizationOutcomeSchema } from '../enums/CaseFileAuthorizationOutcome.schema';
import { CaseFileIssuanceOutcomeSchema } from '../enums/CaseFileIssuanceOutcome.schema';
import { CaseFileAccessReasonSchema } from '../enums/CaseFileAccessReason.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  organizationId: z.string(),
  labId: z.string(),
  actorMemberId: z.string(),
  caseId: z.string().optional().nullable(),
  caseAssetFileId: z.string().optional().nullable(),
  authorizationOutcome: CaseFileAuthorizationOutcomeSchema,
  issuanceOutcome: CaseFileIssuanceOutcomeSchema,
  reason: CaseFileAccessReasonSchema,
  correlationId: z.string(),
  issuedAt: z.coerce.date().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CaseFileAccessAuditUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditUncheckedCreateInput>;
export const CaseFileAccessAuditUncheckedCreateInputObjectZodSchema = makeSchema();
