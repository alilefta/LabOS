import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  caseId: z.boolean().optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  labId: z.boolean().optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional(),
  actorId: z.boolean().optional(),
  actorName: z.boolean().optional(),
  type: z.boolean().optional(),
  summary: z.boolean().optional(),
  payload: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const CaseActivityLogSelectObjectSchema: z.ZodType<Prisma.CaseActivityLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogSelect>;
export const CaseActivityLogSelectObjectZodSchema = makeSchema();
