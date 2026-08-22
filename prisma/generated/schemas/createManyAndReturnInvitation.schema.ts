import type { Prisma } from '../../../generated/prisma/client';
import * as z from 'zod';
import { InvitationSelectObjectSchema as InvitationSelectObjectSchema } from './objects/InvitationSelect.schema';
import { InvitationCreateManyInputObjectSchema as InvitationCreateManyInputObjectSchema } from './objects/InvitationCreateManyInput.schema';

export const InvitationCreateManyAndReturnSchema: z.ZodType<Prisma.InvitationCreateManyAndReturnArgs> = z.object({ select: InvitationSelectObjectSchema.optional(), data: z.union([ InvitationCreateManyInputObjectSchema, z.array(InvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.InvitationCreateManyAndReturnArgs>;

export const InvitationCreateManyAndReturnZodSchema = z.object({ select: InvitationSelectObjectSchema.optional(), data: z.union([ InvitationCreateManyInputObjectSchema, z.array(InvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();