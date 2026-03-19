import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  authUserId: z.string().optional()
}).strict();
export const SuperUserWhereUniqueInputObjectSchema: z.ZodType<Prisma.SuperUserWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.SuperUserWhereUniqueInput>;
export const SuperUserWhereUniqueInputObjectZodSchema = makeSchema();
