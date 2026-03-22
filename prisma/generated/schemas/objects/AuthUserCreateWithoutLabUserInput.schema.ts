import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserRoleSchema } from '../enums/AuthUserRole.schema';
import { SessionCreateNestedManyWithoutAuthuserInputObjectSchema as SessionCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionCreateNestedManyWithoutAuthuserInput.schema';
import { AccountCreateNestedManyWithoutAuthuserInputObjectSchema as AccountCreateNestedManyWithoutAuthuserInputObjectSchema } from './AccountCreateNestedManyWithoutAuthuserInput.schema';
import { SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema as SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema } from './SuperUserCreateNestedOneWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: AuthUserRoleSchema.optional(),
  labId: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserCreateWithoutLabUserInputObjectSchema: z.ZodType<Prisma.AuthUserCreateWithoutLabUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateWithoutLabUserInput>;
export const AuthUserCreateWithoutLabUserInputObjectZodSchema = makeSchema();
