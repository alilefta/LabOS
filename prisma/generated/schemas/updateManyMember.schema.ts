import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { MemberUpdateManyMutationInputObjectSchema as MemberUpdateManyMutationInputObjectSchema } from './objects/MemberUpdateManyMutationInput.schema';
import { MemberWhereInputObjectSchema as MemberWhereInputObjectSchema } from './objects/MemberWhereInput.schema';

export const MemberUpdateManySchema: z.ZodType<Prisma.MemberUpdateManyArgs> = z.object({ data: MemberUpdateManyMutationInputObjectSchema, where: MemberWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MemberUpdateManyArgs>;

export const MemberUpdateManyZodSchema = z.object({ data: MemberUpdateManyMutationInputObjectSchema, where: MemberWhereInputObjectSchema.optional() }).strict();