import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema';
import { LabArgsObjectSchema as LabArgsObjectSchema } from './LabArgs.schema'

const makeSchema = () => z.object({
  authUser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  lab: z.union([z.boolean(), z.lazy(() => LabArgsObjectSchema)]).optional()
}).strict();
export const LabUserIncludeObjectSchema: z.ZodType<Prisma.LabUserInclude> = makeSchema() as unknown as z.ZodType<Prisma.LabUserInclude>;
export const LabUserIncludeObjectZodSchema = makeSchema();
