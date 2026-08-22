import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './objects/MemberInclude.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';

export const MemberDeleteOneSchema: z.ZodType<Prisma.MemberDeleteArgs> = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), where: MemberWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MemberDeleteArgs>;

export const MemberDeleteOneZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), where: MemberWhereUniqueInputObjectSchema }).strict();