import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  actorMemberId: SortOrderSchema.optional(),
  caseId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  caseAssetFileId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  authorizationOutcome: SortOrderSchema.optional(),
  issuanceOutcome: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  correlationId: SortOrderSchema.optional(),
  issuedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CaseFileAccessAuditOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditOrderByWithRelationInput>;
export const CaseFileAccessAuditOrderByWithRelationInputObjectZodSchema = makeSchema();
