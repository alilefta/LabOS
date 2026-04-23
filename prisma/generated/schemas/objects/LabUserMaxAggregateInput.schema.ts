import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  authUserId: z.literal(true).optional(),
  labStaffId: z.literal(true).optional(),
  role: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  lastTimeActive: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const LabUserMaxAggregateInputObjectSchema: z.ZodType<Prisma.LabUserMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabUserMaxAggregateInputType>;
export const LabUserMaxAggregateInputObjectZodSchema = makeSchema();
