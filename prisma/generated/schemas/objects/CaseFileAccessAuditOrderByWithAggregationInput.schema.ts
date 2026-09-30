import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseFileAccessAuditCountOrderByAggregateInputObjectSchema as CaseFileAccessAuditCountOrderByAggregateInputObjectSchema } from './CaseFileAccessAuditCountOrderByAggregateInput.schema';
import { CaseFileAccessAuditMaxOrderByAggregateInputObjectSchema as CaseFileAccessAuditMaxOrderByAggregateInputObjectSchema } from './CaseFileAccessAuditMaxOrderByAggregateInput.schema';
import { CaseFileAccessAuditMinOrderByAggregateInputObjectSchema as CaseFileAccessAuditMinOrderByAggregateInputObjectSchema } from './CaseFileAccessAuditMinOrderByAggregateInput.schema'

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
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseFileAccessAuditCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseFileAccessAuditMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseFileAccessAuditMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseFileAccessAuditOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseFileAccessAuditOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseFileAccessAuditOrderByWithAggregationInput>;
export const CaseFileAccessAuditOrderByWithAggregationInputObjectZodSchema = makeSchema();
