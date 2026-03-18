import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  documentUrl: z.literal(true).optional(),
  assetFileType: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CaseAssetFileCountAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileCountAggregateInputType>;
export const CaseAssetFileCountAggregateInputObjectZodSchema = makeSchema();
