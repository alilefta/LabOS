import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AccountWhereInputObjectSchema as AccountWhereInputObjectSchema } from './AccountWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AccountWhereInputObjectSchema).optional()
}).strict();
export const AuthUserCountOutputTypeCountAccountsArgsObjectSchema = makeSchema();
export const AuthUserCountOutputTypeCountAccountsArgsObjectZodSchema = makeSchema();
