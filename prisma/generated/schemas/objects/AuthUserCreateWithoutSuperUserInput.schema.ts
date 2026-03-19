import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionCreateNestedManyWithoutAuthuserInputObjectSchema as SessionCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionCreateNestedManyWithoutAuthuserInput.schema';
import { AccountCreateNestedManyWithoutAuthuserInputObjectSchema as AccountCreateNestedManyWithoutAuthuserInputObjectSchema } from './AccountCreateNestedManyWithoutAuthuserInput.schema';
import { LabUserCreateNestedOneWithoutAuthUserInputObjectSchema as LabUserCreateNestedOneWithoutAuthUserInputObjectSchema } from './LabUserCreateNestedOneWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.string().optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserCreateWithoutSuperUserInputObjectSchema: z.ZodType<Prisma.AuthUserCreateWithoutSuperUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateWithoutSuperUserInput>;
export const AuthUserCreateWithoutSuperUserInputObjectZodSchema = makeSchema();
