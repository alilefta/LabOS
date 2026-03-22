import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable()
}).strict();
export const SessionUncheckedCreateWithoutAuthuserInputObjectSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedCreateWithoutAuthuserInput>;
export const SessionUncheckedCreateWithoutAuthuserInputObjectZodSchema = makeSchema();
