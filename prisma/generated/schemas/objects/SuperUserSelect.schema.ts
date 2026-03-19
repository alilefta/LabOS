import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema'

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
  authUserId: z.boolean().optional(),
  authUser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const SuperUserSelectObjectSchema: z.ZodType<Prisma.SuperUserSelect> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserSelect>;
export const SuperUserSelectObjectZodSchema = makeSchema();
