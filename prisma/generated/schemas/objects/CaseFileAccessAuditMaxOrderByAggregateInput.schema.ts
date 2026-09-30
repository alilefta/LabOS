import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  actorMemberId: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  caseAssetFileId: SortOrderSchema.optional(),
  authorizationOutcome: SortOrderSchema.optional(),
  issuanceOutcome: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  correlationId: SortOrderSchema.optional(),
  issuedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CaseFileAccessAuditMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditMaxOrderByAggregateInput>;
export const CaseFileAccessAuditMaxOrderByAggregateInputObjectZodSchema = makeSchema();
