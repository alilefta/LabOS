import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  caseWorkItemId: z.literal(true).optional(),
  addonId: z.literal(true).optional(),
  priceSnapshot: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const CaseWorkItemAddonMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonMinAggregateInputType>;
export const CaseWorkItemAddonMinAggregateInputObjectZodSchema = makeSchema();
