import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionFindManySchema as SessionFindManySchema } from '../findManySession.schema';
import { AccountFindManySchema as AccountFindManySchema } from '../findManyAccount.schema';
import { LabUserArgsObjectSchema as LabUserArgsObjectSchema } from './LabUserArgs.schema';
import { SuperUserArgsObjectSchema as SuperUserArgsObjectSchema } from './SuperUserArgs.schema';
import { AuthUserCountOutputTypeArgsObjectSchema as AuthUserCountOutputTypeArgsObjectSchema } from './AuthUserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  role: z.boolean().optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  labUser: z.union([z.boolean(), z.lazy(() => LabUserArgsObjectSchema)]).optional(),
  superUser: z.union([z.boolean(), z.lazy(() => SuperUserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AuthUserSelectObjectSchema: z.ZodType<Prisma.AuthUserSelect> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserSelect>;
export const AuthUserSelectObjectZodSchema = makeSchema();
