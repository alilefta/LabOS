import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  caseAssetFileId: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  storedFileId: z.literal(true).optional(),
  versionNumber: z.literal(true).optional(),
  createdByMemberId: z.literal(true).optional(),
  createdByMemberIdSnapshot: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CaseAssetFileVersionMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileVersionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileVersionMinAggregateInputType>;
export const CaseAssetFileVersionMinAggregateInputObjectZodSchema = makeSchema();
