import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './objects/MemberInclude.schema';
import { MemberUpdateInputObjectSchema as MemberUpdateInputObjectSchema } from './objects/MemberUpdateInput.schema';
import { MemberUncheckedUpdateInputObjectSchema as MemberUncheckedUpdateInputObjectSchema } from './objects/MemberUncheckedUpdateInput.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';

export const MemberUpdateOneSchema: z.ZodType<Prisma.MemberUpdateArgs> = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), data: z.union([MemberUpdateInputObjectSchema, MemberUncheckedUpdateInputObjectSchema]), where: MemberWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MemberUpdateArgs>;

export const MemberUpdateOneZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), data: z.union([MemberUpdateInputObjectSchema, MemberUncheckedUpdateInputObjectSchema]), where: MemberWhereUniqueInputObjectSchema }).strict();