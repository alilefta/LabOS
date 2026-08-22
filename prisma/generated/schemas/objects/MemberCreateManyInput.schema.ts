import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date()
}).strict();
export const MemberCreateManyInputObjectSchema: z.ZodType<Prisma.MemberCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyInput>;
export const MemberCreateManyInputObjectZodSchema = makeSchema();
