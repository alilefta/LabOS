import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  labId: z.literal(true).optional(),
  firstName: z.literal(true).optional(),
  lastName: z.literal(true).optional(),
  phoneNumber: z.literal(true).optional(),
  avatarUrl: z.literal(true).optional(),
  isActive: z.literal(true).optional(),
  city: z.literal(true).optional(),
  address1: z.literal(true).optional(),
  address2: z.literal(true).optional(),
  zipcode: z.literal(true).optional(),
  roleCategory: z.literal(true).optional(),
  jobTitle: z.literal(true).optional(),
  specialization: z.literal(true).optional(),
  commissionType: z.literal(true).optional(),
  commissionValue: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const LabStaffCountAggregateInputObjectSchema: z.ZodType<Prisma.LabStaffCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.LabStaffCountAggregateInputType>;
export const LabStaffCountAggregateInputObjectZodSchema = makeSchema();
