import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './objects/MemberInclude.schema';
import { MemberWhereUniqueInputObjectSchema as MemberWhereUniqueInputObjectSchema } from './objects/MemberWhereUniqueInput.schema';
import { MemberCreateInputObjectSchema as MemberCreateInputObjectSchema } from './objects/MemberCreateInput.schema';
import { MemberUncheckedCreateInputObjectSchema as MemberUncheckedCreateInputObjectSchema } from './objects/MemberUncheckedCreateInput.schema';
import { MemberUpdateInputObjectSchema as MemberUpdateInputObjectSchema } from './objects/MemberUpdateInput.schema';
import { MemberUncheckedUpdateInputObjectSchema as MemberUncheckedUpdateInputObjectSchema } from './objects/MemberUncheckedUpdateInput.schema';

export const MemberUpsertOneSchema: z.ZodType<Prisma.MemberUpsertArgs> = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), where: MemberWhereUniqueInputObjectSchema, create: z.union([ MemberCreateInputObjectSchema, MemberUncheckedCreateInputObjectSchema ]), update: z.union([ MemberUpdateInputObjectSchema, MemberUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.MemberUpsertArgs>;

export const MemberUpsertOneZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), where: MemberWhereUniqueInputObjectSchema, create: z.union([ MemberCreateInputObjectSchema, MemberUncheckedCreateInputObjectSchema ]), update: z.union([ MemberUpdateInputObjectSchema, MemberUncheckedUpdateInputObjectSchema ]) }).strict();