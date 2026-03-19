import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema'

const makeSchema = () => z.object({
  authuser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional()
}).strict();
export const SessionIncludeObjectSchema: z.ZodType<Prisma.SessionInclude> = makeSchema() as unknown as z.ZodType<Prisma.SessionInclude>;
export const SessionIncludeObjectZodSchema = makeSchema();
