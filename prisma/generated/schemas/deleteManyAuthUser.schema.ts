import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './objects/AuthUserWhereInput.schema';

export const AuthUserDeleteManySchema: z.ZodType<Prisma.AuthUserDeleteManyArgs> = z.object({ where: AuthUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserDeleteManyArgs>;

export const AuthUserDeleteManyZodSchema = z.object({ where: AuthUserWhereInputObjectSchema.optional() }).strict();