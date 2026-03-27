import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SuperUserRoleSchema } from '../enums/SuperUserRole.schema';
import { AuthUserCreateNestedOneWithoutSuperUserInputObjectSchema as AuthUserCreateNestedOneWithoutSuperUserInputObjectSchema } from './AuthUserCreateNestedOneWithoutSuperUserInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  city: z.string(),
  zipcode: z.string().optional().nullable(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  avatarUrl: z.string(),
  secondaryEmail: z.string().optional().nullable(),
  phoneNumber: z.string(),
  role: SuperUserRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  authUser: z.lazy(() => AuthUserCreateNestedOneWithoutSuperUserInputObjectSchema)
}).strict();
export const SuperUserCreateInputObjectSchema: z.ZodType<Prisma.SuperUserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserCreateInput>;
export const SuperUserCreateInputObjectZodSchema = makeSchema();
