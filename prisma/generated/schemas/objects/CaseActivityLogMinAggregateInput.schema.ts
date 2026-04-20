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
  createdAt: z.literal(true).optional()
}).strict();
export const CaseActivityLogMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseActivityLogMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogMinAggregateInputType>;
export const CaseActivityLogMinAggregateInputObjectZodSchema = makeSchema();
