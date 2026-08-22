import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './MemberSelect.schema';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './MemberInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MemberSelectObjectSchema).optional(),
  include: z.lazy(() => MemberIncludeObjectSchema).optional()
}).strict();
export const MemberArgsObjectSchema = makeSchema();
export const MemberArgsObjectZodSchema = makeSchema();
