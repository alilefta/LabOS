import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserArgsObjectSchema as AuthUserArgsObjectSchema } from './AuthUserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  authuser: z.union([z.boolean(), z.lazy(() => AuthUserArgsObjectSchema)]).optional(),
  labId: z.boolean().optional()
}).strict();
export const SessionSelectObjectSchema: z.ZodType<Prisma.SessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.SessionSelect>;
export const SessionSelectObjectZodSchema = makeSchema();
