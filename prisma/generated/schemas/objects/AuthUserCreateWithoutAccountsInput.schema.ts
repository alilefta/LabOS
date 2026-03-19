import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionCreateNestedManyWithoutAuthuserInputObjectSchema as SessionCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionCreateNestedManyWithoutAuthuserInput.schema';
import { LabUserCreateNestedOneWithoutAuthUserInputObjectSchema as LabUserCreateNestedOneWithoutAuthUserInputObjectSchema } from './LabUserCreateNestedOneWithoutAuthUserInput.schema';
import { SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema as SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema } from './SuperUserCreateNestedOneWithoutAuthUserInput.schema'

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
  labUser: z.lazy(() => LabUserCreateNestedOneWithoutAuthUserInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserCreateWithoutAccountsInputObjectSchema: z.ZodType<Prisma.AuthUserCreateWithoutAccountsInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCreateWithoutAccountsInput>;
export const AuthUserCreateWithoutAccountsInputObjectZodSchema = makeSchema();
