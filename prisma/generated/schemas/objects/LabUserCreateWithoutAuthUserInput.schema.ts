import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabRoleSchema } from '../enums/LabRole.schema';
import { LabCreateNestedOneWithoutUsersInputObjectSchema as LabCreateNestedOneWithoutUsersInputObjectSchema } from './LabCreateNestedOneWithoutUsersInput.schema'

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
  role: LabRoleSchema.optional(),
  isActive: z.boolean().optional(),
  lastTimeActive: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  lab: z.lazy(() => LabCreateNestedOneWithoutUsersInputObjectSchema)
}).strict();
export const LabUserCreateWithoutAuthUserInputObjectSchema: z.ZodType<Prisma.LabUserCreateWithoutAuthUserInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUserCreateWithoutAuthUserInput>;
export const LabUserCreateWithoutAuthUserInputObjectZodSchema = makeSchema();
