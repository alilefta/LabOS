import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './objects/MemberInclude.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';

export const MemberFindUniqueOrThrowSchema: z.ZodType<Prisma.MemberFindUniqueOrThrowArgs> = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), where: MemberWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MemberFindUniqueOrThrowArgs>;

export const MemberFindUniqueOrThrowZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), where: MemberWhereUniqueInputObjectSchema }).strict();