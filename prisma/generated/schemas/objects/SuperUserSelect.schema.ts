import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  city: z.boolean().optional(),
  zipcode: z.boolean().optional(),
  address1: z.boolean().optional(),
  address2: z.boolean().optional(),
  avatarUrl: z.boolean().optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  role: z.boolean().optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const SuperUserSelectObjectSchema: z.ZodType<Prisma.SuperUserSelect> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserSelect>;
export const SuperUserSelectObjectZodSchema = makeSchema();
