import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema'

const makeSchema = () => z.object({
  authUser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional()
}).strict();
export const SuperUserIncludeObjectSchema: z.ZodType<Prisma.SuperUserInclude> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserInclude>;
export const SuperUserIncludeObjectZodSchema = makeSchema();
