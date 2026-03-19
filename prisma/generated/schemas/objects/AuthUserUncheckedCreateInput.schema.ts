import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './SessionUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema as AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema } from './AccountUncheckedCreateNestedManyWithoutAuthuserInput.schema';
import { LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema as LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema } from './LabUserUncheckedCreateNestedOneWithoutAuthUserInput.schema';
import { SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema as SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema } from './SuperUserUncheckedCreateNestedOneWithoutAuthUserInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  role: z.string().optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutAuthuserInputObjectSchema).optional(),
  labUser: z.lazy(() => LabUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional(),
  superUser: z.lazy(() => SuperUserUncheckedCreateNestedOneWithoutAuthUserInputObjectSchema).optional()
}).strict();
export const AuthUserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AuthUserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserUncheckedCreateInput>;
export const AuthUserUncheckedCreateInputObjectZodSchema = makeSchema();
