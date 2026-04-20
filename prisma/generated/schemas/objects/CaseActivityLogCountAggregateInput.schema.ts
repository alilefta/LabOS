import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  actorId: z.literal(true).optional(),
  actorName: z.literal(true).optional(),
  type: z.literal(true).optional(),
  summary: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CaseActivityLogCountAggregateInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCountAggregateInputType>;
export const CaseActivityLogCountAggregateInputObjectZodSchema = makeSchema();
