import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: AuthUserRoleSchema.optional(),
  labId: z.string().optional().nullable()
}).strict();
export const AuthUserCreateManyInputObjectSchema: z.ZodType<Prisma.AuthUserCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateManyInput>;
export const AuthUserCreateManyInputObjectZodSchema = makeSchema();
