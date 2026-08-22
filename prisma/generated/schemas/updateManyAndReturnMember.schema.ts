import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberUpdateManyMutationInputObjectSchema as MemberUpdateManyMutationInputObjectSchema } from './objects/MemberUpdateManyMutationInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './objects/MemberWhereInput.schema';

export const MemberUpdateManyAndReturnSchema: z.ZodType<Prisma.MemberUpdateManyAndReturnArgs> = z.object({ select: MemberSelectObjectSchema.optional(), data: MemberUpdateManyMutationInputObjectSchema, where: MemberWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MemberUpdateManyAndReturnArgs>;

export const MemberUpdateManyAndReturnZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), data: MemberUpdateManyMutationInputObjectSchema, where: MemberWhereInputObjectSchema.optional() }).strict();