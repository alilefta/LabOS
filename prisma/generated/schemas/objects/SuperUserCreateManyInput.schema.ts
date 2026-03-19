import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  avatarUrl: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  role: UserRoleSchema.optional(),
  authUserId: z.string(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SuperUserCreateManyInputObjectSchema: z.ZodType<Prisma.SuperUserCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserCreateManyInput>;
export const SuperUserCreateManyInputObjectZodSchema = makeSchema();
