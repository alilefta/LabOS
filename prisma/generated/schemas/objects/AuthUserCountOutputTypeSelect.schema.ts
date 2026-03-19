import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCountOutputTypeCountSessionsArgsObjectSchema as AuthUserCountOutputTypeCountSessionsArgsObjectSchema } from './AuthUserCountOutputTypeCountSessionsArgs.schema';
import { AuthUserCountOutputTypeCountAccountsArgsObjectSchema as AuthUserCountOutputTypeCountAccountsArgsObjectSchema } from './AuthUserCountOutputTypeCountAccountsArgs.schema'

const makeSchema = () => z.object({
  sessions: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeCountSessionsArgsObjectSchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AuthUserCountOutputTypeCountAccountsArgsObjectSchema)]).optional()
}).strict();
export const AuthUserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.AuthUserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserCountOutputTypeSelect>;
export const AuthUserCountOutputTypeSelectObjectZodSchema = makeSchema();
