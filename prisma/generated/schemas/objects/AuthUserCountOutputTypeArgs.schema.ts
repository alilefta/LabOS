import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCountOutputTypeSelectObjectSchema as AuthUserCountOutputTypeSelectObjectSchema } from './AuthUserCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AuthUserCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const AuthUserCountOutputTypeArgsObjectSchema = makeSchema();
export const AuthUserCountOutputTypeArgsObjectZodSchema = makeSchema();
