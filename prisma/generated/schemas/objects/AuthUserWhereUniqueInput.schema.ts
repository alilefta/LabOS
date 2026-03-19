import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string().optional()
}).strict();
export const AuthUserWhereUniqueInputObjectSchema: z.ZodType<Prisma.AuthUserWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AuthUserWhereUniqueInput>;
export const AuthUserWhereUniqueInputObjectZodSchema = makeSchema();
