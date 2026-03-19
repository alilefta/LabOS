import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './objects/AuthUserSelect.schema';
import { AuthUserIncludeObjectSchema as AuthUserIncludeObjectSchema } from './objects/AuthUserInclude.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './objects/AuthUserWhereUniqueInput.schema';
import { AuthUserCreateInputObjectSchema as AuthUserCreateInputObjectSchema } from './objects/AuthUserCreateInput.schema';
import { AuthUserUncheckedCreateInputObjectSchema as AuthUserUncheckedCreateInputObjectSchema } from './objects/AuthUserUncheckedCreateInput.schema';
import { AuthUserUpdateInputObjectSchema as AuthUserUpdateInputObjectSchema } from './objects/AuthUserUpdateInput.schema';
import { AuthUserUncheckedUpdateInputObjectSchema as AuthUserUncheckedUpdateInputObjectSchema } from './objects/AuthUserUncheckedUpdateInput.schema';

export const AuthUserUpsertOneSchema: z.ZodType<Prisma.AuthUserUpsertArgs> = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), where: AuthUserWhereUniqueInputObjectSchema, create: z.union([ AuthUserCreateInputObjectSchema, AuthUserUncheckedCreateInputObjectSchema ]), update: z.union([ AuthUserUpdateInputObjectSchema, AuthUserUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.AuthUserUpsertArgs>;

export const AuthUserUpsertOneZodSchema = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), where: AuthUserWhereUniqueInputObjectSchema, create: z.union([ AuthUserCreateInputObjectSchema, AuthUserUncheckedCreateInputObjectSchema ]), update: z.union([ AuthUserUpdateInputObjectSchema, AuthUserUncheckedUpdateInputObjectSchema ]) }).strict();