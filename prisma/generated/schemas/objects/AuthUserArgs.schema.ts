import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './AuthUserSelect.schema';
import { AuthUserIncludeObjectSchema as AuthUserIncludeObjectSchema } from './AuthUserInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AuthUserSelectObjectSchema).optional(),
  include: z.lazy(() => AuthUserIncludeObjectSchema).optional()
}).strict();
export const AuthUserArgsObjectSchema = makeSchema();
export const AuthUserArgsObjectZodSchema = makeSchema();
