import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './objects/AuthUserSelect.schema';
import { AuthUserCreateManyInputObjectSchema as AuthUserCreateManyInputObjectSchema } from './objects/AuthUserCreateManyInput.schema';

export const AuthUserCreateManyAndReturnSchema: z.ZodType<Prisma.AuthUserCreateManyAndReturnArgs> = z.object({ select: AuthUserSelectObjectSchema.optional(), data: z.union([ AuthUserCreateManyInputObjectSchema, z.array(AuthUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserCreateManyAndReturnArgs>;

export const AuthUserCreateManyAndReturnZodSchema = z.object({ select: AuthUserSelectObjectSchema.optional(), data: z.union([ AuthUserCreateManyInputObjectSchema, z.array(AuthUserCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();