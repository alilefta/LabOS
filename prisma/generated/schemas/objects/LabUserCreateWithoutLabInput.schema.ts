import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { UserRoleSchema } from '../enums/UserRole.schema';
import { AuthUserCreateNestedOneWithoutLabUserInputObjectSchema as AuthUserCreateNestedOneWithoutLabUserInputObjectSchema } from './AuthUserCreateNestedOneWithoutLabUserInput.schema'

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
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  authUser: z.lazy(() => AuthUserCreateNestedOneWithoutLabUserInputObjectSchema)
}).strict();
export const LabUserCreateWithoutLabInputObjectSchema: z.ZodType<Prisma.LabUserCreateWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateWithoutLabInput>;
export const LabUserCreateWithoutLabInputObjectZodSchema = makeSchema();
