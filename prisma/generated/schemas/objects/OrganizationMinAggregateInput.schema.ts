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
export const OrganizationMinAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMinAggregateInputType>;
export const OrganizationMinAggregateInputObjectZodSchema = makeSchema();
