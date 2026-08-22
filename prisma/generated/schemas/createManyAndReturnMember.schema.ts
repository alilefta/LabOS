import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberSelectObjectSchema as MemberSelectObjectSchema } from './objects/MemberSelect.schema';
import { MemberCreateManyInputObjectSchema as MemberCreateManyInputObjectSchema } from './objects/MemberCreateManyInput.schema';

export const MemberCreateManyAndReturnSchema: z.ZodType<Prisma.MemberCreateManyAndReturnArgs> = z.object({ select: MemberSelectObjectSchema.optional(), data: z.union([ MemberCreateManyInputObjectSchema, z.array(MemberCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MemberCreateManyAndReturnArgs>;

export const MemberCreateManyAndReturnZodSchema = z.object({ select: MemberSelectObjectSchema.optional(), data: z.union([ MemberCreateManyInputObjectSchema, z.array(MemberCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();