import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { AuthUserCreateNestedOneWithoutLabUserInputObjectSchema as AuthUserCreateNestedOneWithoutLabUserInputObjectSchema } from './AuthUserCreateNestedOneWithoutLabUserInput.schema';
import { LabCreateNestedOneWithoutUsersInputObjectSchema as LabCreateNestedOneWithoutUsersInputObjectSchema } from './LabCreateNestedOneWithoutUsersInput.schema'

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
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  authUser: z.lazy(() => AuthUserCreateNestedOneWithoutLabUserInputObjectSchema),
  lab: z.lazy(() => LabCreateNestedOneWithoutUsersInputObjectSchema)
}).strict();
export const LabUserCreateInputObjectSchema: z.ZodType<Prisma.LabUserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateInput>;
export const LabUserCreateInputObjectZodSchema = makeSchema();
