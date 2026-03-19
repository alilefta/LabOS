import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './objects/AuthUserSelect.schema';
import { AuthUserUpdateManyMutationInputObjectSchema as AuthUserUpdateManyMutationInputObjectSchema } from './objects/AuthUserUpdateManyMutationInput.schema';
import { AuthUserWhereInputObjectSchema as AuthUserWhereInputObjectSchema } from './objects/AuthUserWhereInput.schema';

export const AuthUserUpdateManyAndReturnSchema: z.ZodType<Prisma.AuthUserUpdateManyAndReturnArgs> = z.object({ select: AuthUserSelectObjectSchema.optional(), data: AuthUserUpdateManyMutationInputObjectSchema, where: AuthUserWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AuthUserUpdateManyAndReturnArgs>;

export const AuthUserUpdateManyAndReturnZodSchema = z.object({ select: AuthUserSelectObjectSchema.optional(), data: AuthUserUpdateManyMutationInputObjectSchema, where: AuthUserWhereInputObjectSchema.optional() }).strict();