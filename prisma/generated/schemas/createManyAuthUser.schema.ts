import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserCreateManyInputObjectSchema as AuthUserCreateManyInputObjectSchema } from './objects/AuthUserCreateManyInput.schema';

export const AuthUserCreateManySchema: z.ZodType<Prisma.AuthUserCreateManyArgs> = z.object({ data: z.union([ AuthUserCreateManyInputObjectSchema, z.array(AuthUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserCreateManyArgs>;

export const AuthUserCreateManyZodSchema = z.object({ data: z.union([ AuthUserCreateManyInputObjectSchema, z.array(AuthUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();