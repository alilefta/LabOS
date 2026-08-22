import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './MemberWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => MemberWhereInputObjectSchema).optional()
}).strict();
export const AuthUserCountOutputTypeCountMembersArgsObjectSchema = makeSchema();
export const AuthUserCountOutputTypeCountMembersArgsObjectZodSchema = makeSchema();
