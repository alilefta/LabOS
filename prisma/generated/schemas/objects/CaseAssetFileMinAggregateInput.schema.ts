import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  dentalCaseId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  description: z.literal(true).optional(),
  documentUrl: z.literal(true).optional(),
  assetFileType: z.literal(true).optional(),
  fileExtension: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CaseAssetFileMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseAssetFileMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseAssetFileMinAggregateInputType>;
export const CaseAssetFileMinAggregateInputObjectZodSchema = makeSchema();
