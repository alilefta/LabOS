import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { AuthUserCreateNestedOneWithoutSessionsInputObjectSchema as AuthUserCreateNestedOneWithoutSessionsInputObjectSchema } from './AuthUserCreateNestedOneWithoutSessionsInput.schema'

const makeSchema = () => z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  labId: z.string().optional().nullable(),
  authuser: z.lazy(() => AuthUserCreateNestedOneWithoutSessionsInputObjectSchema)
}).strict();
export const SessionCreateInputObjectSchema: z.ZodType<Prisma.SessionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionCreateInput>;
export const SessionCreateInputObjectZodSchema = makeSchema();
