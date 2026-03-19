import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { AuthUserSelectObjectSchema as AuthUserSelectObjectSchema } from './objects/AuthUserSelect.schema';
import { AuthUserIncludeObjectSchema as AuthUserIncludeObjectSchema } from './objects/AuthUserInclude.schema';
import { AuthUserWhereUniqueInputObjectSchema as AuthUserWhereUniqueInputObjectSchema } from './objects/AuthUserWhereUniqueInput.schema';

export const AuthUserFindUniqueSchema: z.ZodType<Prisma.AuthUserFindUniqueArgs> = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), where: AuthUserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AuthUserFindUniqueArgs>;

export const AuthUserFindUniqueZodSchema = z.object({ select: AuthUserSelectObjectSchema.optional(), include: AuthUserIncludeObjectSchema.optional(), where: AuthUserWhereUniqueInputObjectSchema }).strict();