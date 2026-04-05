import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  firstName: z.literal(true).optional(),
  lastName: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  email: z.literal(true).optional(),
  phoneNumber: z.literal(true).optional(),
  avatarUrl: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  roleCategory: z.literal(true).optional(),
  jobTitle: z.literal(true).optional(),
  specialization: z.literal(true).optional(),
  commissionType: z.literal(true).optional(),
  commissionValue: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const LabStaffMaxAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffMaxAggregateInputType>;
export const LabStaffMaxAggregateInputObjectZodSchema = makeSchema();
