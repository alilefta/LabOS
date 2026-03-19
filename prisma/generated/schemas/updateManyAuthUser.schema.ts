import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserUpdateManyMutationInputObjectSchema as AuthUserUpdateManyMutationInputObjectSchema } from './objects/AuthUserUpdateManyMutationInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './objects/AuthUserWhereInput.schema';

export const AuthUserUpdateManySchema: z.ZodType<Prisma.AuthUserUpdateManyArgs> = z.object({ data: AuthUserUpdateManyMutationInputObjectSchema, where: AuthUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserUpdateManyArgs>;

export const AuthUserUpdateManyZodSchema = z.object({ data: AuthUserUpdateManyMutationInputObjectSchema, where: AuthUserWhereInputObjectSchema.optional() }).strict();