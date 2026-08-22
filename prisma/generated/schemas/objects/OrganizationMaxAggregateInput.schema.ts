import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  logo: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  metadata: z.literal(true).optional()
}).strict();
export const OrganizationMaxAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMaxAggregateInputType>;
export const OrganizationMaxAggregateInputObjectZodSchema = makeSchema();
