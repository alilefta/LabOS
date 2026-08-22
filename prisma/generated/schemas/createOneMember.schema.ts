import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberIncludeObjectSchema as MemberIncludeObjectSchema } from './objects/MemberInclude.schema';
import { MemberCreateInputObjectSchema as MemberCreateInputObjectSchema } from './objects/MemberCreateInput.schema';
import { MemberUncheckedCreateInputObjectSchema as MemberUncheckedCreateInputObjectSchema } from './objects/MemberUncheckedCreateInput.schema';

export const MemberCreateOneSchema: z.ZodType<Prisma.MemberCreateArgs> = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), data: z.union([MemberCreateInputObjectSchema, MemberUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.MemberCreateArgs>;

export const MemberCreateOneZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), include: MemberIncludeObjectSchema.optional(), data: z.union([MemberCreateInputObjectSchema, MemberUncheckedCreateInputObjectSchema]) }).strict();