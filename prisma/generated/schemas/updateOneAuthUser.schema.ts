import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './objects/AuthUserSelect.schema';
import { AuthUserIncludeObjectSchema as AuthUserIncludeObjectSchema } from './objects/AuthUserInclude.schema';
import { AuthUserUpdateInputObjectSchema as AuthUserUpdateInputObjectSchema } from './objects/AuthUserUpdateInput.schema';
import { AuthUserUncheckedUpdateInputObjectSchema as AuthUserUncheckedUpdateInputObjectSchema } from './objects/AuthUserUncheckedUpdateInput.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './objects/AuthUserWhereUniqueInput.schema';

export const AuthUserUpdateOneSchema: z.ZodType<Prisma.AuthUserUpdateArgs> = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), data: z.union([AuthUserUpdateInputObjectSchema, AuthUserUncheckedUpdateInputObjectSchema]), where: AuthUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AuthUserUpdateArgs>;

export const AuthUserUpdateOneZodSchema = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), data: z.union([AuthUserUpdateInputObjectSchema, AuthUserUncheckedUpdateInputObjectSchema]), where: AuthUserWhereUniqueInputObjectSchema }).strict();