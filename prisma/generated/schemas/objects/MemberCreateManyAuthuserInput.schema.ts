import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date()
}).strict();
export const MemberCreateManyAuthuserInputObjectSchema: z.ZodType<Prisma.MemberCreateManyAuthuserInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyAuthuserInput>;
export const MemberCreateManyAuthuserInputObjectZodSchema = makeSchema();
