import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './objects/AuthUserSelect.schema';
import { AuthUserIncludeObjectSchema as AuthUserIncludeObjectSchema } from './objects/AuthUserInclude.schema';
import { AuthUserCreateInputObjectSchema as AuthUserCreateInputObjectSchema } from './objects/AuthUserCreateInput.schema';
import { AuthUserUncheckedCreateInputObjectSchema as AuthUserUncheckedCreateInputObjectSchema } from './objects/AuthUserUncheckedCreateInput.schema';

export const AuthUserCreateOneSchema: z.ZodType<Prisma.AuthUserCreateArgs> = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), data: z.union([AuthUserCreateInputObjectSchema, AuthUserUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AuthUserCreateArgs>;

export const AuthUserCreateOneZodSchema = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), data: z.union([AuthUserCreateInputObjectSchema, AuthUserUncheckedCreateInputObjectSchema]) }).strict();