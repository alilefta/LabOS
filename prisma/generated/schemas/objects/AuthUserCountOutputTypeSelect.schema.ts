import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCountOutputTypeCountSessionsArgsObjectSchema as AuthUserCountOutputTypeCountSessionsArgsObjectSchema } from './AuthUserCountOutputTypeCountSessionsArgs.schema';
import { AuthUserCountOutputTypeCountAccountsArgsObjectSchema as AuthUserCountOutputTypeCountAccountsArgsObjectSchema } from './AuthUserCountOutputTypeCountAccountsArgs.schema';
import { AuthUserCountOutputTypeCountMembersArgsObjectSchema as AuthUserCountOutputTypeCountMembersArgsObjectSchema } from './AuthUserCountOutputTypeCountMembersArgs.schema';
import { AuthUserCountOutputTypeCountInvitationsArgsObjectSchema as AuthUserCountOutputTypeCountInvitationsArgsObjectSchema } from './AuthUserCountOutputTypeCountInvitationsArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeCountSessionsArgsObjectSchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeCountAccountsArgsObjectSchema)]).optional(),
  members: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeCountMembersArgsObjectSchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeCountInvitationsArgsObjectSchema)]).optional()
}).strict();
export const AuthUserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AuthUserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCountOutputTypeSelect>;
export const AuthUserCountOutputTypeSelectObjectZodSchema = makeSchema();
