import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date()
}).strict();
export const MemberCreateManyOrganizationInputObjectSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberCreateManyOrganizationInput>;
export const MemberCreateManyOrganizationInputObjectZodSchema = makeSchema();
