import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseAssetFileId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  labId: SortOrderSchema.optional(),
  storedFileId: SortOrderSchema.optional(),
  versionNumber: SortOrderSchema.optional(),
  createdByMemberId: SortOrderSchema.optional(),
  createdByMemberIdSnapshot: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const CaseAssetFileVersionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionCountOrderByAggregateInput>;
export const CaseAssetFileVersionCountOrderByAggregateInputObjectZodSchema = makeSchema();
