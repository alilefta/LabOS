import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string().optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const InvitationCreateManyAuthuserInputObjectSchema: z.ZodType<Prisma.InvitationCreateManyAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.InvitationCreateManyAuthuserInput>;
export const InvitationCreateManyAuthuserInputObjectZodSchema = makeSchema();
