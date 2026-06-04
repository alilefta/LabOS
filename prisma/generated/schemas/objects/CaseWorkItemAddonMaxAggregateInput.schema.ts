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
export const CaseWorkItemAddonMaxAggregateInputObjectSchema: z.ZodType<Prisma.CaseWorkItemAddonMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseWorkItemAddonMaxAggregateInputType>;
export const CaseWorkItemAddonMaxAggregateInputObjectZodSchema = makeSchema();
