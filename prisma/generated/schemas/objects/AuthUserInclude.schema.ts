import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { SessionFindManySchema as SessionFindManySchema } from '../findManySession.schema';
import { AccountFindManySchema as AccountFindManySchema } from '../findManyAccount.schema';
import { LabUserArgsObjectSchema as LabUserArgsObjectSchema } from './LabUserArgs.schema';
import { SuperUserArgsObjectSchema as SuperUserArgsObjectSchema } from './SuperUserArgs.schema';
import { AuthUserCountOutputTypeArgsObjectSchema as AuthUserCountOutputTypeArgsObjectSchema } from './AuthUserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManySchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManySchema)]).optional(),
  labUser: z.union([z.boolean(), z.lazy(() => LabUserArgsObjectSchema)]).optional(),
  superUser: z.union([z.boolean(), z.lazy(() => SuperUserArgsObjectSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AuthUserIncludeObjectSchema: z.ZodType<Prisma.AuthUserInclude> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserInclude>;
export const AuthUserIncludeObjectZodSchema = makeSchema();
