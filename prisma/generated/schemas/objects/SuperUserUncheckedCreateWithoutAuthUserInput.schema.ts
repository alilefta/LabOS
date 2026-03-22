import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  city: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  avatarUrl: z.string(),
  secondaryEmail: z.string().optional().nullable(),
  phoneNumber: z.string(),
  role: SuperUserRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SuperUserUncheckedCreateWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.SuperUserUncheckedCreateWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserUncheckedCreateWithoutAuthUserInput>;
export const SuperUserUncheckedCreateWithoutAuthUserInputObjectZodSchema = makeSchema();
