import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const MemberWhereUniqueInputObjectSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MemberWhereUniqueInput>;
export const MemberWhereUniqueInputObjectZodSchema = makeSchema();
