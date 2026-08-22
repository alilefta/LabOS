import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberCreateManyInputObjectSchema as MemberCreateManyInputObjectSchema } from './objects/MemberCreateManyInput.schema';

export const MemberCreateManySchema: z.ZodType<Prisma.MemberCreateManyArgs> = z.object({ data: z.union([ MemberCreateManyInputObjectSchema, z.array(MemberCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MemberCreateManyArgs>;

export const MemberCreateManyZodSchema = z.object({ data: z.union([ MemberCreateManyInputObjectSchema, z.array(MemberCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();